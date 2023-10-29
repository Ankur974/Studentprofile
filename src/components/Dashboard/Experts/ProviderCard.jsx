import { FiChevronRight, FiMessageCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Body1, Body2, Support } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";
import LazyImage from "@common/LazyImage";
import { COUPLE_THERAPIST, THERAPIST } from "@constants";
import {
  ACCENT_100,
  DAVYS_GREY_200,
  DAVYS_GREY_300,
  DAVYS_GREY_500,
  DAVYS_GREY_700,
  DAVYS_GREY_800,
  ERROR_RED_400,
  SECONDARY_100,
  SECONDARY_800,
} from "@common/ui/colors";
import { useChatUnreadMessages } from "@hooks/useChatUnreadMessages";

const Card = styled(FlexBox)`
  border-radius: 1rem;
  border: 1px solid ${DAVYS_GREY_300};
  overflow: hidden;
`;

const ProviderImg = styled.div`
  img {
    height: 3rem;
    aspect-ratio: 1;
    border: 1px solid ${DAVYS_GREY_800};
    overflow: hidden;
    object-fit: cover;
    border-radius: 50%;
    object-position: top;
  }
`;

const ClickableRow = styled(FlexBox)`
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${DAVYS_GREY_300};
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? SECONDARY_100 : ACCENT_100};
  :hover {
    background-color: ${({ isSelected }) =>
      isSelected ? SECONDARY_100 : DAVYS_GREY_200};
  }
`;

const ChatIcon = styled(FlexBox)`
  position: relative;
  justify-content: center;
  align-items: center;
  border: 1px solid ${DAVYS_GREY_300};
  border-radius: 50%;
  overflow: hidden;
  height: 3rem;
  aspect-ratio: 1;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? SECONDARY_100 : ACCENT_100};
  :hover {
    background-color: ${({ isSelected }) =>
      isSelected ? SECONDARY_100 : DAVYS_GREY_200};
  }
`;

const RedDot = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${ERROR_RED_400};
`;

/**
 * A component representing a card for displaying provider information.
 *
 * @param {Function} openChat - Function to open the chat with the provider.
 * @param {Function} openProfile - Function to open the provider's profile.
 * @param {Function} openSessionsAndTools - Function to open sessions and tools (& prescriptions in case of psychiatrist).
 * @param {number} providerId - The unique identifier of the provider.
 * @param {string} providerFirebaseId - The Firebase ID of the provider.
 * @param {string} providerType - The type of the provider (default: 'Therapist').
 * @param {string} providerName - The name of the provider.
 * @param {Object} selectedOption - The currently selected option (default: { type: null, providerId: -1 }).
 * @param {string} providerImg - The URL of the provider's image.
 * @returns {JSX.Element} The rendered React component.
 */
const ProviderCard = ({
  openChat,
  openProfile,
  openSessionsAndTools,
  providerId,
  // providerFirebaseId = "",
  providerType = THERAPIST,
  providerName = "Pratistha Trivedi Mirza",
  selectedOption = { type: null, providerId: -1 },
  // FIXME: hardcoded
  providerImg = "https://assets.theinnerhour.com/profilepics/Nishtha_Baghla1665672703307.png",
}) => {
  const user = useSelector(state => state.auth.user);
  const userFirebaseId = user?.firebaseid;

  const { unreadMessagesCount } = useChatUnreadMessages(
    // FIXME: hardcoded
    `user_friend_map/${userFirebaseId}/ndqzVxrgog6EACxRq-_YTRUrP5xz`
    // `user_friend_map/${userFirebaseId}/${providerFirebaseId}`
  );

  const isChatSelected =
    selectedOption.type === "chat" && selectedOption.providerId === providerId;
  const isViewProfileSelected =
    selectedOption.type === "profile" &&
    selectedOption.providerId === providerId;
  const isViewSessionsSelected =
    selectedOption.type === "session-tools" &&
    selectedOption.providerId === providerId;

  return (
    <Card column>
      <FlexBox column padding="1rem">
        <FlexBox justify="space-between" margin="0 0 0.5rem 0">
          <ProviderImg data-testid="provider-img">
            <LazyImage src={providerImg} alt={providerName} />
          </ProviderImg>
          <ChatIcon
            data-testid="chat-btn"
            onClick={() => openChat(providerId)}
            isSelected={isChatSelected}
          >
            <FiMessageCircle color={SECONDARY_800} size="1.5rem" />
            {unreadMessagesCount > 0 && (
              <RedDot data-testid="unread-msgs-dot" />
            )}
          </ChatIcon>
        </FlexBox>

        <Support color={DAVYS_GREY_700} textTransform="capitalize">
          Your{" "}
          {providerType === COUPLE_THERAPIST
            ? "Couples Therapist"
            : providerType}{" "}
          (23 Jan 2022 - Present)
        </Support>
        <Body1 bold data-testid="provider-name">
          {providerName}
        </Body1>
      </FlexBox>

      <ClickableRow
        data-testid="view-profile-btn"
        onClick={() => openProfile(providerId)}
        isSelected={isViewProfileSelected}
      >
        <Body2>View profile</Body2>
        <FiChevronRight
          color={isViewProfileSelected ? SECONDARY_800 : DAVYS_GREY_500}
          strokeWidth={3}
        />
      </ClickableRow>

      <ClickableRow
        data-testid="view-sessions-tools-btn"
        onClick={() => openSessionsAndTools(providerId)}
        isSelected={isViewSessionsSelected}
      >
        <Body2>
          {providerType === THERAPIST
            ? "View sessions and tools"
            : "View sessions, prescriptions, and tools"}
        </Body2>
        <FiChevronRight
          color={isViewSessionsSelected ? SECONDARY_800 : DAVYS_GREY_500}
          strokeWidth={3}
        />
      </ClickableRow>
    </Card>
  );
};

export default ProviderCard;
