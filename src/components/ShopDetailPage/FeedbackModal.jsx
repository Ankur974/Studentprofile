import React, { useState } from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";

import Modal from "@common/ui/Modal";
import { Body1, H3, Body2 } from "@common/ui/Headings";
import { Button } from "@common/ui/Buttons";
import FlexBox from "@common/ui/FlexBox";
import Ratings from "@common/ui/Ratings";
import Avatar from "@common/ui/Avatar";
import { FaCamera } from "react-icons/fa";

const Header = styled(FlexBox)`
  justify-content: space-between;
  padding: 1rem;
`;

const TextAreaContainer = styled.textarea`
  width: 75%;
  border-radius: 0.5rem;
  padding: 0.75rem;
  resize: none;
  text-align: center;
`;

const RatingItemContainer = styled(FlexBox)`
  justify-content: space-between;
`;

const Body = styled(FlexBox)`
  flex-direction: column;
  padding: 0.5rem 1.5rem;
`;
const TextArea = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
`;
const PhotoContainer = styled(FlexBox)`
  width: 24.9375rem;
  padding: 0.25rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  border: 1px solid var(--Brand-color, #533a71);
`;
const RatingItem = ({ title, value, onChange }) => (
  <RatingItemContainer>
    <Body1>{title}</Body1>
    <FlexBox>
      <Ratings onChange={onChange} defaultValue={value} />
    </FlexBox>
  </RatingItemContainer>
);

const ReviewModal = ({ shopData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState({
    Overall: 0,
    Cleanliness: 0,
    Services: 0,
    Ambiance: 0,
    Communication: 0,
  });

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log("Submitted Ratings:", ratings);
    console.log("Submitted Comment:", comment);
  };

  const handleCommentChange = e => setComment(e.target.value);

  const handleRatingChange = (criterion, value) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [criterion]: value,
    }));
  };

  const criteriaData = [
    { title: "Cleanliness" },
    { title: "Services" },
    { title: "Ambiance" },
    { title: "Communication" },
  ];

  return (
    <>
      <Button onClick={handleOpenModal}>Add Review</Button>
      {isOpen && (
        <Modal
          S
          height="fit-content"
          borderRadius="0.75rem"
          togglePopup={isOpen}
        >
          <Header>
            <FlexBox align="center" justify="center" columnGap="0.5rem">
              <Avatar name={shopData?.ownerDetails?.name} />
              <FlexBox column>
                <Body1 bold>{shopData?.ownerDetails?.name}</Body1>
                <Body2 color="#808080">Posting with a public profile</Body2>
              </FlexBox>
            </FlexBox>
            <IoCloseOutline size="2rem" onClick={handleCloseModal} />
          </Header>
          <FlexBox justify="center">
            <Ratings
              onChange={value => handleRatingChange("Overall", value)}
              defaultValue={ratings.Overall}
            />
          </FlexBox>
          <Body>
            {!isSubmitted ? (
              <>
                {criteriaData.map((item, index) => (
                  <RatingItem
                    key={index}
                    title={item.title}
                    value={ratings[item.title]}
                    onChange={value => handleRatingChange(item.title, value)}
                  />
                ))}
                <TextArea>
                  <TextAreaContainer
                    placeholder="Share your thoughts and experience of todays anointment."
                    value={comment}
                    onChange={handleCommentChange}
                  />
                  <PhotoContainer>
                    <FaCamera />
                    <Body2 color="#533A71" bold>
                      Add some photos & videos
                    </Body2>
                  </PhotoContainer>
                  <FlexBox columnGap="1rem" align="flex-start">
                    <Button outline>Cancel</Button>
                    <Button onClick={handleSubmit}>Post</Button>
                  </FlexBox>
                </TextArea>
              </>
            ) : (
              <>
                <FaThumbsUp size={100} />
                <H3 bold>Amazing</H3>
                <Body1>
                  Thanks {shopData?.ownerDetails?.name} for your feedback{" "}
                </Body1>
                <Button onClick={handleCloseModal}>Go to Home</Button>
              </>
            )}
          </Body>
        </Modal>
      )}
    </>
  );
};

export default ReviewModal;
