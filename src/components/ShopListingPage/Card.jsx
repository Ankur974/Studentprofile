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
import { device } from "@common/ui/Responsive";
import { CDN } from "@constants/urls";

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
  cursor: pointer;
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

  const formatDistance = distance => {
    if (distance < 1000) {
      return `${distance.toFixed(0)} meters`;
    } else {
      return `${(distance / 1000).toFixed(2)} km`;
    }
  };

  const thumbnail = data?.storeImages?.filter(image => image?.isThumbnail)?.[0];

  return (
    <Wrapper column onClick={() => router.push(`/shop-details/${data._id}`)}>
      <Banner column>
        {data.image ? (
          <Img src={data.image} alt={data.storeName} />
        ) : (
          <Img
            src={
              thumbnail?.imageUrl ?? "https://picsum.photos/seed/picsum/200/300"
            }
            alt="store thumbnail image"
          />
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
          <FlexBox
            onClick={e => {
              e.stopPropagation();
              handleClick();
            }}
            cursor="pointer"
          >
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
          {data?.distance && (
            <FlexBox columnGap="0.40rem" align="center">
              <SlMap />
              <Body2>{formatDistance(data?.distance)}</Body2>
            </FlexBox>
          )}
        </FlexBox>

        {data?.serviceStartPrice && (
          <H5 bold>{`Price starting at ${data?.serviceStartPrice}/-`}</H5>
        )}
        <AmenitiesWrapper>
          {data?.amenities?.slice(0, 4).map((item, _id) => (
            <FlexBox
              border="none"
              key={_id}
              width="fit-content"
              columnGap="0.5rem"
            >
              <img
                src={`${CDN}/amenities/dark-icons/${item?.icon?.darkIcon}`}
                alt={item?.name}
              />
              <Body2 color="#717171">{item?.name}</Body2>
            </FlexBox>
          ))}
        </AmenitiesWrapper>
      </FlexBox>
    </Wrapper>
  );
};

export default Card;
