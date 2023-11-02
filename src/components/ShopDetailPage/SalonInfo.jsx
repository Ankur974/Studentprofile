import React from "react";
import { Body1, H1 } from "../common/ui/Headings";
import FlexBox from "../common/ui/FlexBox";
import { SlSymbleFemale } from "react-icons/sl";
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

const BannerContent = styled(FlexBox)`
  width: 100%;
  // padding: 1rem;
  max-width: 75rem;
`;

const SalonInfo = () => {
  return (
    <BannerContent column rowGap="0.25rem">
      <H1 bold>Gigis Salon</H1>

      <FlexBox columnGap="1rem" align="center">
        <FlexBox columnGap="0.75rem">
          <FlexBox columnGap="0.25rem" align="center">
            <Body1>Salon for Men</Body1>
            <SlSymbleFemale />
          </FlexBox>
          <FlexBox columnGap="0.25rem" align="center">
            <Body1>Salon for Men</Body1>
            <SlSymbleFemale />
          </FlexBox>
        </FlexBox>
        <FlexBox align="center" columnGap="0.5rem">
          <AiFillStar color="black" />
          <Body1 bold>4.2</Body1>
        </FlexBox>

        <Body1 bold>|</Body1>
        <Body1 bold textDecoration="underline">
          23 Reviews
        </Body1>

        <Body1 bold textDecoration="underline">
          Kolkata, West Bengal India
        </Body1>
      </FlexBox>
    </BannerContent>
  );
};
export default SalonInfo;
