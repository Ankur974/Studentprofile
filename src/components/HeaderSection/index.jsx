/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { Display, H3 } from "@common/ui/Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const SectionContainer = styled(FlexBox)`
  background-color: #e2f2ff;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  border-radius: 16.433px;
  transition: 0.3s;
`;
const Image = styled.img`
  width: 430px;
  height: 395px;
  border-radius: 10px;
  object-fit: cover;
`;
const Button = styled.div`
  width: 20%;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #000;
  background-color: transparent;
  color: #000;
  font-size: 18px;
  margin-top: 1rem;
  margin-bottom: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  transition: 0.3s;
`;

const index = () => {
  return (
    <Wrapper column>
      <Display border="1px solid red">About us</Display>
      <SectionContainer columnGap="2rem">
        <FlexBox width="50%" column>
          <Display font-weight="900">Welcome To LENS</Display>
          <H3>
            We put our hearts, souls and sweat into designing and developing
            custom AI - powered solutions for your business so you don't have
            to.
          </H3>
          <Button>Learn More</Button>
        </FlexBox>
        <Image src="aboutLatest.jpg"></Image>
      </SectionContainer>
    </Wrapper>
  );
};

export default index;
