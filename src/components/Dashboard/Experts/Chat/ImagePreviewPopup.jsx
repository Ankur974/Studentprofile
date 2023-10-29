import React, { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import styled, { css } from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { H4, Support } from "@common/Dashboard/Headings";
import { Modal } from "@common/Dashboard/Modal";
import {
  SECONDARY_800,
  DAVYS_GREY_300,
  ACCENT_100,
  ACCENT_400,
} from "@common/ui/colors";

const Header = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

const ImageWrapper = styled(FlexBox)`
  flex: 1;
  background-color: ${DAVYS_GREY_300};
  justify-content: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Image = styled.img`
  object-fit: contain;
  max-height: calc(100vh - 4.5rem);
  @media screen and (max-width: 768px) {
    max-width: 100vw;
  }
`;

const ArrowIcon = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 2.5rem;
  background-color: ${ACCENT_100};
  border: 1px solid ${ACCENT_400};
  cursor: pointer;
  ${({ isLeft }) =>
    isLeft
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}

  @media screen and (max-width: 768px) {
    margin: auto 1rem;
  }
`;

const ImagePreviewPopup = ({ images, previewImageIndex, closePopup }) => {
  const user = useSelector(state => state.auth.user);
  const [currentIndex, setCurrentIndex] = useState(previewImageIndex || 0);

  const currentImage = images[currentIndex];
  const isUserImage = user?.firebaseid === currentImage?.send_by_user_id;

  const navigateToPreviousImage = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const navigateToNextImage = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, images.length - 1));
  };

  return (
    <Modal L>
      <Header>
        <FlexBox column>
          <H4 bold>{currentImage?.file_name}</H4>
          <Support>
            {isUserImage ? "You on" : "Provider on"}{" "}
            {dayjs(currentImage?.uploaded_at * 1000).format(
              "DD MMM YYYY, hh:mm a"
            )}
          </Support>
        </FlexBox>
        <FiX cursor="pointer" onClick={closePopup} />
      </Header>

      <ImageWrapper>
        <Image src={currentImage?.file_url} alt="Preview Image" />
      </ImageWrapper>

      {currentIndex > 0 && (
        <ArrowIcon isLeft onClick={navigateToPreviousImage}>
          <FiChevronLeft size="1.5rem" color={SECONDARY_800} />
        </ArrowIcon>
      )}

      {currentIndex < images?.length - 1 && (
        <ArrowIcon onClick={navigateToNextImage}>
          <FiChevronRight size="1.5rem" color={SECONDARY_800} />
        </ArrowIcon>
      )}
    </Modal>
  );
};

export default ImagePreviewPopup;
