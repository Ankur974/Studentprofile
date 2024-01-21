import React, { useState, useEffect } from "react";
import FlexBox from "../common/ui/FlexBox";
import { Body2 } from "../common/ui/Headings";
import { SECONDARY_700 } from "../common/ui/colors";
import styled from "styled-components";

const Wrapper = styled(FlexBox)`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const NullStateCart = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsVisible(true);
    }, 300); 

    return () => clearTimeout(delay);
  }, []);

  return (
    <Wrapper column rowGap="2rem" isVisible={isVisible}>
      <img src="/assets/images/nullCart.svg" alt="Empty cart" width="120px" />
      <Body2 color={SECONDARY_700}>No item in your cart </Body2>
    </Wrapper>
  );
};

export default NullStateCart;
