import React from "react";
import Card from "./Card";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { device } from "../common/ui/Resposive";

const discounts = [
  {
    title: "Discount 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Discount 2",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
  },
];

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
          imageUrl="/assets/banner-new.svg"
          link="/salon-details1"
        />
        <Card
          title="Hot Selling Salon 2"
          description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
          imageUrl="/assets/banner-new.svg"
          link="/salon-details2"
        />
      </FlexBox>
    </Wrapper>
  );
};

export default Home;