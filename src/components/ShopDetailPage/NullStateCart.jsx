import React from "react";
import FlexBox from "../common/ui/FlexBox";
import { Body2 } from "../common/ui/Headings";
import styled from "styled-components";

const Wrapper = styled(FlexBox)`
  margin: auto;
  transition: opacity 0.3s ease-in-out;
`;

const ToCartBox = styled(FlexBox)`
  padding: 0.5rem;
`;

const NullStateCart = () => {
  return (
    <Wrapper column rowGap="2rem">
      <img src="/assets/images/nullCart.svg" alt="Empty cart" width="120px" />
      <ToCartBox>
        <Body2>No item in your cart </Body2>
      </ToCartBox>
    </Wrapper>
  );
};

export default NullStateCart;
