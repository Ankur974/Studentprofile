import { useState } from "react";
import Bugsnag from "@bugsnag/js";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import FlexBox from "@common/ui/FlexBox";
import { H3, H4 } from "@common/Headings";

import { SECONDARY_100, SECONDARY_700 } from "@common/ui/colors";

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

const QuestionCard = styled(FlexBox)`
  width: 100%;
  row-gap: 1rem;
  padding: 1.5rem;
  flex-direction: column;
  border-radius: 0.75rem;
  box-shadow: 0px 8px 20px rgba(78, 97, 55, 0.2);

  @media only screen and (max-width: 768px) {
    ${H3} {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
`;

const NavArrow = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${SECONDARY_100};
`;

const Faqs = ({ questions = [] }) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleForward = () => {
    try {
      if (activeItem === questions?.length - 1) setActiveItem(0);
      else setActiveItem(prev => prev + 1);
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  const handleBackward = () => {
    try {
      if (activeItem === 0) setActiveItem(questions?.length - 1);
      else setActiveItem(prev => prev - 1);
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  if (!questions?.length) return null;

  return (
    <Wrapper>
      <QuestionCard>
        <H3 bold>{questions?.[activeItem]?.question}</H3>
        <H4>{questions?.[activeItem]?.answer}</H4>
      </QuestionCard>

      {questions?.length > 1 && (
        <FlexBox align="center" columnGap="2.5rem">
          <NavArrow onClick={handleBackward}>
            <FaChevronLeft size="0.75rem" color={SECONDARY_700} />
          </NavArrow>
          <NavArrow onClick={handleForward}>
            <FaChevronRight size="0.75rem" color={SECONDARY_700} />
          </NavArrow>
        </FlexBox>
      )}
    </Wrapper>
  );
};

export default Faqs;
