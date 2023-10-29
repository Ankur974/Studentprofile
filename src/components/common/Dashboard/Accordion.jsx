import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FiChevronDown } from "react-icons/fi";

import FlexBox from "../FlexBox";
import { ACCENT_800 } from "@common/ui/colors";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1rem 1.5rem;
`;

const Header = styled(FlexBox)`
  width: 100%;
  color: ${ACCENT_800};
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${ACCENT_800};
  width: 90%;
`;

const Body = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5rem;
`;

const ChevronIcon = styled(FiChevronDown)`
  ${({ isOpen }) =>
    isOpen
      ? css`
          transform-origin: 50% 50%;
          transition: transform 0.3s;
          transform: rotate(180deg);
        `
      : css`
          transform-origin: 50% 50%;
          transition: transform 0.3s;
          transform: rotate(0deg);
        `}
`;

export const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container column rowGap="1rem">
      <Header data-testid="accordion-head" onClick={handleClick}>
        <Title>{title}</Title>
        <ChevronIcon size={"1.5rem"} isOpen={isOpen} />
      </Header>
      {isOpen && <Body data-testid="accordion-body">{content}</Body>}
    </Container>
  );
};
