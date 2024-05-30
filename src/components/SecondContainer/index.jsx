import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { Display, H3 } from "@common/ui/Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: fit-content;
`;

const Container = styled(FlexBox)`
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50%;
  margin-left: 8rem;
  padding: 5rem 9rem;
  z-index: 20;
  gap: 0.5rem;
`;

const Button = styled.div`
  background: #000;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.6rem 2rem;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #fff;
  border-radius: 10px;
`;
const index = () => {
  return (
    <Wrapper>
      <Image src="Img.jpg"></Image>
      <Container>
        <Display bold>We are at the forefront of AI</Display>
        <H3>
          From Conserving Wildlife to Automatically Generating Caricatures-
          <strong>WE Do It All</strong>
        </H3>
        <Button>Learn More</Button>
      </Container>
    </Wrapper>
  );
};

export default index;
