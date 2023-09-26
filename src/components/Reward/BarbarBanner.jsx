import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { Body2, H2 } from "../common/ui/Headings";
import { PRIMARY_0 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  column-gap: 1rem;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  height: 12rem;
  background-color: ${PRIMARY_0};
`;
const ImgCloud = styled.img`
  width: 14rem;
  height: 10rem;
  position: absolute;
  top: 0;
`;
const ImgBarber = styled.img`
  width: 11rem;
  height: 14rem;
  position: absolute;
  top: 1rem;
`;

const Content = styled(FlexBox)``;

export const BarbarBanner = () => {
  return (
    <Wrapper>
      <FlexBox position="relative" width="100%">
        <ImgCloud src="/assets/cloud.svg" />
        <ImgBarber src="/assets/mancuttinghair.svg" />
      </FlexBox>
      <Content height="5px" column width="70%" padding="1.5rem 0.5rem 0 0">
        <H2 bold>Connect your favroite barber to Pamparazzi!</H2>
        <Body2>Earn mega rewards when they join our platform.</Body2>
      </Content>
    </Wrapper>
  );
};
