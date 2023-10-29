import Bugsnag from "@bugsnag/js";
import { useCallback, useRef, useState } from "react";
import HTMLParser from "react-html-parser";
import { FiX } from "react-icons/fi";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CircularProgressBar from "@common/Dashboard/CircularProgressBar";
import { Caption, H5 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_100,
  ACCENT_300,
  ERROR_RED_400,
  PRIMARY_800,
} from "@common/ui/colors";
import { getFirebaseClient } from "@firebaseInstance";
import { encryptMessage } from "@utils/helpers";
import AddFileButton from "./AddFilesButton";

import "react-quill/dist/quill.snow.css";

const Container = styled(FlexBox)`
  width: 100%;
  align-items: end;
  column-gap: 1rem;
  margin-bottom: 0.5rem;
  padding: 0 1.5rem;
`;

const SendButton = styled(FlexBox)`
  background-color: ${PRIMARY_800};
  border-radius: 50%;
  height: 3rem;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    margin-left: 0.25rem;
    height: 2rem;
  }
`;

const RepliedToMessageContainer = styled(FlexBox)`
  position: absolute;
  bottom: 8rem;
  width: 100%;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  background-color: ${ACCENT_100};
  border-bottom: 1px solid ${ACCENT_300};
  box-shadow: 0px -10px 10px rgb(0 0 0 / 4%);

  animation: fade-up 0.1s ease-in-out;
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const RepliedToMessage = styled(FlexBox)`
  width: 100%;
  column-gap: 0.5rem;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
`;

const RepliedText = styled(FlexBox)`
  font-size: 0.75rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-height: 1.25em;
  overflow: hidden;
  text-overflow: ellipsis;
  * {
    margin: 0;
  }
`;

const UploadedFile = styled(FlexBox)`
  position: absolute;
  justify-content: space-between;
  align-items: center;
  bottom: 8rem;
  width: 100%;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  background-color: ${ACCENT_100};
  border-bottom: 1px solid ${ACCENT_300};
  box-shadow: 0px -10px 10px rgb(0 0 0 / 4%);

  .CircularProgressbar {
    height: 1.5rem !important;
    width: 1.5rem !important;
    position: unset !important;
  }

  animation: fade-up 0.1s ease-in-out;
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CrossIcon = styled(FlexBox)`
  padding: 0.25rem;
  justify-content: center;
  align-items: center;
`;

const replaceHtmlRegex = /<[^>]+>/g;

const modules = {
  toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "background",
  "align",
  "size",
  "font",
];

