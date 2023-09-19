import React from "react";
import { Body1, H1 } from "../common/ui/Headings";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { SlSymbleFemale } from "react-icons/sl";
import { ACCENT_0 } from "../common/ui/colors";
import { AiFillStar } from "react-icons/ai";

const Img = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
  opacity: 1;
`;

const Banner = styled(FlexBox)`
  position: relative;
  top: 0;
  height: 100%;
  max-height: 50vh;
`;

const BannerContent = styled(FlexBox)`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;

  max-width: 75rem;
  margin: auto;
`;

const HeroBanner = () => {
  return (
    <Banner>
      <Img src="/assets/banner-new.svg" />
      <BannerContent column rowGap="0.25rem">
        <H1 bold color={ACCENT_0}>
          Gigi's Salon
        </H1>
        <FlexBox columnGap="0.75rem">
          <FlexBox columnGap="0.25rem">
            <Body1 color={ACCENT_0}>Salon for Men</Body1>
            <SlSymbleFemale color={ACCENT_0} />
          </FlexBox>
          <FlexBox columnGap="0.25rem">
            <Body1 color={ACCENT_0}>Salon for Men</Body1>
            <SlSymbleFemale color={ACCENT_0} />
          </FlexBox>
        </FlexBox>
        <Body1 color={ACCENT_0}>Kolkata, West Bengal India</Body1>
        <FlexBox columnGap="1rem" align="center">
          <FlexBox align="center">
            <AiFillStar color="yellow" />
            <Body1 color={ACCENT_0}>4.2</Body1>
          </FlexBox>
          <Body1 color={ACCENT_0}>|</Body1>
          <Body1 color={ACCENT_0}>23 Reviews</Body1>
        </FlexBox>
      </BannerContent>
    </Banner>
  );
};

export default HeroBanner;
