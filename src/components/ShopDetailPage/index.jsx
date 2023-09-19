import React from "react";
import styled from "styled-components";

import FlexBox from "../common/ui/FlexBox";
import Services from "./Services";
import HeroBanner from "./Banner";
import RealAbout from "./About";
import Tabs from "../common/ui/Tabs";

const Container = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  row-gap: 2rem;
`;

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 50rem;
  margin: auto;
  padding-inline: 1rem;
`;

const Tab = styled(FlexBox)``;

const ShopDetailPage = () => {
  return (
    <Container>
      <HeroBanner />
      <Wrapper>
        <Tabs>
          <Tab title="Services">
            <Services />
          </Tab>
          <Tab title="About">
            <RealAbout />
          </Tab>
        </Tabs>
      </Wrapper>
    </Container>
  );
};
export default ShopDetailPage;
