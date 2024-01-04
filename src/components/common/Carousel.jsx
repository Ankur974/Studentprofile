import React, { useState } from "react";
import FlexBox from "./ui/FlexBox";
import styled from "styled-components";
import { ACCENT_0, ACCENT_800 } from "./ui/colors";
import { FaRegShareSquare } from "react-icons/fa";
import Favourite from "./ui/Favourite";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

const Carousel = ({ images }) => {
  const [clicked, setClicked] = useState(false);

  const Wrapper = styled(FlexBox)`
    width: 100vw;
    height: 100vh;
    background-color: ${ACCENT_800};
    overflow: hidden;
    padding: 2.5rem;
  `;

  const Container = styled(FlexBox)`
    width: 90%;
    max-width: 50rem;
    margin: auto;
  `;

  const Img = styled.img`
    width: 100%;
    height: 100%;
  `;

  const ScrollableList = styled(FlexBox)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    .swiper-button-prev {
      background-image: url("images/arrow-left.png"); //todo - update icon - SR
      background-size: contain;
      background-position: 50% 60%;
      background-repeat: no-repeat;
      left: 69px;
    }

    .swiper-pagination-fraction {
    }
  `;

  const Icon = styled(FlexBox)`
    gap: 1rem;
    justify-content: flex-end;
  `;

  const ForwardButton = styled(IoIosArrowForward)`
    background-color: red;
    border-radius: 10px;
    &:hover {
      border-radius: 20px;
      background-color: white;
      transform: scale(2.01);
    }
  `;

  const BackButton = styled(IoIosArrowBack)`
    background-color: red;
    border-radius: 10px;
    &:hover {
      border-radius: 20px;
      background-color: white;
      transform: scale(2.01);
    }
  `;

  const SliderButton = styled.div`
    position: relative;
    height: 100%;
    .swiper-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      bottom: 48%;
      z-index: 10;
      cursor: pointer;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    .swiper-backward {
      left: 5%;
      @media screen and (min-width: 850px) {
        left: 10%;
      }
      @media screen and (min-width: 1072px) {
        left: 15%;
      }
    }

    .swiper-forward {
      right: 5%;
      @media screen and (min-width: 850px) {
        right: 10%;
      }
      @media screen and (min-width: 1072px) {
        right: 12%;
      }
    }

    .swiper-button-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  `;

  return (
    <Wrapper column>
      <Icon>
        <FaRegShareSquare color={ACCENT_0} />
        <Favourite clicked={clicked} setclicked={setClicked} color={ACCENT_0} />
      </Icon>
      <SliderButton>
        <div className="swiper-button swiper-forward">
          <ForwardButton />
        </div>
        <div className="swiper-button swiper-backward">
          <BackButton />
        </div>

        <ScrollableList>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={8}
            slidesPerView={1}
            pagination={{
              type: "fraction",
            }}
            navigation={{
              nextEl: ".swiper-forward",
              prevEl: ".swiper-backward",
              disabledClass: "swiper-button-disabled",
            }}
            // navigation
          >
            {images?.map(data => (
              <SwiperSlide key={data.id}>
                <Container>
                  <Img src={data.url} />
                </Container>
              </SwiperSlide>
            ))}
          </Swiper>
        </ScrollableList>
      </SliderButton>
    </Wrapper>
  );
};

export default Carousel;
