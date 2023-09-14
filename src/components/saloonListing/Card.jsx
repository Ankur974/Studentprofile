import React from "react";
import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import { H2, H4 } from "../common/ui/Headings";
import { Body2 } from "../common/ui/Headings";
import { BsGenderMale } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import {
  ACCENT_0,
  ACCENT_700,
  RATEBACKGROUND,
  STARCOLOR,
  listingChip,
} from "../common/ui/colors";
import Chip from "../common/ui/Chips";
import { AiFillStar } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";

const Wrapper = styled(FlexBox)`
  border: 1px solid ${listingChip};
  padding: 2px;
  max-width: 23.75rem;
  height: 100%;
  row-gap: 0.5rem;
  margin: auto;
  width:100%
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
  ${'' /* width: 23.75rem; */}
  height: 13.4rem;
  object-fit: cover;
`;

const BannerContent = styled(FlexBox)`
  position: absolute;
  top: 1rem;
  width: 100%;
  left: 1rem;
`;

const BannerContent2 = styled(FlexBox)`
  position: absolute;
  bottom: 0;
  width: 23.75rem;
`;

const Card = () => {
  return (
    <Wrapper column>
      <Banner column>
        <Img src="/assets/banner-new.svg" alt="Card1" />
        <BannerContent columnGap="15.2rem" align="center">
          <H4>Popular</H4>
          <FlexBox
            align="center"
            justify="center"
            borderRadius="0.1875rem"
            backgroundColor={RATEBACKGROUND}
            width="3.5rem"
            columnGap="0.5rem"
          >
            <AiFillStar color={STARCOLOR} />
            <Body2 color={ACCENT_0}>4.2</Body2>
          </FlexBox>
        </BannerContent>
        <BannerContent2
          align="center"
          columnGap="0.5rem"
          backgroundColor="red"
          borderRadius="0rem 0rem 0.625rem 0.625rem"
          padding="0 0 0 1rem"
        >
          <CiDiscount1 />
          <Body2>15% of on first visit</Body2>
        </BannerContent2>
      </Banner>

      <FlexBox column rowGap="0.38rem">
        <FlexBox justify="space-between" width="23.75rem">
          <H2>Gigi's Salon</H2>
          <AiOutlineHeart  size="1.25rem"/>
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
      <FlexBox width="fit-content" columnGap="1rem">
        {aminities.map(item => (
          <Chip key={item.id} width="7.63rem" columnGap="1.31rem">
            {item.label}
          </Chip>
        ))}
      </FlexBox>
      <FlexBox></FlexBox>
    </Wrapper>
  );
};

export default Card;
