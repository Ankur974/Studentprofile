import styled from "styled-components";
import { FiX, FiMapPin } from "react-icons/fi";

import FlexBox from "@common/ui/FlexBox";
import { H2, Body2, H5 } from "@common/ui/Headings";
import Modal from "@common/ui/Modal";
import { ACCENT_100, ACCENT_300, ACCENT_800 } from "@common/ui/colors";
import { IconButton } from "@common/ui/Buttons";
import { handleMapOpen } from "@utils/helpers";
import ClinicImagesCarousel from "./ClinicImagesCarousel";

const Header = styled(FlexBox)`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${ACCENT_100};
  padding: 1rem 1rem 1rem 1.5rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${ACCENT_300};
`;

const CloseIcon = styled(FiX)`
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  color: ${ACCENT_800};
  cursor: pointer;
  stroke-width: 3;
`;

const Content = styled(FlexBox)`
  flex-direction: column;
  padding: 1.5rem;
  row-gap: 1.5rem;
`;

const data = {
  id: 2,
  address_line_1:
    "601, Notan Heights, 18A, Gurunanak Rd, Patkar Blocks, Bandra",
  address_line_2: "West, Mumbai, Maharashtra 400050",
  geo_lat: "19°03'32.6\"N",
  geo_long: "72°50'16.0\"E",
  name: "Amaha Mumbai",
  location: {
    city_id: 4,
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
  },
};

const index = ({ toggleModal, clinicDetails = data }) => {
  const {
    id: clinicId,
    name: clinicName,
    geo_lat,
    geo_long,
    address_line_1,
    address_line_2,
  } = clinicDetails || {};

  return (
    <Modal
      S
      width="27rem"
      height="auto"
      mobileWidth="90vw"
      mobileHeight="auto"
      mobileBorderRadius="1rem"
    >
      <Header>
        <H2 bold>Centre Location</H2>
        <CloseIcon onClick={toggleModal} />
      </Header>
      <Content>
        <FlexBox columnGap="1rem" align="flex-start">
          <FlexBox column>
            <Body2 bold>{clinicName}</Body2>
            <H5>
              {address_line_1} {address_line_2}
            </H5>
          </FlexBox>
          <IconButton
            tertiary
            Icon={FiMapPin}
            borderRadius="0.5rem"
            onClick={() => handleMapOpen(geo_lat, geo_long, clinicName)}
          />
        </FlexBox>
        <ClinicImagesCarousel clinicId={clinicId} />
      </Content>
    </Modal>
  );
};

export default index;
