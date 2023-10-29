import styled, { keyframes } from "styled-components";
import FlexBox from "@common/ui/FlexBox";

import { LIGHT_GREY, WHITE, ACCENT_500 } from "@common/ui/colors";

const Blink = keyframes`
  0% {
    opacity: 0.75;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.75;
  }
`;

const Card = styled.div`
  width: 100%;
  background-color: ${WHITE};
  border-radius: 12px;
  padding: 1rem;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    background-color: ${LIGHT_GREY};
  }

  .blink {
    animation: ${Blink};
    animation-duration: 1.25s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }

  .solid-block {
    padding: 0.325rem 0.25rem;
    border-radius: 0.2rem;
    background-color: ${ACCENT_500};
  }
`;

const ContentFlex = styled(FlexBox)`
  min-height: 3rem;
  max-height: 3rem;
  column-gap: 1.5rem;
`;

const SessionImg = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.375rem;
  background-color: ${ACCENT_500};
`;

const SessionDetail = styled(FlexBox)`
  flex: 1;
`;

const Title = styled.div`
  width: 30%;
`;

const SubTitle = styled.div`
  width: 35%;
`;

const LoaderWrapper = styled(FlexBox)`
  width: 100%;
`;

const SessionsListingLoader = () => (
  <LoaderWrapper column rowGap="1.25rem">
    {new Array(2).fill(0).map((_, index) => (
      <Card key={`${index}loader`}>
        <ContentFlex align="center">
          <SessionImg className="blink" />
          <SessionDetail className="blink" column rowGap="0.75rem">
            <Title className="solid-block" />
            <SubTitle className="solid-block" />
          </SessionDetail>
        </ContentFlex>
      </Card>
    ))}
  </LoaderWrapper>
);

export default SessionsListingLoader;
