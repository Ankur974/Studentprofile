/* eslint-disable react/no-unescaped-entities */
import React from "react";

import { WHITE, listingChip } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import styled from "styled-components";
import { H1 } from "@common/ui/Headings";
import { Caption } from "@common/ui/Headings";
import { Button } from "@common/ui/Buttons";
import { device } from "@common/ui/Responsive";
import { categoryData } from "@metadata/CategoryData";
import Slider from "../Home/Slider";

const Wrapper = styled(FlexBox)`
  height: 100%;
  row-gap: 1.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  padding: 2.5rem 1.25rem 0;
  align-items: center;
`;

const Logo = styled.img`
  width: 100%;
  cursor: pointer;
`;

const Heading = styled(H1)`
  font-weight: 900;
  line-height: normal;
  text-align: center;
`;

// const ImageContainer = styled(FlexBox)`
//   justify-content: center;
//   align-items: center;
//   align-self: center;
//   margin-top: 2rem;

//   @media ${device.laptop} {
//     left: 50%;
//     right: 50%;
//   }
// `;

const ColorGradient = styled.span`
  background-image: linear-gradient(
    106deg,
    rgba(101, 73, 255, 1) 0%,
    rgba(239, 87, 106, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// const Frame = styled.img`
//   width: 100%;
//   object-fit: cover;
//   height: 28rem;
//   mix-blend-mode: normal;

//   @media ${device.laptop} {
//     width: 55rem;
//     height: 22rem;
//   }
// `;

const SubHeading = styled(Caption)`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  line-height: normal;
`;

const PlayCTA = styled(Button)`
  padding: 0.75rem 2.5rem;
  text-transform: none;
  font-size: 1rem;
  font-weight: 600;
`;

const Divider = styled(FlexBox)`
  border-bottom: 1px solid ${listingChip};
`;

const SliderContainer = styled(FlexBox)`
  margin-top: 15rem;
  padding: 1.5rem;
  flex-direction: column;
  row-gap: 2rem;

  @media ${device.laptop} {
    row-gap: 4rem;
  }
`;

const Play = ({ targetElement }) => {
  const scrollToTarget = () => {
    targetElement.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Wrapper>
        <Logo
          isStatic
          height={36}
          draggable={false}
          src="/assets/images/pamprazzi-logo.svg"
          alt="pamprazzi Logo"
        />
        <FlexBox column align="center">
          <Heading>
            We are here to make your salon visits even more hassle-free and{" "}
            <ColorGradient>fabulous!</ColorGradient>
          </Heading>
          <SubHeading>
            Kolkata, get ready! While we put the finishing touches on our
            platform, explore our offerings—from classic haircuts to Ayurvedic
            facials. And don’t miss the chance to spin our wheel for pre-launch
            vouchers. It’s our way of saying,{" "}
            <ColorGradient>“Shundor hoye jao!”</ColorGradient>
          </SubHeading>
        </FlexBox>
        <PlayCTA onClick={scrollToTarget}>Play to Win!</PlayCTA>
      </Wrapper>
      {/* <ImageContainer>
        <Frame src="/assets/images/holi/banner.webp" />
      </ImageContainer> */}
      <SliderContainer>
        <Divider />
        <Slider heading="Explore our range of services" data={categoryData} />
        <Divider />
      </SliderContainer>
    </>
  );
};

export default Play;
