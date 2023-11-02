import React from "react";
import Card from "./Card";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { device } from "../common/ui/Resposive";
import OfferCard2 from "./OfferCard2";

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

const offerCard2data = [
  {
    id: 1,
    color:
      "linear-gradient(320deg, rgba(209,0,0,0.6090805951286764) 0%, rgba(253,45,57,0.9508172898065477) 100%);",
    title: "GET 40% OFF",
    desc: "Lorem ipsum, dolor sit amet consectetur.",
    imglogo: "/assets/coin.svg",
    mainimg: "/assets/coin.svg",
  },
];

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

      <FlexBox>
        <OfferCard2 data={offerCard2data} />
        {/* <OfferCard2 data={offerCard2data} />
        <OfferCard2 data={offerCard2data} />
        <OfferCard2 data={offerCard2data} />
        <OfferCard2 data={offerCard2data} />
        <OfferCard2 data={offerCard2data} />
        <OfferCard2 data={offerCard2data} />
        <OfferCard2 data={offerCard2data} />
        <OfferCard2 data={offerCard2data} /> */}
      </FlexBox>
    </Wrapper>
  );
};

export default Home;
