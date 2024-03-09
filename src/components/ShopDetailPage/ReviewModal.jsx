import React, { useState } from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";

import Modal from "@common/ui/Modal";
import { Body1, Body2, H1, H5, H6 } from "@common/ui/Headings";
import Ratings from "@common/ui/Ratings";
import FlexBox from "@common/ui/FlexBox";
import Image from "next/image";
import { device } from "@common/ui/Resposive";

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

const ReviewSection = styled(FlexBox)`
  flex-direction: column;
  row-gap: 2rem;
  padding: 1.5rem;
  height: 35rem;
  overflow: auto;
  // transition: max-height 600ms ease-in-out;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const ViewReviewsModal = ({ isOpen, onClose, reviews }) => {
  return (
    <>
      {isOpen && (
        <ModalContainer>
          <Modal
            M2
            height="fit-content"
            borderRadius="0.75rem"
            togglePopup={isOpen}
          >
            <FlexBox justify="flex-end" padding="0.5rem">
              <IoCloseOutline size="2rem" onClick={onClose} />
            </FlexBox>
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
                          style={{
                            marginRight: "1rem",
                            borderRadius: "0.75rem",
                          }}
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
                      />
                    )
                  )}
                </FlexBox>
              ))}
            </ReviewSection>
          </Modal>
        </ModalContainer>
      )}
    </>
  );
};

export { ViewReviewsModal };
