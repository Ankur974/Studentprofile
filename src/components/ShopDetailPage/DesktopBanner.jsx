import React from "react";
import styled from "styled-components";

import FlexBox from "../common/ui/FlexBox";
import SalonInfo from "./SalonInfo";

const Container = styled(FlexBox)`
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
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

const DesktopBanner = () => {
  return (
    <Wrapper>
      <SalonInfo />
      <Container>
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
