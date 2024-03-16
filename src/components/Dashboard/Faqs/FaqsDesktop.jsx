import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPlayFill } from "react-icons/bs";

import { ACCENT_100 } from "@common/ui/colors";
import { faqCategories, faqs } from "@metadata/About/faqs";
import {
  ACCENT_800,
  PRIMARY_100,
  PRIMARY_800,
  ACCENT_300,
} from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { Accordion } from "@common/ui/Accordion";
import { boxShadowDs1 } from "@common/ui/styles";

const Desktop = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: calc(30% - 0.75rem) calc(70% - 0.75rem);
  grid-template-rows: 100%;
  column-gap: 1.5rem;
  transform: translateX(0%);
  transition: all 500ms ease-in-out;
`;

const LeftSection = styled.div`
  min-width: 15rem;
  background-color: ${ACCENT_100};
  border-radius: 1rem;
  overflow: hidden;
  transition: all 500ms ease-in-out;
  ${boxShadowDs1}
`;

const CenterSection = styled.div`
  min-width: 42rem;
  background-color: ${ACCENT_100};
  border-radius: 1rem;
  padding-top: 0.5rem;
  ${boxShadowDs1}
  overflow: auto;
`;

const CategoryOptions = styled(FlexBox)`
  flex-direction: column;
  color: ${ACCENT_800};
`;

const Option = styled(FlexBox)`
  padding: 1.5rem;
  font-weight: 700;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.isSelected && PRIMARY_100};
  cursor: pointer;
`;

const BottomBorder = styled.div`
  border-bottom: 1px solid ${ACCENT_300};
`;

const FaqsDesktop = () => {
  const [selectedCategory, setSelectedCategory] = useState(faqCategories[0]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      setQuestions(faqs[selectedCategory?.category]?.questions);
    }
  }, [selectedCategory]);

  const handleSelectCategory = category => {
    setSelectedCategory(category);
  };

  return (
    <Desktop data-testid="faqs-desktop">
      <LeftSection>
        <CategoryOptions>
          {faqCategories.map((category, index) => {
            const isSelected = selectedCategory === category;
            return (
              <Option
                key={index}
                isSelected={isSelected}
                onClick={() => handleSelectCategory(category)}
              >
                {category.label}
                {isSelected && (
                  <BsPlayFill
                    size={"1.4rem"}
                    color={isSelected ? PRIMARY_800 : ACCENT_800}
                  />
                )}
              </Option>
            );
          })}
        </CategoryOptions>
      </LeftSection>
      <CenterSection className="hide-scrollbar">
        {questions?.map((question, index) => {
          return (
            <div key={selectedCategory?.category + "-" + index}>
              <Accordion
                title={question?.question}
                content={question?.answer}
              />
              <BottomBorder />
            </div>
          );
        })}
      </CenterSection>
    </Desktop>
  );
};

export default FaqsDesktop;
