import React, { useState } from "react";
import styled from "styled-components";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import dayjs from "dayjs";
import Image from "next/image";

import { Body1, Body2, H6, H5, H3 } from "@common/ui/Headings";
import { SECONDARY_200, PRIMARY_800 } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import AboutRatingsSection from "./AboutRatingsSection";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  margin: auto;
`;

const SeeMoreText = styled(Body2)`
  cursor: pointer;
  color: ${PRIMARY_800};
  font-weight: 700;
  text-decoration: underline;
`;

const Hr = styled(FlexBox)`
  margin: 2rem 0;
  border-top: 1px solid ${SECONDARY_200};
`;

const InsideMap = styled.iframe`
  display: block;
  width: 100%;
  height: 20rem;
  border-radius: 0.25rem;
`;

const ProfileDP = styled(Image)`
  max-width: 5rem;
  max-height: 5rem;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
`;

const B1 = styled(Body1)`
  max-height: ${({ expanded }) => (expanded ? "45px" : "100px")};
  overflow: hidden;
  transition: max-height 600ms ease-in-out;
`;

const DayWrapper = styled.div`
  height: ${({ active }) => (active ? "20rem" : "1.5rem")};
  max-height: 20rem;
  transition: all 600ms ease-in-out;
  overflow: hidden;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  row-gap: 1rem;
`;

const amenitiesList = {
  "Air Conditioner": {
    src: "/assets/images/amenities/air-flow-inspection.webp",
    alt: "Air Conditioner",
    label: "Air Conditioner",
  },
  "Blow Dryer": {
    src: "/assets/images/amenities/hygiene.webp",
    alt: "Hygiene",
    label: "Hygiene",
  },
  "Parking Space": {
    src: "/assets/images/amenities/parking.webp",
    alt: "Parking",
    label: "Parking Space",
  },
  "Pet Friendly": {
    src: "/assets/images/amenities/heart.webp",
    alt: "Pet Friendly",
    label: "Pet Friendly",
  },
};

const BusinessStatus = ({ dayObject }) => {
  const isOpenToday = dayObject?.open;

  return (
    <FlexBox align="center" columnGap="1rem">
      <GoDotFill color={isOpenToday ? "green" : "red"} />
      <H6>
        {isOpenToday
          ? `Open today ${dayObject.openTime} - ${dayObject.closeTime}`
          : "Closed today"}
      </H6>
      <RiArrowDownSLine size="1.5rem" cursor="pointer" />
    </FlexBox>
  );
};

const ShopTiming = ({ shopData }) => {
  return (
    <FlexBox column rowGap="1rem" justify="center">
      {shopData?.timing?.map((day, index) => (
        <FlexBox key={day._id} align="center" columnGap="1rem">
          <GoDotFill color={day?.open ? "green" : "red"} />
          <H6>
            {day?.open
              ? `${day.day.charAt(0) + day.day.slice(1).toLowerCase()}  ${
                  day.openTime
                } - ${day.closeTime}`
              : `${day.day.charAt(0) + day.day.slice(1).toLowerCase()} Closed`}
          </H6>
          {index === 0 && <RiArrowUpSLine size="1.5rem" cursor="pointer" />}
        </FlexBox>
      ))}
    </FlexBox>
  );
};

const About = ({ shopData }) => {
  const [expanded, setExpanded] = useState(false);
  const [more, setMore] = useState(false);

  const currDay = dayjs().format("dddd");
  const convertedDay = currDay.toUpperCase();
  const dayObject = shopData?.timing?.find(day => day.day === convertedDay);

  const fetchedAmenities = shopData?.storeAmenities || [];
  const amenitiesIcon = Object.keys(amenitiesList).map(localAmenityKey => {
    const fetchedAmenity = fetchedAmenities?.find(
      amenity => amenity === localAmenityKey
    );

    return {
      key: localAmenityKey,
      ...amenitiesList[localAmenityKey],
      isPresent: !!fetchedAmenity,
    };
  });

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleMore = () => {
    setMore(!more);
  };

  return (
    <Wrapper column>
      <FlexBox column margin="1rem  0 2rem 0">
        <B1 expanded={!more}>{shopData?.storeDescription}</B1>
        {shopData?.storeDescription?.length > 45 && (
          <SeeMoreText onClick={toggleMore}>
            {more ? " Read less" : " Read more..."}
          </SeeMoreText>
        )}
      </FlexBox>
      <FlexBox column rowGap="1rem">
        <H3 bold>Timings</H3>
        <DayWrapper columnGap="1rem" active={expanded} onClick={toggleExpanded}>
          {!expanded ? (
            <BusinessStatus dayObject={dayObject} />
          ) : (
            <ShopTiming shopData={shopData} />
          )}
        </DayWrapper>
      </FlexBox>
      <Hr />
      <FlexBox column rowGap="1rem">
        <H3 bold>Amenities</H3>
        <GridContainer>
          {amenitiesIcon.map((amenity, index) => (
            <FlexBox key={index} columnGap="1rem">
              <img
                src={amenity?.src}
                width="32px"
                height="32px"
                alt={amenity?.alt}
              />
              <H6 textDecoration={amenity?.isPresent ? "none" : "line-through"}>
                {amenity?.label}
              </H6>
            </FlexBox>
          ))}
        </GridContainer>
      </FlexBox>
      <Hr />
      <AboutRatingsSection />
      <Hr />
      <FlexBox id="mapId" column rowGap="1rem">
        <H3 bold  >Location</H3>
        <InsideMap
          scrolling="no"
          frameborder="0"
          src="https://maps.google.com/maps?q=22.886071,80.4111303&t=&z=15&ie=UTF8&iwloc=&output=embed"
        />
      </FlexBox>
      <Hr />
      <FlexBox columnGap="1rem" align="center">
        <ProfileDP
          src="/assets/images/Avatar.svg"
          alt="dp"
          width={100}
          height={100}
        />
        <FlexBox column>
          <H5>Owned by</H5>
          <H3>{shopData?.ownerDetails?.name}</H3>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default About;
