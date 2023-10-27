import React from "react";
import styled from "styled-components";
import { Body2 } from "./ui/Headings";
import FlexBox from "./ui/FlexBox";
import { ACCENT_0, ACCENT_900 } from "./ui/colors";

const QuantityBox = styled(FlexBox)`
  width: 100%;
  align-items: stretch;
  justify-content: space-between;
  background-color: ${ACCENT_900};
  color: ${ACCENT_0};
  padding: 0.1rem 0.5rem;
  border-radius: 0.5rem;
  max-width: 4rem;
  cursor: pointer;
`;

export function QuantityButton(props) {
  return (
    <QuantityBox>
      <Body2
        color={ACCENT_0}
        onClick={() => props.handleDecrease(props.item.id)}
      >
        -
      </Body2>
      <Body2 bold color={ACCENT_0} cursor="auto">
        {props.item.quantity}
      </Body2>
      <Body2
        color={ACCENT_0}
        onClick={() => props.handleIncrease(props.item.id)}
      >
        +
      </Body2>
    </QuantityBox>
  );
}
