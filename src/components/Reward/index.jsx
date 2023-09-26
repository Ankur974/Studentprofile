import React from "react";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import { ACCENT_100, PRIMARY_900, SECONDARY_100 } from "../common/ui/colors";
import { RewardsBanner } from "./RewardsBanner";
import { OffersCard } from "./OffersCard";
import { BalanceCard } from "./BalanceCard";
import { RedemptionCard } from "./RedemptionCard";
import { device } from "../common/ui/Resposive";
import { H2 } from "../common/ui/Headings";
import { BarbarBanner } from "./BarbarBanner";

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

const redeemData = [
  {
    id: 1,
    valid: true,
    imgsrc: "/assets/Beauty.svg",
    title: "Book a haircut cut in 7 days and earn care coins",
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    valid: false,
    imgsrc: "/assets/Beauty.svg",
    title: "Book a haircut cut in 7 days and earn care coins",
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    valid: true,
    imgsrc: "/assets/Beauty.svg",
    title: "Book a haircut cut in 7 days and earn care coins",
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: 4,
    valid: false,
    imgsrc: "/assets/Beauty.svg",
    title: "Book a haircut cut in 7 days and earn care coins",
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: 1,
    valid: true,
    imgsrc: "/assets/Beauty.svg",
    title: "Book a haircut cut in 7 days and earn care coins",
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    valid: false,
    imgsrc: "/assets/Beauty.svg",
    title: "Book a haircut cut in 7 days and earn care coins",
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    valid: true,
    imgsrc: "/assets/Beauty.svg",
    title: "Book a haircut cut in 7 days and earn care coins",
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: 4,
    valid: false,
    imgsrc: "/assets/Beauty.svg",
    title: "Book a haircut cut in 7 days and earn care coins",
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
];

const Wrapper = styled(FlexBox)`
  background-color: ${PRIMARY_900};
  height: 100%;
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

const Container = styled(FlexBox)`
  width: 100%;
  background-color: ${ACCENT_100};
  border-radius: 1rem 1rem 0 0;
  padding: 4rem 0 0 0;

  @media ${device.laptop} {
    padding: 6rem 0rem 0 0rem;
    justify-content: space-around;
  }
`;

const FlexScroll = styled(FlexBox)`
  column-gap: 1rem;
  padding-left: 1rem;
  width: 100%;
  max-width: 75rem;
  overflow-x: scroll;

  @media ${device.laptop} {
    overflow: hidden;
    flex-wrap: wrap;
    max-width: 90rem;
  }
`;

const CardWrapper = styled(FlexBox)`
  flex: 1 1 calc(33.333% - 1rem);
  min-width: 12rem;
  margin-bottom: 1rem;
  max-width: 20rem;

  @media ${device.laptop} {
    min-width: 20rem;
  }
`;

const RedeemBox = styled(FlexBox)`
  padding: 1rem;
`;
const RedemptionCardContainer = styled(FlexBox)`
  width: 100%;
  padding: 2rem 1rem 0 1rem;

  @media ${device.laptop} {
    justify-content: space-around;
  }
`;

const RewardPage = () => {
  return (
    <Wrapper column>
      <FlexBox position="relative" top="0">
        <RewardsBanner />
        <CoinsContainer>
          <BalanceCard showArrow />
        </CoinsContainer>
      </FlexBox>
      <Container column>
        <RedemptionCardContainer>
          <FlexScroll>
            {dummyData.map(item => (
              <CardWrapper key={item.id}>
                <OffersCard data={item} />
              </CardWrapper>
            ))}
          </FlexScroll>
        </RedemptionCardContainer>
        <RedeemBox column>
          <H2>Reedemption Offers</H2>
          <RedemptionCardContainer>
            <FlexScroll>
              {redeemData.map(item => (
                <CardWrapper key={item.id}>
                  <RedemptionCard data={item} />
                </CardWrapper>
              ))}
            </FlexScroll>
          </RedemptionCardContainer>
        </RedeemBox>
        <BarbarBanner />
      </Container>
    </Wrapper>
  );
};

export default RewardPage;
