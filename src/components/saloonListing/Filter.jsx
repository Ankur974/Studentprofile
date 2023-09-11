import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { H2 } from "../common/ui/Headings";
import { Body2 } from "../common/ui/Headings";
import { ACCENT_500 } from "../common/Color";
const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 23.75rem;
  height: 100%;
  border: 1px solid ${ACCENT_500};
`;
const Chips = styled(FlexBox)`
  border: 1px solid ${ACCENT_500};
  border-radius: 0.625rem;
  height: 1.31rem;
  width: 3.31rem;
`;

const Filter = () => {
    return (
        <Wrapper>
            <H2>Filters</H2>
            <H2>Popular Filters</H2>
            <Chips>
                <Body2>HairCut</Body2>
            </Chips>
        </Wrapper>
    );
};
export default Filter;
