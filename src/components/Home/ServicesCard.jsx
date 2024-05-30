import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { Display, H3 } from "@common/ui/Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  background-color: #fcfbf7;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const CardContainers = styled(FlexBox)`
  max-width: 70%;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const Card = styled(FlexBox)`
  width: 470px;
  max-width: 470px;
  height: fit-content;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
`;

const Number = styled.div`
  color: #707070;
  font-size: 88px;
  font-style: normal;
  font-weight: 600;
  line-height: 123.2px;
`;

const Title = styled.div`
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 45px;
  text-align: center;
`;

const cardData = [
  {
    id: 0,
    title: "Biometrics",
    description:
      "Academia-backed & In-house researched State-of-the-Art Face, Fingerprint, and Iris Recognition SDKs. Enable real-time automated Biometric applications on edge devices even without an active internet connection",
  },
  {
    id: 1,
    title: "Image Analysis",
    description:
      "Outsource the overly complex image analysis work to our intelligent machines that adaptively learn, so you can focus on making the best decisions for your business.",
  },
  {
    id: 2,
    title: "Cross-Media Translation",
    description:
      "Will something like Siri or Alexa enhance your business? We can deliver text-to-speech, text-to-image, speech-to-text, speech-to-image, speech-to-image, image-to-text and image-to-speech solutions for maximum convenience.",
  },
  {
    id: 3,
    title: "3D Modelling and Design. ",
    description:
      "We offer services for automated generation of 3D assets with realistic shapes and textures. We animate the 3D models with voice and videos with an aim to retarget voice and/or expressions with pose from a single Image/video.",
  },
];

const Index = () => (
  <Wrapper column>
    <H3 bold>SERVICES</H3>
    <Display>We provide Artificial Intelligence Services</Display>
    <CardContainers>
      {cardData.map(card => (
        <Card column key={card.id}>
          <FlexBox>
            <Number>0</Number>
            <Number>1</Number>
            <Title>{card.title}</Title>
          </FlexBox>
          <FlexBox>
            <H3>{card.description}</H3>
          </FlexBox>
        </Card>
      ))}
    </CardContainers>
  </Wrapper>
);

export default Index;
