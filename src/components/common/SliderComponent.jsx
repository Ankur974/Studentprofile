import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FiChevronRight } from "react-icons/fi";

import FlexBox from "@common/ui/FlexBox";
import { Body1, Body2, H2 } from "@common/ui/Headings";
import { device } from "@common/ui/Resposive";
import OfferCard2 from "@components/Home/OfferCard2";

const Wrapper = styled(FlexBox)`
  background-color: #f4d0c4;
  height: 32.25rem;
  padding: 1rem;
  position: relative;
  @media ${device.laptop} {
    height: 30.25rem;
    padding: 1.3rem;
    position: relative;
  }
`;

const Heading = styled(FlexBox)`
  flex-direction: column;
  top: 10%;
  z-index: 5;
  width: 50%;
  row-gap: 1rem;
`;

const BodyContent = styled(FlexBox)`
  height: 100%;
  justify-content: flex-end;
  flex-direction: column;
  row-gap: 1rem;
  position: absolute;
  bottom: 2%;
  width: 97%;
`;

const SubHeading = styled(FlexBox)`
  justify-content: space-between;
  width: 99%;
`;

const MobileScrollableList = styled.div`
  display: flex;
  width: 95%;
  position: relative;
  justify-content: center;
  align-items: center;

  @media ${device.laptop} {
    width: 100%;
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  @media ${device.laptop} {
    width: 23rem;
  }
`;

const ViewButton = styled(FlexBox)`
  column-gap: 2px;
  align-items: center;
  padding-right: 10px;
  @media ${device.laptop} {
    column-gap: 5px;
    align-items: center;
  }
`;

const TopContent = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
`;

const Img = styled.img`
  width: 45%;
  height: 40%;
  position: absolute;
  top: -5%;
  right: 2%;
  @media ${device.laptop} {
    width: 40%;
    height: 55%;
    position: absolute;
    top: -15%;
    right: 2%;
  }
`;

const SliderComponent = ({ data, heading, subHeadings }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      const mobileWidthThreshold = 800;
      setIsMobile(window.innerWidth < mobileWidthThreshold);
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <Wrapper>
      <TopContent>
        <Heading>
          <H2 bold style={{ fontSize: "50px" }}>
            {heading}
          </H2>
          <Body1>Our picks to recreate this makeup look</Body1>
        </Heading>
        <Img src="assets/images/girls-image.jpg" />
      </TopContent>
      <BodyContent>
        <SubHeading>
          <Body2 style={{ size: "40px" }}>{subHeadings} </Body2>
          <ViewButton>
            <Body1>View All</Body1>
            <FiChevronRight />
          </ViewButton>
        </SubHeading>
        <MobileScrollableList>
          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={isMobile ? 1 : 3}
            navigation
          >
            {data?.map(data => (
              <SwiperSlide key={data?.id}>
                <CardWrapper>
                  <OfferCard2 data={data} />
                </CardWrapper>
              </SwiperSlide>
            ))}
          </Swiper>
        </MobileScrollableList>
      </BodyContent>
    </Wrapper>
  );
};

export default SliderComponent;
