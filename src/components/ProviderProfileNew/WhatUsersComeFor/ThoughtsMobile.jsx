import { useEffect, useState } from "react";
import styled from "styled-components";

import { Text } from "@common/Text";
import { FlexBox } from "@common/FlexBox";
import { MobileOnly } from "@common/MobileOnly";

import { ACCENT_200 } from "@constants/colors";

const Wrapper = styled(MobileOnly)`
  width: 92.5vw;
  overflow-x: scroll;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

const Container = styled(FlexBox)`
  gap: 1rem;
  width: 92.5vw;
  overflow-x: scroll;
  flex-direction: column;
`;

const Thought = styled(FlexBox)`
  column-gap: 0.75rem;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  align-items: flex-start;
  background-color: ${ACCENT_200};

  img {
    width: 1rem;
    height: 1rem;
  }

  ${Text} {
    white-space: nowrap;
  }
`;

const RenderThought = ({ thought }) => (
  <Thought>
    <img
      alt="Quote"
      draggable={false}
      src="https://cdn.theinnerhour.com/assets/images/comma.svg"
    />
    <Text fontSize="0.875rem" lineHeight="1.5">
      {thought}
    </Text>
  </Thought>
);

const ThoughtsMobile = ({ thoughts }) => {
  const [formattedThoughts, setFormattedThoughts] = useState([]);

  useEffect(() => {
    if (!!thoughts?.length) {
      let tempThoughtsArr = [];

      for (let i = 0; i < thoughts?.length; i += 3) {
        tempThoughtsArr?.push(thoughts?.slice(i, i + 3));
      }

      setFormattedThoughts(tempThoughtsArr || []);
    }
  }, [thoughts]);

  return (
    <Wrapper>
      <Container>
        {formattedThoughts?.map((thoughtArr, i) => (
          <FlexBox key={"thoughtArr" + i} align="center" columnGap="1rem">
            {thoughtArr?.map(thought => (
              <RenderThought key={thought} thought={thought} />
            ))}
          </FlexBox>
        ))}
      </Container>
    </Wrapper>
  );
};

export default ThoughtsMobile;
