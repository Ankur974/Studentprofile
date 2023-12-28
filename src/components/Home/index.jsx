import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Resposive";
import SliderComponent from "@common/SliderComponent";
import Card from "./Card";
import { offerCard2data } from "@metadata/CarouselData";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 1.5rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 0;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <FlexBox>
        <Card
          title="Hot Selling Salon 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          imageUrl="/assets/salon-image3.jpg"
          redirectUrl="/shop-listing"
        />
        <Card
          title="Hot Selling Salon 2"
          description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
          imageUrl="/assets/salon-image3.jpg"
          redirectUrl="/shop-listing"
        />
      </FlexBox>
      <SliderComponent
        data={offerCard2data}
        heading="Get my salon"
        subHeadings="Choose your offers"
      />
    </Wrapper>
  );
};

export default Home;
