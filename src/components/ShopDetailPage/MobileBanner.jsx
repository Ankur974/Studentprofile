import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_0, ACCENT_200 } from "@common/ui/colors";
import { Body1 } from "@common/ui/Headings";
import SalonInfo from "./SalonInfo";

const Banner = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const ViewMoreButton = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_0};
  cursor: pointer;

  :hover {
    background-color: ${ACCENT_200};
  }
`;

const MobileBanner = () => {
  const router = useRouter();
  return (
    <Banner>
      <FlexBox position="relative">
        <Img src="/assets/images/banner-new.svg" />
        <ViewMoreButton onClick={() => router.push("/shop-details/carousel")}>
          <Body1 bold>Show more</Body1>
        </ViewMoreButton>
      </FlexBox>
      <SalonInfo />
    </Banner>
  );
};

export default MobileBanner;
