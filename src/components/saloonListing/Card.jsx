import React from "react";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import { ButtonText, H2, H4 } from "../common/ui/Headings";
import { Body2 } from "../common/ui/Headings";
import { BsGenderMale } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";
import {
  ACCENT_0,
  ACCENT_700,
  ACCENT_800,
  PRIMARY_800,
  RATEBACKGROUND,
  SECONDARY_900,
  STARCOLOR,
  listingChip,
} from "../common/ui/colors";
import Chip from "../common/ui/Chips";
import { AiFillStar } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import { Button } from "../common/ui/Buttons";

const Wrapper = styled(FlexBox)`
  border: 1px solid ${listingChip};
  padding: 1rem;
  width: 100%;
  border-radius: 10px;
  max-width: 23.75rem;
  height: 100%;
  row-gap: 0.8rem;
  margin: auto;
`;

const aminities = [
  {
    id: 1,
    label: "Air conditioning",
  },
  {
    id: 1,
    label: "Air conditioning",
  },
  {
    id: 1,
    label: "Air conditioning",
  },
  {
    id: 1,
    label: "Air conditioning",
  },
];

const Banner = styled(FlexBox)`
  position: relative;
  top: 0;
  height: 100%;
`;

const Img = styled.img`
  height: 13.4rem;
  object-fit: cover;
  border-radius: 0.625rem;
`;

const BannerContent = styled(FlexBox)`
  position: absolute;
  top: 1rem;
  width: 100%;
  left: 1rem;
`;

const BannerContent2 = styled(FlexBox)`
  position: absolute;
  bottom: -0.9rem;
  height: 2rem;
  width: ;
`;

const Img2 = styled(FlexBox);

const Card = () => {
  return (
    <Wrapper column>
      <Banner column>
        <Img src="/assets/banner-new.svg" alt="Card1" />
        <BannerContent columnGap="13rem" align="center">
          <FlexBox
            borderRadius="0.1875rem"
            width="4rem"
            align="center"
            justify="center"
            backgroundColor="#FFFFFF80"
          >
            <H4 color="white">Popular</H4>
          </FlexBox>
          <FlexBox
            align="center"
            justify="center"
            borderRadius="0.1875rem"
            backgroundColor={RATEBACKGROUND}
            width="3.5rem"
            columnGap="0.5rem"
          >
            {/* <AiFillStar color={STARCOLOR} /> */}
            <img src="/assets/star.svg" />
            <Body2 color={ACCENT_0}>4.2</Body2>
          </FlexBox>
        </BannerContent>
        <FlexBox justify="center">
          <BannerContent2
            align="center"
            width="85%"
            columnGap="0.5rem"
            backgroundColor={PRIMARY_800}
            borderRadius="0.3rem"
            padding="0 0 0 1rem"
            justify="center"
          >
            <CiDiscount1 />
            <Body2>15% of on first visit</Body2>
          </BannerContent2>
        </FlexBox>
      </Banner>

      <FlexBox column rowGap="0.38rem">
        <FlexBox justify="space-between" padding="10px 0 0 0">
          <H2>Gigi's Salon</H2>
          <SlHeart size="1.5rem" color={PRIMARY_800} fill="black" />
        </FlexBox>

        <FlexBox columnGap="0.75rem">
          <FlexBox columnGap="0.38rem">
            <FlexBox>
              <BsGenderMale color={ACCENT_700} />
              <Body2>Salon for Men</Body2>
            </FlexBox>
            <FlexBox>
              <IoLocationOutline />
              <Body2> 3 kms </Body2>
            </FlexBox>
          </FlexBox>
        </FlexBox>
        <H2>Price starting at 300/-</H2>
      </FlexBox>
      <FlexBox wrap="wrap" rowGap="0.8rem" columnGap="1rem" width="20rem">
        {aminities.map(item => (
          <Chip key={item.id} columnGap="1.31rem">
            {item.label}
          </Chip>
        ))}
      </FlexBox>
      <Button primary>View Details</Button>
    </Wrapper>
  );
};

export default Card;
