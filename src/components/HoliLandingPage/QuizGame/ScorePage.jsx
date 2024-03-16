import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Image from "next/image";

import FlexBox from "@common/ui/FlexBox";
import { Body1, Body2, H2 } from "@common/ui/Headings";
import { ACCENT_0, MID_TONE_PURPLE } from "@common/ui/colors";
import { device } from "@common/ui/Resposive";

const Wrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  background: var(--gradient, linear-gradient(180deg, #c6426e, #533a71));
`;

const H_2 = styled(H2)`
  text-align: center;
  color: ${ACCENT_0};
  text-transform: capitalize;
`;

const Body_1 = styled(Body1)`
  color: ${ACCENT_0};
`;

const ItemContainer = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  margin: auto;
  gap: 2.5rem;

  @media ${device.laptop} {
    padding: 2.5rem 2.5rem 0;
  }
`;

const CouponBox = styled(FlexBox)`
  padding: 1.5rem 2.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border: 1px solid black;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.12);
`;

const SalonDetails = styled(FlexBox)`
  flex-direction: column;
  align-items: start;
  padding: 1.5rem 0.25rem;
  gap: 0.75rem;
`;

const CouponDate = styled(FlexBox)`
  width: auto;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  background: ${ACCENT_0};
  border-radius: 0.5rem;
`;

const SocialBox = styled(FlexBox)`
  padding: 0.75rem 2.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  background: ${ACCENT_0};
  border-radius: 0.75rem;
  cursor: pointer;
`;

const ScorePage = ({ prize }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  const handleOpenInstagram = () => {
    window.open(
      "https://www.instagram.com/pamprazzi?igsh=MTBwazIxY3FmZ2Q1MQ==",
      "_blank"
    );
  };

  return (
    <Wrapper>
      {showConfetti && <Fireworks autorun={{ speed: 1 }} />}
      <ItemContainer>
        <H_2 bold textTransform="uppercase">
          CONGRATULATIONS!
          <br />
          you WON A VOUCHER
        </H_2>
        <FlexBox column rowGap="2.5rem">
          <CouponBox>
            <H_2 bold>{prize}</H_2>
          </CouponBox>
          <SalonDetails>
            <Body_1>Details:</Body_1>
            <Body_1 bold>SK Hair & Spa</Body_1>
            <Body_1 whiteSpace="wrap">
              21, b/3, L colony, Behind SK farm and sports, Vilas Street, West
              Bengal - 876453
            </Body_1>
            <CouponDate>
              <Body2 color={MID_TONE_PURPLE}>Valid till 1st April 2024</Body2>
            </CouponDate>
            <FlexBox>
              <Body2 color={ACCENT_0}>
                Note: an email will be sent to you to access this voucher.
              </Body2>
            </FlexBox>
          </SalonDetails>
        </FlexBox>
        <SocialBox onClick={handleOpenInstagram}>
          <Image src="/assets/instagram.webp" width={20} height={20} />
          <Body2 color={MID_TONE_PURPLE}>Follow us @pamprazzi</Body2>
        </SocialBox>
      </ItemContainer>
    </Wrapper>
  );
};

export default ScorePage;
