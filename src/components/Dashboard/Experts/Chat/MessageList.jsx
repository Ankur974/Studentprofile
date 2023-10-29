import Bugsnag from "@bugsnag/js";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import Loader from "@common/ui/Loader";
import { getFirebaseClient } from "@firebaseInstance";
import { useChatStatus } from "@hooks/useChatStatus";
import { decryptMessage } from "@utils/helpers";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

const List = styled(FlexBox)`
  overflow-y: scroll;
  padding: 0 1.5rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const MessageList = ({
  chatChannel,
  encryptionKey,
  providerFirebaseId,
  userFirebaseId,
  providerName,
  bottomRef,
  scrollToBottom,
  setMessageReplyData,
}) => {
  const { chatStatus: providerChatStatus } = useChatStatus(providerFirebaseId);
  const isProviderTyping = providerChatStatus?.toLowerCase() === "typing";

  const chatPaginationIndexRef = useRef(null);
  const messagesRef = useRef(null); // Firebase realtime database reference
  const messageArrayRef = useRef(null);
  const isLoadingMoreRef = useRef(null);
  const messageContainerRef = useRef(null);
  const observer = useRef(null);

  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);
  const [showChatLoadMore, setShowChatLoadMore] = useState(false);
  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    getMessageBoard();

    return () => {
      removeUnreadMessages();
      messagesRef?.current?.off("value");
    };
  }, [chatChannel, encryptionKey]);

  useEffect(() => {
    if (!isLoadingMoreRef?.current) {
      setTimeout(scrollToBottom, 500);
    } else {
      if (initialLoad) {
        messageContainerRef?.current?.scrollTo(0, 2500);
      } else {
        setInitialLoad(true);
      }
    }

    isLoadingMoreRef.current = false;
  }, [messageArray]);

  const loadMoreRef = useCallback(
    node => {
      if (loading) return;

      observer?.current?.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (
          entries[0]?.isIntersecting &&
          showChatLoadMore &&
          !isLoadingMoreRef?.current
        ) {
          getMessageBoard();
          isLoadingMoreRef.current = true;
          messageContainerRef?.current?.scrollTo(0, 400);
        }
      });

      if (node) observer.current?.observe(node);
    },
    [loading, showChatLoadMore]
  );

  const getMessageBoard = async () => {
    try {
      if (!chatChannel || !encryptionKey) return;

      const { FIREDB, FIRESTORAGE } = await getFirebaseClient();

      const MESSAGE_LIMIT = 20;
      const messagesPath = `channels/${chatChannel}/messages`;
      const localMessagesRef = FIREDB.ref(messagesPath)
        .orderByKey()
        .limitToLast(MESSAGE_LIMIT);

      const paginationIndex = chatPaginationIndexRef?.current;
      if (paginationIndex) {
        messagesRef.current = localMessagesRef.endBefore(paginationIndex);
      } else {
        messagesRef.current = localMessagesRef;
      }

      if (!chatPaginationIndexRef?.current) {
        FIREDB.ref(messagesPath)
          .limitToLast(1)
          .on("child_added", data => {
            try {
              const messageObj = data.val();
              const { encrypted, message_type, reply_to_message } =
                messageObj || {};

              if (data.key) {
                messageObj.key = data.key;
              }

              if (encrypted) {
                messageObj.message = decryptMessage(
                  messageObj.message,
                  encryptionKey
                );
              }

              if (message_type?.toLowerCase() === "file") {
                let fileName = "Open File";
                try {
                  fileName = messageObj?.message?.includes("firebasestorage")
                    ? FIRESTORAGE?.refFromURL(messageObj?.message)?.name
                    : "Open File";
                } catch (err) {
                  console.log({ err });
                }
                messageObj.fileName = fileName;
              }

              if (reply_to_message) {
                const replyPath = `channels/${chatChannel}/messages/${messageObj.reply_to_message}`;
                const replyPromise = new Promise(resolve => {
                  FIREDB.ref(replyPath).once("value", replySnapshot => {
                    const reply = replySnapshot.val();
                    messageObj.reply = reply.encrypted
                      ? decryptMessage(reply.message, encryptionKey)
                      : reply.message;
                    resolve();
                  });
                });

                // Need to wrap in promise because state was getting updated before the reply_to_message is fetched
                (async () => {
                  await replyPromise;
                  setMessages(messageObj);
                })();
              } else {
                setMessages(messageObj);
              }
            } catch (err) {
              Bugsnag.notify(err);
            }
          });
      }

      messagesRef?.current?.once(
        "value",
        async snapshot => {
          const payload = [];
          const snapshotObj = snapshot?.val() || {};
          const msgSnapshots = Object.keys(snapshotObj).map(key => ({
            ...snapshotObj[key],
            key: key,
          }));

          for (const messageObj of msgSnapshots) {
            if (messageObj.encrypted) {
              messageObj.message = decryptMessage(
                messageObj.message,
                encryptionKey
              );
            }

            if (messageObj?.message_type?.toLowerCase() === "file") {
              let fileName = "Open File";
              try {
                fileName = messageObj?.message?.includes("firebasestorage")
                  ? FIRESTORAGE?.refFromURL(messageObj?.message)?.name
                  : "Open File";
              } catch (err) {
                console.log({ err });
              }
              messageObj.fileName = fileName;
            }

            if (messageObj.reply_to_message) {
              try {
                const replyPath = `channels/${chatChannel}/messages/${messageObj.reply_to_message}`;
                const replySnapshot = await FIREDB.ref(replyPath).once("value");
                const reply = replySnapshot.val();
                if (reply.encrypted) {
                  messageObj.reply = decryptMessage(
                    reply.message,
                    encryptionKey
                  );
                } else {
                  messageObj.reply = reply.message;
                }
              } catch (err) {
                console.log({ err });
                Bugsnag.notify(err);
              }
            }

            payload.push(messageObj);
          }

          const newMessageArray = [
            ...payload,
            ...(messageArrayRef?.current || []),
          ];
          const newChatPaginationIndex = newMessageArray[0]
            ? newMessageArray[0].key
            : null;
          const showChatLoadMore =
            !!newMessageArray.length &&
            newChatPaginationIndex !== chatPaginationIndexRef.current;

          if (newChatPaginationIndex) {
            chatPaginationIndexRef.current = newChatPaginationIndex;
          }
          messageArrayRef.current = newMessageArray;
          setShowChatLoadMore(showChatLoadMore);
          setMessageArray(newMessageArray);
          setLoading(false);
        },
        error => {
          console.log(error);
        }
      );

      removeUnreadMessages();
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  const removeUnreadMessages = async () => {
    try {
      const { FIREDB } = await getFirebaseClient();
      if (userFirebaseId && providerFirebaseId) {
        FIREDB.ref(
          `user_friend_map/${userFirebaseId}/${providerFirebaseId}/unread_messages`
        ).set({});
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const setMessages = messageObj => {
    if (!messageObj) return;

    setMessageArray(messageArray =>
      // Last message item was getting added twice, once from this function, and once from
      // the `get` query, hence added a check to see if last item is already present in array.
      messageArray?.[messageArray?.length - 1]?.key === messageObj?.key
        ? [...messageArray]
        : [...messageArray, messageObj]
    );

    if (chatPaginationIndexRef.current) {
      messageArrayRef.current = [
        ...(messageArrayRef?.current || []),
        messageObj,
      ];
    }
  };

  return (
    <FlexBox column width="100%">
      <List ref={messageContainerRef} column>
        {showChatLoadMore && messageArray?.length && (
          <div ref={loadMoreRef}>
            <Loader height="4rem" />
          </div>
        )}
        {messageArray?.map(message => (
          <Message
            message={message}
            key={message.key}
            providerFirebaseId={providerFirebaseId}
            userFirebaseId={userFirebaseId}
            providerName={providerName}
            setMessageReplyData={setMessageReplyData}
          />
        ))}
        <div ref={bottomRef} />
      </List>
      {isProviderTyping && <TypingIndicator />}
    </FlexBox>
  );
};

export default MessageList;
