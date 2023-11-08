import React from "react";
import styled from "styled-components";
import { Body1 } from "../common/ui/Headings";
import FlexBox from "../common/ui/FlexBox";
import SalonInfo from "./SalonInfo";
import { Button } from "../common/ui/Buttons";
import { ACCENT_0 } from "../common/ui/colors";
import { useRouter } from "next/router";

const Container = styled(FlexBox)`
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  position: relative;
`;

const Wrapper = styled(FlexBox)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const GroupImage = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Img = styled.img`
  width: 100%;
`;

const GrpImg = styled.img`
  width: 47%;
`;
const NewButton = styled(Button)`
  position: absolute;
  background-color: ${ACCENT_0};
  bottom: 2%;
  padding: 0.2rem;
  border-radius: 6px;
  right: 5%;
  color: ${ACCENT_0};
`;
const DesktopBanner = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <SalonInfo />
      <Container>
        <NewButton onClick={() => router.push("/shop-details/carousel")}>
          <Body1>show more</Body1>
        </NewButton>
        <Img src="/assets/salon-image2.jpg" alt="" />
        <GroupImage>
          <GrpImg src="/assets/salon-image1.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/banner-new.svg" />
        </GroupImage>
      </Container>
    </Wrapper>
  );
};
export default DesktopBanner;
