import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Body2, Display } from "@common/ui/Headings";
import { device } from "@common/ui/Resposive";
import { PRIMARY_900, ACCENT_0 } from "@common/ui/colors";

const MobileAndCoinContainer = styled(FlexBox)`
  max-width: 75rem;
  flex-direction: column;
  padding: 5rem 1.5rem;
  gap: 2.5rem;
  margin: -0.25rem 0 0;
  background-color: ${PRIMARY_900};

  @media ${device.laptop} {
    flex-direction: row;
    padding: 3rem;
  }
`;

const LeftSection = styled(FlexBox)`
  justify-content: center;
`;

const MobileImg = styled.img`
  height: 100%;
  max-height: 20rem;

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
    text: "Loyalty rewarded: Care coins for customer loyalty benefits.",
  },
  {
    text: "Easy redemption: Hassle-free perks with Care coin redemption.",
  },
  {
    text: "Streamlined booking: Convenient booking with seamless Care coin usage.",
  },
  {
    text: "Personalized savings: Affordable salon visits with earned Care coins.",
  },
];

export const MobileAndCoinSection = () => (
  <MobileAndCoinContainer>
    <LeftSection>
      <MobileImg src="/assets/images/care-coin-banner.webp" />
    </LeftSection>
    <RightSection justify="center" rowGap="1rem">
      <Display bold color={ACCENT_0}>
        Make appointments using Care Coins
      </Display>
      {subheadings.map((subheading, index) => (
        <FlexBox key={index} columnGap="0.5rem" align="center" justify="center">
          <FiCheckCircle color={ACCENT_0} />
          <Body2 color={ACCENT_0}>{subheading.text}</Body2>
        </FlexBox>
      ))}
    </RightSection>
  </MobileAndCoinContainer>
);
