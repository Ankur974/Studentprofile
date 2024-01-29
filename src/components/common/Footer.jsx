import React from "react";
import { useRouter } from "next/router";

import FlexBox from "./ui/FlexBox";
import { H6, Body1, Body2, H1 } from "./ui/Headings";
import styled from "styled-components";
import { ACCENT_0, PRIMARY_800, SECONDARY_800 } from "./ui/colors";
import { device } from "./ui/Resposive";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${SECONDARY_800};
`;

const ContentContainer = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${SECONDARY_800};
  flex-direction: column;
  height: 35rem;
  width: 100%;
  @media ${device.laptop} {
        align-items: baseline;
    flex-direction: row;
    height: 14rem;
  }
`;

const Content = styled(FlexBox)`
  align-items: center;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  @media ${device.laptop} {
    width: 27%;
    row-gap: 0.625rem;
  }
`;

const CopyRightContainer = styled(FlexBox)`
  background-color: ${PRIMARY_800};
  width: 100%;
  height: 3rem;
  justify-content: center;
  align-items: center;
`;

const Heading = styled(Body1)`
  font-weight: bold;
  color: ${ACCENT_0};
`;

const Item = styled(Body2)`
  cursor: pointer;
  width: fit-content;
  color: ${ACCENT_0};
  font-weight: bold;
`;

const Icon = styled(FlexBox)``;



const Footer = () => {

  const router = useRouter();

  const servicesnavlinkData = [
    { name: "For Merchants", onClick: () => router.push("/marchants")   },
    {
      name: "For Our Customers",
      onClick: () => router.push("/forcustomer") ,
    },
  ];
  const aboutnavlinkData = [
    { name: "Privacy Policy", onClick: () =>router.push("/privacyPolicy") },
    {
      name: "Terms and Conditions",
      onClick: () => router.push("/termsandconditions"),
    },
    { name: "FAQs", onClick: () => router.push("/faqs") },
    { name: "Contact Us", onClick: () => router.push("/contactus") },
  ];
  const getintouchnavlinkData = [
    {
      name: "Kolkata, West Bengal",
      onClick: () => router.push("/forcustomer"),
    },
    { name: "+91 85019-87307", onClick: () => router.push("/forcustomer") },
    {
      name: "pamprazzi@protonmail.com",
      onClick: () => router.push("/forcustomer"),
    },
  ];

  return (
    <Container>
      <FlexBox column rowGap="1rem">
      <FlexBox justify="center">
        <H1 color={ACCENT_0}>Don’t forget to पेम्पेर yourself!</H1>
      </FlexBox>
      <FlexBox justify="center" columnGap="0.57rem">
        <img src="./assets/footer-img/heartlogo.svg" />
        <H1 color={ACCENT_0}>Proudly built in Kolkata</H1>
      </FlexBox>
      <FlexBox justify="center" columnGap="1.31rem">
        <Icon>
          <img src="./assets/footer-img/maillogo.svg" />
        </Icon>
        <Icon>
          <img src="./assets/footer-img/maillogo.svg" />
        </Icon>
        <Icon>
          <img src="./assets/footer-img/maillogo.svg" />
        </Icon>
        <Icon>
          <img src="./assets/footer-img/maillogo.svg" />
        </Icon>
      </FlexBox>
      </FlexBox>
      <ContentContainer>
        <Content align="baseline" >
          <Heading>Header</Heading>
          <Body1 color={ACCENT_0} textAlign="center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur aliquid quod velit ut ab itaque aperiam voluptatem amet
            temporibus asperiores alias pariatur magnam voluptate qui fugit
            accusantium quaerat facilis illo eligendi, mollitia nulla! Facere.
          </Body1>
        </Content>
        <Content>
          <Heading>Services</Heading>
          {servicesnavlinkData.map((button, index) => (
            <Item
              key={index}
              cursor="pointer"
              bold
              onClick={button.onClick}
              color={ACCENT_0}
            >
              {button.name}
            </Item>
          ))}
        </Content>
        <Content>
          <Heading>About</Heading>
          {aboutnavlinkData.map((button, index) => (
            <Item key={index} onClick={button.onClick}>
              {button.name}
            </Item>
          ))}
        </Content>
        <Content>
          <Heading>Get in touch</Heading>
          {getintouchnavlinkData.map((button, index) => (
            <Item key={index} onClick={button.onClick}>
              {button.name}
            </Item>
          ))}
        </Content>
      </ContentContainer>
      <CopyRightContainer>
        <H6 color={ACCENT_0}>Copyright © 2024 Self Care Simplified-Pamprazzi. All rights reserved.</H6>
      </CopyRightContainer>
    </Container>
  );
};
export default Footer;
