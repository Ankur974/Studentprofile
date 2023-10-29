import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";

import { Case, Switch } from "@common/ConditionalRendering";
import { Loader } from "@common/Loader";
import { DAVYS_GREY_300 } from "@common/ui/colors";
import useMobileView from "@hooks/useMobileView";

const JourneyDesktop = dynamic(() => import("./JourneyDesktop"), {
  loading: () => <Loader />,
  ssr: false,
});

const JourneyMobile = dynamic(() => import("./JourneyMobile"), {
  loading: () => <Loader />,
  ssr: false,
});

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  @media screen and (min-width: 769px) {
    background-color: ${DAVYS_GREY_300};
    padding: 1.5rem;
  }
`;

const Journey = () => {
  const isMobile = useMobileView();
  return (
    <Container data-testid="journey-main">
      <Switch>
        <Case condition={isMobile}>
          <JourneyMobile />
        </Case>
        <Case condition={!isMobile}>
          <JourneyDesktop />
        </Case>
      </Switch>
    </Container>
  );
};

export default Journey;
