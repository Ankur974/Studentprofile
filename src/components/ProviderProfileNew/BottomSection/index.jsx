import { useMemo, useState } from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { WHITE } from "@common/ui/colors";
import { trackEvent, currentFlow } from "@utils/helpers";
import Slider from "./Slider";
import { Text } from "@common/Text";
import { cfInfoCarousel } from "../../../metadata/cfInfo";
import { PRIMARY_800 } from "../../../constants/colors";

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

const CFInfoHeader = styled(FlexBox)`
  align-items: center;
  gap: 2rem;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const CFInfoIcon = styled.img``;

const CFInfoDescription = styled(Text)`
  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

export const RenderCfInfoCarousel = () => {
  const [activeCfInfo, setActiveCfInfo] = useState(0);
  return (
    <FlexBox column rowGap="2rem">
      <Slider
        title="Care you can access through Children First"
        list={cfInfoCarousel}
        setActiveIndex={setActiveCfInfo}
        icon="/assets/images/cf/cf-carousel-info.svg"
      >
        <ContentWrapper>
          <QuestionCard>
            <CFInfoHeader>
              <CFInfoIcon src={cfInfoCarousel?.[activeCfInfo]?.icon} />
              <Text bold fontSize="1rem" lineHeight={1.5}>
                {cfInfoCarousel?.[activeCfInfo]?.title}
              </Text>
            </CFInfoHeader>
            <CFInfoDescription fontSize="0.875rem" lineHeight={1.5}>
              {cfInfoCarousel?.[activeCfInfo]?.description}
            </CFInfoDescription>
          </QuestionCard>
        </ContentWrapper>
      </Slider>
      <Text
        textDecoration="underline"
        underlineOffset="2px"
        bold
        textTransform="uppercase"
        color={PRIMARY_800}
        cursor="pointer"
      >
        Know More
      </Text>
    </FlexBox>
  );
};

const BottomSection = ({
  providerData,
  providerType,
  sessionType = "single",
}) => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTestmonial, setActiveTestmonial] = useState(0);

  const type = providerType?.toLowerCase();
  const flow = currentFlow(type, sessionType);
  const fullName = useMemo(() => {
    if (providerData?.uuid === "a9c7f59f-13ed-4e6e-a665-3ad7b601e722") {
      return "Dr Divya Ganesh Nallur";
    }
    return `${providerData?.firstname || ""} ${
      providerData?.lastname || ""
    }`.trim();
  }, [providerData?.uuid]);

  const payload = {
    flow,
    [`${type}_name`]: fullName,
    [`${type}_uuid`]: providerData?.uuid,
    expt_variant: "new_page",
  };

  const handleFaq = () => {
    trackEvent({
      event: "provider_profile_faq_click",
      payload,
    });
    // setTabOpen("faqs");
  };

  const handleTestimonials = () => {
    trackEvent({
      event: "provider_profile_testimonial_click",
      payload,
    });
    // setTabOpen("testimonials");
  };

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
              <Text fontSize="0.875rem" lineHeight={1.5}>
                {
                  providerData?.addon_profile_details?.testimonials?.[
                    activeTestmonial
                  ]?.message
                }
              </Text>
              <Text bold fontSize="1rem" lineHeight={1.5} textAlign="end">
                -{" "}
                {
                  providerData?.addon_profile_details?.testimonials?.[
                    activeTestmonial
                  ]?.from
                }
              </Text>
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
              <Text bold fontSize="1rem" lineHeight={1.5}>
                {providerData?.questions?.[activeFaq]?.question}
              </Text>
              <Text fontSize="0.875rem" lineHeight={1.5}>
                {providerData?.questions?.[activeFaq]?.answer}
              </Text>
            </QuestionCard>
          </ContentWrapper>
        </Slider>
      </Container>
    </Wrapper>
  );
};

export default BottomSection;
