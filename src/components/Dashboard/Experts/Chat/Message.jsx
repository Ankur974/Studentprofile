import dayjs from "dayjs";
import ReactHTMLParser from "react-html-parser";
import { FiChevronRight, FiCornerUpLeft } from "react-icons/fi";
import styled, { css } from "styled-components";

import { Caption, Body2 } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";
import { PSYCHIATRIST } from "@constants";
import {
  ACCENT_800,
  DAVYS_GREY_600,
  DAVYS_GREY_400,
  BRICK_TERRACOTA_200,
  BRICK_TERRACOTA_300,
  DARK_MOSS_GREEN_100,
  DARK_MOSS_GREEN_200,
  DARK_MOSS_GREEN_800,
} from "@common/ui/colors";
import NSPMessage from "./NSPMessage";

const Container = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.5rem;
  margin: 0.75rem 0;
`;

const Card = styled(FlexBox)`
  max-width: 75%;
  flex-direction: column;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: ${ACCENT_800};
  overflow-wrap: break-word;
  word-break: break-word;

  background-color: ${BRICK_TERRACOTA_200};
  align-self: end;
  border-radius: 0.5rem 0.5rem 0;

  * {
    color: inherit;
    line-height: inherit;
  }
  p {
    margin: 0;
  }
  ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  ${({ isProviderMessage }) =>
    isProviderMessage &&
    css`
      background-color: ${DARK_MOSS_GREEN_100};
      align-self: start;
      border-radius: 0.5rem 0.5rem 0.5rem 0;
    `}
`;

const FileNameContainer = styled(FlexBox)`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${({ isProviderMessage }) =>
    isProviderMessage ? DARK_MOSS_GREEN_200 : BRICK_TERRACOTA_300};
  font-weight: 700;
`;

const FileName = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReplyMessage = styled(FlexBox)`
  flex-direction: column;
  padding: 0.5rem;
  background-color: ${BRICK_TERRACOTA_300};
  border-radius: 0.5rem;
  row-gap: 0.25rem;

  ${({ isProviderMessage }) =>
    isProviderMessage &&
    css`
      background-color: ${DARK_MOSS_GREEN_200};
    `}
`;

const ReplyPreview = styled(FlexBox)`
  font-size: 0.75rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
`;

const Timestamp = styled(FlexBox)`
  align-items: center;
  width: 100%;
  justify-content: ${({ isProviderMessage }) =>
    isProviderMessage ? "flex-start" : "flex-end"};
`;

const MessageActionButton = styled(FlexBox)`
  opacity: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 50%;
  margin-top: 0.75rem;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  transition: all 250ms ease-in-out;
  border: 1px solid ${DAVYS_GREY_400};
  cursor: pointer;
`;

const MessageRow = styled(FlexBox)`
  flex-direction: row;
  justify-content: end;
  column-gap: 1rem;

  :hover {
    ${MessageActionButton} {
      opacity: 1;
      pointer-events: all;
    }
  }

  ${({ isProviderMessage }) =>
    isProviderMessage &&
    css`
      justify-content: start;
      flex-direction: row-reverse;
    `}

  @media screen and (max-width: 768px) {
    ${MessageActionButton} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const Message = ({
  message,
  providerFirebaseId,
  providerName,
  // FIXME: hardcoded
  providerType = PSYCHIATRIST,
  setMessageReplyData,
}) => {
  const isProviderMessage = message?.send_by_user_id === providerFirebaseId;

  const getTimestampString = timestamp => {
    if (!timestamp) return "";
    const dayjsObj = dayjs(timestamp * 1000);
    if (dayjsObj.isSame(new Date(), "day")) return dayjsObj.format("hh:mm a");
    else if (dayjsObj.isSame(new Date(), "week"))
      return dayjsObj.format("ddd, hh:mm a");
    else if (dayjsObj.isSame(new Date(), "year"))
      return dayjsObj.format("MMM D, hh:mm a");
    else return dayjsObj.format("D/M/YYYY, hh:mm a");
  };

  const type = message?.message_type?.toLowerCase();

  const showReplyIcon = type === "text";

  if (type === "deleted") return null;
  if (type === "nsp") {
    return (
      <NSPMessage
        providerName={providerName}
        message={message}
        getTimestampString={getTimestampString}
      />
    );
  }

  return (
    <Container>
      <MessageRow isProviderMessage={isProviderMessage}>
        {showReplyIcon && (
          <MessageActionButton
            onClick={() => {
              setMessageReplyData({ key: message?.key, message });
            }}
          >
            <FiCornerUpLeft strokeWidth={3} color={DARK_MOSS_GREEN_800} />
          </MessageActionButton>
        )}

        <Card isProviderMessage={isProviderMessage}>
          {message.reply && (
            <ReplyMessage isProviderMessage={isProviderMessage}>
              <Caption bold>Replying to</Caption>
              <ReplyPreview>{ReactHTMLParser(message.reply)}</ReplyPreview>
            </ReplyMessage>
          )}

          {type === "file" ? (
            <a href={message.message} target="_blank" rel="noopener noreferrer">
              <FileNameContainer isProviderMessage={isProviderMessage}>
                <FileName>{message.fileName}</FileName>
                <FiChevronRight color={ACCENT_800} size="1.5rem" />
              </FileNameContainer>
            </a>
          ) : type === "cpp" ? (
            <Body2 bold>
              {providerName} has recommended a{" "}
              {providerType === PSYCHIATRIST ? "psychologist" : "psychiatrist"}{" "}
              to you.
            </Body2>
          ) : (
            ReactHTMLParser(message.message)
          )}
        </Card>
      </MessageRow>
      <Timestamp isProviderMessage={isProviderMessage}>
        <Caption bold color={DAVYS_GREY_600}>
          {getTimestampString(message.time_stamp)}
        </Caption>
      </Timestamp>
    </Container>
  );
};

export default Message;
