import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";

import { Case, Switch } from "@common/ConditionalRendering";
import { Loader } from "@common/Loader";
import { DAVYS_GREY_300 } from "@common/ui/colors";
import useMobileView from "@hooks/useMobileView";

const FaqsDesktop = dynamic(() => import("./FaqsDesktop"), {
  loading: () => <Loader />,
  ssr: false,
});

const FaqsMobile = dynamic(() => import("./FaqsMobile"), {
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

const Faqs = () => {
  const isMobile = useMobileView();
  return (
    <Container data-testid="faqs-main">
      <Switch>
        <Case condition={isMobile}>
          <FaqsMobile />
        </Case>
        <Case condition={!isMobile}>
          <FaqsDesktop />
        </Case>
      </Switch>
    </Container>
  );
};

export default Faqs;
