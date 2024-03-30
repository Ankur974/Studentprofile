import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";
import Slider from "./Slider";
import { H3 } from "@common/ui/Headings";
import OfferCard from "./OfferCard";
import TopSalon from "@components/Home/TopSalon";
import Localities from "@components/Home/Localities";
import { categoryData } from "@metadata/CategoryData";
import { PRIMARY_900, listingChip } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  row-gap: 4rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 0;
  }
`;

const Divider = styled(FlexBox)`
  border-bottom: 1px solid ${listingChip};
`;

const Home = () => {
  return (
    <>
      <Wrapper>
        <FlexBox column rowGap="4rem">
          <Slider heading="What are you looking for?" data={categoryData} />
          <Divider />
        </FlexBox>
        <FlexBox column rowGap="2rem">
          <H3 bold>Offers For You</H3>
          <OfferCard />
        </FlexBox>
        <TopSalon />
      </Wrapper>
      <FlexBox backgroundColor={PRIMARY_900} column padding="2rem 0">
        <Wrapper>
          <Localities />
        </Wrapper>
      </FlexBox>
    </>
  );
};

export default Home;
