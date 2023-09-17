import React from "react";
import styled from "styled-components";
import FlexBox from "../../components/common/ui/FlexBox";
import Services from "./Services";
import HeroBanner from "./Banner";
import RealAbout from "./About";
import Tabs from "../../components/common/ui/Tabs";

const Container = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  row-gap: 2rem;
`;

const Tab = styled(FlexBox)``;

const About = () => {
  return (
    <Container>
      <HeroBanner />
      <Tabs>
        <Tab title="Services">
          <Services />
        </Tab>
        <Tab title="About">
          <RealAbout />
        </Tab>
      </Tabs>
    </Container>
  );
};
export default About;
