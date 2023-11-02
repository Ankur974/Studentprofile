import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { device } from "../common/ui/Resposive";
import SalonInfo from "./SalonInfo";
import MobileBanner from "./MobileBanner";
import DeviceBanner from "./BigDeviceBanner";

const Wrapper = styled(FlexBox)`
  width: 100%;
  justify-content: flex-start;
  padding: 1rem;

  flex-direction: column;
  // margin: auto;
  align-items: center;
`;

const HeroBanner = () => {
  return (
    <Wrapper>
      <MobileBanner />
      <DeviceBanner />
    </Wrapper>
  );
};

export default HeroBanner;