const Input = ({
  providerFirebaseId,
  messageReplyData,
  setMessageReplyData,
  chatChannel,
  encryptionKey,
  scrollToBottom,
}) => {
  const reactQuillRef = useRef(null);
  const user = useSelector(state => state.auth.user);

  const [value, setValue] = useState("");
  const [disableAddFile] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [uploadedFileType, setUploadedFileType] = useState(null);
  const [uploadedFileName, setUploadeFileName] = useState(null);
  const [uploadFileTask, setUploadFileTask] = useState(null);
  const [uploadFileRefName, setUploadFileRefName] = useState(null);

  const onInputChange = value => {
    setValue(value);

    const plainText = value?.replaceAll(/<[^>]+>/g, "");

    if (!plainText) {
      handleTypingStatus(false);
    } else {
      handleTypingStatus(true);
    }
  };

  const handleFileUpload = useCallback(async (files, fileType) => {
    try {
      const { FIRESTORAGE } = await getFirebaseClient();

      if (files?.length) {
        const blob = new Blob([files[0]]);
        const fileName = files?.[0]?.name;
        setUploadeFileName(fileName);
        const contentType = files?.[0]?.type;
        const metaData = { contentType };

        const fileRef = `channel/${chatChannel}/${Date.now()}-${fileName}`;

        const storageRef = FIRESTORAGE.ref(fileRef);
        setUploadFileRefName(fileRef);

        const uploadTask = storageRef.put(blob, metaData);
        setUploadFileTask(uploadTask);

        uploadTask.on(
          "state_changed",
          snapshot => {
            const { bytesTransferred, totalBytes } = snapshot || {};

            let progress = 0;
            if (bytesTransferred >= 0 && totalBytes > 0) {
              progress = (bytesTransferred / totalBytes) * 100;
            }

            setUploadProgress(progress);
          },
          error => {
            if (error?.code !== "storage/canceled") {
              Bugsnag.notify(error);
              alert("Upload Failed, Please check file!");
              setUploadedFileUrl(null);
              setUploadeFileName(null);
              setUploadFileTask(null);
              setUploadFileRefName(null);
            }
          },
          async () => {
            try {
              setUploadFileTask(null);
              const downloadURL =
                await uploadTask?.snapshot?.ref?.getDownloadURL();
              setUploadProgress(0);

              if (downloadURL) {
                setUploadedFileUrl(downloadURL);
                setUploadedFileType(fileType);
              }
            } catch (err) {
              Bugsnag.notify(err);
              setUploadProgress(0);
            }
          }
        );
      }
    } catch (err) {
      Bugsnag.notify(err);
      console.log({ err });
    }
  }, []);

  const onFileUploadCrossClick = async () => {
    const { FIRESTORAGE } = await getFirebaseClient();

    if (uploadFileTask) {
      uploadFileTask.cancel();
    } else if (uploadFileRefName) {
      const storageRef = FIRESTORAGE.ref(uploadFileRefName);
      storageRef.delete().catch();
    }
    setUploadedFileUrl(null);
    setUploadeFileName(null);
    setUploadFileTask(null);
    setUploadFileRefName(null);
  };

  const handleSendMessage = () => {
    try {
      if (uploadedFileUrl) {
        const attachmentPayload = {
          isActive: true,
          encrypted: true,
          source: "website",
          file_name: uploadedFileName,
          file_url: uploadedFileUrl,
          file_type: uploadedFileType,
          send_by_user_id: user.firebaseid,
          uploaded_at: parseInt(Date.now() / 1000),
          send_to_user_id: providerFirebaseId,
        };
        sendMessage(uploadedFileUrl, uploadedFileType, attachmentPayload);

        if (value) {
          if (
            value?.replaceAll(replaceHtmlRegex, "")?.replaceAll("/", "")?.trim()
              ?.length > 0
          ) {
            sendMessage(value, "Text");
          }
        }
      } else {
        if (
          value?.replaceAll(replaceHtmlRegex, "")?.replaceAll("/", "")?.trim()
            ?.length > 0
        ) {
          sendMessage(value, "Text");
        }
      }

      setUploadedFileUrl(null);
      setUploadeFileName(null);
      setUploadFileTask(null);
      setUploadFileRefName(null);
      setValue("");
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  const sendMessage = async (
    messageText,
    message_type = "Text",
    attachmentPayload = null
  ) => {
    try {
      if (
        !encryptionKey ||
        !chatChannel ||
        !user?.firebaseid ||
        !providerFirebaseId
      ) {
        return;
      }

      const { FIREDB } = await getFirebaseClient();

      const message = messageText.trim();

      const time_stamp = parseInt(Date.now() / 1000);

      if (message) {
        const payload = {
          encrypted: true,
          source: "website",
          time_stamp: time_stamp,
          user_name: user.firstname,
          send_by_user_id: user.firebaseid,
          send_to_user_id: providerFirebaseId,
          message: encryptMessage(message, encryptionKey),
          message_type:
            message_type?.toLowerCase() === "text" ? "Text" : "File",
        };
        if (messageReplyData?.key) {
          payload.reply_to_message = messageReplyData?.key;
        }

        const userFriendMapPath = `user_friend_map/${payload.send_to_user_id}/${payload.send_by_user_id}`;
        const chatChannelPath = `channels/${chatChannel}`;

        // Update timestamp on channel and user_friend_map
        FIREDB.ref(`${chatChannelPath}/lastmodified`).set(time_stamp);
        FIREDB.ref(`${userFriendMapPath}/lastmodified`).set(time_stamp);

        // Add current message to unread_messages
        FIREDB.ref(`${userFriendMapPath}/unread_messages`).push(payload);

        // Add current message to channel messages
        FIREDB.ref(`${chatChannelPath}/messages`)
          .push(payload)
          ?.then(res => {
            if (message_type.toLowerCase() !== "text") {
              const payload = {
                ...attachmentPayload,
                file_url: encryptMessage(
                  attachmentPayload.file_url,
                  encryptionKey
                ),
              };

              if (res?.key) {
                handleSaveAttachment(res?.key, message_type, payload);
              }
            }
          });

        scrollToBottom();
        setValue("");
        setMessageReplyData(null);
      }
    } catch (err) {
      Bugsnag.notify(err);
      console.log({ err });
    }
  };

  const handleSaveAttachment = async (key, message_type, attachmentPayload) => {
    try {
      if (!key || message_type?.toLowerCase() === "text" || !attachmentPayload)
        return;

      const { FIREDB } = await getFirebaseClient();
      const attachments = `channels/${chatChannel}/attachments`;

      FIREDB.ref(`${attachments}/${message_type + "s"}/${key}`)
        .set(attachmentPayload)
        ?.catch(err => Bugsnag.notify(err));
    } catch (err) {
      Bugsnag.notify(err);
      console.log({ err });
    }
  };

  const handleTypingStatus = async typing => {
    try {
      if (!user.firebaseid) return;

      const { FIREDB } = await getFirebaseClient();
      if (typing) {
        FIREDB.ref(`Status/${user.firebaseid}`).set("Typing");
      } else {
        FIREDB.ref(`Status/${user.firebaseid}`).set("Online");
      }
    } catch (err) {
      Bugsnag.notify(err);
      console.log({ err });
    }
  };

  return (
    <>
      {messageReplyData && (
        <RepliedToMessageContainer>
          <RepliedToMessage>
            <FlexBox column rowGap="0.25rem">
              <Caption bold>Replying to</Caption>
              <RepliedText>
                {HTMLParser(messageReplyData?.message?.message)}
              </RepliedText>
            </FlexBox>
            <CrossIcon>
              <FiX
                size="1.25rem"
                strokeWidth={3}
                cursor="pointer"
                color={ERROR_RED_400}
                onClick={() => setMessageReplyData(null)}
              />
            </CrossIcon>
          </RepliedToMessage>
        </RepliedToMessageContainer>
      )}

      {uploadedFileName && (
        <UploadedFile>
          {uploadedFileUrl ? (
            <a href={uploadedFileUrl} target="_blank" rel="noreferrer">
              <H5 bold textDecoration="underline">
                {uploadedFileName}
              </H5>
            </a>
          ) : (
            <H5 bold>{uploadedFileName}</H5>
          )}
          <FlexBox columnGap="1rem" align="center">
            {uploadProgress > 0 && !uploadedFileUrl && (
              <CircularProgressBar progress={uploadProgress} />
            )}
            <CrossIcon>
              <FiX
                size="1.25rem"
                strokeWidth={3}
                cursor="pointer"
                color={ERROR_RED_400}
                onClick={onFileUploadCrossClick}
              />
            </CrossIcon>
          </FlexBox>
        </UploadedFile>
      )}
      <Container>
        <ReactQuill
          ref={reactQuillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Type here..."
          value={value}
          onChange={onInputChange}
          onBlur={() => handleTypingStatus(false)}
        />

        <AddFileButton
          disabled={disableAddFile}
          handleFileUpload={handleFileUpload}
        />

        <SendButton onClick={handleSendMessage}>
          <img src="/assets/images/dashboard/message-send.svg" />
        </SendButton>
      </Container>
    </>
  );
};

export default Input;
