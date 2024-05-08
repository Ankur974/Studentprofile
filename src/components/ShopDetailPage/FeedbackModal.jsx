import React, { useState } from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";

import Modal from "@common/ui/Modal";
import { Body1, H3 } from "@common/ui/Headings";
import { Button } from "@common/ui/Buttons";
import FlexBox from "@common/ui/FlexBox";
import Ratings from "@common/ui/Ratings";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const TextAreaContainer = styled.textarea`
  width: 75%;
  border-radius: 0.5rem;
  padding: 0.75rem;
  resize: none;
`;

const RatingItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  align-items: center;
`;

const RatingItem = ({ title, value, onChange }) => (
  <RatingItemContainer>
    <div>
      <Body1>{title}</Body1>
    </div>
    <FlexBox align="center">
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
        <ModalContainer>
          <Modal
            M2
            height="fit-content"
            borderRadius="0.75rem"
            togglePopup={isOpen}
          >
            <FlexBox justify="flex-end" padding="0.5rem">
              <IoCloseOutline size="2rem" onClick={handleCloseModal} />
            </FlexBox>
            <FlexBox
              column
              align="center"
              rowGap="1rem"
              padding="0.25rem"
              justify="space-between"
            >
              {!isSubmitted ? (
                <>
                  <H3 bold>Hey {shopData?.ownerDetails?.name}</H3>
                  <Body1>
                    Would you like to rate your overall experience?{" "}
                  </Body1>
                  <Ratings
                    onChange={value => handleRatingChange("Overall", value)}
                    defaultValue={ratings.Overall}
                  />
                  <FlexBox
                    column
                    columnGap="2rem"
                    align="flex-start"
                    justify="space-between"
                  >
                    {criteriaData.map((item, index) => (
                      <RatingItem
                        key={index}
                        title={item.title}
                        value={ratings[item.title]}
                        onChange={value =>
                          handleRatingChange(item.title, value)
                        }
                      />
                    ))}
                  </FlexBox>
                  <TextAreaContainer
                    placeholder="Write additional comment here"
                    value={comment}
                    onChange={handleCommentChange}
                  />
                  <Button onClick={handleSubmit}>Submit</Button>
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
            </FlexBox>
          </Modal>
        </ModalContainer>
      )}
    </>
  );
};

export default ReviewModal;
