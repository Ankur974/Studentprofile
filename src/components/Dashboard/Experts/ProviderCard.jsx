import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Body1, Body2 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_300,
  ACCENT_500,
  ACCENT_800,
  PRIMARY_100,
  PRIMARY_800,
} from "@common/ui/colors";

const Card = styled(FlexBox)`
  border-radius: 1rem;
  border: 1px solid ${ACCENT_300};
  overflow: hidden;
`;

const ProviderImg = styled.div`
  img {
    height: 3rem;
    aspect-ratio: 1;
    border: 1px solid ${ACCENT_800};
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
  border-top: 1px solid ${ACCENT_300};
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? PRIMARY_100 : ACCENT_100};
  :hover {
    background-color: ${({ isSelected }) =>
      isSelected ? PRIMARY_100 : ACCENT_200};
  }
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
  openProfile,
  openSessionsAndTools,
  providerId,
  // providerFirebaseId = "",
  providerName = "Pratistha Trivedi Mirza",
  selectedOption = { type: null, providerId: -1 },
  // FIXME: hardcoded
  providerImg = "https://assets.theinnerhour.com/profilepics/Nishtha_Baghla1665672703307.png",
}) => {
  const user = useSelector(state => state?.auth?.user);

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
            <img src={providerImg} alt={providerName} />
          </ProviderImg>
        </FlexBox>

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
          color={isViewProfileSelected ? PRIMARY_800 : ACCENT_500}
          strokeWidth={3}
        />
      </ClickableRow>

      <ClickableRow
        data-testid="view-sessions-tools-btn"
        onClick={() => openSessionsAndTools(providerId)}
        isSelected={isViewSessionsSelected}
      >
        <Body2>View Appointments</Body2>
        <FiChevronRight
          color={isViewSessionsSelected ? PRIMARY_800 : ACCENT_500}
          strokeWidth={3}
        />
      </ClickableRow>
    </Card>
  );
};

export default ProviderCard;
