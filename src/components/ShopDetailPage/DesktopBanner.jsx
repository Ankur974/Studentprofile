import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import SalonInfo from "./SalonInfo";
import { device } from "../common/ui/Resposive";
import { useRouter } from "next/router";
import { ACCENT_300, ACCENT_800 } from "../common/ui/colors";

const Container = styled(FlexBox)`
  display: none;

  @media ${device.laptop} {
    display: flex;
    column-gap: 0.5rem;
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
  gap: 0.5rem;
`;

const Img = styled.img`
  width: 100%;
`;

const GrpImg = styled.img`
  width: 47%;
`;

const ImageContainer = styled(FlexBox)`
  width: 65%;
`;

const ShowMoreCta = styled.div`
  background-color: ${ACCENT_300};
  color: ${ACCENT_800};
  width: fit-content;
  position: absolute;
  bottom: 2%;
  right: 3%;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
`;

const DesktopBanner = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <SalonInfo />
      <Container>
        <ImageContainer>
          <Img src="/assets/salon-image3.jpg" />
        </ImageContainer>
        <GroupImage>
          <GrpImg src="/assets/salon-image11.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/salon-image3.jpg" alt="" />
          <GrpImg src="/assets/salon-image4.jpg" alt="" />
        </GroupImage>
        <ShowMoreCta onClick={() => router.push("/shop-details/image")}>
          Show More
        </ShowMoreCta>
      </Container>
    </Wrapper>
  );
};

export default DesktopBanner;
