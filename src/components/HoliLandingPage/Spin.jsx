import React, { useRef } from "react";
import { useRouter } from "next/router";
import SpinAndWin from "react-spin-game";
import "react-spin-game/dist/index.css";
import styled from "styled-components";
import { useSelector } from "react-redux";

import FlexBox from "@common/ui/FlexBox";
import EventPageLayout from "@layout/client/EventPageLayout";
import { Button } from "@common/ui/Buttons";
import { PRIMARY_800 } from "@common/ui/colors";
import GamePageHeading from "./QuizGame/GamePageHeading";

function generateSchema(couponCodes, colorCodes, winnerCode) {
  const schema = [];
  const numCoupons = 8;
  const winnerIndex = Math.floor(Math.random() * numCoupons);

  for (let i = 0; i < numCoupons; i++) {
    let couponCode, colorCode;
    if (i === winnerIndex) {
      couponCode = winnerCode;
      colorCode = colorCodes[Math.floor(Math.random() * colorCodes.length)];
    } else {
      const randomIndex = Math.floor(Math.random() * couponCodes.length);
      couponCode = couponCodes[randomIndex];
      colorCode = colorCodes[randomIndex];
    }
    schema.push([couponCode, colorCode]);
  }

  return schema;
}

const couponCodes = [
  "30-CARE-COIN",
  "NO-LUCK",
  "50-MANICURE",
  "70FACIAL",
  "NO-LUCK",
  "80-WAXING",
  "NO-LUCK",
  "500-CARE-COINS",
  "20%-OFF-HAIR",
  "100-RUPEES-OFF",
  "40%-OFF-MASSAG",
  "60%-OFF-FACIAL",
  "FREEWAX-MANI",
  "25%-OFF-SPA",
  "150-RUPEES-OFF",
  "90%-OFF-BRIDAL",
  "200-RUPEES-OFF",
  "10%-OFF-THREA",
  "75%-OFF-MENS",
  "30%-OFF-BODY",
];

const colorCodes = [
  "#7f644d", // Dark pastel orange
  "#5f748a", // Dark pastel blue
  "#6f6f6f", // Dark pastel gray
  "#946a89", // Dark pastel purple
  "#b783c5", // Dark pastel lavender
  "#837769", // Dark pastel brown
  "#8c7e72", // Dark pastel tan
  "#566b7e", // Dark pastel indigo
  "#4b6f6f", // Dark pastel teal
  "#917f7f", // Dark pastel maroon
  "#6e7b7b", // Dark pastel olive
  "#8f845e", // Dark pastel mustard
  "#6f5f7f", // Dark pastel mauve
  "#6f7f72", // Dark pastel slate
  "#6f7f6f", // Dark pastel sage
  "#756f7f", // Dark pastel plum
  "#7f6f73", // Dark pastel rose
  "#7f6f5e", // Dark pastel coral
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

  const user = useSelector(state => state?.auth?.user);

  const winnerCode = user?.spinAndWheel?.coupon_code;

  const freeSpinGifts = generateSchema(couponCodes, colorCodes, winnerCode);

  const handleSpin = () => {
    ref.current.handleSpin();
    setTimeout(() => {
      router.replace("/holi-2024/voucher");
    }, 12000);
  };

  return (
    <Wrapper>
      <EventPageLayout>
      <GamePageHeading
        heading="Spin The Wheel"
        subHeading="Spin the Wheel for Exclusive Access: Secure Your Early Entry to Our Exciting Launch!"
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
          result={winnerCode}
          hideButton={true}
          time={10}
          removeButtonEffect={true}
          horizantalText={false}
          fontFamily="poppins"
          fontSize="20"
        />
        <Button onClick={handleSpin}>Click Here To Spin</Button>
      </FlexBox>
      </EventPageLayout>
    </Wrapper>
  );
};

export default SpinWin;
