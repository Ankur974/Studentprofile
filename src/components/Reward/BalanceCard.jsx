import React from "react";
import { ACCENT_100 } from "../common/ui/colors";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import { Body2, H3 } from "../common/ui/Headings";
import { BiRightArrowAlt } from "react-icons/bi";
import { useRouter } from "next/router";

export const BalanceCard = ({ showArrow = false, content }) => {
  const router = useRouter();
  const Wrapper = styled(FlexBox)`
    background-color: ${ACCENT_100};
    padding: 1rem;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.11);
    border-radius: 0.5rem;
    row-gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    max-width: 75rem;
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
      {showArrow && (
        <BiRightArrowAlt
          size="1.4rem"
          onClick={() => router.push("/coin-history")}
          cursor="pointer"
        />
      )}
    </Wrapper>
  );
};
