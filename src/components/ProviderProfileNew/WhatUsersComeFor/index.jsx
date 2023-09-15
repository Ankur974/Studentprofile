import styled from "styled-components";

import { Text } from "@common/Text";
import { FlexBox } from "@common/FlexBox";

import ThoughtsMobile from "./ThoughtsMobile";
import ThoughtsDesktop from "./ThoughtsDesktop";

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem 0;
  box-sizing: border-box;
  justify-content: center;

  * {
    box-sizing: border-box;
  }

  @media only screen and (max-width: 768px) {
    padding: 0;

    .divider {
      display: none;
    }
  }
`;

const Container = styled(FlexBox)`
  width: 83.35%;
  row-gap: 2.5rem;
  max-width: 75rem;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    width: 86.67%;
  }
`;

const ThoughtsContainer = styled(FlexBox)`
  column-gap: 1rem;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    row-gap: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WhatUsersComeFor = ({ thoughts = [] }) => {
  if (!thoughts?.length) return null;

  return (
    <Wrapper>
      <Container>
        <ThoughtsContainer>
          <Text bold fontSize="1rem">
            What users come for:
          </Text>
          <ThoughtsDesktop thoughts={thoughts} />
          <ThoughtsMobile thoughts={thoughts} />
        </ThoughtsContainer>

        <div className="divider" />
      </Container>
    </Wrapper>
  );
};

export default WhatUsersComeFor;
