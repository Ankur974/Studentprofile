import React from "react";
import styled from "styled-components";
import { Body2, H2 } from "../common/ui/Headings";
import Chip from "../common/ui/Chips";
import FlexBox from "../common/ui/FlexBox";
import { SlSymbleFemale } from "react-icons/sl";
import { ACCENT_700 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 23.8rem;
  row-gap: 0.62rem;
  border: 1px solid ${ACCENT_700};
  flex-direction: column;
  padding: 1rem;
`;

export default function Listing() {
  return (
    <Wrapper>
      <Chip width="fit-content">
        <Body2>haircut</Body2>
      </Chip>
      <FlexBox column rowGap="0.38rem">
        <H2>Gigi's Salon</H2>
        <FlexBox columnGap="0.75rem">
          <FlexBox columnGap="0.38rem">
            <Body2>Salon for Men</Body2>
            <SlSymbleFemale color={ACCENT_700} />
          </FlexBox>
          <FlexBox columnGap="0.38rem">
            <Body2>Salon for Men</Body2>
            <SlSymbleFemale color={ACCENT_700} />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
}
