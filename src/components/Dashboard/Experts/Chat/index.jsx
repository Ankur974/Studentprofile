import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { StringParam, useQueryParams } from "use-query-params";

import { Button } from "@common/Dashboard/Buttons";
import FlexBox from "@common/ui/FlexBox";
import Loader from "@common/ui/Loader";
import { ACCENT_100, ACCENT_300 } from "@common/ui/colors";
import { useChatEncryptionKey } from "@hooks/useChatEncryptionKey";
import ChatHeader from "./Header";
import ChatInput from "./Input";
import MessageList from "./MessageList";

const ChatInfo = dynamic(() => import("./ChatInfo"), {
  loading: () => (
    <FlexBox width="100%" justify="center">
      <Loader />
    </FlexBox>
  ),
  ssr: false,
});

const SharedFiles = dynamic(() => import("./SharedFiles"), {
  loading: () => (
    <FlexBox width="100%" justify="center">
      <Loader />
    </FlexBox>
  ),
  ssr: false,
});

const Container = styled(FlexBox)`
  height: 100%;
  flex-direction: column;
  position: relative;
`;

const Header = styled(FlexBox)`
  padding: 1rem 1.5rem;
`;

const Content = styled(FlexBox)`
  flex: 1;
  width: 100%;
  overflow-y: hidden;
  border-top: 1px solid ${ACCENT_300};
  border-bottom: 1px solid ${ACCENT_300};
`;

const Footer = styled(FlexBox)`
  padding: 1rem 0;
`;

const ChatOverlay = styled(FlexBox)`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: ${ACCENT_100};
  z-index: 2;
`;

// FIXME: Hardcoded
const Chat = ({ providerName = "Pratistha Trivedi Mirza", closeChat }) => {
  const user = useSelector(state => state.auth.user);
  const bottomRef = useRef(null);
  const [queryParams] = useQueryParams({
    pFbId: StringParam, // Provider Firebase Id
  });

  const { pFbId: providerFirebaseId } = queryParams || {};

  const [chatChannel, setChatChannel] = useState(null);
  const [showSharedFiles, setShowSharedFiles] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [messageReplyData, setMessageReplyData] = useState(null);

  const { key: encryptionKey, loading: encryptionKeyLoading } =
    useChatEncryptionKey(chatChannel);

  useEffect(() => {
    if (!!user?.firebaseid && !!providerFirebaseId) {
      const chatChannel = [providerFirebaseId, user.firebaseid]
        .sort()
        .join("-");

      setChatChannel(chatChannel);
    }
  }, [user, providerFirebaseId]);

  const scrollToBottom = () => bottomRef?.current?.scrollIntoView();

  if (encryptionKeyLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header>
        <ChatHeader
          closeChat={closeChat}
          showSharedFiles={showSharedFiles}
          showChatInfo={showChatInfo}
          openSharedFiles={() => {
            setShowSharedFiles(true);
            setShowChatInfo(false);
          }}
          openChatInfo={() => {
            setShowChatInfo(true);
            setShowSharedFiles(false);
          }}
        />
      </Header>
      <Content>
        {showChatInfo && (
          <ChatOverlay>
            <ChatInfo />
          </ChatOverlay>
        )}
        {showSharedFiles && (
          <ChatOverlay>
            <SharedFiles />
          </ChatOverlay>
        )}
        <MessageList
          chatChannel={chatChannel}
          encryptionKey={encryptionKey}
          userFirebaseId={user?.firebaseid}
          providerFirebaseId={providerFirebaseId}
          providerName={providerName}
          bottomRef={bottomRef}
          scrollToBottom={scrollToBottom}
          setMessageReplyData={setMessageReplyData}
        />
      </Content>
      <Footer>
        {showChatInfo || showSharedFiles ? (
          <FlexBox
            align="center"
            justify="center"
            width="100%"
            padding="0 1.5rem"
          >
            <Button
              outline
              secondary
              onClick={() => {
                setShowChatInfo(false);
                setShowSharedFiles(false);
              }}
            >
              Back To Chat
            </Button>
          </FlexBox>
        ) : (
          <ChatInput
            chatChannel={chatChannel}
            encryptionKey={encryptionKey}
            messageReplyData={messageReplyData}
            setMessageReplyData={setMessageReplyData}
            providerFirebaseId={providerFirebaseId}
            scrollToBottom={scrollToBottom}
          />
        )}
      </Footer>
    </Container>
  );
};

export default Chat;
