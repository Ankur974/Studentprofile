import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";

import {
  ACCENT_800,
  DARK_MOSS_GREEN_100,
  ACCENT_300,
  ACCENT_500,
} from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import { faqCategories, faqs } from "@metadata/About/faqs";
import { Accordion } from "@common/Dashboard/Accordion";

const CategoryOptions = styled(FlexBox)`
  flex-direction: column;
  color: ${ACCENT_800};
  padding-bottom: 5rem;
`;

const Option = styled(FlexBox)`
  padding: 1.5rem;
  font-weight: 700;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.isSelected && DARK_MOSS_GREEN_100};
  cursor: pointer;
  border-bottom: 1px solid ${ACCENT_300};
`;

const BottomBorder = styled.div`
  border-bottom: 1px solid ${ACCENT_300};
`;

const Mobile = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const MobileHeader = styled(FlexBox)`
  font-weight: 700;
  gap: 1rem;
  padding: 1.5rem 1rem;
  color: ${ACCENT_800};
  border-bottom: 1px solid ${ACCENT_300};
  border-top: 1px solid ${ACCENT_300};
`;

const FaqsMobile = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      setQuestions(faqs[selectedCategory?.category]?.questions);
    }
  }, [selectedCategory]);

  const handleSelectCategory = category => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  return (
    <Mobile data-testid="faqs-mobile">
      <MobileHeader>
        <FiArrowLeft
          size={"1.4rem"}
          color={ACCENT_800}
          onClick={handleBackClick}
        />
        <Switch>
          <Case condition={selectedCategory}>{selectedCategory?.label}</Case>
          <Default>Frequently Asked Questions</Default>
        </Switch>
      </MobileHeader>
      <CategoryOptions>
        <Switch>
          <Case condition={!selectedCategory}>
            {faqCategories.map((category, index) => {
              return (
                <Option
                  key={index}
                  onClick={() => handleSelectCategory(category)}
                >
                  {category.label}
                  <FiChevronRight size={"1.4rem"} color={ACCENT_500} />
                </Option>
              );
            })}
          </Case>
          <Case condition={selectedCategory}>
            {questions?.map((question, index) => {
              return (
                <div key={selectedCategory?.category + "-" + index}>
                  <Accordion
                    title={question.question}
                    content={question.answer}
                  />
                  <BottomBorder />
                </div>
              );
            })}
          </Case>
        </Switch>
      </CategoryOptions>
    </Mobile>
  );
};

export default FaqsMobile;
