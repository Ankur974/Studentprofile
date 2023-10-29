import React from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

import { Case, Default, Switch } from "@common/ConditionalRendering";
import { H4 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_800 } from "@common/ui/colors";

const Container = styled(FlexBox)`
  align-items: center;
  gap: 1rem;
  padding-left: 1.5rem;
`;

const Content = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem 0;
  width: 85%;
`;

const SideBorder = styled.div`
  width: 1px;
  position: absolute;
  left: 0.5rem;
  bottom: 0;
  background-color: ${ACCENT_800};
  height: ${props => (props.isFirstChild ? "78%" : "100%")};
  @media screen and (max-width: 480px) {
    height: ${props => (props.isFirstChild ? "82%" : "100%")};
  }
`;

const Circle = styled.div`
  border-radius: 50%;
  height: 0.5rem;
  width: 0.5rem;
  border: 1px solid ${ACCENT_800};
  background-color: ${props => (props.isPrimary ? ACCENT_800 : "white")};
  position: absolute;
  left: -12.25%;
`;

const Title = styled(FlexBox)`
  position: relative;
  align-items: center;
`;

const JourneyItem = ({
  title,
  content,
  redirectionLink,
  isPrimary,
  isFirstChild,
}) => {
  const handleOnClick = () => {
    console.log("redirect to ", redirectionLink);
  };

  return (
    <Container onClick={handleOnClick} isPrimary={isPrimary}>
      <SideBorder isFirstChild={isFirstChild} />
      <Content column rowGap="0.5rem">
        <Switch>
          <Case condition={!isPrimary}>
            <Title>
              <Circle isPrimary={isPrimary} />
              <H4 opacity={0.7}>{title}</H4>
            </Title>
          </Case>
          <Default>
            <Title>
              <Circle isPrimary={isPrimary} />
              <H4 bold>{title}</H4>
            </Title>
          </Default>
        </Switch>
        <H4 opacity={!isPrimary && 0.7}>{content}</H4>
      </Content>
      <FiChevronRight />
    </Container>
  );
};

export default JourneyItem;
