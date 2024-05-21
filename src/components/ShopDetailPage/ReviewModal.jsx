import React from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";

import Modal from "@common/ui/Modal";
import { H5, H6 } from "@common/ui/Headings";
import Ratings from "@common/ui/DisplayRate";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";
import Avatar from "@common/ui/Avatar";

const ReviewSection = styled(FlexBox)`
  flex-direction: column;
  row-gap: 2rem;
  padding: 1.5rem;
  height: 35rem;
  overflow: auto;
`;

const ImageContainer = styled.div`
  display: flex;
  overflow-x: auto;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const DateContainer = styled(FlexBox)`
  justify-content: space-between;
`;

const ViewReviewsModal = ({ isOpen, onClose, review }) => {
  return (
    <Modal M2 height="fit-content" borderRadius="0.75rem" togglePopup={isOpen}>
      <FlexBox justify="space-between" padding="1.5rem">
        <H5>Reviews</H5>
        <IoCloseOutline size="2rem" onClick={onClose} />
      </FlexBox>
      <ReviewSection>
        {review?.map((review, id) => (
          <FlexBox column key={id} rowGap="1rem">
            <FlexBox align="center" columnGap="0.5rem">
              <Avatar name={review?.name} />
              <H5>{review?.name}</H5>
            </FlexBox>
            <Ratings rate={review?.overallAvgRating} />
            <DateContainer>
              <H6>
                {review?.updatedAt
                  ? new Date(review?.updatedAt).toLocaleDateString()
                  : ""}
              </H6>
              <H6>{review.serviceNames}</H6>
            </DateContainer>
            <H5>{review.review || "-"}</H5>
            {review.image && review.image.length > 0 && (
              <ImageContainer>
                {review.image.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Review Image ${index + 1}`}
                    width={280}
                    height={125}
                    style={{
                      marginRight: "1rem",
                      borderRadius: "0.75rem",
                    }}
                  />
                ))}
              </ImageContainer>
            )}
          </FlexBox>
        ))}
      </ReviewSection>
    </Modal>
  );
};

export default ViewReviewsModal;
