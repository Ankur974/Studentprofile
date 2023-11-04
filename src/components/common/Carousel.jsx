import React, { useState } from "react";
import FlexBox from "./ui/FlexBox";
import styled from "styled-components";
import { ACCENT_0, ACCENT_800 } from "./ui/colors";
import { FaRegShareSquare } from "react-icons/fa";
import Favourite from "./ui/Favourite";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const Carousel = ({ images }) => {
  const [clicked, setClicked] = useState(false);
  const Container = styled(FlexBox)`
    width: 100%;
    padding: 1rem;
  `;

  const Img = styled.img`
    width: 100%;
    height: 100%;
  `;

  const Wrapper = styled(FlexBox)`
    width: 100%;
    height: 60.725rem;
    padding: 1rem;
    background-color: ${ACCENT_800};
    position: relative;
    justify-content: center;
    align-items: center;
  `;

  const ScrollableList = styled(FlexBox)`
    width: 50%;
    justify-content: space-between;
    align-items;center;
    height: 65%;
  `;

  const Icon = styled(FlexBox)`
    position: absolute;
    top: 1%;
    right: 2%;
    column-gap: 20px;
  `;

  return (
    <Wrapper>
      <Icon>
        <FaRegShareSquare color={ACCENT_0} />
        <Favourite clicked={clicked} setclicked={setClicked} color={ACCENT_0} />
      </Icon>

      <ScrollableList>
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={1}
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
