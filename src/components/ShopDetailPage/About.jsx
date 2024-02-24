import React, { useState } from "react";
import styled from "styled-components";
import { GiCircle } from "react-icons/gi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Body2, Body1, H6, H1, H5, H3 } from "@common/ui/Headings";
import { SECONDARY_200, PRIMARY_800 } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import Chip from "@common/ui/Chips";
import Ratings from "@common/ui/Ratings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  margin: auto;
`;

const Hr = styled(FlexBox)`
  margin: 1rem 0;
  border-top: 1px solid ${SECONDARY_200};
`;

const LineSeparator = styled.div`
  width: 1px;
  height: 100px;
  border-right: 1px solid ${SECONDARY_200};
`;

const Rating = styled(FlexBox)`
  background-image: url("/assets/images/star.svg");
  background-size: contain;
  background-repeat: repeat-x;
  width: 10rem;
  height: 2rem;
`;

const SeeMoreText = styled(Body2)`
  cursor: pointer;
  color: ${PRIMARY_800};
  font-weight: 700;
  text-decoration: underline;
`;

const InsideMap = styled.iframe`
  display: block;
  width: 100%;
  height: 20rem;
  border-radius: 0.25rem;
`;

const reviews = [
  {
    id: 1,
    date: "18-june-22",
    name: "John Doe",
    review:
      "I had a great experience with the pet-friendly amenities. My dog loved it!",
    path: "/assets/images/Avatar.svg",
  },
  {
    id: 2,
    date: "20-Aug-2022",
    name: "Jane Smith",
    review: "The air conditioner was a lifesaver during the hot summer days.",
    path: "/assets/images/Avatar.svg",
  },
  {
    id: 3,
    date: "21-Aug-2022",
    name: "Alice Johnson",
    review:
      "I appreciated the hygiene assurance measures in place. It made me feel safe.",
    path: "/assets/images/Avatar.svg",
  },
];

const About = ({ shopData }) => {
  const [showDays, setShowDays] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const showDaysFun = () => {
    setShowDays(!showDays);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Wrapper column>
      <Body2>{shopData?.storeDescription}</Body2>
      <FlexBox wrap="wrap" rowGap="1rem" columnGap="1rem">
        {shopData?.storeTags?.map(item => (
          <Chip key={item.id} width="fit-content">
            <Body2>{item.name}</Body2>
          </Chip>
        ))}
      </FlexBox>
      {expanded ? (
        <Body1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          incidunt consectetur modi architecto repudiandae nobis dolorum ea
          molestiae autem aperiam? Placeat repellat labore perspiciatis, cumque
          quibusdam distinctio perferendis eaque consectetur.
          <SeeMoreText onClick={toggleExpanded}> Read less...</SeeMoreText>
        </Body1>
      ) : (
        <Body1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          incidunt consectetur modi architecto repudiandae nobis dolorum ea
          molestiae autem aperiam?
          <SeeMoreText onClick={toggleExpanded}> Read more...</SeeMoreText>
        </Body1>
      )}
      <FlexBox column padding="1rem 0" rowGap="1rem">
        <H3 bold>Timings</H3>
        <FlexBox align="center" columnGap="0.5rem">
          <GiCircle color="green" background-color="green" />
          <H6>Sunday : {shopData?.storeTimingsSunday}</H6>
          {!showDays && (
            <RiArrowDownSLine
              width="2rem"
              height="2rem"
              cursor="pointer"
              onClick={showDaysFun}
            />
          )}
          {showDays && (
            <RiArrowUpSLine
              width="2rem"
              height="2rem"
              cursor="pointer"
              onClick={showDaysFun}
            />
          )}
        </FlexBox>
        {showDays && (
          <FlexBox column margin="0 0 0 1.4rem">
            <H6>Monday : {shopData?.storeTimingsMonday}</H6>
            <H6>Tuesday : {shopData?.storeTimingsTuesday}</H6>
            <H6>Wednesday : {shopData?.storeTimingsWednesday}</H6>
            <H6>Thursday : {shopData?.storeTimingsThursday}</H6>
            <H6>Friday : {shopData?.storeTimingsFriday}</H6>
            <H6>Saturday : {shopData?.storeTimingsSaturday}</H6>
          </FlexBox>
        )}
      </FlexBox>

      <Hr />
      <FlexBox column padding="1rem 0" rowGap="1rem">
        <H3 bold>Amenities</H3>
        <FlexBox column rowGap="1rem">
          <FlexBox columnGap="1rem">
            <img
              src="/assets/images/amenities/heart.webp"
              width="32px"
              height="32px"
            ></img>
            <H6>Pet Friendly</H6>
          </FlexBox>
          <FlexBox columnGap="1rem">
            <img
              src="/assets/images/amenities/air-flow-inspection.webp"
              width="32px"
              height="32px"
            ></img>
            <H6>Air Conditioner</H6>
          </FlexBox>
          <FlexBox columnGap="1rem">
            <img
              src="/assets/images/amenities/parking.webp"
              width="32px"
              height="32px"
            />
            <H6>Parking</H6>
          </FlexBox>
          <FlexBox columnGap="1rem">
            <img
              src="/assets/images/amenities/hygiene.webp"
              width="32px"
              height="32px"
            />
            <H6>Hygiene</H6>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <Hr />
      {/* <FlexBox
        border="1px dashed #533A71"
        borderRadius="0.5rem"
        justify="center"
        align="center"
        column
        height="9.5rem"
      >
        <Body1>{shopData?.storeRating}</Body1>
        <Ratings />
        <H6>20 visitor Ratings</H6>
      </FlexBox> */}
      <H3 bold>Overall Ratings</H3>
      <FlexBox justify="space-between">
        <FlexBox column>
          <H1>4.2</H1>
          <H6>(20 ratings)</H6>
          <Rating class="star-rating"></Rating>
        </FlexBox>
        <LineSeparator />
        <FlexBox column rowGap="0.5rem">
          <FlexBox>
            <img
              src="/assets/images/about/seat.webp"
              alt="star"
              width="32px"
              height="32px"
            />
          </FlexBox>
          <H6>Cleanliness</H6>
          <H5>3.8</H5>
        </FlexBox>
        <LineSeparator />
        <FlexBox column rowGap="0.5rem">
          <img
            src="/assets/images/about/scissors.webp"
            alt="star"
            width="32px"
            height="32px"
          />
          <H6>Service</H6>
          <H5>4.5</H5>
        </FlexBox>
        <LineSeparator />
        <FlexBox column rowGap="0.5rem">
          <img
            src="/assets/images/about/speech-bubble.webp"
            alt="star"
            width="32px"
            height="32px"
          />
          <H6>Ambience</H6>
          <H5>4</H5>
        </FlexBox>
        <LineSeparator />

        <FlexBox column rowGap="0.5rem">
          <img
            src="/assets/images/about/speech-bubble.webp"
            alt="star"
            width="32px"
            height="32px"
          />
          <H6>Communication</H6>
          <H5>4.1</H5>
        </FlexBox>
      </FlexBox>
      <Hr />
      <FlexBox column rowGap="1rem" padding="1rem 0">
        <H3 bold>Reviews(20)</H3>
        {reviews.map(item => (
          <FlexBox column key={item.id}>
            <FlexBox row justify="space-between">
              <FlexBox columnGap="1.5rem">
                <img src={item.path} alt="user avatar" />
                <FlexBox column>
                  <Body1 bold>{item.name}</Body1>
                  <H6>{item.date}</H6>
                </FlexBox>
              </FlexBox>
              <Ratings />
            </FlexBox>
            <H6>{item.review}</H6>
          </FlexBox>
        ))}
      </FlexBox>
      <H5 textDecoration="underline">View all</H5>
      <InsideMap
        scrolling="no"
        frameborder="0"
        src="https://maps.google.com/maps?q=22.886071,80.4111303&t=&z=15&ie=UTF8&iwloc=&output=embed"
      />
    </Wrapper>
  );
};

export default About;
