/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { SlHeart } from "react-icons/sl";
import { CiDiscount1 } from "react-icons/ci";
import { BsFillHeartFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { TbChevronRight } from "react-icons/tb";

import { H5, H3, Body2 } from "@common/ui/Headings";
import {
  ACCENT_0,
  PRIMARY_900,
  RATE_BACKGROUND,
  listingChip,
} from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";
import { IconButton } from "@common/ui/Buttons";
import Loader from "@common/ui/Loader";
import { CDN, URL } from "@constants/urls";
import { client } from "@services/axiosClient";

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
  flex-wrap: wrap;
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

const SalonCard = ({ data }) => {
  const [favorite, setFavorite] = useState(false);
  const handleLike = () => setFavorite(!favorite);

  const {
    amenities,
    distance,
    gender,
    storeBannerText,
    storeCoupons,
    storeImages,
    storeName,
    storeRating,
  } = data || {};

  console.log(amenities);

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
          {storeBannerText && (
            <PopularityBox>
              <H5 color={ACCENT_0}>{storeBannerText}</H5>
            </PopularityBox>
          )}
          {storeRating && (
            <FlexBox
              align="center"
              justify="center"
              borderRadius="0.25rem"
              backgroundColor={RATE_BACKGROUND}
              padding="0 0.8rem"
              columnGap="0.4rem"
            >
              <img src="/assets/images/star1.svg" alt="star" />
              <Body2 color={ACCENT_0}>{storeRating}</Body2>
            </FlexBox>
          )}
        </ActionWrapper>
        <FlexBox justify="center">{<OfferRendering discount="15" />}</FlexBox>
      </Banner>
      <FlexBox column rowGap="0.25rem">
        <FlexBox justify="space-between" padding="1rem 0 0 0">
          <H5 bold>{storeName}</H5>
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

const TopSalon = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);

  const fetchShopList = useCallback(async () => {
    try {
      setLoading(true);

      const res = await client.post(URL.getAllShops, {
        page: 1,
        pageLimit: 6,
      });
      const data = res?.data?.data?.[0];
      setShopList(data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShopList();
  }, [fetchShopList]);

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
        {loading && <Loader />}
        {shopList.map(data => (
          <SalonCard key={data?._id} data={data} />
        ))}
      </Container>
    </FlexBox>
  );
};

export default TopSalon;
