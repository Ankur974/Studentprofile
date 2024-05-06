import React, { useState } from "react";
import styled from "styled-components";
import { IoStar } from "react-icons/io5";

import { Body2, H1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Favourite from "@common/ui/Favourite";
import { device } from "@common/ui/Responsive";
import { STARCOLOR } from "@common/ui/colors";
import { ShareModal } from "./ShareModal";

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

const SalonInfo = ({ shopData, scrollToElement }) => {
  const [Clicked, setClicked] = useState(false);

  return (
    <BannerContent column rowGap="0.25rem">
      <FlexBox align="center" justify="space-between">
        <H1 bold>{shopData?.storeName}</H1>
        <Icons>
          <ShareModal />
          <Favourite clicked={Clicked} setclicked={setClicked} />
        </Icons>
      </FlexBox>
      <ContentWrapper>
        <FlexBox columnGap="0.25rem" align="center">
          <Body2>Salon for {shopData?.gender}</Body2>
        </FlexBox>
        <FlexBox columnGap="0.5rem">
          <FlexBox columnGap="0.25rem" align="center">
            <IoStar color={STARCOLOR} />
            <Body2>{shopData?.storeRating}</Body2>
          </FlexBox>
          <Body2
            onClick={() => {
              scrollToElement("review-section");
            }}
            textDecoration="underline"
            textTransform="capitalize"
            cursor="pointer"
          >
            23 Reviews
          </Body2>
          <Body2>|</Body2>
          <Body2
            onClick={() => {
              scrollToElement("map");
            }}
            textDecoration="underline"
            textTransform="capitalize"
            cursor="pointer"
          >
            {shopData?.address?.city}, {shopData?.address?.state}
          </Body2>
        </FlexBox>
      </ContentWrapper>
    </BannerContent>
  );
};

export default SalonInfo;
