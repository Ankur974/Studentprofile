import React from "react";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import { PRIMARY_900, SECONDARY_100 } from "../common/ui/colors";
import { RewardBanner } from "./RewardBanner";
import { OfferCard } from "./OfferCard";
import { BalanceContainer } from "./BalanceContainer";

const dummyData = [
  {
    id: 1,
    imgsrc: "/assets/offerimage.svg",
    title: "Rating and Reviews",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit et",
    coins: 5,
    backgroundColor: "pink",
  },
  {
    id: 2,
    imgsrc: "/assets/offerimage.svg",
    title: "Rating and Reviews",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit et",
    coins: 5,
    backgroundColor: SECONDARY_100,
  },
  {
    id: 3,
    imgsrc: "/assets/offerimage.svg",
    title: "Rating and Reviews",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit et",
    coins: 5,
    backgroundColor: "pink",
  },
];

const Wrapper = styled(FlexBox)`
  background-color: ${PRIMARY_900};
  width: 100%;
`;

const CoinsContainer = styled(FlexBox)`
  width: calc(100% - 2rem);
  position: absolute;
  bottom: -3rem;
  left: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.11);
`;

const OfferContainer = styled(FlexBox)`
  background-color: white;
  border-radius: 1rem 1rem 0 0;
  padding: 4rem 1rem 0 1rem;
  column-gap: 1rem;
  width: 100%;
  overflow-x: auto;
`;

const CardWrapper = styled(FlexBox)`
  flex: 1 1 calc(33.333% - 1rem);
  min-width: 12rem;
  margin-bottom: 1rem;
`;

const RewardPage = () => {
  return (
    <Wrapper column>
      <FlexBox position="relative" top="0">
        <RewardBanner />
        <CoinsContainer>
          <BalanceContainer showArrow />
        </CoinsContainer>
      </FlexBox>
      <OfferContainer>
        {dummyData.map(item => (
          <CardWrapper key={item.id}>
            <OfferCard data={item} />
          </CardWrapper>
        ))}
      </OfferContainer>
    </Wrapper>
  );
};

export default RewardPage;
