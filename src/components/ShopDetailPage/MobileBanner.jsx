import React from "react";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import SalonInfo from "./SalonInfo";
import { Button } from "../common/ui/Buttons";
import { ACCENT_0, ACCENT_800 } from "../common/ui/colors";

import { useRouter } from "next/router";
import { Body1 } from "../common/ui/Headings";

const Banner = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const NewButton = styled(Button)`
  position: absolute;
  background-color: ${ACCENT_0};
  bottom: 2%;
  padding: 0.2rem;
  border-radius: 6px;
  right: 5%;
  color: ${ACCENT_0};
`;

const MobileBanner = () => {
  const router = useRouter();
  return (
    <Banner>
      <FlexBox position="relative">
        <Img src="/assets/banner-new.svg" />
        <NewButton onClick={() => router.push("/shop-details/carousel")}>
          <Body1>show more</Body1>
        </NewButton>
      </FlexBox>

      <SalonInfo />
    </Banner>
  );
};

export default MobileBanner;
