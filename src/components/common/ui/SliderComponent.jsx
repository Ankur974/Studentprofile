import React from "react";
import styled from "styled-components";
import FlexBox from "./FlexBox";
import { Body1, H2, H3, H5 } from "./Headings";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronRight } from "react-icons/fa";
import OfferCard2 from "@/components/Home/OfferCard2";
import { device } from "./Resposive";

const Wrapper = styled(FlexBox)`
  background-color: #f4d0c4;
  height: 32.25rem;
  padding: 1rem;
  position: relative;
  @media ${device.laptop} {
    height: 35.25rem;
    padding: 1.3rem;
    position: relative;
  }
`;
const Heading = styled(FlexBox)`
  flex-direction: column;
  top: 10%;
  z-index: 5;
  width: 50%;
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
  display: block;
  width: 95%;
  position: relative;
  @media ${device.laptop} {
    display: none;
  }
`;
const DeviceScrollableList = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    width: 100%;
    position: relative;
  }
`;

const CardWrapper = styled.div`
  width: 20rem;
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
    top: -7%;
    right: 2%;
  }
`;
const MobileView = styled.div`
  display: block;
  @media ${device.laptop} {
    display: none;
  }
`;
const DesktopView = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
  }
`;
const RightArrow = styled(FaChevronRight)`
  width: 10px;
  height: 10px;
`;

const SliderComponent = ({ data, heading, subHeadings }) => {
  return (
    <Wrapper>
      <TopContent>
        <Heading>
          <H2 bold>{heading}</H2>
          <Body1>Our picks to recreate this makeup look</Body1>{" "}
        </Heading>
        <Img src="assets/images/girls-image.jpg  " />
      </TopContent>
      <BodyContent>
        <SubHeading>
          <MobileView>
            <H5>{subHeadings} </H5>
          </MobileView>
          <DesktopView>
            <H3>{subHeadings}</H3>
          </DesktopView>
          <ViewButton>
            <Body1>View All</Body1>
            <RightArrow />
          </ViewButton>
        </SubHeading>
        <MobileScrollableList>
          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={1}
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
        <DeviceScrollableList>
          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={3}
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
        </DeviceScrollableList>
      </BodyContent>
    </Wrapper>
  );
};
export default SliderComponent;
