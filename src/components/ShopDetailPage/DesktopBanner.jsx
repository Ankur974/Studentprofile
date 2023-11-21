import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Body1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_0, ACCENT_200 } from "@common/ui/colors";
import SalonInfo from "./SalonInfo";

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

const ViewMoreButton = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 3rem;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_0};
  cursor: pointer;

  :hover {
    background-color: ${ACCENT_200};
  }
`;

const DesktopBanner = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <SalonInfo />
      <Container>
        <ViewMoreButton onClick={() => router.push("/shop-details/carousel")}>
          <Body1 bold>Show more</Body1>
        </ViewMoreButton>
        <Img src="/assets/salon-image2.jpg" alt="" />
        <GroupImage>
          <GrpImg src="/assets/salon-image1.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/salon-image2.jpg" alt="" />
          <GrpImg src="/assets/images/banner-new.svg" />
        </GroupImage>
      </Container>
    </Wrapper>
  );
};

export default DesktopBanner;
