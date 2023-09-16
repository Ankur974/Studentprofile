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
  row-gap:2rem;
`;

const About = () => {
  return (
    <Container>
      <HeroBanner />
      <Tabs TabName1="Services" TabName2="About" children1={<Services />} children2={<RealAbout />} />
    </Container>
  );
};
export default About;

