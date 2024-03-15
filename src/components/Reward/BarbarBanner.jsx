import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { Body2, H2 } from "../common/ui/Headings";
import { PRIMARY_0 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: row;
  background-color: ${PRIMARY_0};
`;

const Content = styled(FlexBox)`
  height: 5px;
  width: 70%;
  padding: 1rem 0.5rem 0 0;
`;

export const BarbarBanner = () => {
  return (
    <Wrapper>
      <FlexBox width="100%">
        <img src="/assets/images/barber-cloud.svg" alt="picture" />
      </FlexBox>
      <Content column>
        <H2 bold>Connect your favroite barber to Pamparazzi!</H2>
        <Body2>Earn mega rewards when they join our platform.</Body2>
      </Content>
    </Wrapper>
  );
};
