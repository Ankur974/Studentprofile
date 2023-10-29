import styled from "styled-components";
import { useState } from "react";

import FlexBox from "@common/ui/FlexBox";
import Slider from "./Slider";
import { cfInfoCarousel } from "@metadata/cfInfo";
import { H3, H4 } from "@common/Dashboard/Headings";
import { WHITE, ACCENT_500 } from "@common/ui/colors";

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

const CFInfoHeader = styled(FlexBox)`
  align-items: center;
  gap: 2rem;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const CFInfoIcon = styled.img``;

const CfInfoCarousel = () => {
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
              <H3 bold>{cfInfoCarousel?.[activeCfInfo]?.title}</H3>
            </CFInfoHeader>
            <H4>{cfInfoCarousel?.[activeCfInfo]?.description}</H4>
          </QuestionCard>
        </ContentWrapper>
      </Slider>
    </FlexBox>
  );
};

export default CfInfoCarousel;
