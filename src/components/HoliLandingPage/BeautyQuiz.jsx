import React from "react";
import FlexBox from "@common/ui/FlexBox";
import { Caption } from "@common/ui/Headings";
import styled from "styled-components";
import { WHITE } from "@common/ui/colors";
import { Button } from "@common/ui/Buttons";
import { useState } from "react";
import LoginModal from "../Login";
import { Header } from "./Header";

const Wrapper = styled(FlexBox)`
  height: 100%;
  row-gap: 1.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  padding: 2.5rem 1.25rem;
  align-items: center;
`;

const CardHeading = styled(Caption)`
  font-family: Lemon;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  line-height: normal;
`;

const Card = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #efefef;
  border-radius: 1.25rem;
`;

const StartCTA = styled(Button)`
  padding: 0.75rem 2.5rem;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 600;
`;

const QuizImg = styled.img`
  width: 252px;
  height: 200px;
`;

const BeautyQuiz = () => {
  const [loginModal, setLoginModal] = useState(false);

  const toggleModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <Wrapper>
      {loginModal && <LoginModal setModalOpen={setLoginModal} page="quiz" />}
      <Header
        title="Beauty quiz"
        subTitle="Lorem ipsum dolor sit amet consectetur. Semper rhoncus."
      />
      <Card>
        <CardHeading>
          Lorem ipsum dolor sit amet consectetur. Sed cursus sodales.
        </CardHeading>
        <StartCTA onClick={toggleModal}>Start Now!</StartCTA>
        <QuizImg src="/assets/images/holi/quiz.webp" />
      </Card>
    </Wrapper>
  );
};

export default BeautyQuiz;
