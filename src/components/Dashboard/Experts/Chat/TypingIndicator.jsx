import React from "react";
import styled, { keyframes } from "styled-components";

import { DARK_MOSS_GREEN_900, DARK_MOSS_GREEN_100 } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";

const typingAnimation = keyframes`
  0% {
    transform: scale(0.75);
    opacity: 0.5;
  }
  44% {
    transform: scale(1);
    opacity: 1;
  }
`;

const TypingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 17px;
  column-gap: 4px;
`;

const TypingDot = styled.div`
  background-color: ${DARK_MOSS_GREEN_900};
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  height: 8px;
  width: 8px;
  animation: ${typingAnimation} 1s infinite ease-in-out;
  :nth-child(1) {
    animation-delay: 200ms;
  }
  :nth-child(2) {
    animation-delay: 300ms;
  }
  :nth-child(3) {
    animation-delay: 400ms;
  }
`;

const Card = styled(FlexBox)`
  max-width: 75%;
  flex-direction: column;
  padding: 1rem;
  background-color: ${DARK_MOSS_GREEN_100};
  align-self: start;
  border-radius: 0.5rem 0.5rem 0.5rem 0;
  margin: 0.5rem 0 1rem 1.5rem;

  @media screen and (max-width: 768px) {
    margin: 0.5rem 0 1rem 1rem;
  }
`;

const TypingIndicator = () => (
  <Card>
    <TypingContainer>
      {[1, 2, 3].map(i => (
        <TypingDot key={i} />
      ))}
    </TypingContainer>
  </Card>
);

export default TypingIndicator;
