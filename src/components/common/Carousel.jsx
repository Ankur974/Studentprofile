import React, { useState } from "react";
import FlexBox from "./ui/FlexBox";
import styled from "styled-components";
import { ACCENT_0, ACCENT_800 } from "./ui/colors";
import Favourite from "./ui/Favourite";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { ShareModal } from "../ShopDetailPage/ShareModal";
import { useRouter } from "next/router";
import { device } from "./ui/Resposive";

const Carousel = ({ images }) => {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const Wrapper = styled(FlexBox)`
    width: 100vw;
    height: 100vh;
    background-color: ${ACCENT_800};
    overflow: hidden;
    padding: 2rem 2.5rem;
  `;

  const Container = styled(FlexBox)`
    width: 90%;
    max-width: 50rem;
    margin: auto;
  `;

  const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 23vh;

    @media ${device.laptop} {
      min-height: 75vh;
    }
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

    .swiper-pagination {
      color: ${ACCENT_0};
      position: relative;
      bottom: -0.1rem;
    }
  `;

  const ShareAndFavIcon = styled(FlexBox)`
    gap: 1rem;
    cursor: pointer;
  `;

  const IconBox = styled(FlexBox)`
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `;

  const CloseButton = styled(IoIosClose)`
    cursor: pointer;
  `;

  const ForwardButton = styled(IoIosArrowForward)`
    background-color: ${ACCENT_0};
    border-radius: 10px;
    transition: all 0.3s ease 0.2s;
    &:hover {
      border-radius: 20px;
      transform: scale(2.01);
    }
  `;

  const BackButton = styled(IoIosArrowBack)`
    background-color: ${ACCENT_0};
    border-radius: 10px;
    transition: all 0.3s ease 0.2s;
    &:hover {
      border-radius: 20px;
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
      <IconBox>
        <ShareAndFavIcon>
          <ShareModal color={ACCENT_0} />
          <Favourite
            clicked={clicked}
            setclicked={setClicked}
            color={ACCENT_0}
          />
        </ShareAndFavIcon>
        <CloseButton
          color={ACCENT_0}
          size="2.5rem"
          onClick={() => router.back()}
        />
      </IconBox>
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
              renderFraction: function (currentClass, totalClass) {
                return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
              },
            }}
            navigation={{
              nextEl: ".swiper-forward",
              prevEl: ".swiper-backward",
              disabledClass: "swiper-button-disabled",
            }}
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
