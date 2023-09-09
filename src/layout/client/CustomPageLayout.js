import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FooterNote from "@common/FooterNote";
import Footer from "@common/Footer";
import CustomLinkComponent from "@utils/CustomLinkComponent";
import useMobileView from "@hooks/useMobileView";
import { Loader } from "@common/Loader";
import { FlexBox } from "@common/FlexBox";
import { ACCENT_400, PRIMARY_800, WHITE } from "@constants/colors";

const NavContainer = styled(FlexBox)`
  padding: 1rem 0;
  border-bottom: 0.0625rem solid ${ACCENT_400};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  background: ${WHITE};

  @media (max-width: 768px) {
    height: 1.5rem;
  }

  ${({ navContainerStyles }) =>
    navContainerStyles &&
    css`
      ${navContainerStyles}
    `}
`;

const NavMain = styled(FlexBox)`
  max-width: 75rem;
  width: 86.67%;

  @media only screen and (max-width: 48rem) {
    position: unset;
  }
`;

const AmahaLogoContainer = styled.div`
  min-width: 8.5rem;
  max-width: 8.5rem;
  width: 8.5rem;

  @media only screen and (max-width: 48rem) {
    min-width: 5rem;
    max-width: 5rem;
    width: 5rem;
  }
`;

const AmahaLogo = styled.img`
  width: 100%;
  cursor: pointer;
`;

const CallbackCTA = styled(FlexBox)`
  color: ${WHITE};
  border: none;
  outline: none;
  border-radius: 50rem;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  width: fit-content;
  background-color: ${PRIMARY_800};
  &:hover {
    opacity: 0.9;
  }
  @media only screen and (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const CustomPageLayout = ({
  color,
  children,
  footerNote,
  footerColor,
  navContainerStyles,
}) => {
  const [isMobileApp, setIsMobileApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobileView();

  useEffect(() => {
    setIsMobileApp(
      window?.Android || window?.ReactNativeWebView || window?.YouMatter
    );
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  const scrollToB2bLeads = () => {
    const element = document.getElementById("contact-form");
    element.scrollIntoView({
      behavior: "smooth",
      block: isMobile ? "end" : "start",
      inline: "nearest",
    });
  };

  if (!isMobileApp) {
    return (
      <>
        <NavContainer
          align="center"
          justify="center"
          navContainerStyles={navContainerStyles}
        >
          <NavMain justify="space-between" align="center" width="90%">
            <CustomLinkComponent href="/?source=topnav">
              <AmahaLogoContainer>
                <AmahaLogo
                  src="https://cdn.theinnerhour.com/assets/images/AmahaLogo.svg"
                  draggable={false}
                  alt="Amaha Logo"
                />
              </AmahaLogoContainer>
            </CustomLinkComponent>
            <CallbackCTA onClick={() => scrollToB2bLeads("home_banner")}>
              REQUEST A CALLBACK
            </CallbackCTA>
          </NavMain>
        </NavContainer>
        {children}
        <FooterNote color={color} footerColor={footerColor}>
          {footerNote}
        </FooterNote>
        <Footer />
      </>
    );
  }

  return children;
};

export default CustomPageLayout;
