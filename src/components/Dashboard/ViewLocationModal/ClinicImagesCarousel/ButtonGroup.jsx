import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IconButton } from "@common/ui/Buttons";

const CarouselNav = styled.div`
  width: 100%;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide, totalItems },
  } = rest;

  const handlePreviousClick = () => {
    previous();
  };

  const handleNextClick = () => {
    next();
  };

  return (
    <CarouselNav className="carousel-button-group">
      <IconButton
        tertiary
        Icon={FiChevronLeft}
        iconSize="1rem"
        strokeWidth={3}
        onClick={handlePreviousClick}
        isDisabled={currentSlide === 0}
      />
      <IconButton
        tertiary
        Icon={FiChevronRight}
        iconSize="1rem"
        strokeWidth={3}
        onClick={handleNextClick}
        isDisabled={currentSlide + 1 === totalItems}
      />
    </CarouselNav>
  );
};

export default ButtonGroup;
