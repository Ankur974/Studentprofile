/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H3 } from "@common/ui/Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: start;
`;
const Image = styled.img`
  width: 80px;
  height: 68px;
`;
const FooterContainer = styled(FlexBox)``;

const CopyRightBox = styled(FlexBox)`
  width: 100%;
  height: 100px;
  background-color: #272e5c;
  justify-content: space-around;
  align-items: center;
`;
const Footer = () => {
  return (
    <>
      <Wrapper>
        <FooterContainer column>
          <Image src="assets/nav_logo.png"></Image>
          <H3>Tomorrow's Vision, Today!</H3>
          <FlexBox>icon</FlexBox>
        </FooterContainer>
        <FooterContainer column>
          <H3 bold>SITEMAP</H3>
          <H3>MakeMyWeb</H3>
          <H3>Services</H3>
          <H3>Products</H3>
          <H3>Blogs</H3>
          <H3>Life at LENS</H3>
        </FooterContainer>
        <FooterContainer column>
          <H3 bold>Connect</H3>
          <H3>+1-517-9300-792</H3>
          <FlexBox>+91-9990-736-796</FlexBox>
          <FlexBox>solutions@lenscorp.ai</FlexBox>
        </FooterContainer>
      </Wrapper>
      <CopyRightBox>
        <H3 color="white">2023 LENS, Inc. All rights reserved.</H3>
        <FlexBox columnGap="2rem">
          <H3 color="white">Code of conduct</H3>
          <H3 color="white">Sustainability Goals</H3>
        </FlexBox>
      </CopyRightBox>
    </>
  );
};

export default Footer;
