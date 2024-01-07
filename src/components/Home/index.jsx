import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Resposive";
import { offerCard2data } from "@metadata/CarouselData";
import SliderComponent from "@common/SliderComponent";
import Card from "./Card";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 2.5rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 0;
  }
`;

const data = [
  {
    id: 1,
    heading: "Get my salon",
    subHeadings: "choose your offers",
    isBannerP: "assets/images/girls-image.jpg",
    color: "#f4d0c4",
    viewall: true,
  },
  {
    id: 2,
    heading: "Top salons of week",
    color: "#958e87",
    viewall: false,
  },
  {
    id: 2,
    heading: "Most Visited salons",
    subHeadings: "300 visit last month",
    color: "#edc09c",
    viewall: true,
  },
];

const CardContainer = styled(FlexBox)`
  overflow-x: scroll;
  width: 100%;
`;

const SliderContainer = styled(FlexBox)`
  flex-direction: column;
  width: 100vw;
  row-gap: 2rem;
  max-width: 30rem;
`;

const Home = () => {
  return (
    <Wrapper>
      <CardContainer>
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
      </CardContainer>
      <SliderContainer column>
        {data.map(item => (
          <FlexBox key={item.id} width="5rem">
            <SliderComponent data={offerCard2data} newData={item} />
          </FlexBox>
        ))}
      </SliderContainer>

      {/* <SliderComponent2 data={data2} newData={data} /> */}
    </Wrapper>
  );
};

export default Home;
