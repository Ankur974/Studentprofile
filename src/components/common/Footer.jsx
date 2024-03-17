import React from "react";
import { useSelector } from "react-redux";
import {
  SlSocialFacebook,
  SlSocialLinkedin,
  SlSocialInstagram,
  // SlSpeech,
} from "react-icons/sl";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { trackEvent } from "@utils/helpers";
import { H6, Body1, Body2, H1, Display, H3 } from "@common/ui/Headings";
import {
  ACCENT_0,
  ACCENT_400,
  ACCENT_800,
  PRIMARY_800,
  SECONDARY_800,
} from "@common/ui/colors";
import { device } from "@common/ui/Resposive";
import { useRouter } from "next/router";

const FooterContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2.5rem;
  gap: 2.5rem;

  background-color: ${({ customBg }) =>
    customBg ? ACCENT_800 : SECONDARY_800};
`;

const ContentContainer = styled(FlexBox)`
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  background-color: ${SECONDARY_800};
  flex-direction: column;
  height: 35rem;
  gap: 2.5rem;

  @media ${device.laptop} {
    justify-content: space-evenly;
    flex-direction: row;
    height: 11rem;
  }
`;

const ContentBox = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  align-items: center;
  @media ${device.laptop} {
    width: ${({ isLarge }) => (isLarge ? "40%" : "20%")};
    row-gap: 0.625rem;
    align-items: baseline;
  }
`;

const CopyRightBox = styled(FlexBox)`
  background-color: ${PRIMARY_800};
  width: 100%;
  height: 3rem;
  justify-content: center;
  align-items: center;
`;

const HeadingText = styled(H3)`
  font-weight: bold;
  color: ${ACCENT_0};
`;

const NavLink = styled(Body2)`
  cursor: pointer;
  width: fit-content;
  color: ${ACCENT_0};
`;

const IconContainer = styled(FlexBox)`
  box-sizing: border-box;
  padding: 0.625rem;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  border: 2px solid ${ACCENT_400};

  &:hover {
    border: 2px solid ${ACCENT_0};
  }
`;

const socialIconsData = [
  {
    icon: SlSocialFacebook,
    link: "https://www.facebook.com/pamprazzi/",
    mediaType: "Facebook",
  },
  {
    icon: SlSocialLinkedin,
    link: "https://www.linkedin.com/home?originalSubdomain=in",
    mediaType: "LinkedIn",
  },
  {
    icon: SlSocialInstagram,
    link: "https://www.instagram.com/pamprazzi/",
    mediaType: "Instagram",
  },
  // { icon: SlSpeech, link: "" },
];

const servicesNavLinkData = [
  { name: "For Merchants", onClick: () => "" },
  {
    name: "For Our Customers",
    onClick: () => console.log("2Services clicked"),
  },
];

const aboutNavLinkData = [
  { name: "Privacy Policy", onClick: () => console.log("Home clicked") },
  {
    name: "Terms and Conditions",
    onClick: () => console.log("Services clicked"),
  },
  { name: "FAQs", onClick: () => console.log("About Us clicked") },
  { name: "Contact Us", onClick: () => console.log("Contact clicked") },
];

const getInTouchNavLinkData = [
  {
    name: "Kolkata, West Bengal",
    onClick: () => console.log("Home clicked"),
  },
  {
    name: "hello@pamprazzi.com",
    onClick: () => console.log("About Us clicked"),
  },
];

const Footer = ({ eventMobileView }) => {
  const router = useRouter();
  const currentUser = useSelector(state => state.auth?.user);

  return (
    <>
      <FooterContainer customBg={eventMobileView}>
        <FlexBox column rowGap="0.25rem">
          <FlexBox justify="center">
            <Display color={ACCENT_0}>
              Don’t forget to पेम्पेर yourself!
            </Display>
          </FlexBox>
          <FlexBox justify="center" columnGap="0.57rem">
            <img src="/assets/footer-img/heartlogo.svg" />
            <H1 color={ACCENT_0}>Proudly built in Kolkata</H1>
          </FlexBox>
        </FlexBox>
        <FlexBox justify="center" columnGap="1.31rem">
          {socialIconsData &&
            socialIconsData.map((icon, index) => {
              const Icon = icon.icon;
              return (
                <a
                  key={index}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconContainer
                    onClick={() => {
                      trackEvent({
                        event: "footer-social-click",
                        payload: {
                          source: "holi-lp",
                          isLoggedIn: currentUser ? true : false,
                          social: socialIconsData?.mediaType,
                        },
                      });
                    }}
                  >
                    <Icon color={ACCENT_0} size={24} />
                  </IconContainer>
                </a>
              );
            })}
        </FlexBox>
        {!eventMobileView && (
          <ContentContainer>
            <ContentBox isLarge align="center">
              <img src="/assets/images/pamprazzi-logo-white.svg"></img>
              <Body1 color={ACCENT_0}>Simplifying Self-Care</Body1>
            </ContentBox>
            <ContentBox>
              <HeadingText>Services</HeadingText>
              {servicesNavLinkData.map((button, index) => (
                <NavLink
                  key={index}
                  cursor="pointer"
                  onClick={() => router.push(button?.link)}
                  color={ACCENT_0}
                >
                  {button.name}
                </NavLink>
              ))}
            </ContentBox>
            <ContentBox>
              <HeadingText>About</HeadingText>
              {aboutNavLinkData.map((button, index) => (
                <NavLink key={index} onClick={button.onClick}>
                  {button.name}
                </NavLink>
              ))}
            </ContentBox>
            <ContentBox>
              <HeadingText>Get in touch</HeadingText>
              {getInTouchNavLinkData.map((button, index) => (
                <NavLink key={index} onClick={button.onClick}>
                  {button.name}
                </NavLink>
              ))}
            </ContentBox>
          </ContentContainer>
        )}
      </FooterContainer>
      <CopyRightBox>
        <H6 color={ACCENT_0}>
          Copyright © 2024 Pamprazzi. All rights reserved.
        </H6>
      </CopyRightBox>
    </>
  );
};

export default Footer;
