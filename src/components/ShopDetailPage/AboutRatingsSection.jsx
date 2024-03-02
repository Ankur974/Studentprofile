import React, { useState } from "react";
import { Body1, Body2, H6, H1, H5 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Ratings from "@common/ui/Ratings";
import styled from "styled-components";
import { SECONDARY_200, PRIMARY_800 } from "@common/ui/colors";
import { device } from "@common/ui/Resposive";
import { iconLookup, reviewsData, reviews } from "../../metadata/reviews";

const LineSeparator = styled.div`
  border-bottom: 1px solid ${SECONDARY_200};
  display: none;
  @media ${device.laptop} {
    height: 100px;
    border-right: 1px solid #efefef;
    margin-left: 2rem;
    display: block;
  }
`;

const Separator = styled.div`
  border-bottom: 1px solid #efefef;
`;

const SeeMoreText = styled(Body2)`
  cursor: pointer;
  color: ${PRIMARY_800};
  font-weight: 700;
  text-decoration: underline;
`;
const ReviewSection = styled(FlexBox)`
  flex-direction: column;
  row-gap: 2rem;
  max-height: ${({ moreReview }) => (moreReview ? "20rem" : "30rem")};
  overflow: auto;
  transition: max-height 600ms ease-in-out;
`;

const RatingWrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 2rem;
`;

const OverallRating = styled(FlexBox)`
  flex-direction: column;
  width: 30%;
`;

const TotalRatingItem = styled(FlexBox)`
  justify-content: space-between;
  row-gap: 2rem;
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const AllStarItem = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  row-gap: 1rem;

  @media ${device.laptop} {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 2rem;
  }
`;

const AboutRatingsSection = () => {
  const [moreReview, setMoreReview] = useState(false);

  const toggleReview = () => {
    setMoreReview(!moreReview);
  };

  return (
    <RatingWrapper>
      <TotalRatingItem justify="space-between" rowGap="2rem">
        <OverallRating>
          <FlexBox align="center" columnGap="0.25rem">
            <H1>4.2</H1>
            <img src={iconLookup.star} alt="star" width={25} height={25} />
          </FlexBox>
          <H6>(20 ratings)</H6>
        </OverallRating>
        <Separator />
        <AllStarItem>
          {reviewsData.map((item, index) => (
            <React.Fragment key={index}>
              <FlexBox column rowGap="0.5rem" wrap>
                <FlexBox>
                  <img
                    src={iconLookup[item.icon]}
                    alt={item.icon}
                    width="32px"
                    height="32px"
                  />
                </FlexBox>
                <H6>{item.title}</H6>
                <H5>{item.rating}</H5>
              </FlexBox>
              {index < reviewsData.length - 1 && <LineSeparator />}
            </React.Fragment>
          ))}
        </AllStarItem>
      </TotalRatingItem>
      <ReviewSection moreReview={!moreReview}>
        {reviews.map(item => (
          <FlexBox column key={item.id}>
            <FlexBox row justify="space-between" align="center">
              <FlexBox columnGap="1.5rem" align="center">
                <img src={item.path} alt="user avatar" />
                <FlexBox column>
                  <Body1 bold>{item.name}</Body1>
                  <H6>{item.date}</H6>
                </FlexBox>
              </FlexBox>
              <Ratings />
            </FlexBox>
            <H6>{item.review}</H6>
          </FlexBox>
        ))}
      </ReviewSection>
      <SeeMoreText onClick={toggleReview}>
        {moreReview ? "View Less" : "View All"}
      </SeeMoreText>
    </RatingWrapper>
  );
};

export default AboutRatingsSection;
