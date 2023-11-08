import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

import FlexBox from "@common/ui/FlexBox";

const imgdata = [
  { id: 1, imgsrc: "/assets/images/salon/1.jpeg" },
  { id: 2, imgsrc: "/assets/images/salon/2.jpeg" },
  { id: 3, imgsrc: "/assets/images/salon/3.jpeg" },
  { id: 4, imgsrc: "/assets/images/salon/4.jpeg" },
  { id: 5, imgsrc: "/assets/images/salon/5.jpeg" },
  { id: 6, imgsrc: "/assets/images/salon/6.jpeg" },
  { id: 7, imgsrc: "/assets/images/salon/7.jpeg" },
];
const Wrapper = styled(FlexBox)`
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const SalonCarousel = () => {
  return (
    <Wrapper>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={2}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {imgdata?.map(data => (
          <SwiperSlide key={data?.id}>
            <img src={data.imgsrc} alt="salon-pictures" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default SalonCarousel;
