/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H3 } from "@common/ui/Headings";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Wrapper = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  background-color: #fcfbf7;
  align-items: center;
  padding: 2rem 0;
  gap: 4rem;
`;

const Heading = styled.div`
  color: #000;
  font-size: 58px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 65%;
  margin-bottom: 0;
  text-align: center;
`;

const AccordionWrapper = styled(FlexBox)`
  flex-direction: column;
  gap: 1rem;
`;

const AccordionItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  display: flex;

  flex-direction: column;
`;

const AccordionContent = styled.div`
  margin-top: 1rem;
  font-size: 14px;
  color: #555;
`;

const AccordionTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  margin-left: 1rem;
  font-size: 1rem;
`;

const Container = styled(FlexBox)``;

const LeftSection = styled(FlexBox)`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RightSection = styled(FlexBox)`
  flex: 1;
  flex-direction: column;
`;

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Wrapper column>
      <H3>GET TO KNOW US</H3>
      <Heading>Frequently Asked Questions</Heading>
      <FlexBox width="100%" justify="center" columnGap="1.5rem">
        <AccordionWrapper>
          {[1, 2, 3].map((item, index) => (
            <AccordionItem key={index} onClick={() => toggleAccordion(index)}>
              <AccordionTitle>
                Accordion Title {item}
                <IconWrapper>
                  {activeIndex === index ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </IconWrapper>
              </AccordionTitle>
              {activeIndex === index && (
                <AccordionContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur vel augue id nulla facilisis venenatis.
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </AccordionWrapper>
      </FlexBox>
      <Container>
        <LeftSection>
          <Heading>Get in touch with us</Heading>
          <H3>Send your enquiry now!</H3>
        </LeftSection>
        <RightSection>
          <img src="assets/map.png"></img>
        </RightSection>
      </Container>
    </Wrapper>
  );
};

export default Index;
