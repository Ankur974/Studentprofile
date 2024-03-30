import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Image from "next/image";
import { useSelector } from "react-redux";

import FlexBox from "@common/ui/FlexBox";
import { Body1, Body2, H2, H1 } from "@common/ui/Headings";
import { ACCENT_0, MID_TONE_PURPLE } from "@common/ui/colors";
import { device } from "@common/ui/Responsive";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";

const Wrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  background: var(--gradient, linear-gradient(180deg, #c6426e, #533a71));
`;

const H_2 = styled(H2)`
  font-family: Lemon;
  letter-spacing: 2px;
  text-align: center;
  color: ${ACCENT_0};
  text-transform: capitalize;
`;

const Body_1 = styled(Body1)`
  color: ${ACCENT_0};
`;

const ItemContainer = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  margin: auto;
  gap: 2.5rem;

  @media ${device.laptop} {
    padding: 2.5rem 2.5rem 0;
  }
`;

const SalonDetails = styled(FlexBox)`
  flex-direction: column;
  align-items: start;
  padding: 1.5rem 0.25rem;
  gap: 0.75rem;
`;

const CouponDate = styled(FlexBox)`
  width: auto;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  background: ${ACCENT_0};
  border-radius: 0.5rem;
`;

const SocialBox = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem 2.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  background: ${ACCENT_0};
  border-radius: 0.75rem;
  cursor: pointer;
`;

const Img = styled.img`
  width: auto;
  height: auto;
  max-width: 15.2rem;
  max-height: 17.9375rem;
`;

// const Button = styled(FlexBox)`
//   display: inline-flex;
//   padding: 0.5rem 2rem;
//   justify-content: center;
//   align-items: center;
//   gap: 0.625rem;

//   border-radius: 4.25rem;
//   background: ${ACCENT_200};
// `;

const ScorePage = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  const user = useSelector(state => state?.auth?.user);

  const voucher = user?.spinAndWheel;

  useEffect(() => {
    approveVoucher();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  const approveVoucher = async () => {
    try {
      await client.get(`${URL?.approveVoucher}?id=${user?.userId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenInstagram = () => {
    window.open(
      "https://www.instagram.com/pamprazzi?igsh=MTBwazIxY3FmZ2Q1MQ==",
      "_blank"
    );
  };

  return (
    <Wrapper>
      {showConfetti && <Fireworks autorun={{ speed: 1 }} />}
      <ItemContainer>
        <H_2 textTransform="uppercase">
          CONGRATULATIONS!
          <br />
          you WON A VOUCHER
        </H_2>
        <FlexBox column rowGap="1rem">
          <FlexBox justify="center">
            <Img src="/assets/images/voucher-bg.webp" />
            {/* <FlexBox position="absolute" column rowGap="2rem"> */}
            <FlexBox
              column
              align="center"
              position="absolute"
              rowGap="0.25rem"
              padding="3.5rem 0"
            >
              <Body2 color={ACCENT_0} textTransform="uppercase">
                {voucher?.service} voucher
              </Body2>
              <H1 bold color={ACCENT_0} textTransform="uppercase">
                {voucher?.coupon_code}
              </H1>
              {/* </FlexBox>
              <Button>
                <Body1 bold>Reedem</Body1>
              </Button> */}
            </FlexBox>
          </FlexBox>
          <SalonDetails>
            <Body_1>Details:</Body_1>
            {/* <Body_1 bold>SK Hair & Spa</Body_1>
            <Body_1 whiteSpace="wrap">
              21, b/3, L colony, Behind SK farm and sports, Vilas Street, West
              Bengal - 876453
            </Body_1> */}
            <CouponDate>
              <Body2 color={MID_TONE_PURPLE}>{voucher?.description}</Body2>
            </CouponDate>
            <FlexBox column>
              <Body2 color={ACCENT_0}>
                {voucher?.service !== "Care Coin"
                  ? "Note: Your Pre-Launch Coupon is ready! Redeem it at nearby salons from March 26 to April 15."
                  : "Note: Care Coins available in your account from March 26. Use them to book appointments effortlessly!"}
              </Body2>
              <Body2 color={ACCENT_0}>{voucher?.terms_condition}</Body2>
            </FlexBox>
          </SalonDetails>
        </FlexBox>
        <FlexBox column rowGap="0.25rem">
          <Body2 color={ACCENT_0}>
            Follow us on Instagram for launch updates on March 26th
          </Body2>
          <SocialBox onClick={handleOpenInstagram}>
            <Image
              src="/assets/instagram.webp"
              alt="ig"
              width={20}
              height={20}
            />
            <Body2 color={MID_TONE_PURPLE}>Follow us @pamprazzi</Body2>
          </SocialBox>
        </FlexBox>
      </ItemContainer>
    </Wrapper>
  );
};

export default ScorePage;
