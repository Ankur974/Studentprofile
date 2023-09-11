import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { H2 } from "../common/ui/Headings";
import { Body2 } from "../common/ui/Headings";
import { ACCENT_500 } from "../common/Color";
import SelectionChip from "../common/ui/SelectionChips";
import { ACCENT_100, ACCENT_800, purple } from "../common/ui/colors";
import Rating from "../common/ratings/Ratings";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";


const Wrapper = styled(FlexBox)`
  width: 100%;
  border-radius:5px;
  height: 100%;
  border: 1px solid ${ACCENT_500};
  padding:0.6rem;
  gap:1rem;
  margin:0.5rem;
`;

const Img = styled.img`
  height: 2rem;
  width: 1rem;
`;

const Filter = () => {

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedtype, setSelectedType] = useState([]);
  const [selectedPref, setSelectedPref] = useState([]);
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
  const handleClickServices = (name) => {

    const services = new Set(selectedServices);
    if (services.has(name)) {
      services.delete(name);
    }
    else {
      services.add(name);

    }
    setSelectedServices([...services]);

  }
  const handleClickAvailablity = (name) => {

    const services = new Set(selectedAvailability);
    if (services.has(name)) {
      services.delete(name);
    }
    else {
      services.add(name);

    }
    setSelectedAvailability([...services]);

  }
  const handleClickPref = (name) => {

    const services = new Set(selectedPref);
    if (services.has(name)) {
      services.delete(name);
    }
    else {
      services.add(name);

    }
    setSelectedPref([...services]);

  }
  const handleClicktype = (name) => {

    const services = new Set(selectedtype);
    if (services.has(name)) {
      services.delete(name);
    }
    else {
      services.add(name);

    }
    setSelectedType([...services]);

  }
  const NewBox = styled(FlexBox)`
  border-bottom:1px solid #D7D7D7;
  `
  return (
    <Wrapper column>
      <NewBox justify="space-between" >
        <FlexBox columnGap="1rem">
          <Img src="/assets/filter1.svg" />
          <H2 bold>Filters</H2>
        </FlexBox>
        <RxCross1 onClick={() => console.log(true)} />
      </NewBox>
      <H2 bold>Popular Filters</H2>
      <H2 bold>Ratings</H2>
      <Rating />
      <H2 bold>Services</H2>
      <FlexBox columnGap="0.3rem">
        {services.map((item) => (
          <SelectionChip key={item.id} width="fit-content" selected={selectedServices.includes(item.name)} onClick={() => handleClickServices(item.name)} >
            <FlexBox align="center" columnGap="0.2rem">
              {selectedServices.includes(item.name) && <TiTick color={purple} />}
              <Body2 color={selectedServices.includes(item.name) ? ACCENT_100 : ACCENT_800}>
                {item.name}
              </Body2>
            </FlexBox>
          </SelectionChip>
        ))}
      </FlexBox>
      <H2 bold>Availability</H2>
      <FlexBox columnGap="0.3rem">
        {availability.map((item) => (
          <SelectionChip key={item.id} width="fit-content" selected={selectedAvailability.includes(item.name)} onClick={() => handleClickAvailablity(item.name)} >
            <FlexBox align="center" columnGap="0.2rem">
              {selectedAvailability.includes(item.name) && <TiTick color={purple} />}
              <Body2 color={selectedAvailability.includes(item.name) ? ACCENT_100 : ACCENT_800}>
                {item.name}
              </Body2>
            </FlexBox>
          </SelectionChip>
        ))}
      </FlexBox>
      <H2 bold>Type</H2>
      <FlexBox columnGap="0.3rem">
        {salonPref.map((item) => (
          <SelectionChip key={item.id} width="fit-content" selected={selectedtype.includes(item.name)} onClick={() => handleClicktype(item.name)} >
            <FlexBox align="center" columnGap="0.2rem">
              {selectedtype.includes(item.name) && <TiTick color={purple} />}
              <Body2 color={selectedtype.includes(item.name) ? ACCENT_100 : ACCENT_800}>
                {item.name}
              </Body2>
            </FlexBox>
          </SelectionChip>
        ))}
      </FlexBox>

      <H2 bold>Salon Preference</H2>
      <FlexBox columnGap="0.3rem">
        {salonPref.map((item) => (
          <SelectionChip key={item.id} width="fit-content" selected={selectedPref.includes(item.name)} onClick={() => handleClickPref(item.name)} >
            <FlexBox align="center" columnGap="0.2rem">
              {selectedPref.includes(item.name) && <TiTick color={purple} />}
              <Body2 color={selectedPref.includes(item.name) ? ACCENT_100 : ACCENT_800}>
                {item.name}
              </Body2>
            </FlexBox>
          </SelectionChip>
        ))}
      </FlexBox>
    </Wrapper>
  );
};

export default Filter;
