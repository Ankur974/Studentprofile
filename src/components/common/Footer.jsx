import React from "react";
import FlexBox from "./ui/FlexBox";
import { H6, H2, Body1 } from "./ui/Headings";
import styled from "styled-components";
import { ACCENT_0, PRIMARY_800, SECONDARY_800 } from "./ui/colors";
import { device } from "./ui/Resposive";

const Footer = () => {
  const Container = styled(FlexBox)`
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding-bottom: 0px;
    margin-bottom: 0px;
  `;
  const ContentContainer = styled(FlexBox)`
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${SECONDARY_800};
    flex-direction: column;
    height: 35rem;
    width: 100%;
    /* gap:10px; */
    @media ${device.laptop} {
      align-items: center;
      flex-direction: row;
      height: 20rem;
    }
  `;
  const Content = styled(FlexBox)`
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding-left: 0.6rem;
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
  const Heading = styled(H2)`
    font-weight: bold;
    color: ${ACCENT_0};
  `;
  const BodyLite = styled(H6)`
    cursor: pointer;
    width: fit-content;
    color: ${ACCENT_0};
    font-weight: bold;
  `;
  return (
    <Container>
      <ContentContainer>
        <Content>
          <Heading>Header</Heading>
          <Body1 color={ACCENT_0}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur aliquid quod velit ut ab itaque aperiam voluptatem amet
            temporibus asperiores alias pariatur magnam voluptate qui fugit
            accusantium quaerat facilis illo eligendi, mollitia nulla! Facere.
          </Body1>
        </Content>
        <Content>
          <Heading>Header Text</Heading>
          <BodyLite
            cursor="pointer"
            bold
            onClick={() => console.log("I am clicked")}
            color={ACCENT_0}
          >
            Buttons
          </BodyLite>
          <BodyLite onClick={() => console.log("I am clicked")}>
            Buttons
          </BodyLite>
          <BodyLite onClick={() => console.log("I am clicked")}>
            Buttons
          </BodyLite>
        </Content>
        <Content>
          <Heading>Header Text</Heading>
          <BodyLite onClick={() => console.log("I am clicked")}>
            Buttons
          </BodyLite>
          <BodyLite onClick={() => console.log("I am clicked")}>
            Buttons
          </BodyLite>
          <BodyLite onClick={() => console.log("I am clicked")}>
            Buttons
          </BodyLite>
        </Content>
      </ContentContainer>
      <CopyRightContainer>
        <H6 color={ACCENT_0}>© 2023, Pamprazzi. All rights reserved.</H6>
      </CopyRightContainer>
    </Container>
  );
};
export default Footer;
