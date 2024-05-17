import React from "react";
import styled from "styled-components";
// import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

import FlexBox from "@common/ui/FlexBox";
// import { ACCENT_200, ACCENT_300 } from "@common/ui/colors";
// import { Body1 } from "@common/ui/Headings";
import SalonInfo from "./SalonInfo";

const Banner = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

// const ViewMoreButton = styled.div`
//   position: absolute;
//   bottom: 1rem;
//   right: 1rem;
//   padding: 0.25rem 1rem;
//   border-radius: 0.25rem;
//   background-color: ${ACCENT_300};
//   cursor: pointer;
//   z-index: 1;

//   :hover {
//     background-color: ${ACCENT_200};
//   }
// `;

const Img = styled.img`
  width: 100%;
  height: 100%;
  max-height: 15rem;
  object-fit: cover;
`;

const MobileBanner = ({ shopData, scrollToElement }) => {
  // const router = useRouter();

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
          {shopData?.storeImages?.map((data, index) => (
            <SwiperSlide key={index}>
              <Img src={data.imageUrl} alt="salon-pictures" />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* TODO: to be implemented later */}
        {/* <ViewMoreButton onClick={() => router.push("/shop-details/images")}>
          <Body1 bold>Show more</Body1>
        </ViewMoreButton> */}
      </FlexBox>
      <SalonInfo shopData={shopData} scrollToElement={scrollToElement} />
    </Banner>
  );
};

export default MobileBanner;
