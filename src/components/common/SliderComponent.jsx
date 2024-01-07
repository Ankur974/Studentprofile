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
  height: max-content;
  width: 100vw;
  padding: 1.5rem;
  row-gap: 1rem;
  flex-direction: column;
  border-radius: 0.5rem;
  margin-top: ${({ isBannerP }) => (isBannerP ? "7rem" : "0")};

  @media ${device.laptop} {
    height: ${({ isBannerP }) => (isBannerP ? "28rem" : "max-content")};
  }
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
  gap: 1rem;
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

const TopContent = styled(FlexBox)`
  height: 100%;
  position: relative;

  @media ${device.laptop} {
  }
`;

const Header = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  margin-top: ${({ isBannerP }) => (isBannerP ? "5rem" : "0")};
  justify-content: center;
  align-items: ${({ isBannerP }) => (isBannerP ? "center" : "flex-start")};

  @media ${device.tablet} {
    margin-top: 0;
    align-items: ${({ isBannerP }) => (isBannerP ? "flex-start" : "center")};
  }
`;

const BannerImage = styled.img`
  width: 100%;
  max-width: 27rem;
  object-fit: cover;
  position: absolute;
  top: -10rem;
  right: 0;
  border-radius: 0.5rem;
`;

const StyledSwiper = styled(Swiper)`
  width: 75vw;
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
  console.log(newData.viewall);

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
    <Wrapper isBannerP={newData.isBannerP} backgroundColor={newData.color}>
      <TopContent isBannerP={newData.isBannerP}>
        <Header isBannerP={newData.isBannerP}>
          <H1 bold>{newData?.heading} </H1>
          <Body1>Our picks to recreate this makeup look</Body1>
        </Header>
        <FlexBox>
          <BannerImage src={newData?.isBannerP} />
        </FlexBox>
      </TopContent>
      <Body>
        {newData.viewall && (
          <FlexBox justify="space-between">
            <Body1 bold>{newData?.subHeadings}</Body1>
            {slideViewCount < data.length && !isLastSlide && (
              <ViewButton>
                <Body1>View All</Body1>
                <FiChevronRight />
              </ViewButton>
            )}
          </FlexBox>
        )}
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
