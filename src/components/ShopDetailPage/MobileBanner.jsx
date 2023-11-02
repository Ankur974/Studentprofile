import React from "react";
import { device } from "../common/ui/Resposive";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import SalonInfo from "./SalonInfo";
import { FaRegShareSquare, FaRegHeart } from "react-icons/fa";
import { ACCENT_0, ACCENT_800 } from "../common/ui/colors";

const Banner = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  column-gap: 20px;
  // padding: 1rem;
  row-gap: 20px;
  @media ${device.laptop} {
    display: none;
  }
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
  opacity: 1;
`;
const BannerContainer = styled(FlexBox)`
  width: 100%;
  position: relative;
`;
const Icons = styled(FlexBox)`
  position: absolute;
  top: 2%;
  right: 2%;
  column-gap: 10px;
`;
const MobileBanner = () => {
  return (
    <Banner>
      <BannerContainer>
        <Img src="/assets/banner-new.svg" />
        <Icons>
          <FaRegShareSquare color={ACCENT_800} size="25px" />
          <FaRegHeart color={ACCENT_800} size="25px" />
        </Icons>
      </BannerContainer>
      <SalonInfo />
    </Banner>
  );
};
export default MobileBanner;
