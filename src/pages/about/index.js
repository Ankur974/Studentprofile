import React from "react";
import styled from "styled-components";
import FlexBox from "../../components/common/ui/FlexBox";
import Services from "./Services";
import HeroBanner from "./Banner";

const Container = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
`;

const About = () => {
  return (
    <Container>
      <HeroBanner />
      <Services />
    </Container>
  );
};
export default About;
