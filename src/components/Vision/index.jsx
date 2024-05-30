import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { Display, H3 } from "@common/ui/Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
`;

const Timeline = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  ul {
    list-style: none;
  }

  ul li {
    padding: 20px;
    background-color: #1e1f22;
    color: white;
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative;
    width: 50%;
    margin-bottom: 50px;
  }

  ul li:nth-child(odd) {
    float: left;
    clear: right;
    transform: translateX(-30px);
    border-radius: 20px 0px 20px 20px;
  }

  ul li:nth-child(even) {
    float: right;
    clear: left;
    transform: translateX(30px);
    border-radius: 0px 20px 20px 20px;
  }

  ul li::before {
    content: "";
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: gray;
    top: 0px;
  }

  ul li:nth-child(odd)::before {
    transform: translate(50%, -50%);
    right: -30px;
  }

  ul li:nth-child(even)::before {
    transform: translate(-50%, -50%);
    left: -30px;
  }

  ul li:hover::before {
    background-color: aqua;
  }
`;

const DateHeading = styled.h3`
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 10px;
  letter-spacing: 2px;
`;

const Heading = styled.h1`
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 30px;
  font-weight: 300;
`;

const Index = () => {
  return (
    <Wrapper column>
      <Display>Our Vision</Display>
      <Display>AI for Social Good</Display>
      <H3>
        Explainable AI (XAI) is an emerging subject of machine learning research
        that refers to strategies that try to provide transparency to typically
        opaque AI models and their predictions.
      </H3>
      <Container>
        <Timeline>
          <ul>
            <li>
              <div>
                <DateHeading>20th May, 2010</DateHeading>
                <Heading>Heading 1</Heading>
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur tempora ab laudantium voluptatibus aut eos placeat
                  laborum, quibusdam exercitationem labore.
                </Paragraph>
              </div>
            </li>
            <li>
              <div>
                <DateHeading>20th May, 2010</DateHeading>
                <Heading>Heading 2</Heading>
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur tempora ab laudantium voluptatibus aut eos placeat
                  laborum, quibusdam exercitationem labore.
                </Paragraph>
              </div>
            </li>
            <li>
              <div>
                <DateHeading>20th May, 2010</DateHeading>
                <Heading>Heading 3</Heading>
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur tempora ab laudantium voluptatibus aut eos placeat
                  laborum, quibusdam exercitationem labore.
                </Paragraph>
              </div>
            </li>
            <li>
              <div>
                <DateHeading>20th May, 2010</DateHeading>
                <Heading>Heading 4</Heading>
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur tempora ab laudantium voluptatibus aut eos placeat
                  laborum, quibusdam exercitationem labore.
                </Paragraph>
              </div>
            </li>
          </ul>
        </Timeline>
      </Container>
    </Wrapper>
  );
};

export default Index;
