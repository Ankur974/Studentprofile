import React, { useState } from "react";
import FlexBox from "./ui/FlexBox";
import styled from "styled-components";
import { ACCENT_0, ACCENT_800 } from "./ui/colors";
import {
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaRegShareSquare,
  FaRegHeart,
} from "react-icons/fa";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const Container = styled(FlexBox)`
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  const Img = styled.img`
    width: 30%;
  `;

  const Wrapper = styled(FlexBox)`
    width: 100%;
    height: 60.725rem;
    padding: 1rem;
    background-color: ${ACCENT_800};
    position: relative;
  `;

  const Icon = styled(FlexBox)`
    position: absolute;
    top: 1%;
    right: 2%;
    column-gap: 20px;
  `;

  return (
    <Wrapper>
      <Icon>
        <FaRegShareSquare color={ACCENT_0} />
        <FaRegHeart color={ACCENT_0} />
      </Icon>
      <Container>
        <FaArrowCircleLeft onClick={prevSlide} color="white" size="40px" />
        <Img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
        <FaArrowCircleRight onClick={nextSlide} color="white" size="40px" />
      </Container>
    </Wrapper>
  );
};

export default Carousel;
