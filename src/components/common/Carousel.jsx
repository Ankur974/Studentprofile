import React, { useState } from "react";
import FlexBox from "./ui/FlexBox";
import styled from "styled-components";
import { ACCENT_0, ACCENT_800 } from "./ui/colors";
import { FaRegShareSquare } from "react-icons/fa";
import LoveReact from "./ui/LoveReact";
import { Swiper, SwiperSlide } from "swiper/react";

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

  return (
    <Wrapper column>
      <Icon>
        <FaRegShareSquare color={ACCENT_0} />
        <LoveReact clicked={clicked} setclicked={setClicked} color={ACCENT_0} />
      </Icon>

      <ScrollableList>
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={8}
          slidesPerView={1}
          pagination={{
            type: "fraction",
          }}
          navigation
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
    </Wrapper>
  );
};

export default Carousel;
