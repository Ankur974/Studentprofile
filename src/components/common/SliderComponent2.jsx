import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FiChevronRight } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import FlexBox from "@common/ui/FlexBox";
import { Body1, Body2, H3 } from "@common/ui/Headings";
import { device } from "@common/ui/Resposive";
import Card from "@components/Home/Card";

const Wrapper = styled(FlexBox)`
  height: max-content;
  padding: 1.5rem;
  row-gap: 1rem;
  flex-direction: column;
`;

const CardWrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 300px) {
    width: 4rem;
  }
  @media screen and (min-width: 950px and max-width: 1007px) {
    width: 6rem;
  }
  @media screen and (min-width: 1008px and max-width: 1066px) {
    width: 19rem;
  }
  @media screen and (min-width: 1066px and max-width: 1165px) {
    width: 21rem;
  }
`;

const ViewButton = styled(FlexBox)`
  column-gap: 0.25rem;
  align-items: center;
  transition: all 0.3s ease 0.1s;
  cursor: pointer;

  @media ${device.laptop} {
    column-gap: 5px;
    align-items: center;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledSwiper = styled(Swiper)`
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: 850px) {
    .mySwiper {
      width: 576px;
    }
  }

  @media screen and (min-width: 768px) {
    .mySwiper {
      width: 768px;
    }
  }
`;

const SliderButton = styled.div`
  position: relative;
  .swiper-button {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 50%;
    z-index: 5;
    cursor: pointer;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .image-swiper-button-prev {
    left: -1.25rem;
  }

  .image-swiper-button-next {
    right: -1.25rem;
  }

  .swiper-button-disabled {
    opacity: 0;
    pointer-events: none;
  }
`;
const ForwardButton = styled(IoIosArrowForward)`
  transition: all 0.3s ease 0.2s;
  &:hover {
    border-radius: 20px;
    background-color: white;
    transform: scale(2.01);
  }
`;
const BackButton = styled(IoIosArrowBack)`
  transition: all 0.3s ease 0.2s;
  &:hover {
    border-radius: 20px;
    background-color: white;
    transform: scale(2.01);
  }
`;

const SliderComponent2 = ({ data, newData }) => {
  const [slideViewCount, setSlideViewCount] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSwiper = swiper => {
    setSwiperInstance(swiper, "swiper");
  };

  const handleSlideChange = () => {
    if (swiperInstance !== null) {
      setIsLastSlide(swiperInstance.isEnd);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      const mobileWidthThreshold = 519;
      const windowWidth = window.innerWidth;

      if (windowWidth < mobileWidthThreshold) {
        setSlideViewCount(1);
      } else if (windowWidth >= mobileWidthThreshold && windowWidth < 800) {
        setSlideViewCount(2);
      } else {
        setSlideViewCount(3);
      }
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Wrapper>
      <FlexBox justify="space-between">
        <H3 textTransform="capitalize">{newData[0]?.subHeadings}</H3>
        {slideViewCount < data.length && !isLastSlide && (
          <ViewButton>
            <Body1>View All</Body1>
            <FiChevronRight />
          </ViewButton>
        )}
      </FlexBox>
      <SliderButton>
        <div className="swiper-button image-swiper-button-next">
          <ForwardButton />
        </div>
        <div className="swiper-button image-swiper-button-prev">
          <BackButton />
        </div>
        <StyledSwiper
          slidesPerView={slideViewCount}
          modules={[Navigation]}
          spaceBetween={15}
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          className="mySwiper"
        >
          {data?.map(item => (
            <SwiperSlide key={item?.id}>
              <CardWrapper>
              <Card data={item}/>
                <Body2 textTransform="capitalize" margin="0.75rem 0 0 0">
                  {item.title}
                </Body2>
              </CardWrapper>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </SliderButton>
    </Wrapper>
  );
};

export default SliderComponent2;
