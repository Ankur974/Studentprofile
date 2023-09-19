import React, { useState } from "react";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import { H2, H5 } from "../common/ui/Headings";
import { Body2 } from "../common/ui/Headings";
import { SlHeart, SlMap, SlSymbolMale } from "react-icons/sl";
import {
  ACCENT_0,
  ACCENT_700,
  PRIMARY_800,
  RATEBACKGROUND,
  listingChip,
} from "../common/ui/colors";
import Chip from "../common/ui/Chips";
import { CiDiscount1 } from "react-icons/ci";
import { Button } from "../common/ui/Buttons";
import { device } from "../common/ui/Resposive";
import { BsFillHeartFill } from "react-icons/bs";

const Wrapper = styled(FlexBox)`
  border: 1px solid ${listingChip};
  padding: 0 0 0.3rem 0;
  width: 100%;
  border-radius: 0.625rem;
  max-width: 23.75rem;
  row-gap: 0.5rem;
  margin: auto;

  @media ${device.laptop}{
    margin:0;
  }
  
`;

const aminities = [
  {
    id: 1,
    label: "Air conditioning",
  },
  {
    id: 12,
    label: "Parking",
  },
  {
    id: 2,
    label: "Kids Friendly",
  },
];

const Banner = styled(FlexBox)`
  position: relative;
  top: 0;
`;

const Img = styled.img`
  height: 13.5rem;
  object-fit: cover;
  border-radius: 0.625rem 0.625rem 0rem 0rem;
`;

const ActionWrapper = styled(FlexBox)`
  position: absolute;
  top: 0.8rem;
  width: 100%;
  padding: 0 1rem;
`;

const AminitiesWrapper = styled(FlexBox)`
  gap: 0.5rem;
  overflow-x: auto;
  ${'' /* width: 100%; */}
  margin: 0 -1rem;
  padding: 0 1rem;
  width: calc(100% + 2rem);

  @media ${device.laptop} {
    flex-wrap: wrap;
    overflow: hidden;
  }
`;

const OfferBanner = styled(FlexBox)`
  position: absolute;
  bottom: -0.9rem;
  align-items: center;
  width: 80%;
  column-gap: 0.5rem;
  background-color: ${PRIMARY_800};
  border-radius: 0.25rem;
  justify-content: center;
`;

const Card = () => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => setSelected(!selected);

  const dummydata = 10;

  const OfferRendering = ({ data }) => {
    if (data) {
      return (
        <OfferBanner>
          <CiDiscount1 color={ACCENT_0} />
          <Body2 color={ACCENT_0} padding="0.2rem 0">
            {data}% off on first visit
          </Body2>
        </OfferBanner>
      );
    }
  };

  return (
    <Wrapper column>
      <Banner column>
        <Img src="/assets/banner-new.svg" alt="Card1" />
        <ActionWrapper columnGap="13rem" align="center">
          <FlexBox
            borderRadius="0.25rem"
            width="4rem"
            align="center"
            justify="center"
            backgroundColor="#FFFFFF80"
          >
            <H5 color="white">Popular</H5>
          </FlexBox>
          <FlexBox
            align="center"
            justify="center"
            borderRadius="0.25rem"
            backgroundColor={RATEBACKGROUND}
            padding="0 0.20rem"
            columnGap="0.4rem"
            margin="0 1rem"
          >
            <img src="/assets/star.svg" />
            <Body2 color={ACCENT_0}>4.2</Body2>
          </FlexBox>
        </ActionWrapper>
        <FlexBox justify="center">
          {<OfferRendering data={dummydata} />}
        </FlexBox>
      </Banner>

      <FlexBox column rowGap="0.25rem" padding="0 1rem">
        <FlexBox justify="space-between" padding="1rem 0 0 0">
          <H2 bold>Gigi's Salon</H2>
          <FlexBox onClick={handleClick} cursor="pointer">
            {selected ? (
              <BsFillHeartFill size="1.25rem" color={PRIMARY_800} />
            ) : (
              <SlHeart size="1.25rem" color={PRIMARY_800} />
            )}
          </FlexBox>
        </FlexBox>

        <FlexBox columnGap="0.9rem">
          <FlexBox columnGap="0.40rem" align="center">
            <SlSymbolMale color={ACCENT_700} />
            <Body2>Salon for Men</Body2>
          </FlexBox>
          <FlexBox columnGap="0.40rem" align="center">
            <SlMap />
            <Body2>3 kms</Body2>
          </FlexBox>
        </FlexBox>

        <H2 bold>Price starting at 300/-</H2>

        <AminitiesWrapper>
          {aminities.map(item => (
            <Chip border="none" key={item?.id} width="fit-content">
              <Body2>{item?.label}</Body2>
            </Chip>
          ))}
        </AminitiesWrapper>
        <Button secondary rowGap="1rem">
          View Details
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default Card;
