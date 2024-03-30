import React from "react";
import styled from "styled-components";
import { TbChevronRight } from "react-icons/tb";

import FlexBox from "@common/ui/FlexBox";
import { H5, H6, H3 } from "@common/ui/Headings";
import { device } from "@common/ui/Responsive";
import { LOCATION_CARD } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  background-color: ${LOCATION_CARD};
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  width: 100%;
  cursor: pointer;
`;

const IconContainer = styled(FlexBox)`
  border: 1px solid rgba(255, 255, 255, 0.4);
  align-items: center;
  border-radius: 5px;
`;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const AreaCard = () => {
  return (
    <Wrapper>
      <FlexBox column>
        <H5 color="white">Park Street Area</H5>
        <H6 color="white">24 salons</H6>
      </FlexBox>
      <FlexBox>
        <IconContainer>
          <TbChevronRight size="2rem" color="white" />
        </IconContainer>
      </FlexBox>
    </Wrapper>
  );
};

const Localities = () => {
  return (
    <FlexBox column rowGap="2rem">
      <H3 bold color="white">
        Popular Localities in Kolkata
      </H3>
      <Container>
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <AreaCard key={index} />
          ))}
      </Container>
    </FlexBox>
  );
};

export default Localities;
