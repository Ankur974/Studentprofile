import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { device } from "../common/ui/Resposive";
import SalonInfo from "./SalonInfo";
import { useRouter } from "next/router";

const Container = styled(FlexBox)`
  display: none;
  @media ${device.laptop} {
    display: flex;
    column-gap: 30px;
    flex-direction: row;
    position: relative;
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
const Button = styled.div`
  background-color: black;
  color: white;
  width: 10%;
  position: absolute;
  bottom: 2%;
  right: 2%;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
`;
const DesktopBanner = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <SalonInfo />
      <Container>
        <ImageContainer>
          <Img src="/assets/images/banner-new.svg" />
        </ImageContainer>
        <GroupImage>
          <GrpImg src="/assets/salon-image1.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
        </GroupImage>
        <Button onClick={() => router.push("/shop-details/carousel")}>
          Show More
        </Button>
      </Container>
    </Wrapper>
  );
};
export default DesktopBanner;
