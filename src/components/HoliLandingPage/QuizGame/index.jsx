import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Resposive";
import { Display, H2 } from "@common/ui/Headings";
import { ACCENT_500 } from "@common/ui/colors";
import GamePageHeading from "./GamePageHeading";
// import Quiz from "./Quiz";
import SpinWin from "../Spin";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  margin: 0.75rem;
  max-width: 30rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media ${device.laptop} {
    margin: auto;
  }
`;

const scaleUpDownAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
`;

const Counter = styled(Display)`
  animation: ${scaleUpDownAnimation} 1000ms ease-in-out;
`;

const Gamify = () => {
  const [counter, setCounter] = useState(5);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (counter > 0) {
        setCounter(prevCounter => prevCounter - 1);
        setAnimationKey(prevKey => prevKey + 1); // Change the animation key to trigger re-mount
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [counter]);

  return (
    <Wrapper>
      {counter === 0 ? (
        <SpinWin/>
      ) : (
        <>
          <GamePageHeading
            heading="Spin Game"
            subHeading="Lorem ipsum dolor sit amet consectetur. Bibendum dui porta leo sed neque."
          />
          <FlexBox column align="center" padding="3rem 0" rowGap="1rem">
            <H2>Quiz starts in...</H2>
            <Counter key={animationKey} color={ACCENT_500}>
              {counter}
            </Counter>
          </FlexBox>
        </>
      )}
    </Wrapper>
  );
};

export default Gamify;
