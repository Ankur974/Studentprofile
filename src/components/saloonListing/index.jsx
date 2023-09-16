import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import Filter from "../common/ui/Filter";
import Card from "./Card";
import { H1, H3 } from "../common/ui/Headings";
import { ACCENT_500, PRIMARY_200 } from "../common/ui/colors";
import Approach from "../common/ApproachFaq";
import Chip from "../common/ui/Chips";
import FilterModal from "./FilterModal";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 1.5rem;
  padding-block: 2rem;
`;

const ListWrapper = styled(FlexBox)`
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
`;

const Banner = styled(FlexBox)`
  width: 100%;
  height: 12rem;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY_200};
`;

const VR = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${ACCENT_500};
`;

export default function Listing() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleModal = () => setShowFilter(!showFilter);
  const Arr = new Array(10).fill(1);
  return (
    <div>
      {showFilter && <FilterModal toggleModal={toggleModal} />}
      <Banner>
        <H1 bold>Everything feels better after a Haircut</H1>
      </Banner>
      <Wrapper>
        <FlexBox></FlexBox>
        <FlexBox justify="space-between">
          <H3 bold>4 Haircut Results in your location</H3>
          <FlexBox columnGap="1rem">
            <Chip>Haircut</Chip>
            <Chip>Haircut</Chip>
            <Chip>Haircut</Chip>
            <VR />
            <Filter onClick={toggleModal} />
          </FlexBox>
        </FlexBox>
        <ListWrapper>
          {Arr.map(index => (
            <Card key={index} />
          ))}
        </ListWrapper>
        <H1 textAlign="center">Frequently Asked Questions</H1>
        <Approach />
      </Wrapper>
    </div>
  );
}
