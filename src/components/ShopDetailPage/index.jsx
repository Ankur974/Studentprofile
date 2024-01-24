import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import FlexBox from "@common/ui/FlexBox";
import Tabs from "@common/ui/Tabs";
import { device } from "@common/ui/Resposive";
import Loader from "@common/Dashboard/Loader";
import { URL } from "@constants/urls";
import Services from "./Services";
import About from "./About";
import MobileBanner from "./MobileBanner";
import DesktopBanner from "./DesktopBanner";
import Cart from "./Cart";

const Container = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  justify-content: center;
  row-gap: 1.5rem;
  align-items:center;
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
  padding-inline: 1rem;
  padding-bottom: 2.5rem;
`;

const CartAndABoutBox = styled(FlexBox)`
  width: 100%;
  margin: auto;
  justify-content: center;
  column-gap: 0.5rem;
`;

const CartAndOfferContainer = styled(FlexBox)`
  min-width: 20rem;
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
      <CartAndABoutBox>
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
      </CartAndABoutBox>
    </Container>
  );
};

export default ShopDetailPage;
