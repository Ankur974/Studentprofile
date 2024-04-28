import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { device } from "../common/ui/Responsive";
import { RiAccountCircleFill } from "react-icons/ri";
import { Body2, H2, H3 } from "../common/ui/Headings";
import { ACCENT_0, PRIMARY_900 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  background-color: ${PRIMARY_900};
  flex-direction: column;
  width: 100%;
  margin: auto;
  gap: 1.5rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 2rem;
  }
`;

const Rewardheading = styled(FlexBox)`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;

  @media ${device.laptop} {
    justify-content: center;
  }
`;

const Accountbutton = styled(FlexBox)`
  border-radius: 0.25rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  padding: 0.4rem 0.4rem;
  cursor: pointer;
  position: absolute;
  left: 0;
  color: white;
`;

const ActionWrapper = styled(FlexBox)`
  @media ${device.laptop} {
    justify-content: space-evenly;
  }
`;

export const RewardsBanner = () => {
  return (
    <Wrapper column>
      <Rewardheading>
        <Accountbutton>
          <RiAccountCircleFill
            onClick={() => {
              alert("Account button clicked");
            }}
          />
        </Accountbutton>
        <H2 bold color={ACCENT_0}>
          Rewards
        </H2>
      </Rewardheading>

      <ActionWrapper row justify="space-between" align="center">
        <FlexBox column>
          <Body2 color={ACCENT_0}>Refer your friends and</Body2>
          <H3 bold color={ACCENT_0}>
            Earn Care Coins
          </H3>
        </FlexBox>
        <FlexBox>
          <img src="/assets/images/businessman.svg" alt="picture" />
        </FlexBox>
      </ActionWrapper>
    </Wrapper>
  );
};
