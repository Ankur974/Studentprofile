import React from "react";
import { Body2, H2, H3 } from "../../components/common/ui/Headings";
import FlexBox from "../../components/common/ui/FlexBox";
import {
  ACCENT_0,
  PRIMARY_800,
  SECONDARY_800,
} from "../../components/common/ui/colors";
import { SlClock, SlStar } from "react-icons/sl";
import { Button } from "../../components/common/ui/Buttons";
import styled from "styled-components";

const Card = styled(FlexBox)`
  border-radius: 5px;
  padding-bottom: 20px;
  row-gap: 3px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_800};
`;

const BorderBox = styled.div`
  width: 0.5rem;
  height: 9.4rem;
  background-color: ${PRIMARY_800};
  border-radius: 0.25rem;
`;

export const ServiceCard = props => {
  function add() {
    console.log("Hello World");
    setClicked(true);
  }

  return (
    <Card>
      <BorderBox />
      <FlexBox
        row
        width="100%"
        justify="space-between"
        padding="2rem"
        align="center"
      >
        <FlexBox column>
          <H2 bold>{props.item.label}</H2>
          <H3>{props.item.desc}</H3>
          <FlexBox columnGap="1rem" align="center">
            <FlexBox columnGap="0.4rem" align="center">
              <SlClock />
              <H3>{props.item.time} mins</H3>
            </FlexBox>
            <FlexBox columnGap="0.4rem" align="center">
              <SlStar />
              <H3>({props.item.ratings})</H3>
              <H3>{props.item.reviews}</H3>
            </FlexBox>
          </FlexBox>
          <H3 bold>₹ {props.item.prize}</H3>
        </FlexBox>
        <Button
          color={SECONDARY_800}
          width="5.5rem"
          height="2.5rem"
          align="center"
          justify="center"
          borderRadius="0.6rem"
          onClick={add}
          hoverColor="none"
        >
          {props.clicked ? (
            <FlexBox columnGap="0.7rem">
              <H3 bold color={ACCENT_0}>
                +
              </H3>
              <H3 bold color={ACCENT_0}>
                1
              </H3>
              <H3 bold color={ACCENT_0}>
                -
              </H3>
            </FlexBox>
          ) : (
            <Body2 bold color={ACCENT_0}>
              Add
            </Body2>
          )}
        </Button>
      </FlexBox>
    </Card>
  );
};
