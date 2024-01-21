import React from "react";
import styled from "styled-components";
import { GiCircle } from "react-icons/gi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Body2, Body1, H6 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Chip from "@common/ui/Chips";
import Ratings from "@common/ui/Ratings";
import { useState } from "react";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 0.3rem;
`;

const About = ({ shopData }) => {

  const reviews = [
    {
      id: 1,
      date: "2023-09-12",
      name: "John Doe",
      review:
        "I had a great experience with the pet-friendly amenities. My dog loved it!",
      path: "/assets/images/Avatar.svg",
    },
    {
      id: 2,
      date: "2023-09-11",
      name: "Jane Smith",
      review: "The air conditioner was a lifesaver during the hot summer days.",
      path: "/assets/images/Avatar.svg",
    },
    {
      id: 3,
      date: "2023-09-10",
      name: "Alice Johnson",
      review:
        "I appreciated the hygiene assurance measures in place. It made me feel safe.",
      path: "/assets/images/Avatar.svg",
    },
  ];

  const [showDays, setShowDays] = useState(false);
  const showDaysFun = () => {
    setShowDays(!showDays);
  };

  return (
    <Wrapper column>
      <Body2>{shopData.storeDescription}</Body2>
      <FlexBox wrap="wrap" rowGap="1rem" columnGap="1rem">
        {shopData.storeTags.map(item => (
          <Chip key={item.id} width="fit-content">
            <Body2>{item.name}</Body2>
          </Chip>
        ))}
      </FlexBox>

      <Body1 bold>Timimgs</Body1>
      <FlexBox column>
        <FlexBox align="center" columnGap="0.5rem">
          <GiCircle color="green" background-color="green" />
          <H6>Sunday : {shopData.storeTimingsSunday}</H6>
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
            {shopData?.storeTimingsMonday && (
              <H6>Monday : {shopData?.storeTimingsMonday}</H6>
            )}
            {shopData?.storeTimingsTuesday && (
              <H6>Tuesday : {shopData.storeTimingsTuesday}</H6>
            )}
            {shopData?.storeTimingsWednesday && (
              <H6>Wednesday : {shopData.storeTimingsWednesday}</H6>
            )}
            {shopData?.storeTimingsThrusday && (
              <H6>Thrusday : {shopData.storeTimingsThrusday}</H6>
            )}
            {shopData?.storeTimingsFriday && (
              <H6>Friday : {shopData.storeTimingsFriday}</H6>
            )}
            {shopData?.storeTimingsSaturday && (
              <H6>Saturday : {shopData.storeTimingsSaturday}</H6>
            )}
          </FlexBox>
        )}
      </FlexBox>
      <Body1 bold>Ratings</Body1>
      <FlexBox
        border="1px dashed #533A71"
        borderRadius="0.5rem"
        justify="center"
        align="center"
        column
        height="9.5rem"
      >
        <Body1>{shopData.storeRating}</Body1>
        <Ratings />
        <H6>20 visitor Ratings</H6>
      </FlexBox>
      <Body1 bold>Reviews(20)</Body1>
      <FlexBox column rowGap="1rem">
        {reviews.map(item => (
          <FlexBox column key={item.id}>
            <FlexBox row justify="space-between">
              <FlexBox columnGap="0.5rem">
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
    </Wrapper>
  );
};
export default About;
