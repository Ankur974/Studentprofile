import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H1, H4 } from "@common/ui/Headings";

const HeadingWrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const GamePageHeading = ({ heading, subHeading }) => {
  return (
    <HeadingWrapper>
      <H1 bold>{heading}</H1>
      <H4 textAlign="center" padding="0 0.5rem">
        {subHeading}
      </H4>
    </HeadingWrapper>
  );
};

export default GamePageHeading;
