import React from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import {
  BRICK_TERRACOTA,
  BUTTERSCOTH_200,
  DAVYS_GREY_100,
  DAVYS_GREY_400,
  DAVYS_GREY_500,
  DAVYS_GREY_700,
  PRIMARY_800,
} from "../../../constants/colors";
import { Body2, Support } from "./Headings";

const Card = styled(FlexBox)`
  border-radius: 0.5rem;
  background: ${({ isNsp }) => (isNsp ? BRICK_TERRACOTA : DAVYS_GREY_100)};
  border: ${({ isNsp }) =>
    isNsp ? `1px dashed ${PRIMARY_800}` : `1px solid ${DAVYS_GREY_400}`};
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const SessionDetails = styled(FlexBox)`
  width: 100%;
  column-gap: 1rem;
`;

const CountChip = styled(FlexBox)`
  background: ${BUTTERSCOTH_200};
  border-radius: 1.25rem;
  width: 3rem;
  padding: 0rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const SessionCreditCard = () => {
  return (
    <Card column>
      <SessionDetails align="center">
        <FlexBox column rowGap="0.5rem" width="50%">
          <Support color={DAVYS_GREY_700}>Therapy session with</Support>
          <Body2 bold>Pratistha Mirza</Body2>
        </FlexBox>
        <FlexBox column rowGap="0.5rem" width="20%">
          <img src="/assets/images/dashboard/icon-live.svg" width={24} />
          <Support bold>60 min</Support>
        </FlexBox>
        <FlexBox
          align="center"
          justify="flex-end"
          columnGap="0.5rem"
          width="30%"
        >
          <CountChip>
            <Body2 bold>x8</Body2>
          </CountChip>
          <FiChevronRight size="1rem" color={DAVYS_GREY_500} strokeWidth={3} />
        </FlexBox>
      </SessionDetails>
    </Card>
  );
};

export default SessionCreditCard;
