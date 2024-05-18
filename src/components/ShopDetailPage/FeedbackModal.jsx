import React, { useState } from "react";
import styled from "styled-components";
import { FaThumbsUp } from "react-icons/fa";

import Modal from "@common/ui/Modal";
import { Body1, H3, Body2 } from "@common/ui/Headings";
import { Button } from "@common/ui/Buttons";
import FlexBox from "@common/ui/FlexBox";
import Ratings from "@common/ui/Ratings";
import Avatar from "@common/ui/Avatar";
import CustomToggle from "@common/ui/ToggleCopy";
import { FaCamera } from "react-icons/fa";

const Header = styled(FlexBox)`
  justify-content: space-between;
  padding: 1rem;
`;

const TextAreaContainer = styled.textarea`
  width: 100%;
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
  padding: 1.5rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
`;
const PhotoContainer = styled(FlexBox)`
  width: 75%;
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
  const [toggleChecked, setToggleChecked] = useState(false);
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
          width="32rem"
          borderRadius="0.75rem"
          togglePopup={isOpen}
        >
          <Header>
            {toggleChecked ? (
              <FlexBox align="center" justify="center" columnGap="0.5rem">
                <img src="/assets/images/AnonymousIcon.svg"></img>
                <FlexBox column>
                  <Body1 bold>Anonymous</Body1>
                  <Body2 color="#808080">Posting with a public profile</Body2>
                </FlexBox>
              </FlexBox>
            ) : (
              <FlexBox align="center" justify="center" columnGap="0.5rem">
                <Avatar name={shopData?.ownerDetails?.name} />
                <FlexBox column>
                  <Body1 bold>{shopData?.ownerDetails?.name}</Body1>
                  <Body2 color="#808080">Posting with a public profile</Body2>
                </FlexBox>
              </FlexBox>
            )}
            <CustomToggle
              small
              primaryColor="green"
              checked={toggleChecked}
              onChange={() => {
                setToggleChecked(prev => !prev);
              }}
            />
          </Header>

          <Body>
            <Ratings
              onChange={value => handleRatingChange("Overall", value)}
              defaultValue={ratings.Overall}
            />
            {!isSubmitted ? (
              <>
                <FlexBox width="100%" column justify="space-between">
                  {criteriaData.map((item, index) => (
                    <RatingItem
                      key={index}
                      title={item.title}
                      value={ratings[item.title]}
                      onChange={value => handleRatingChange(item.title, value)}
                    />
                  ))}
                </FlexBox>
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
                <FlexBox columnGap="1rem" width="100%">
                  <Button width="100%" outline onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button width="100%" onClick={handleSubmit}>
                    Post
                  </Button>
                </FlexBox>
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
