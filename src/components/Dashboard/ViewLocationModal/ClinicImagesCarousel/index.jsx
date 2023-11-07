import { useRef } from "react";
import styled from "styled-components";
import { useInView } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { clinics } from "@metadata/therapyPsychiatry/clinics";
import ButtonGroup from "./ButtonGroup";
import CustomDot from "./CustomDot";

const Container = styled.div`
  position: relative;
  padding-bottom: 2.75rem;

  .react-multi-carousel-dot-list {
    bottom: 0.6875rem;
    z-index: 1;
    width: fit-content;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ClinicImage = styled.img`
  width: 100%;
  height: 12.5rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ClinicImagesCarousel = ({ clinicId }) => {
  const carouselRef = useRef(null);
  const carouselIsInView = useInView(carouselRef, { amount: 0.8 });

  const clinic = clinics.find(clinic => clinic.id === clinicId);
  const imageUrls = clinic?.images || [];
  console.log("anand imageUrls", imageUrls);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 768 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Container ref={carouselRef}>
      <Carousel
        infinite
        autoPlay={carouselIsInView}
        autoPlaySpeed={5000}
        showDots
        arrows={false}
        renderButtonGroupOutside
        renderArrowsWhenDisabled
        responsive={responsive}
        customButtonGroup={<ButtonGroup />}
        renderDotsOutside
        pauseOnHover={false}
        customDot={<CustomDot />}
        draggable={false}
      >
        {imageUrls.map((imageUrl, index) => (
          <ClinicImage key={index} src={imageUrl} alt="Clinic Image" />
        ))}
      </Carousel>
    </Container>
  );
};

export default ClinicImagesCarousel;
