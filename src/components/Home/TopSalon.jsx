import React, { useState } from "react";
import styled from "styled-components";
import { SlHeart } from "react-icons/sl";
import { CiDiscount1 } from "react-icons/ci";
import { BsFillHeartFill } from "react-icons/bs";
import { useRouter } from "next/router";

import { H5, H3, Body2 } from "@common/ui/Headings";
import {
  ACCENT_0,
  PRIMARY_900,
  RATE_BACKGROUND,
  listingChip,
  SECONDARY_500,
} from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";
import { IconButton } from "@common/ui/Buttons";
import { TbChevronRight } from "react-icons/tb";

const Wrapper = styled(FlexBox)`
  border: 1px solid ${listingChip};
  padding: 1rem;
  width: 100%;
  border-radius: 0.75rem;
  row-gap: 0.5rem;
  margin: auto;
  flex-grow: 1;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out 0.2s;

  &:hover {
    transform: scale(0.95);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  @media ${device.laptop} {
    margin: 0;
    max-width: 32%;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Banner = styled(FlexBox)`
  position: relative;
  top: 0;
`;

const Img = styled.img`
  height: 13.5rem;
  object-fit: cover;
  border-radius: 0.75rem;
`;

const ActionWrapper = styled(FlexBox)`
  position: absolute;
  top: 0.8rem;
  width: 100%;
  padding: 0 1rem;
`;

const AmenitiesWrapper = styled(FlexBox)`
  gap: 0.5rem;
  overflow-x: auto;
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
  bottom: 0;
  align-items: center;
  padding: 0 0 0 1rem;
  width: 100%;
  column-gap: 0.4rem;
  background-color: ${PRIMARY_900};
  border-radius: 0 0 0.75rem 0.75rem;
`;

const PopularityBox = styled(FlexBox)`
  border-radius: 0.25rem;
  width: fit-content;
  padding: 0 0.8rem;
  align-items: center;
  justify-content: center;
  background-color: ${RATE_BACKGROUND};
  opacity: 0.9;
`;

const SalonCard = () => {
  const storeAmenities = ["AC conditioning", "Parking", "Kids Friendly"];
  const [favorite, setFavorite] = useState(false);

  const handleLike = () => setFavorite(!favorite);

  const OfferRendering = ({ discount }) => {
    if (discount) {
      return (
        <OfferBanner>
          <CiDiscount1 color={ACCENT_0} stroke={3} />
          <Body2 color={ACCENT_0} padding="0.5rem 0">
            {`${discount}% off on first visit`}
          </Body2>
        </OfferBanner>
      );
    }
  };

  return (
    <Wrapper column>
      <Banner column>
        <Img src="/assets/images/home/salon.webp" alt="twinkle" />
        <ActionWrapper justify="space-between" align="center">
          <PopularityBox>
            <H5 color={ACCENT_0}>POPULAR</H5>
          </PopularityBox>
          <FlexBox
            align="center"
            justify="center"
            borderRadius="0.25rem"
            backgroundColor={RATE_BACKGROUND}
            padding="0 0.8rem"
            columnGap="0.4rem"
          >
            <img src="/assets/images/star1.svg" alt="star" />
            <Body2 color={ACCENT_0}>4.2</Body2>
          </FlexBox>
        </ActionWrapper>
        <FlexBox justify="center">{<OfferRendering discount="15" />}</FlexBox>
      </Banner>
      <FlexBox column rowGap="0.25rem">
        <FlexBox justify="space-between" padding="1rem 0 0 0">
          <H5 bold>Gigi&#39;s Salon</H5>
          <FlexBox cursor="pointer" onClick={handleLike}>
            {favorite ? (
              <BsFillHeartFill size="1.25rem" color={PRIMARY_900} />
            ) : (
              <SlHeart size="1.25rem" color={PRIMARY_900} />
            )}
          </FlexBox>
        </FlexBox>

        <FlexBox columnGap="0.9rem">
          <Body2>Salon for Men</Body2>
          <img src="/assets/images/home/ellipse.svg"></img>
          <Body2>5 kms</Body2>
        </FlexBox>

        <H5 bold>Price starting at 250/-</H5>

        <AmenitiesWrapper>
          {storeAmenities.map((item, index) => (
            <Body2 key={index} color={SECONDARY_500}>
              {item}
            </Body2>
          ))}
        </AmenitiesWrapper>
      </FlexBox>
    </Wrapper>
  );
};

const TopSalon = () => {
  const router = useRouter();

  return (
    <FlexBox column rowGap="2rem">
      <FlexBox justify="space-between" align="center">
        <H3 bold>Top Salons in Kolkata</H3>
        <IconButton
          iconPosition="right"
          color="black"
          textCta
          Icon={TbChevronRight}
          onClick={() => router.push("/shop-listing")}
        >
          VIEW ALL
        </IconButton>
      </FlexBox>
      <Container>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <SalonCard key={index} />
          ))}
      </Container>
    </FlexBox>
  );
};

export default TopSalon;
