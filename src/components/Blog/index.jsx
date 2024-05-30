/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H3 } from "@common/ui/Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  background-color: #fcfbf7;
  align-items: center;
  padding: 2rem 0;
  gap: 4rem;
`;

const Card = styled(FlexBox)`
  width: 33%;
  height: 90%;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  gap: 2.5rem;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;

const CardTitle = styled.div`
  font-weight: bolder;
  font-size: 1.7rem;
  color: red;
`;
const Heading = styled.div`
  color: #000;
  font-size: 58px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 65%;
  margin-bottom: 0;
  text-align: center;
`;
const Description = styled.div`
  font-weight: lighter;
  color: #828282;
  font-size: 16px;
  background-color: rgb(255, 246, 205);
`;
const CardHeading = styled.div`
  color: #000;
  font-size: 28px;
  font-weight: 500;
  line-height: 36.8px;
  letter-spacing: 1.1px;
`;
const BigCard = styled(FlexBox)`
  width: 69%;
  margin-left: 15rem;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  gap: 2.5rem;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;
const index = () => {
  return (
    <Wrapper column>
      <H3>OUR BLOGS</H3>
      <Heading>Inhouse Mindscape</Heading>
      <FlexBox width="100%" justify="center" columnGap="1.5rem">
        <Card>
          <CardTitle>New!</CardTitle>
          <CardHeading>How AI is Optimizing Your Taxi Rides</CardHeading>
          <Description>
            Discover how Artificial Intelligence is revolutionising the taxi app
            landscape, leading to improved efficiency, shorter wait times, and a
            more satisfying user experience....
          </Description>
        </Card>
        <Card>
          <CardTitle>15 MAY 2023</CardTitle>
          <CardHeading>
            How AI is Revolutionizing Your Shopping Experience
          </CardHeading>
          <Description
            backgroundColor="rgb(226, 242, 255)
"
          >
            From personalized recommendations to frictionless checkout, AI is
            transforming the way you shop.Discover the future of retail and how
            AI is making shopping faster, easier, and more enjoyable....
          </Description>
        </Card>
      </FlexBox>
      <FlexBox>
        <BigCard column>
          <CardTitle>15 MAY 2023</CardTitle>
          <CardHeading>
            How AI is Revolutionizing Your Shopping Experience
          </CardHeading>
          <Description backgroundColor="rgb(226, 242, 255)">
            From personalized recommendations to frictionless checkout, AI is
            transforming the way you shop.Discover the future of retail and how
            AI is making shopping faster, easier, and more enjoyable....
          </Description>
        </BigCard>
      </FlexBox>
    </Wrapper>
  );
};

export default index;
