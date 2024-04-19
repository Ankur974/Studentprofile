import React from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Body2 } from "@common/ui/Headings";
import { ACCENT_800, PRIMARY_600 } from "@common/ui/colors";
import { ACCENT_0 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  background-color: ${props => props.backgroundColor || PRIMARY_600};
  padding: 1rem 1rem 0;
  justify-content: space-around;
  img {
    max-width: 100%;
  }
`;

const OfferBox = styled(FlexBox)`
  background-color: ${props => props.offerBoxColor || ACCENT_800};
  border-radius: 1rem;
  padding-inline: 1rem;
`;

const CategoryBanner = ({ categoryConfig }) => {
  console.log(categoryConfig,"catbanner");
  const {
    bannerImage,
    categoryBannerTitle,
    categoryBannerSubTitle,
    categoryBannerColor,
    categoryBannerSubBanner,
  } = categoryConfig || {};

  return (
    <Wrapper backgroundColor={categoryBannerColor}>
      <img src={bannerImage} alt={categoryBannerTitle} />
      <FlexBox column align="center">
        <Body2>{categoryBannerTitle}</Body2>
        <OfferBox offerBoxColor={categoryBannerSubBanner}>
          <Body2 color={ACCENT_0} textAlign="center">
            {categoryBannerSubTitle}
          </Body2>
        </OfferBox>
      </FlexBox>
    </Wrapper>
  );
};

export default CategoryBanner;
