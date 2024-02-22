import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import FlexBox from "@common/ui/FlexBox";
import Tabs from "@common/ui/Tabs";
import { device } from "@common/ui/Resposive";
import Loader from "@common/ui/Loader";
import { URL } from "@constants/urls";
import Services from "./Services";
import About from "./About";
import MobileBanner from "./MobileBanner";
import DesktopBanner from "./DesktopBanner";
import Cart from "./Cart";

const Container = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  row-gap: 1.5rem;
  align-items: center;

  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
    margin: auto;
  }
`;

const HideMobile = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    margin: auto;
  }
`;

const HideDesktop = styled.div`
  width: 100%;
  @media ${device.laptop} {
    display: none;
  }
`;

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding-bottom: 2.5rem;
`;

const CartAndAboutBox = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  column-gap: 4rem;
  padding: 1.5rem;

  @media ${device.laptop} {
    padding: 0;
  }
`;

const CartAndOfferContainer = styled(FlexBox)`
  display: none;
  @media ${device.laptop} {
    display: flex;
    min-width: 20rem;
  }
`;

const Tab = styled(FlexBox)``;

const ShopDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [shopData, setShopData] = useState({});

  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URL.getStore);
      console.log(res);
      setShopData(res?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <HideMobile>
        <DesktopBanner />
      </HideMobile>
      <HideDesktop>
        <MobileBanner />
      </HideDesktop>
      <CartAndAboutBox>
        <Wrapper>
          <Tabs>
            <Tab title="Services">
              <Services shopData={shopData} />
            </Tab>
            <Tab title="About">
              <About shopData={shopData[0]} />
            </Tab>
          </Tabs>
        </Wrapper>
        <CartAndOfferContainer column>
          <Cart />
        </CartAndOfferContainer>
      </CartAndAboutBox>
    </Container>
  );
};

export default ShopDetailPage;
