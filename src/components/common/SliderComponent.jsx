import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FiChevronRight } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import FlexBox from "@common/ui/FlexBox";
import { Body1, H1 } from "@common/ui/Headings";
import { device } from "@common/ui/Resposive";
import OfferCard2 from "@components/Home/OfferCard2";

const Wrapper = styled(FlexBox)`
  background-color: #f4d0c4;
  height: max-content;
  padding: 1.5rem;
  row-gap: 1.5rem;
  position: relative;
  flex-direction: column;
  border-radius: 0.5rem;
  margin-top: 7rem;

  @media ${device.laptop} {
    margin-top: 5rem;
    height: 30.25rem;
    position: relative;
  }
`;

const Header = styled(FlexBox)`
  flex-direction: column;
  width: 50%;
  justify-content: center;
`;

const Body = styled(FlexBox)`
  height: 100%;
  justify-content: flex-end;
  flex-direction: column;
  row-gap: 0.25rem;
  bottom: 1.5rem;
`;

const CardWrapper = styled.div`
  width: 100%;
  @media screen and (max-width: 300px) {
    width: 4rem;
  }
  @media screen and (max-width: 1007px) {
    width: 6rem;
  }
  @media screen and (max-width: 1066px) {
    width: 19rem;
  }
  @media screen and (max-width: 1165px) {
    width: 21rem;
  }
`;

const ViewButton = styled(FlexBox)`
  column-gap: 0.25rem;
  align-items: center;

  @media ${device.laptop} {
    column-gap: 5px;
    align-items: center;
  }

  &:hover {
    transform: scale(1.3);
  }
`;

const TopContent = styled(FlexBox)`
  height: 100%;
  justify-content: space-between;
  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
  max-width: 27rem;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 0.5rem;
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
    bottom: 45%;
    z-index: 10;
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
    opacity: 0.5;
    pointer-events: none;
  }
`;

const ForwardButton = styled(IoIosArrowForward)`
  transition: all 0.3s ease-in-out;
  &:hover {
    border-radius: 20px;
    background-color: white;
    transform: scale(1.5);
  }
`;

const BackButton = styled(IoIosArrowBack)`
  transition: all 0.3s ease-in-out;
  &:hover {
    border-radius: 20px;
    background-color: white;
    transform: scale(1.5);
  }
`;

const SliderComponent = ({ data, newData }) => {
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
      {Array.isArray(newData) && (
        <TopContent>
          <Header>
            <H1 bold>{newData[0]?.heading}</H1>
            <Body1>Our picks to recreate this makeup look</Body1>
          </Header>
          <FlexBox>
            <BannerImage src="assets/images/girls-image.jpg" />
          </FlexBox>
        </TopContent>
      )}
      <Body>
        <FlexBox justify="space-between">
          <Body1 bold>{newData?.subHeadings}</Body1>
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
            spaceBetween={8}
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
                  <OfferCard2 data={item} />
                </CardWrapper>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </SliderButton>
      </Body>
    </Wrapper>
  );
};

export default SliderComponent;
