import React from "react";
import styled from "styled-components";
import { CDN } from "@constants/urls";
import FlexBox from "@common/ui/FlexBox";
import { Body2, H3, H5 } from "@common/ui/Headings";

const CardMain = styled(FlexBox)`
  width: 100%;
  border-radius: 0.75rem;
  max-height: 18rem;
  overflow: hidden;
`;

const ShadowBox = styled(FlexBox)`
  width: 20rem;
  border-radius: 0rem 1.125rem 1.125rem 0rem;
  align-items: center;
  padding: 0.5rem 0;
`;

const Image = styled.img`
  width: 50%;
  object-fit: cover;
`;

const LeftSection = styled.div`
  width: 80%;
`;

const CategoryBanner = ({ categoryConfig }) => {
  const {
    bannerImg,
    title,
    bannerSubTitle,
    bannerColor,
    smallBannerColor,
    titleColor,
    caption = "Pamper Yourself with Pamprazzi",
  } = categoryConfig || {};
  const cardStyle = {
    background: bannerColor,
  };
  return (
    <CardMain style={cardStyle}>
      <LeftSection column>
        <FlexBox column rowGap="1rem">
          <FlexBox column padding="1rem">
            <H3 bold color={titleColor}>
              {title}
            </H3>
            <H5 bold>{bannerSubTitle}</H5>
          </FlexBox>
          <ShadowBox margin="1.5rem 0" backgroundColor={smallBannerColor}>
            <Body2 padding="0.25rem 1rem">{caption}</Body2>
          </ShadowBox>
        </FlexBox>
      </LeftSection>
      <Image src={`${CDN}/${bannerImg}`} alt={title} />
    </CardMain>
  );
};

export default CategoryBanner;
