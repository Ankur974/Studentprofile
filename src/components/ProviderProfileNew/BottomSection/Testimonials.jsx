import { useState } from "react";
import styled, { css } from "styled-components";

import { Text } from "@common/Text";
import { FlexBox } from "@common/FlexBox";

import { ACCENT_700 } from "@constants/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 2.25rem;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;

  * {
    box-sizing: border-box;
  }
`;

const TestimonialCard = styled(FlexBox)`
  width: 100%;
  row-gap: 2rem;
  padding: 1.5rem;
  flex-direction: column;
  border-radius: 0.75rem;
  box-shadow: 0px 8px 20px #ece5f9;
`;

const FromFlex = styled(FlexBox)`
  column-gap: 1rem;
  height: 3.375rem;
  align-items: center;
`;

const Preview = styled(FlexBox)`
  width: 2rem;
  aspect-ratio: 1;
  cursor: pointer;
  font-weight: bold;
  border-radius: 50%;
  font-size: 0.875rem;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease-in-out;
  color: ${({ index }) => colors[index]};
  background-color: ${({ index }) => backgroundColors[index]};

  ${({ isActive }) =>
    isActive &&
    css`
      width: 3.375rem;
      font-size: 1.25rem;
    `}
`;

const backgroundColors = [
  "#FFF5E5",
  "#DEF2EB",
  "#ECE5F9",
  "#FFE5E5",
  "#E2EEFA",
];
const colors = ["#99773D", "#338066", "#5F4D80", "#993D3D", "#406080"];

const Testimonials = ({ testimonials = [] }) => {
  const [activeItem, setActiveItem] = useState(0);

  if (!testimonials?.length) return null;

  return (
    <Wrapper>
      <TestimonialCard>
        <Text color={ACCENT_700} fontSize="1rem" lineHeight={1.5}>
          {testimonials?.[activeItem]?.message}
        </Text>
        <Text
          bold
          fontSize="1rem"
          lineHeight={1.5}
          color={ACCENT_700}
          margin="0 0 0 0.5rem"
        >
          - {testimonials?.[activeItem]?.from}
        </Text>
      </TestimonialCard>

      <FromFlex>
        {testimonials?.map(({ from }, i) => (
          <Preview
            index={i}
            key={from}
            isActive={activeItem === i}
            onClick={() => setActiveItem(i)}
          >
            {from?.substring(0, 2)}
          </Preview>
        ))}
      </FromFlex>
    </Wrapper>
  );
};

export default Testimonials;
