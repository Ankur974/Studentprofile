import React from "react";
import styled from "styled-components";

import FlexBox from "../common/ui/FlexBox";
import Tabs from "../common/ui/Tabs";
import Services from "./Services";
import About from "./About";
import MobileBanner from "./MobileBanner";
import DesktopBanner from "./DesktopBanner";
import { device } from "../common/ui/Resposive";

const Container = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  justify-content: center;
  row-gap: 1.5rem;
  margin: auto;
`;

const HideMobile = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    width: 86.67%;
    max-width: 75rem;
    margin: auto;
  }
`;

const HideDesktop = styled(FlexBox)`
  width: 100%;
  @media ${device.laptop} {
    display: none;
  }
`;

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 50rem;
  margin: auto;
  padding-inline: 1rem;
  padding-bottom: 2.5rem;
`;

const Tab = styled(FlexBox)``;

const ShopDetailPage = () => {
  return (
    <Container>
      <HideMobile>
        <DesktopBanner />
      </HideMobile>
      <HideDesktop>
        <MobileBanner />
      </HideDesktop>
      <Wrapper>
        <Tabs>
          <Tab title="Services">
            <Services />
          </Tab>
          <Tab title="About">
            <About />
          </Tab>
        </Tabs>
      </Wrapper>
    </Container>
  );
};
export default ShopDetailPage;
