import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";

const imgdata = [
  { id: 1, imgsrc: "/assets/images/usersallonimg/saloon1.jpeg" },
  { id: 2, imgsrc: "/assets/images/usersallonimg/saloon2.jpeg" },
  { id: 3, imgsrc: "/assets/images/usersallonimg/saloon3.jpeg" },
  { id: 4, imgsrc: "/assets/images/usersallonimg/saloon4.jpeg" },
  { id: 5, imgsrc: "/assets/images/usersallonimg/saloon5.jpeg" },
  { id: 6, imgsrc: "/assets/images/usersallonimg/saloon6.jpeg" },
  { id: 7, imgsrc: "/assets/images/usersallonimg/saloon7.jpeg" },
];
const Wrapper = styled(FlexBox)`
  width: 100%;
`;

const CardWrapper = styled.div`
  width: 24rem;
`;

const saloonCarousel = () => {
  return (
    <Wrapper>
      <Swiper
        spaceBetween={1}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {imgdata?.map(data => (
          <SwiperSlide key={data?.id}>
            <CardWrapper>
              <img
                src={data.imgsrc}
                alt="saloon-pictures"
                width="100%"
                height="150px"
              />
            </CardWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default saloonCarousel;
