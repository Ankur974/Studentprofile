import React from "react";
import { ACCENT_100 } from "../common/ui/colors";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import { Body2, H3 } from "../common/ui/Headings";
import { BiRightArrowAlt } from "react-icons/bi";

export const BalanceContainer = ({ showArrow = false, content }) => {
  const Wrapper = styled(FlexBox)`
    background-color: ${ACCENT_100};
    padding: 1rem;
    align-items: flex-start;
    border-radius: 0.5rem;
    row-gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `;

  return (
    <Wrapper row>
      <FlexBox column>
        <Body2 bold>CARE COINS BALANCE</Body2>
        <FlexBox columnGap="0.5rem">
          <img src="/assets/coin.svg" />
          <H3 bold> 100</H3>
        </FlexBox>
      </FlexBox>
      {showArrow && <BiRightArrowAlt size="1.4rem" />}
    </Wrapper>
  );
};
