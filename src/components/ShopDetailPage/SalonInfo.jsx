import React, { useState } from "react";
import styled from "styled-components";
// import { SlSymbolFemale } from "react-icons/sl";
import { AiFillStar } from "react-icons/ai";
// import { useRouter } from "next/router";
import { Body2, H1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Favourite from "@common/ui/Favourite";
import { device } from "../common/ui/Resposive";
import { ShareComponent } from "./ShareComponent";

const BannerContent = styled(FlexBox)`
  width: 100%;
  padding-inline: 1rem;

  @media ${device.laptop} {
    max-width: 75rem;
    padding-block: 0.5rem;
  }
`;

const ContentWrapper = styled(FlexBox)`
  gap: 0.25rem;
  flex-direction: column;

  @media ${device.laptop} {
    gap: 1rem;
    flex-direction: row;
  }
`;

const Icons = styled(FlexBox)`
  column-gap: 0.5rem;
  cursor: pointer;
`;

const SalonInfo = () => {
  const [Clicked, setClicked] = useState(false);

  return (
    <BannerContent column rowGap="0.25rem">
      <FlexBox align="center" justify="space-between">
        <H1 bold>Gigis Salon</H1>
        <Icons>
          <ShareComponent />
          <Favourite clicked={Clicked} setclicked={setClicked} />
        </Icons>
      </FlexBox>
      <ContentWrapper>
        <FlexBox columnGap="0.25rem" align="center">
          <Body2>Salon for Men</Body2>
          {/* <SlSymbolFemale /> */}
        </FlexBox>
        <FlexBox columnGap="0.5rem">
          <FlexBox columnGap="0.25rem" align="center">
            <AiFillStar color="black" />
            <Body2 bold>4.2</Body2>
          </FlexBox>
          <Body2 bold>|</Body2>
          <Body2 bold textDecoration="underline">
            23 Reviews
          </Body2>
          <Body2 bold textDecoration="underline">
            Kolkata, West Bengal India
          </Body2>
        </FlexBox>
      </ContentWrapper>
    </BannerContent>
  );
};
export default SalonInfo;
//this is just a test
