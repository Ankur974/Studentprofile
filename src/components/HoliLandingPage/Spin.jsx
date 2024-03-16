import React, { useRef } from "react";
import { useRouter } from "next/router";
import SpinAndWin from "react-spin-game";
import "react-spin-game/dist/index.css";
import FlexBox from "@common/UI/FlexBox";
import GamePageHeading from "./QuizGame/GamePageHeading";
import styled from "styled-components";
import { Button } from "@common/ui/Buttons";

const freeSpinGifts = [
  ["shimul", "#ff0000"],
  ["ayush", "#e6ac00"],
  ["anirban", "#ff00bf"],
  ["sujit", "#00b300"],
  ["souvik", "#0000ff"],
  ["bittu", "#cc00ff"],
];

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 3.5rem;
  padding: 1rem;
  margin: 1rem;
  justify-content: center;
  align-items: center;
`;

const SpinWin = () => {
  const router = useRouter();
  const ref = useRef(null);
  let prize = "ayush";

  const handleSpin = () => {
    ref.current.handleSpin();
    setTimeout(() => {
       router.push(`/holi-landing/${encodeURIComponent(prize)}`);
    }, 12000);
  };

  return (
    <Wrapper>
      <GamePageHeading
        heading="Spin The Wheel"
        subHeading="Lorem ipsum dolor sit amet consectetur. Bibendum dui porta leo sed neque."
      />
      <FlexBox
        column
        align="center"
        justify="center"
        rowGap="2rem"
        width="27rem"
      >
        <SpinAndWin
          ref={ref}
          data={freeSpinGifts}
          result={prize}
          hideButton={true}
          time={10}
          removeButtonEffect={true}
          horizantalText={false}
          fontFamily="poppins"
          fontSize="20"
        />
        <Button onClick={handleSpin}>Click Here To Spin</Button>
      </FlexBox>
    </Wrapper>
  );
};

export default SpinWin;
