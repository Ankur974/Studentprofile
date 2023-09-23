import React, { useState } from "react";
import styled from "styled-components";

import FlexBox from "../common/ui/FlexBox";
import Filter from "../common/ui/Filter";
import Card from "./Card";
import { Display, H1, H3 } from "../common/ui/Headings";
import { ACCENT_500, PRIMARY_200 } from "../common/ui/colors";
import Approach from "../common/ApproachFaq";
import Chip from "../common/ui/Chips";
import FilterModal from "./FilterModal";
import SecondaryNav from "./SecondaryNav";
import { device } from "../common/ui/Resposive";

const metadata = [
  {
    id: 1,
    title: "Haircut For Man",
  },
  {
    id: 2,
    title: "Haircut For Woman",
  },
  {
    id: 3,
    title: "Makeup",
  },
  {
    id: 4,
    title: "Nails",
  },
  {
    id: 5,
    title: "Mainicure & Pedicure",
  },
  {
    id: 6,
    title: "Message Therapy",
  },
  {
    id: 7,
    title: "Hair Styling",
  },
  {
    id: 8,
    title: "Hair Coloring",
  },
];

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 1.5rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 0;
  }
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

const Showappliedfilter = styled(FlexBox)`
  flex-direction: row;
  column-gap: 0.2rem;
  width: fit-content;
  align-self: end;

  @media ${device.laptop} {
    flex-direction: row;
    column-gap: 1rem;
  }
`;

const Filtercontainer = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  margin: auto;

  @media ${device.laptop} {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Toptitle = styled(FlexBox)`
  max-width: 75rem;
  padding: 0 2rem;
  align-items: center;
  justify-content: center;
`;

const ShopListingPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  const toggleModal = () => setShowFilter(!showFilter);
  const Arr = new Array(10).fill(1);
  return (
    <div>
      {showFilter && <FilterModal toggleModal={toggleModal} />}
      <SecondaryNav navitem={metadata} />
      <Banner>
        <Toptitle>
          <Display bold>Everything feels better after a Haircut</Display>
        </Toptitle>
      </Banner>
      <Wrapper>
        <Filtercontainer>
          <H3 bold>4 Haircut Results in your location</H3>
          <Showappliedfilter>
            <Chip>Haircut</Chip>
            <Chip>Haircut</Chip>
            <Chip>Haircut</Chip>
            <VR />
            <Filter onClick={toggleModal} />
          </Showappliedfilter>
        </Filtercontainer>
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
};

export default ShopListingPage;
