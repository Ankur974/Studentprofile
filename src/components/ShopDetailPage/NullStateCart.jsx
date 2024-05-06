import React from "react";
import FlexBox from "../common/ui/FlexBox";
import { Body2 } from "../common/ui/Headings";
import styled from "styled-components";
import { SECONDARY_200 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  margin: auto;
  transition: opacity 0.3s ease-in-out;
  min-width: 20rem;
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.5rem;
  min-height: 5rem;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const NullStateCart = () => {
  return (
    <Wrapper column rowGap="0.5rem" padding="1rem">
      <img src="/assets/images/nullCart.svg" alt="empty cart" width="120px" />
      <Body2>No item in your cart </Body2>
    </Wrapper>
  );
};

export default NullStateCart;
