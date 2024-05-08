import React from "react";
import styled from "styled-components";
import { CDN } from "@constants/urls";

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
  console.log(categoryConfig, "catbanner");
  const { bannerImg, title, bannerSubTitle, bannerColor, smallBannerColor } =
    categoryConfig || {};

  return (
    <Wrapper backgroundColor={bannerColor}>
      <img src={`${CDN}/${bannerImg}`} alt={title} />
      <FlexBox column align="center">
        <Body2>{title}</Body2>
        <OfferBox offerBoxColor={smallBannerColor}>
          <Body2 color={ACCENT_0} textAlign="center">
            {bannerSubTitle}
          </Body2>
        </OfferBox>
      </FlexBox>
    </Wrapper>
  );
};

export default CategoryBanner;
