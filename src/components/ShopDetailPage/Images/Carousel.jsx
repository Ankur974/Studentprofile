import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { useRouter } from "next/router";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_0, ACCENT_800 } from "@common/ui/colors";
import Favourite from "@common/ui/Favourite";
import { ShareModal } from "@components/ShopDetailPage/ShareModal";
import { device } from "@common/ui/Resposive";

const Carousel = ({ images }) => {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const Wrapper = styled(FlexBox)`
    height: 100vh;
    background-color: ${ACCENT_800};
    overflow: hidden;
    padding: 2rem;
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

  const ChevronWrapper = styled(FlexBox)`
    background-color: ${ACCENT_0};
    border-radius: 1rem;
    transition: all 0.3s ease 0.2s;
    width: 1.5rem;
    aspect-ratio: 1;

    &:hover {
      transform: scale(2);
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
        <IoIosClose
          color={ACCENT_0}
          size="2.5rem"
          onClick={() => router.back()}
          cursor="pointer"
        />
      </IconBox>
      <SliderButton>
        <ChevronWrapper className="swiper-button swiper-forward">
          <IoIosArrowForward />
        </ChevronWrapper>
        <ChevronWrapper className="swiper-button swiper-backward">
          <IoIosArrowBack />
        </ChevronWrapper>

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
