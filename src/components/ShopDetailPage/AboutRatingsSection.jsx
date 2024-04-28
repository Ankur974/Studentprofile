import React, { useState } from "react";
import styled from "styled-components";
import { GoPlusCircle } from "react-icons/go";

import { Body1, Body2, H6, H1, H5 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Ratings from "@common/ui/Ratings";
import { SECONDARY_200, PRIMARY_800 } from "@common/ui/colors";
import { device } from "@common/ui/Responsive";
import { iconLookup, reviewsData, reviews } from "../../metadata/reviews";
import Image from "next/image";
import { ViewReviewsModal } from "./ReviewModal";

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
  height: 35rem;
  overflow: hidden;
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

const ImageContainer = styled(FlexBox)`
  flex-direction: row;
  align-items: center;
  overflow-x: auto;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const StyledImage = styled.img`
  width: 32px;
  height: 32px;
`;

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};

const AboutRatingsSection = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleShowMoreImages = () => {};

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
                  <StyledImage src={iconLookup[item.icon]} alt={item.icon} />
                </FlexBox>
                <H6>{item.title}</H6>
                <H5>{item.rating}</H5>
              </FlexBox>
              {index < reviewsData.length - 1 && <LineSeparator />}
            </React.Fragment>
          ))}
        </AllStarItem>
      </TotalRatingItem>
      <ReviewSection>
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
              <Ratings rating={item.rating} />
            </FlexBox>
            <H6>{item.review}</H6>
            {item.image &&
            Array.isArray(item.image) &&
            item.image.length > 0 ? (
              <ImageContainer>
                {item.image.slice(0, 2).map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Review Image ${index + 1}`}
                    width={280}
                    height={125}
                    style={{ marginRight: "1rem", borderRadius: "0.75rem" }}
                  />
                ))}
                {item.image.length > 2 && (
                  <GoPlusCircle
                    size={24}
                    onClick={() => handleShowMoreImages(item.image)}
                    style={{ cursor: "pointer", borderRadius: "0.75rem" }}
                  />
                )}
              </ImageContainer>
            ) : (
              item.image && (
                <Image
                  src={item.image}
                  alt="Review Image"
                  width={280}
                  height={125}
                  style={{ borderRadius: "0.75" }}
                />
              )
            )}
          </FlexBox>
        ))}
      </ReviewSection>
      <SeeMoreText onClick={openModal}>View All</SeeMoreText>
      <ViewReviewsModal
        isOpen={isOpen}
        onClose={closeModal}
        reviews={reviews}
      />
    </RatingWrapper>
  );
};

export default AboutRatingsSection;
