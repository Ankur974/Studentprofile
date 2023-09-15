import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled, { css } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Text } from "@common/Text";
import { FlexBox } from "@common/FlexBox";
import { DesktopOnly } from "@common/DesktopOnly";

import { ACCENT_200, SECONDARY_100, SECONDARY_700 } from "@constants/colors";

const Wrapper = styled(DesktopOnly)`
  box-sizing: border-box;
  width: calc(100% - 18rem);

  * {
    box-sizing: border-box;
  }
`;

const NavContainer = styled(FlexBox)`
  top: 50%;
  position: absolute;
  width: calc(83.5%);
  align-items: center;
  justify-content: space-between;
  transform: translate(-4.5%, -50%);
`;

const NavArrow = styled(FlexBox)`
  cursor: pointer;
  min-width: 2rem;
  min-height: 2rem;
  max-width: 2rem;
  max-height: 2rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${SECONDARY_100};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

const Thought = styled(FlexBox)`
  padding: 0.75rem;
  column-gap: 0.75rem;
  border-radius: 0.75rem;
  align-items: flex-start;
  width: calc(100% - 1rem);
  background-color: ${ACCENT_200};

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const NavButton = ({ onClick, disabled, left }) => (
  <NavArrow
    onClick={onClick}
    disabled={disabled}
    className={`nav-button${left ? "" : " right"}`}
  >
    {left ? (
      <FaChevronLeft size="0.75rem" cursor="pointer" color={SECONDARY_700} />
    ) : (
      <FaChevronRight size="0.75rem" cursor="pointer" color={SECONDARY_700} />
    )}
  </NavArrow>
);

const CustomButtonGroup = ({ next, previous, ...rest }) => {
  const { carouselState } = rest;
  const { currentSlide, totalItems, slidesToShow } = carouselState;
  const isPreviousDisabled = currentSlide === 0;
  const isNextDisabled =
    totalItems - slidesToShow === currentSlide ||
    totalItems - slidesToShow <= 0;

  if (isPreviousDisabled && isNextDisabled) return null;

  return (
    <NavContainer>
      <NavButton left disabled={isPreviousDisabled} onClick={previous} />
      <NavButton disabled={isNextDisabled} onClick={next} />
    </NavContainer>
  );
};

const RenderThought = ({ thought }) => (
  <Thought>
    <img
      alt="Quote"
      draggable={false}
      src="https://cdn.theinnerhour.com/assets/images/comma.svg"
    />
    <Text bold fontSize="0.875rem" lineHeight="1.5">
      {thought?.replaceAll('"', "")}
    </Text>
  </Thought>
);

const responsiveControl = {
  desktopLg: {
    breakpoint: {
      max: 4000,
      min: 769,
    },
    items: 2.5,
  },
};

const ThoughtsDesktop = ({ thoughts }) => {
  return (
    <Wrapper>
      <Carousel
        arrows={false}
        showDots={false}
        slidesToSlide={1}
        showThumbs={false}
        focusOnSelect={false}
        partialVisible={false}
        renderButtonGroupOutside
        customButtonGroup={<CustomButtonGroup />}
        shouldResetAutoplay={false}
        responsive={responsiveControl}
      >
        {thoughts.map(thought => (
          <RenderThought key={thought} thought={thought} />
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default ThoughtsDesktop;
