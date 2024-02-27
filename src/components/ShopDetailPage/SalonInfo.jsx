import React, { useState } from "react";
import styled from "styled-components";
import { IoStar } from "react-icons/io5";
import { Body2, H1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Favourite from "@common/ui/Favourite";
import { device } from "../common/ui/Resposive";
import { ShareModal } from "./ShareModal";
import { STARCOLOR } from "@common/ui/colors";

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
          <ShareModal />
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
            <IoStar color={STARCOLOR} />
            <Body2>4.2</Body2>
          </FlexBox>
          <Body2>|</Body2>
          <Body2>23 Reviews</Body2>
          <Body2>Kolkata, West Bengal India</Body2>
        </FlexBox>
      </ContentWrapper>
    </BannerContent>
  );
};

export default SalonInfo;
