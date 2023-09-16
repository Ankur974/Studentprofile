import React from "react";
import { Body1, H1 } from "../../components/common/ui/Headings";
import styled from "styled-components";
import FlexBox from "../../components/common/ui/FlexBox";
import { SlSymbleFemale } from "react-icons/sl";
import { ACCENT_0 } from "../../components/common/ui/colors";
import { AiFillStar } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import Services from "./Services";

const BannerContentper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  max-width: 23.75rem;
  margin: auto;
  gap: 1rem;
`;

const Img = styled.img`
  height: 28rem;
  width: 100%;
  object-fit: cover;
  opacity: 1;
`;

const BannerContent = styled(FlexBox)`
  position: absolute;
  top: 19rem;
  left: 0;
  padding-left: 2rem;
`;

const NewBox = styled(FlexBox)`
  position: absolute;
  width: 60%;
  top: 2rem;
  /* left: 26rem; */
  padding-left: 2rem;
`;

const ArrowIcon = styled(IoIosArrowBack)`
  height: 2rem;
  width: 5rem;
  color: ${ACCENT_0};
`;

const HeartIcon = styled(AiOutlineHeart)`
  height: 2rem;
  width: 5rem;
  color: ${ACCENT_0};
`;

const About = () => {
  return (
    <BannerContentper column>
      {/* <NewBox columnGap="66rem">
        <FlexBox
          backgroundColor="#00000033"
          borderRadius="10px"
          width="35px"
          height="35px"
          align="center"
          justify="center"
        >
          <ArrowIcon />
        </FlexBox>
        <FlexBox
          backgroundColor="#00000033"
          borderRadius="10px"
          width="40px"
          height="40px"
          align="center"
          justify="center"
        >
          <HeartIcon />
        </FlexBox>
      </NewBox> */}
      <BannerContent column rowGap="0.38rem">
        <H1 bold color={ACCENT_0}>
          Gigi's Salon
        </H1>
        <FlexBox columnGap="0.75rem">
          <FlexBox columnGap="0.38rem">
            <Body1 color={ACCENT_0}>Salon for Men</Body1>
            <SlSymbleFemale color={ACCENT_0} />
          </FlexBox>
          <FlexBox columnGap="0.38rem">
            <Body1 color={ACCENT_0}>Salon for Men</Body1>
            <SlSymbleFemale color={ACCENT_0} />
          </FlexBox>
        </FlexBox>
        <Body1 color={ACCENT_0}>Kolkata, West Bengal India</Body1>
        <FlexBox columnGap="1rem" align="center">
          <FlexBox align="center">
            {/* star icon */}
            <AiFillStar color="yellow" />
            <Body1 color={ACCENT_0}>4.2</Body1>
          </FlexBox>
          <Body1 color={ACCENT_0}>|</Body1>
          <Body1 color={ACCENT_0}>23 Reviews</Body1>
        </FlexBox>
      </BannerContent>

      <Img src="/assets/banner-new.svg" />
      <Services />
    </BannerContentper>
  );
};
export default About;
