import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Body2, Display } from "@common/ui/Headings";
import { device } from "@common/ui/Resposive";
import { PRIMARY_900, ACCENT_0 } from "@common/ui/colors";

const MobileAndCoinContainer = styled(FlexBox)`
  flex-direction: column;
  padding: 5rem 1.5rem;
  gap: 2.5rem;
  margin: -0.25rem 0 0 0;
  background-color: ${PRIMARY_900};

  @media ${device.laptop} {
    flex-direction: row;
    padding: 5rem ;
  }
`;

const LeftSection = styled(FlexBox)`
  justify-content: center;
`;

const MobileImg = styled.img`
  height: 100%;
  max-height: 28rem;

  @media ${device.laptop} {
    max-height: 40.5rem;
  }
`;

const RightSection = styled(FlexBox)`
  flex: 1;
  flex-direction: column;

  @media ${device.laptop} {
    max-width: 50%;
  }
`;

const subheadings = [
  {
    text: "Loyalty Incentives: Earn rewards through loyalty points for continued patronage.",
  },
  {
    text: "Effortless Redemption: Seamlessly redeem rewards for hassle-free perks and benefits.",
  },
  {
    text: "Simplified Booking Process: Streamlined booking system for convenient appointments.",
  },
  {
    text: "Personalized Savings: Enjoy tailored discounts and savings for salon visits.",
  },
];

export const MobileAndCoinSection = () => (
  <MobileAndCoinContainer>
    <LeftSection>
      <MobileImg src="/assets/images/care-coin-banner.webp" />
    </LeftSection>
    <RightSection justify="center" rowGap="1rem">
      <Display bold color={ACCENT_0}>
        Elevate Your Salon Experience With Pamprazzi
      </Display>
      {subheadings.map((subheading, index) => (
        <FlexBox key={index} columnGap="0.5rem" align="center" justify="start">
          <FiCheckCircle color={ACCENT_0} />
          <Body2 color={ACCENT_0}>{subheading.text}</Body2>
        </FlexBox>
      ))}
    </RightSection>
  </MobileAndCoinContainer>
);
