import React from "react";
import Card from "./Card";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Resposive";


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
          imageUrl="/assets/images/banner-new.svg"
          redirectUrl="/shop-listing"
        />
        <Card
          title="Hot Selling Salon 2"
          description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
          imageUrl="/assets/images/banner-new.svg"
          redirectUrl="/shop-listing"
        />
      </FlexBox>
    </Wrapper>
  );
};

export default Home;
