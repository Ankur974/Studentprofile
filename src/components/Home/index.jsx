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
import { device } from "@common/ui/Responsive";
import Slider from "./Slider";
import OfferCards from "./OfferCards";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  row-gap: 2rem;
  padding: 6rem 1rem 2rem;

  @media ${device.laptop} {
    row-gap: 4rem;
    padding: 6rem 1rem 4rem;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  margin: auto;
  flex-direction: column;
  padding: 2rem 1rem;

  @media ${device.laptop} {
    padding: 4rem 1rem;
  }
`;

const Divider = styled(FlexBox)`
  border-bottom: 1px solid ${listingChip};
`;

const SliderContainer = styled(FlexBox)`
  flex-direction: column;
  row-gap: 2rem;

  @media ${device.laptop} {
    row-gap: 4rem;
  }
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
        <SliderContainer>
          <Slider heading="What are you looking for?" data={categoryData} />
          <Divider />
        </SliderContainer>
        <FlexBox column rowGap="2rem">
          <H3 bold>Offers For You</H3>
          <OfferCards />
        </FlexBox>
        <TopSalon />
      </Wrapper>
      <FlexBox backgroundColor={PRIMARY_900}>
        <Container>
          <Localities />
        </Container>
      </FlexBox>
    </>
  );
};

export default Home;
