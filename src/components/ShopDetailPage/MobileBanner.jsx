import React from "react";
import { device } from "../common/ui/Resposive";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import SalonInfo from "./SalonInfo";

const Banner = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  column-gap: 20px;
  border-radius: none;
  @media ${device.laptop} {
    width: 80%;
    display: none;
  }
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
  opacity: 1;
`;

const MobileBanner = () => {
  return (
    <Banner>
      <Img src="/assets/banner-new.svg" />
      <SalonInfo />
    </Banner>
  );
};
export default MobileBanner;
