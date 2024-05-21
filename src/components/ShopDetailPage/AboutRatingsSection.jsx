import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";

import { Body2, H6, H1, H5, H3 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { SECONDARY_200, PRIMARY_800 } from "@common/ui/colors";
import { device } from "@common/ui/Responsive";
import { iconLookup } from "../../metadata/reviews";
import ViewReviewsModal from "./ReviewModal";

import { useRouter } from "next/router";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import SingleReview from "./SingleReview";

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
  const [rating, setRating] = useState({});
  const [review, setReview] = useState([]);

  const router = useRouter();
  const storeId = router?.query?.storeId;

  const getAllRating = async storeId => {
    try {
      const response = await client.get(`${URL.getAllRating}/${storeId}`);
      console.log(response, "getAllRating");
      setRating(response?.data?.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      Bugsnag.notify(error);
    }
  };

  const getAllReview = async storeId => {
    try {
      const response = await client.get(`${URL.getAllReview}/${storeId}`);
      console.log(response, "getAllReview");
      setReview(response?.data?.data);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  useEffect(() => {
    if (!storeId) return;
    getAllRating(storeId);
    getAllReview(storeId);
  }, [storeId]);

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <RatingWrapper>
      <TotalRatingItem justify="space-between" rowGap="2rem">
        <OverallRating>
          <FlexBox align="center" columnGap="0.25rem">
            <H1>{rating.overallRating}</H1>
            <img
              src="/assets/images/star_1.webp"
              alt="star"
              width={25}
              height={25}
            />
          </FlexBox>
          <H5>({rating?.ratingLength} ratings)</H5>
        </OverallRating>
        <Separator />
        <AllStarItem>
          {iconLookup.map((item, index) => (
            <React.Fragment key={index}>
              <FlexBox column rowGap="0.5rem" wrap>
                <FlexBox>
                  <StyledImage src={[item.icon]} alt={item.icon} />
                </FlexBox>
                <H6>{item.label}</H6>
                <H5>{rating?.parameters?.[item?.slug] ?? "-"}</H5>
              </FlexBox>
              {index < iconLookup.length - 1 && <LineSeparator />}
            </React.Fragment>
          ))}
        </AllStarItem>
      </TotalRatingItem>
      <ReviewSection>
        {review?.map((item, index) => (
          <SingleReview key={index} data={item} />
        ))}
      </ReviewSection>
      <SeeMoreText onClick={openModal}>View All</SeeMoreText>
      {isOpen && <ViewReviewsModal onClose={closeModal} review={review} />}
    </RatingWrapper>
  );
};

export default AboutRatingsSection;
