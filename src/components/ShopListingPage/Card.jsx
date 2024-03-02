import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { BsFillHeartFill } from "react-icons/bs";
import { IoIosFemale } from "react-icons/io";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { SlHeart, SlMap, SlSymbolMale } from "react-icons/sl";
import { CiDiscount1 } from "react-icons/ci";
import { H5, Body2 } from "@common/ui/Headings";
import {
  ACCENT_0,
  ACCENT_700,
  PRIMARY_800,
  RATE_BACKGROUND,
  listingChip,
} from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import Chip from "@common/ui/Chips";
import { Button } from "@common/ui/Buttons";
import { device } from "@common/ui/Resposive";

const Wrapper = styled(FlexBox)`
  border: 1px solid ${listingChip};
  padding: 0 0 1rem 0;
  width: 100%;
  border-radius: 0.625rem;
  max-width: 23.75rem;
  row-gap: 0.5rem;
  margin: auto;
  flex-grow: 1;
  position: relative;
  @media ${device.laptop} {
    margin: 0;
  }
`;

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
  width: 90%;
  column-gap: 0.4rem;
  background-color: ${PRIMARY_800};
  border-radius: 0.25rem;
  justify-content: center;
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

const ViewButtonBox = styled(FlexBox)`
  margin-top: 0.25rem;
`;

const Card = ({ data }) => {
  const [selected, setSelected] = useState(false);
  const router = useRouter();

  const handleClick = () => setSelected(!selected);

  const OfferRendering = ({ discount }) => {
    if (discount) {
      return (
        <OfferBanner>
          <CiDiscount1 color={ACCENT_0} stroke={3} />
          <Body2 color={ACCENT_0} padding="0.2rem 0">
            {`${discount}% off on first visit`}
          </Body2>
        </OfferBanner>
      );
    }
  };

  const renderGenderIcon = () => {
    if (!data || !data.gender) return null;

    switch (data.gender.toLowerCase()) {
      case "male":
        return <SlSymbolMale color={ACCENT_700} />;
      case "female":
        return <IoIosFemale color={ACCENT_700} />;
      case "unisex":
        return <IoMaleFemaleOutline color={ACCENT_700} />;
      default:
        return null;
    }
  };

  return (
    <Wrapper column>
      <Banner column>
        {data.image ? (
          <Img src={data.image} alt={data.storeName} />
        ) : (
          <Img src="https://picsum.photos/200/300" alt="twinkle" />
        )}
        <ActionWrapper justify="space-between" align="center">
          {data.popularity && (
            <PopularityBox>
              <H5 color={ACCENT_0}>{data.popularity}</H5>
            </PopularityBox>
          )}
          {data?.storeRating && (
            <FlexBox
              align="center"
              justify="center"
              borderRadius="0.25rem"
              backgroundColor={RATE_BACKGROUND}
              padding="0 0.8rem"
              columnGap="0.4rem"
            >
              <img src="/assets/images/star.svg" alt="star" />
              <Body2 color={ACCENT_0}>{data?.storeRating}</Body2>
            </FlexBox>
          )}
        </ActionWrapper>
        <FlexBox justify="center">
          {<OfferRendering discount={data?.discount} />}
        </FlexBox>
      </Banner>
      <FlexBox column rowGap="0.25rem" padding="0 1rem">
        <FlexBox
          justify="space-between"
          padding={data?.discount ? "1rem 0 0 0" : "0"}
        >
          <H5 bold>{data?.storeName}</H5>
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
            {renderGenderIcon()}
            {data?.gender && <Body2>{`Salon for ${data?.gender}`}</Body2>}
          </FlexBox>
          <FlexBox columnGap="0.40rem" align="center">
            <SlMap />
            <Body2>{`${data?.distance} kms`}</Body2>
          </FlexBox>
        </FlexBox>

        {data?.startingPrice && (
          <H5 bold>{`Price starting at ${data?.startingPrice}/-`}</H5>
        )}

        <AminitiesWrapper>
          {data?.storeAmenities.map((item, index) => (
            <Chip border="none" key={index} width="fit-content">
              <Body2>{item}</Body2>
            </Chip>
          ))}
        </AminitiesWrapper>
        <ViewButtonBox>
          <Button
            secondary
            rowGap="1rem"
            onClick={() => {
              router.push(`/shop-details/${data._id}`);
            }}
          >
            View Details
          </Button>
        </ViewButtonBox>
      </FlexBox>
      `
    </Wrapper>
  );
};

export default Card;
