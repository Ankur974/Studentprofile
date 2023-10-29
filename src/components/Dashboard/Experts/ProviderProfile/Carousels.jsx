import { useState } from "react";
import styled from "styled-components";

import Slider from "./Slider";
import { H3, H4 } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";
import { WHITE, ACCENT_500 } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  * {
    box-sizing: border-box;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 2.5rem;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  row-gap: 3rem;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    row-gap: 2.5rem;
  }
`;

const ContentWrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 2.25rem;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_500};

  * {
    box-sizing: border-box;
  }
`;

const QuestionCard = styled(FlexBox)`
  width: 100%;
  row-gap: 1rem;
  padding: 1.5rem;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: ${WHITE};

  @media only screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const TestimonialCard = styled(FlexBox)`
  width: 100%;
  row-gap: 1rem;
  padding: 1.5rem;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: ${WHITE};

  @media only screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const Carousels = ({ providerData }) => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTestmonial, setActiveTestmonial] = useState(0);

  return (
    <Wrapper>
      <Container>
        <Slider
          title="Testimonials"
          list={providerData?.addon_profile_details?.testimonials}
          setActiveIndex={setActiveTestmonial}
          icon="/assets/images/profile/testimonials.svg"
        >
          <ContentWrapper>
            <TestimonialCard>
              <H4>
                {
                  providerData?.addon_profile_details?.testimonials?.[
                    activeTestmonial
                  ]?.message
                }
              </H4>
              <H3 bold textAlign="end">
                -{" "}
                {
                  providerData?.addon_profile_details?.testimonials?.[
                    activeTestmonial
                  ]?.from
                }
              </H3>
            </TestimonialCard>
          </ContentWrapper>
        </Slider>

        <Slider
          title="FAQs"
          list={providerData?.questions}
          setActiveIndex={setActiveFaq}
          icon="/assets/images/profile/faq.svg"
        >
          <ContentWrapper>
            <QuestionCard>
              <H3 bold>{providerData?.questions?.[activeFaq]?.question}</H3>
              <H4>{providerData?.questions?.[activeFaq]?.answer}</H4>
            </QuestionCard>
          </ContentWrapper>
        </Slider>
      </Container>
    </Wrapper>
  );
};

export default Carousels;
