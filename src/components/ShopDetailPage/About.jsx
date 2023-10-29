import React from "react";
import styled from "styled-components";
import { GiCircle } from "react-icons/gi";
import { RiArrowDownSLine } from "react-icons/ri";

import { Body2, Body1, H6 } from "../common/ui/Headings";
import FlexBox from "../common/ui/FlexBox";
import Chip from "../common/ui/Chips";
import Ratings from "../common/ui/Ratings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 0.3rem;
`;

const RealAbout = () => {
  const aminities = [
    {
      id: 1,
      name: "Pet Friendly",
    },
    {
      id: 2,
      name: "Air Conditioner",
    },
    {
      id: 3,
      name: "Hyegine Assurance",
    },
  ];

  const reviews = [
    {
      id: 1,
      date: "2023-09-12",
      name: "John Doe",
      review:
        "I had a great experience with the pet-friendly amenities. My dog loved it!",
      path: "/assets/Avatar.svg",
    },
    {
      id: 2,
      date: "2023-09-11",
      name: "Jane Smith",
      review: "The air conditioner was a lifesaver during the hot summer days.",
      path: "/assets/Avatar.svg",
    },
    {
      id: 3,
      date: "2023-09-10",
      name: "Alice Johnson",
      review:
        "I appreciated the hygiene assurance measures in place. It made me feel safe.",
      path: "/assets/Avatar.svg",
    },
  ];

  return (
    <Wrapper column>
      <Body2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa iste
        dignissimos voluptates at corporis, aut doloremque vel perferendis,
        repellendus quae corrupti dolores pariatur, consequatur facilis rem quos
        deserunt commodi. A ratione necessitatibus ea excepturi porro.
      </Body2>
      <FlexBox columnGap="1.5rem">
        {aminities.map(item => (
          <Chip key={item.id} width="fit-content">
            <Body2>{item.name}</Body2>
          </Chip>
        ))}
      </FlexBox>

      <Body1 bold>Timimgs</Body1>
      <FlexBox align="center" columnGap="0.4rem">
        <GiCircle color="green" background-color="green" />
        <H6>Open today at 9am - 7pm</H6>
        <RiArrowDownSLine width="2rem" height="2rem" />
      </FlexBox>
      <Body1 bold>Ratings</Body1>
      <FlexBox
        border="1px dashed #533A71"
        borderRadius="0.5rem"
        justify="center"
        align="center"
        column
        height="9.375rem"
      >
        <Body1>4.2</Body1>
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
export default RealAbout;
