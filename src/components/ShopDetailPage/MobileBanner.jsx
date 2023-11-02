import React from "react";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import SalonInfo from "./SalonInfo";

const Banner = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
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
