import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { H2, Body2 } from "../common/ui/Headings";
import { ACCENT_800, PRIMARY_800 } from "../common/ui/colors";
import Rating from "../common/ui/Ratings";
import { RxCheck, RxCross1 } from "react-icons/rx";
import Chip from "../common/ui/Chips";
import Modal from "../common/ui/Modal";
import { FiX } from "react-icons/fi";

const services = [
  {
    id: 1,
    name: "Haircut Service",
  },
  {
    id: 2,
    name: "Nails",
  },
  {
    id: 3,
    name: "Makeup",
  },
  {
    id: 4,
    name: "Styling",
  },
];
const availability = [
  {
    id: 1,
    name: "Today",
  },
  {
    id: 2,
    name: "Tomorrow",
  },
  {
    id: 3,
    name: "Pick a date",
  },
];
const type = [
  {
    id: 1,
    name: "Salon",
  },
  {
    id: 2,
    name: "Stylist",
  },
  {
    id: 3,
    name: "Other",
  },
];
const salonPref = [
  {
    id: 1,
    name: "Male",
  },
  {
    id: 2,
    name: "Female",
  },
  {
    id: 3,
    name: "Unisex",
  },
];

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  border-radius: 1rem;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  max-width: 1.5rem;
  aspect-ratio: 1;
`;

const FilterChip = ({ name, selected, onClick }) => (
  <Chip width="fit-content" selected={selected} onClick={onClick}>
    <FlexBox align="center" columnGap="0.2rem">
      {selected && <RxCheck color={PRIMARY_800} />}
      <Body2 bold color={selected ? PRIMARY_800 : ACCENT_800}>
        {name}
      </Body2>
    </FlexBox>
  </Chip>
);

const FilterModal = ({ toggleModal }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    services: [],
    availability: [],
    type: [],
    pref: [],
  });

  const toggleFilter = (filterType, name) => {
    setSelectedFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      const selected = updatedFilters[filterType].includes(name);
      if (selected) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          item => item !== name
        );
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], name];
      }
      return updatedFilters;
    });
  };

  const renderFilterChips = (filterType, data) =>
    data.map(item => (
      <FilterChip
        key={item.id}
        name={item.name}
        selected={selectedFilters[filterType].includes(item.name)}
        onClick={() => toggleFilter(filterType, item.name)}
      />
    ));

  return (
    <Modal M1>
      <Wrapper column>
        <FlexBox alignItems="center" justify="space-between">
          <Img src="/assets/filter1.svg" />
          <H2 bold>Filters</H2>
          <FiX onClick={toggleModal} />
        </FlexBox>
        <H2 bold>Popular Filters</H2>
        <H2 bold>Ratings</H2>
        <Rating />
        <H2 bold>Services</H2>
        <FlexBox columnGap="0.3rem">
          {renderFilterChips("services", services)}
        </FlexBox>
        <H2 bold>Availability</H2>
        <FlexBox columnGap="0.3rem">
          {renderFilterChips("availability", availability)}
        </FlexBox>
        <H2 bold>Type</H2>
        <FlexBox columnGap="0.3rem">{renderFilterChips("type", type)}</FlexBox>
        <H2 bold>Salon Preference</H2>
        <FlexBox columnGap="0.3rem">
          {renderFilterChips("pref", salonPref)}
        </FlexBox>
      </Wrapper>
    </Modal>
  );
};

export default FilterModal;