import React, { useState } from "react";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";

import FlexBox from "@common/ui/FlexBox";
import { H3 } from "@common/ui/Headings";
import { Card } from "@components/Home/Category";
import { SECONDARY_901 } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 2rem;
  flex-direction: column;
`;

const IconContainer = styled(FlexBox)`
  cursor: pointer;
  border: 1px solid ${SECONDARY_901};
  border-radius: 5px;

  &:hover {
    background-color: ${SECONDARY_901};
  }
`;

const SliderButton = styled(FlexBox)`
  column-gap: 0.85rem;

  .swiper-button-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Slider = ({ data, heading }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSwiper = swiper => {
    setSwiperInstance(swiper, "swiper");
  };

  const handleSlideChange = () => {
    if (swiperInstance !== null) {
      setIsLastSlide(swiperInstance.isEnd);
    }
  };

  return (
    <Wrapper>
      <FlexBox justify="space-between" align="center">
        <H3 textTransform="capitalize" bold>
          {heading}
        </H3>
        <SliderButton>
          <div className="image-swiper-button-prev">
            <IconContainer>
              <TbChevronLeft size={32} />
            </IconContainer>
          </div>
          <div className="image-swiper-button-next">
            <IconContainer>
              <TbChevronRight size={32} />
            </IconContainer>
          </div>
        </SliderButton>
      </FlexBox>
      <FlexBox>
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
          }}
          className="mySwiper"
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <Card data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </FlexBox>
    </Wrapper>
  );
};

export default Slider;
