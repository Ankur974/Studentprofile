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
  align-items: center;

  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
    margin: auto;
    row-gap: 1.5rem;
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

  @media ${device.laptop} {
    width: 68%;
  }
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

const Tab = styled(FlexBox)`
  width: 100%;
`;

const ShopDetailPage = ({ storeId }) => {
  const [loading, setLoading] = useState(false);
  const [shopData, setShopData] = useState({});

  useEffect(() => {
    if (!storeId) return;
    fetchShopData();
  }, [storeId]);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL.getStore}/${storeId}`);
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
        <DesktopBanner shopData={shopData} />
      </HideMobile>
      <HideDesktop>
        <MobileBanner shopData={shopData} />
      </HideDesktop>
      <CartAndAboutBox>
        <Wrapper>
          <Tabs>
            <Tab title="Services">
              <Services shopData={shopData} storeId={storeId} />
            </Tab>
            <Tab title="About">
              <About shopData={shopData} />
            </Tab>
          </Tabs>
        </Wrapper>
        <CartAndOfferContainer column>
          <Cart shopData={shopData} />
        </CartAndOfferContainer>
      </CartAndAboutBox>
    </Container>
  );
};

export default ShopDetailPage;
