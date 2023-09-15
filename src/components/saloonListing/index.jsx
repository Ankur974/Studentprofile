import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import Card from "./Card";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  margin: auto;
`;

const ListWrapper = styled(FlexBox)`
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
`;

const Banner = styled(FlexBox)`
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
`;

export default function Listing() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleModal = () => setShowFilter(!showFilter);
  const Arr = new Array(10).fill(1);
  return (
    <Wrapper>
      {/* <Banner></Banner> */}
      <ListWrapper>
        {Arr.map(index => (
          <Card key={index} />
        ))}
      </ListWrapper>
    </Wrapper>
  );
}
