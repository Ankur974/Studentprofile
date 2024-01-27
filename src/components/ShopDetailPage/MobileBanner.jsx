import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_200, ACCENT_300 } from "@common/ui/colors";
import { Body1 } from "@common/ui/Headings";
import SalonInfo from "./SalonInfo";
import { device } from "../common/ui/Resposive";

const imgdata = [
  { id: 1, imgsrc: "/assets/images/salon/1.jpeg", salon_name: "GiGi's Salon" },
  { id: 2, imgsrc: "/assets/images/salon/2.jpeg", salon_name: "GiGi's Salon" },
  { id: 3, imgsrc: "/assets/images/salon/3.jpeg", salon_name: "GiGi's Salon" },
  { id: 4, imgsrc: "/assets/images/salon/4.jpeg", salon_name: "GiGi's Salon" },
  { id: 5, imgsrc: "/assets/images/salon/5.jpeg", salon_name: "GiGi's Salon" },
  { id: 6, imgsrc: "/assets/images/salon/6.jpeg", salon_name: "GiGi's Salon" },
  { id: 7, imgsrc: "/assets/images/salon/7.jpeg", salon_name: "GiGi's Salon" },
];

const Banner = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const ViewMoreButton = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_300};
  cursor: pointer;
  z-index: 1;

  :hover {
    background-color: ${ACCENT_200};
  }

  @media ${device.laptop} {
    z-index: 0;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MobileBanner = () => {
  const router = useRouter();

  return (
    <Banner>
      <FlexBox position="relative">
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={1}
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
              <Img src={data.imgsrc} alt="salon-pictures" />
            </SwiperSlide>
          ))}
        </Swiper>
        <ViewMoreButton onClick={() => router.push("/shop-details/images")}>
          <Body1 bold>Show more</Body1>
        </ViewMoreButton>
      </FlexBox>
      <SalonInfo />
    </Banner>
  );
};

export default MobileBanner;
