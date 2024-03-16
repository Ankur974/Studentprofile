import React, { useRef } from "react";
import { useRouter } from "next/router";
import SpinAndWin from "react-spin-game";
import "react-spin-game/dist/index.css";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Button } from "@common/ui/Buttons";
import { PRIMARY_800 } from "@common/ui/colors";
import GamePageHeading from "./QuizGame/GamePageHeading";

const freeSpinGifts = [
  ["90% off on Haircut", "#a87b7b"],
  ["50% off on Manicure", "#b59178"],
  ["75% off on Pedicure", "#b5ab7e"],
  ["60% off on Massage", "#7eab8f"],
  ["70% off on Facial", "#7e97ab"],
  ["80% off on Waxing", "#8a7eb5"],
  ["50 Care Coins", "#b59dab"],
  ["Better Luck Next Time", "#999999"],
];

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 3.5rem;
  padding: 1rem;
  margin: 1rem;
  justify-content: center;
  align-items: center;

  ._28Wol {
    background-color: ${PRIMARY_800};
    max-width: 25.9375rem;
    max-height: 25.9375rem;
    min-width: 25.9375rem;
    min-height: 25.9375rem;
  }

  ._1E7u3 {
    width: 22.5rem;
    height: 22.5rem;
  }
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
