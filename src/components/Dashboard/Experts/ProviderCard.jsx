import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Body2 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_300,
  ACCENT_500,
  PRIMARY_100,
  PRIMARY_800,
} from "@common/ui/colors";
import SaloonCarousel from "./SaloonCarouselFile";

const Card = styled(FlexBox)`
  border-radius: 1rem;
  border: 1px solid ${ACCENT_300};
  overflow: hidden;
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

const ProviderCard = ({
  saloonId,
  openProfile,
  openSessions,
  openServices,
  selectedOption = { type: null, saloonId: -1 },
}) => {
  const isViewProfileSelected =
    selectedOption.type === "profile" && selectedOption.saloonId === saloonId;
  const isViewSessionsSelected =
    selectedOption.type === "sessions" && selectedOption.saloonId === saloonId;
  const isViewServicesSelected =
    selectedOption.type === "services" && selectedOption.saloonId === saloonId;

  const handleOpenProfile = () => {
    openProfile(saloonId);
  };

  const handleOpenSessions = () => {
    openSessions(saloonId);
  };

  const handleOpenServices = () => {
    openServices(saloonId);
  };

  return (
    <Card column>
      <SaloonCarousel/>
      <ClickableRow
        data-testid="view-profile-btn"
        onClick={handleOpenProfile}
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
        onClick={handleOpenSessions}
        isSelected={isViewSessionsSelected}
      >
        <Body2>View sessions</Body2>
        <FiChevronRight
          color={isViewSessionsSelected ? PRIMARY_800 : ACCENT_500}
          strokeWidth={3}
        />
      </ClickableRow>

      <ClickableRow
        data-testid="view-services-btn"
        onClick={handleOpenServices}
        isSelected={isViewServicesSelected}
      >
        <Body2>View services</Body2>
        <FiChevronRight
          color={isViewServicesSelected ? PRIMARY_800 : ACCENT_500}
          strokeWidth={3}
        />
      </ClickableRow>
    </Card>
  );
};

export default ProviderCard;
