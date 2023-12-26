import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

import { Body2 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_0,
  ACCENT_100,
  ACCENT_200,
  ACCENT_300,
  ACCENT_500,
  PRIMARY_100,
  PRIMARY_800,
} from "@common/ui/colors";
import SalonCarousel from "./SalonCarouselFile";
import { H2 } from "@common/Dashboard/Headings";

const Card = styled(FlexBox)`
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_300};
  overflow: hidden;
  max-width: 28rem;
`;

const SalonNameBox = styled(FlexBox)`
  width: 100%;
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  z-index: 10;
  background: rgb(47, 47, 47);
  background: linear-gradient(
    0deg,
    rgba(47, 47, 47, 0.993) 12%,
    rgba(250, 248, 248, 0) 100%
  );
`;

const ClickableRow = styled(FlexBox)`
  padding: 0.875rem 1.5rem;
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

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 8rem;
  position: relative;
`;

const SalonCard = ({
  salonId,
  openProfile,
  openSessions,
  openServices,
  selectedOption = { type: null, salonId: -1 },
}) => {
  const isViewProfileSelected =
    selectedOption.type === "profile" && selectedOption.salonId === salonId;
  const isViewSessionsSelected =
    selectedOption.type === "sessions" && selectedOption.salonId === salonId;
  const isViewServicesSelected =
    selectedOption.type === "services" && selectedOption.salonId === salonId;

  const handleOpenProfile = () => {
    openProfile(salonId);
  };

  const handleOpenSessions = () => {
    openSessions(salonId);
  };

  const handleOpenServices = () => {
    openServices(salonId);
  };

  return (
    <Card column>
      <FlexBox column>
        <CarouselWrapper>
          <SalonCarousel />
          <SalonNameBox column>
            <H2 color={ACCENT_0}>GiGi Salon</H2>
          </SalonNameBox>
        </CarouselWrapper>
      </FlexBox>
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
        <Body2>View Appointments</Body2>
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

export default SalonCard;
