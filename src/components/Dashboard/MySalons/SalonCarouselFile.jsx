import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

import FlexBox from "@common/ui/FlexBox";
import {ACCENT_0} from "@common/ui/colors";

const imgdata = [
  { id: 1, imgsrc: "/assets/images/salon/1.jpeg", salon_name:"GiGi's Salon" },
  { id: 2, imgsrc: "/assets/images/salon/2.jpeg", salon_name:"GiGi's Salon" },
  { id: 3, imgsrc: "/assets/images/salon/3.jpeg", salon_name:"GiGi's Salon" },
  { id: 4, imgsrc: "/assets/images/salon/4.jpeg", salon_name:"GiGi's Salon" },
  { id: 5, imgsrc: "/assets/images/salon/5.jpeg", salon_name:"GiGi's Salon" },
  { id: 6, imgsrc: "/assets/images/salon/6.jpeg", salon_name:"GiGi's Salon" },
  { id: 7, imgsrc: "/assets/images/salon/7.jpeg", salon_name:"GiGi's Salon" },
];

const Wrapper = styled(FlexBox)`
  position: relative;
  height: 100%;

  .overlay {
    position: absolute;
    top: 80%;
    left:45%;
    transform: translate(-50%, -50%);
    color: ${ACCENT_0};
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

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
            <div className="overlay">{data.salon_name}</div>
            <img src={data.imgsrc} alt="salon-pictures" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default SalonCarousel;
