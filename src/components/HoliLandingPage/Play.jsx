/* eslint-disable react/no-unescaped-entities */
import React from "react";

import { ACCENT_0 } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import styled from "styled-components";
import { H1 } from "@common/ui/Headings";
import { Caption } from "@common/ui/Headings";
import { Button } from "@common/ui/Buttons";
import { device } from "@common/ui/Responsive";
import { trackEvent } from "@utils/helpers";

const Wrapper = styled(FlexBox)`
  height: 100%;
  row-gap: 1.5rem;
  flex-direction: column;
  background-color: ${ACCENT_0};
  padding: 2.5rem 1.25rem 0;
  align-items: center;

  @media ${device.laptop} {
    row-gap: 5rem;
    width: 86.67%;
    max-width: 60rem;
    margin: auto;
  }
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

const ImageContainer = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 2rem;

  @media ${device.laptop} {
    left: 50%;
    right: 50%;
  }
`;

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

const Frame = styled.img`
  width: 100%;
  object-fit: cover;
  height: 16rem;
  mix-blend-mode: normal;
  margin-bottom: -0.5rem;

  @media ${device.laptop} {
    margin-bottom: -2rem;
    height: 65rem;
  }
`;

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

const Play = ({ targetElement }) => {
  const scrollToTarget = () => {
    trackEvent("hero_banner_cta_click", {
      cta_label: "Play To Win!",
      current_page: "waitlist-lp",
    });
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
        <FlexBox column rowGap="1rem" align="center">
          <Heading>
            We are here to make your salon visits even more hassle-free and{" "}
            <ColorGradient>fabulous!</ColorGradient>
          </Heading>
          <SubHeading>
            Kolkata, get ready! While we put the finishing touches on our
            platform, explore our offerings—from classic haircuts to Ayurvedic
            facials. And don’t miss the chance to spin our wheel for pre-launch
            vouchers. It’s our way of saying,
            <br />
            <ColorGradient>“Shundor hoye jao!”</ColorGradient>
          </SubHeading>
          <PlayCTA onClick={scrollToTarget}>Play to Win!</PlayCTA>
        </FlexBox>
      </Wrapper>
      <ImageContainer>
        <Frame src="/assets/images/holi/hero-banner.webp" />
      </ImageContainer>
    </>
  );
};

export default Play;
