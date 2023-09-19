
import React from "react";
import { Body2, H3, H6 } from "../common/ui/Headings";
import FlexBox from "../common/ui/FlexBox";
import { ACCENT_0, PRIMARY_800, SECONDARY_800 } from "../common/ui/colors";
import { SlClock, SlStar } from "react-icons/sl";
import { Button } from "../common/ui/Buttons";
import styled from "styled-components";
import { device } from "../common/ui/Resposive";

const CardContainer = styled.div`
  border-bottom: 1px solid ${SECONDARY_800};
`;

const BorderBox = styled.div`
  width: 0.5rem;
  height: 9.5rem;
  background-color: ${PRIMARY_800};
`;
const Card = styled(FlexBox)`
   row-gap: 3px;
   justify-content: space-between;
   align-items: center;
`;
const ServiceDetails = styled(FlexBox)`
width:80%;
flex-direction:column;
@media ${device.laptop}{
width:50%;
display:column;
}
`;
export const ServiceCard = (props) => {
  function add() {
    console.log("Hello World");
    setClicked(true);
  }

  return (
    <CardContainer>
      <Card>
        <BorderBox />
        <FlexBox row width="100%" justify="space-between" padding="2rem" align="center">
          <ServiceDetails column width="50%">
            <H3 bold>{props.item.label}</H3>
            <H6>{props.item.desc}</H6>
            <FlexBox columnGap="1rem" align="center">
              <FlexBox columnGap="0.4rem" align="center">
                <SlClock />
                <H6>{props.item.time} mins</H6>
              </FlexBox>
              <FlexBox columnGap="0.4rem" align="center">
                <SlStar />
                <H6>({props.item.ratings})</H6>
                <H6>{props.item.reviews}</H6>
              </FlexBox>
            </FlexBox>
            <H6 bold>₹ {props.item.prize}</H6>
          </ServiceDetails>
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
    </CardContainer>
  );
};
