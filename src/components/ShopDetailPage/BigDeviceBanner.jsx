import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { device } from "../common/ui/Resposive";
import SalonInfo from "./SalonInfo";
import { FaRegShareSquare, FaRegHeart } from "react-icons/fa";
import { ACCENT_800 } from "../common/ui/colors";

const Container = styled(FlexBox)`
  display: none;
  @media ${device.laptop} {
    display: flex;
    column-gap: 30px;
    flex-direction: row;
  }
`;
const Wrapper = styled(FlexBox)`
  display: none;
  @media ${device.laptop} {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;
const GroupImage = styled(FlexBox)`
  width: 60%;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
`;
const Img = styled.img`
  width: 100%;
`;
const GrpImg = styled.img`
  width: 47%;
`;
const ImageContainer = styled(FlexBox)`
  width: 60%;
  position: relative;
`;
const Icons = styled(FlexBox)`
  position: absolute;
  top: 2%;
  right: 2%;
  column-gap: 10px;
`;
const DeviceBanner = () => {
  return (
    <Wrapper>
      <SalonInfo />
      <Container>
        <ImageContainer>
          <Img src="/assets/banner-new.svg" />
          <Icons>
            <FaRegShareSquare color={ACCENT_800} size="20px" />
            <FaRegHeart color={ACCENT_800} size="20px" />
          </Icons>
        </ImageContainer>
        <GroupImage>
          <GrpImg src="/assets/salon-image1.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
        </GroupImage>
      </Container>
    </Wrapper>
  );
};
export default DeviceBanner;
