import FlexBox from "@common/ui/FlexBox";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

import {
  ACCENT_100,
  ACCENT_400,
  ACCENT_500,
  ACCENT_700,
  PRIMARY_800,
} from "@common/ui/colors";
import { Body2, Support } from "./Headings";

const Card = styled(FlexBox)`
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_400};
  background: ${ACCENT_100};
  padding: 1rem;
  width: 100%;
  height: 5rem;
  box-sizing: border-box;
`;

const ProviderImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const AlertCard = () => {
  return (
    <Card align="center" justify="space-between">
      <FlexBox align="center" columnGap="0.5rem">
        <ProviderImg src="https://cdn.theinnerhour.com/assets/images/avatar_flower_1.png" />
        <FlexBox column justify="center" padding="1rem" rowGap="0.2rem">
          <Body2 bold>Happiness Journal</Body2>
          <Support color={ACCENT_700}>by Pratishtha Mirza</Support>
        </FlexBox>
      </FlexBox>
      <FlexBox align="center" columnGap="1rem">
        <Support color={PRIMARY_800} bold>
          NEW!
        </Support>
        <FiChevronRight size="1rem" color={ACCENT_500} strokeWidth={3} />
      </FlexBox>
    </Card>
  );
};

export default AlertCard;
