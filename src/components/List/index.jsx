/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { Display, H3 } from "@common/ui/Headings";
import { FaCheck } from "react-icons/fa6";

const Wrapper = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  background-color: #fcfbf7;
  align-items: center;
  padding: 2rem 0;
  gap: 4rem;
`;

const Image = styled.img`
  width: 180px;
  height: 132px;
`;

const Container = styled(FlexBox)`
  gap: 4rem;
`;

const List = styled(FlexBox)`
  flex-direction: column;
`;

const ListItem = styled(FlexBox)`
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const Card = styled(FlexBox)`
  width: 50%;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;

const CardTitle = styled.div`
  text-align: center;
  padding: 2rem;
  font-weight: bolder;
  font-size: 1.7rem;
`;
const Heading = styled.div`
  color: #000;
  font-size: 58px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 65%;
  margin-bottom: 0;
`;
const Text = styled.div`
  color: #8a8a8a;
  text-align: center;
  font-size: 20px;
  line-height: 29.58px;
  width: 59%;
  margin-bottom: 2rem;
`;
const Description = styled.div`
  padding: 0 1.5rem 1.5rem;
  font-weight: lighter;
  color: #828282;
  font-size: 16px;
`;
const PromiseData = [
  { id: 1, title: "State-of-the-art solutions" },
  { id: 2, title: "Fast & Efficient" },
  { id: 3, title: "No extra computation fee " },
  { id: 4, title: "No licensing fee" },
  { id: 5, title: "Lifetime support & upgrades" },
  { id: 6, title: "Plug-and-Play" },
  { id: 7, title: "24x7 Progress Monitoring" },
  { id: 8, title: "Incremental Updates " },
];
const cardsData = [
  {
    id: 1,
    title: "Exclusive Rights ",
    image: "assets/image 1.png",
    description:
      "Our mission is to make an impact in empowering human society with AI. Hence, all Intellectual Property Rights belongs to you.",
  },
  {
    id: 2,
    title: "Research Driven",
    image: "assets/image2.png",
    description:
      "We regularly benchmark our solutions via comparing industry-vide evaluations so our partners only get the best that AI can offer.    ",
  },
  {
    id: 3,
    title: "Plug-and-Play",
    image: "assets/image3.png",
    description:
      "We provide AI-driven solutions into businesses where they can bring tangible value. Each solution is customized as per your needs and deployed on any computing device of your choice.    ",
  },
  {
    id: 4,
    title: "Lifetime Support",
    image: "assets/image4.png",
    description:
      "Should you face any issues, we are always at your service. We provide lifetime technical support & upgrade options.    ",
  },
];
const index = () => {
  const firstHalf = PromiseData.slice(0, 4);
  const secondHalf = PromiseData.slice(4);

  return (
    <Wrapper column>
      <H3>WHY CHOOSE LENS</H3>
      <Heading>AI-driven solutions backed by science</Heading>
      <Text>
        Every piece of AI technology shipped from LENS is thoroughly benchmarked
        via rigorous evaluations. With a global network of experts and
        academicians, we guarantee the most accurate and robust solutions in the
        market.
      </Text>
      <Container>
        <List>
          {firstHalf.map(item => (
            <ListItem key={item.id}>
              <FaCheck />
              <span>{item.title}</span>
            </ListItem>
          ))}
        </List>
        <List>
          {secondHalf.map(item => (
            <ListItem key={item.id}>
              <FaCheck />
              <span>{item.title}</span>
            </ListItem>
          ))}
        </List>
      </Container>
      <FlexBox width="100%" justify="space-around">
        {cardsData.map(card => (
          <Card key={card.id}>
            <CardTitle>{card.title}</CardTitle>
            <Image src={card.image} alt={card.title} />
            <Description>{card.description}</Description>
          </Card>
        ))}
      </FlexBox>
    </Wrapper>
  );
};

export default index;
