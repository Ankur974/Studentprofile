import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import axios from "axios";

import FlexBox from "@common/ui/FlexBox";
import { H3 } from "@common/ui/Headings";
import TopSalon from "@components/Home/TopSalon";
import Localities from "@components/Home/Localities";
import { categoryData } from "@metadata/CategoryData";
import { URL } from "@constants/urls";
import { PRIMARY_900, listingChip } from "@common/ui/colors";
import Slider from "./Slider";
import OfferCard from "./OfferCard";
import { device } from "@common/ui/Responsive";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  row-gap: 2rem;
  padding: 6rem 1rem 2rem;

  @media ${device.laptop} {
    row-gap: 4rem;
  }
`;

const Divider = styled(FlexBox)`
  border-bottom: 1px solid ${listingChip};
`;

const Home = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(URL.loginSuccess, {
          withCredentials: true,
        });
        console.log("response", response);
      } catch (error) {
        //add bugsnag
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Wrapper>
        <FlexBox column rowGap="2rem">
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
