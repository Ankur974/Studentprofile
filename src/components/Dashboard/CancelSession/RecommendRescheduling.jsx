import React from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { H4 } from "@common/ui/Headings";
import { ACCENT_800, SECONDARY_800 } from "@common/ui/colors";

const Dot = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 4rem;
  background-color: ${ACCENT_800};
`;

const TextCta = styled.button`
  background: none;
  border: none;
  width: fit-content;
  color: ${SECONDARY_800};
  font-family: Quicksand;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
  text-decoration-line: underline;
`;

const recommendReschedulingText = [
  "Being consistent with your sessions helps you make steady progress.",
  "It is important to stay committed to your recovery journey.",
  "Your therapist has already blocked their time for you.",
];

const RecommendRescheduling = () => {
  return (
    <>
      <H4 bold>
        Please note: Credits for sessions cancelled less than 12 hours before
        the scheduled time will not be reimbursed.
      </H4>
      <H4>
        We recommend rescheduling a session instead of cancelling, because:
      </H4>
      <FlexBox column>
        {recommendReschedulingText.map((text, index) => (
          <FlexBox key={index} align="baseline" columnGap="0.5rem">
            <Dot />
            <H4>{text}</H4>
          </FlexBox>
        ))}
      </FlexBox>
      <TextCta
        onClick={() => {
          // TODO: add logic here
        }}
      >
        Cancellation Policy
      </TextCta>
    </>
  );
};

export default RecommendRescheduling;
