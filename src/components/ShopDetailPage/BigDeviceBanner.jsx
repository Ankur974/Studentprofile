import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { device } from "../common/ui/Resposive";
import SalonInfo from "./SalonInfo";

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
`;
const DeviceBanner = () => {
  return (
    <Wrapper>
      <SalonInfo />
      <Container>
        <ImageContainer>
          <Img src="/assets/banner-new.svg" />
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
