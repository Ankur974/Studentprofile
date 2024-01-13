import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import { FiChevronRight } from "react-icons/fi";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Resposive";
import { offerCard2data, offerCard2data2 } from "@metadata/CarouselData";
import SliderComponent from "@common/SliderComponent";
import SliderComponent2 from "@common/SliderComponent2";
import Card from "./Card";
import { Body1, H3 } from "@components/common/ui/Headings";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  row-gap: 5rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 0;
  }
`;

const CardContainer = styled(FlexBox)`
  overflow-x: scroll;
  width: 100%;
  gap: 0rem;
`;

const ViewButton = styled(FlexBox)`
  column-gap: 0.25rem;
  align-items: center;
  transition: all 0.3s ease 0.1s;
  cursor: pointer;

  @media ${device.laptop} {
    column-gap: 5px;
    align-items: center;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <FlexBox column>
        <FlexBox justify="space-between">
          <H3>Premium Services</H3>
          <ViewButton>
            <Body1>View All</Body1>
            <FiChevronRight />
          </ViewButton>
        </FlexBox>
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
      </FlexBox>

      <FlexBox>
        <SliderComponent2 data={offerCard2data} heading="Testing of Slider2" />
      </FlexBox>

      <FlexBox>
        <SliderComponent
          data={offerCard2data}
          newData={{
            id: 1,
            heading: "Get my salon",
            subHeadings: "choose your offers",
            isBannerP: "/assets/images/girls-image.jpg",
            color: "#f4d0c4",
            viewall: true,
          }}
        />
      </FlexBox>
      <FlexBox column>
        <FlexBox justify="space-between">
          <H3>Top Offers</H3>
          <ViewButton>
            <Body1>View All</Body1>
            <FiChevronRight />
          </ViewButton>
        </FlexBox>
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
      </FlexBox>
      <FlexBox>
        <SliderComponent
          data={offerCard2data2}
          newData={{
            id: 2,
            heading: "Top salons of week",
            color: "#d0d5c5",
            viewall: false,
          }}
        />
      </FlexBox>
    </Wrapper>
  );
};

export default Home;
