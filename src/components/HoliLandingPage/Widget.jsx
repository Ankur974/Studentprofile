import React from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { WHITE } from "@common/ui/colors";
import { device } from "@common/ui/Resposive";
import { Display } from "@common/ui/Headings";

const WidgetContainer = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  flex-direction: column;
  padding: 1.5rem;
  gap: 2.5rem;

  @media ${device.laptop} {
    flex-direction: row;
    padding: 3rem;
  }
`;

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  background: linear-gradient(180deg, #83337c 0%, #533a71 100%);
  padding: 1.5rem;
`;

const LeftSection = styled(FlexBox)`
  justify-content: center;
`;

const WidgetImg = styled.img`
  height: 20rem;

  @media ${device.laptop} {
    height: 40.5rem;
  }
`;

const RightSection = styled(FlexBox)`
  flex: 1;
  flex-direction: column;

  @media ${device.laptop} {
    max-width: 50%;
  }
`;

const Caption = styled(Display)`
  text-align: center;
  color: ${WHITE};

  @media ${device.laptop} {
    text-align: left;
  }
`;

const Widget1 = ({ reverse }) => (
  <WidgetContainer reverse={reverse}>
    <RightSection justify="center" rowGap="1rem">
      <Caption bold>
        Self Care at your fingertips: Reviews for smarter bookings.
      </Caption>
    </RightSection>
    <LeftSection>
      <WidgetImg src="/assets/images/holi/widget2.webp" />
    </LeftSection>
  </WidgetContainer>
);

const Widget2 = () => (
  <WidgetContainer>
    <LeftSection>
      <WidgetImg src="/assets/images/holi/widget1.webp" />
    </LeftSection>
    <RightSection justify="center" rowGap="1rem">
      <Caption bold>No hidden charges: Book with us, no fees!</Caption>
    </RightSection>
  </WidgetContainer>
);

const Widget = () => (
  <Wrapper>
    <Widget1 />
    <Widget2 />
  </Wrapper>
);

export default Widget;
