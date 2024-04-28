import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

import FlexBox from "@common/ui/FlexBox";
import { H3 } from "@common/ui/Headings";
import TopSalon from "@components/Home/TopSalon";
import Localities from "@components/Home/Localities";
import { categoryData } from "@metadata/CategoryData";
import { URL } from "@constants/urls";
import { PRIMARY_900, listingChip } from "@common/ui/colors";
import { device } from "@common/ui/Responsive";
import Footer from "@components/common/Footer";
import { Button } from "@common/ui/Buttons";
import NavBar from "@common/NavBar";
import Avatar from "@common/ui/Avatar";
import LoginModal from "@components/Login";
import { trackEvent } from "@utils/helpers";
import Slider from "./Slider";
import OfferCards from "./OfferCards";

const NonStickyWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 20;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const NonStickyNav = styled(FlexBox)`
  width: 86.67%;
  max-width: 75rem;
  margin: auto;
  padding-block: 0.5rem;
  align-items: center;
  justify-content: space-between;

  @media ${device.laptop} {
    padding-block: 0.875rem;
  }
`;

const LogoContainer = styled.div`
  min-width: 6rem;
  max-width: 6rem;

  @media ${device.laptop} {
    min-width: 7.5rem;
    max-width: 7.5rem;
  }
`;

const Logo = styled.img`
  width: 100%;
  cursor: pointer;
`;

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  row-gap: 2rem;
  padding: 6rem 1rem 2rem;

  @media ${device.laptop} {
    row-gap: 4rem;
    padding: 6rem 1rem 4rem;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  margin: auto;
  flex-direction: column;
  padding: 2rem 1rem;

  @media ${device.laptop} {
    padding: 4rem 1rem;
  }
`;

const Divider = styled(FlexBox)`
  border-bottom: 1px solid ${listingChip};
`;

const SliderContainer = styled(FlexBox)`
  flex-direction: column;
  row-gap: 2rem;

  @media ${device.laptop} {
    row-gap: 4rem;
  }
`;

const Home = ({ navContainerStyles }) => {
  const [scrollY, setScrollY] = useState(0);
  const [showNavBar, setShowNavBar] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const user = useSelector(state => state.auth?.user);

  const toggleModal = () => {
    setLoginModal(!loginModal);
  };

  const track = () => {
    trackEvent("login-cta-click", {
      current_page: "home",
    });
  };

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowNavBar(scrollY > 50); // Change 100 to the scroll distance you desire
  }, [scrollY]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(URL.loginSuccess, {
          withCredentials: true,
        });
        console.log("response", response);
      } catch (error) {
        //add bugsnag
      }
    };
    getUser();
  }, []);

  return (
    <FlexBox column position="relative">
      {loginModal && <LoginModal setModalOpen={setLoginModal} page="home" />}
      <NonStickyWrapper show={!showNavBar}>
        <NonStickyNav>
          <LogoContainer>
            <Logo
              isStatic
              height={36}
              draggable={false}
              src="/assets/images/pamprazzi-logo.svg"
              alt="pamprazzi Logo"
            />
          </LogoContainer>
          {user ? (
            <Avatar name={user?.name} />
          ) : (
            <Button
              onClick={() => {
                toggleModal();
                track();
              }}
            >
              Login
            </Button>
          )}
        </NonStickyNav>
      </NonStickyWrapper>
      {showNavBar && <NavBar navContainerStyles={navContainerStyles} />}
      <Wrapper>
        <SliderContainer>
          <Slider heading="What are you looking for?" data={categoryData} />
          <Divider />
        </SliderContainer>
        <FlexBox column rowGap="2rem">
          <H3 bold>Offers For You</H3>
          <OfferCards />
        </FlexBox>
        <TopSalon />
      </Wrapper>
      <FlexBox backgroundColor={PRIMARY_900}>
        <Container>
          <Localities />
        </Container>
      </FlexBox>
      <Footer />
    </FlexBox>
  );
};

export default Home;
