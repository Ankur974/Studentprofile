import React from "react";
import styled, { css } from "styled-components";
import { SlClock, SlStar } from "react-icons/sl";

import { Body1, Body2 } from "../common/ui/Headings";
import FlexBox from "../common/ui/FlexBox";
import { ACCENT_800, PRIMARY_800 } from "../common/ui/colors";
import { device } from "../common/ui/Resposive";

const CardContainer = styled.div`
  width: 100%;

  ${({ hideBorder }) =>
    !hideBorder &&
    css`
      border-bottom: 1px solid ${ACCENT_800};
    `}
`;

const BorderBox = styled.div`
  width: 0.5rem;
  height: 6rem;
  background-color: ${PRIMARY_800};
`;

const Card = styled(FlexBox)`
  row-gap: 3px;
  justify-content: space-between;
  align-items: center;
`;

const ServiceDetails = styled(FlexBox)`
  width: 80%;
  flex-direction: column;

  @media ${device.laptop} {
    width: 50%;
    display: column;
  }
`;

const ServiceCard = ({ item, lastItem }) => {
  return (
    <CardContainer hideBorder={lastItem}>
      <Card>
        <BorderBox />
        <FlexBox
          row
          width="100%"
          justify="space-between"
          padding="1rem"
          align="center"
        >
          <ServiceDetails column>
            <Body1 bold>{item.label}</Body1>
            <Body2>{item.desc}</Body2>
            <FlexBox columnGap="1rem" align="center">
              <FlexBox columnGap="0.4rem" align="center">
                <SlClock />
                <Body2>{item.time} mins</Body2>
              </FlexBox>
              <FlexBox columnGap="0.4rem" align="center">
                <SlStar />
                <Body2>({item.ratings})</Body2>
                <Body2>{item.reviews}</Body2>
              </FlexBox>
            </FlexBox>
            <Body2 bold>₹ {item.prize}</Body2>
          </ServiceDetails>
        </FlexBox>
      </Card>
    </CardContainer>
  );
};

export default ServiceCard;
