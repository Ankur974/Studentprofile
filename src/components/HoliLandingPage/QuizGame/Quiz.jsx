import React, { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { useRouter } from "next/router";

import FlexBox from "@common/ui/FlexBox";
import { Body2, H3 } from "@common/ui/Headings";
import { device } from "@common/ui/Responsive";
import { ERROR, SUCCESS } from "@common/ui/colors";
import GamePageHeading from "./GamePageHeading";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  margin: 0.75rem;
  max-width: 30rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media ${device.laptop} {
    margin: auto;
  }
`;

const ItemContainer = styled(FlexBox)`
  background-color: #f8f8f8;
  width: 100%;
  flex-direction: column;
`;

const QuestionBox = styled(FlexBox)`
  flex-direction: column;
  text-align: center;
  flex-wrap: wrap;
  padding: 1.5rem 1rem;
  border-radius: 0.75rem;
`;

const Timer = styled(Body2)`
  margin-top: 0.5rem;
`;

const scaleUpDownAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
`;

const InputBlock = styled.input`
  width: 2rem;
  height: 2rem;
  text-align: center;
  font-size: 1rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  opacity: 1;

  ${({ isAnswerCorrect }) =>
    isAnswerCorrect &&
    css`
      animation: ${scaleUpDownAnimation} 600ms ease-in-out;
      border: 1px solid ${SUCCESS};
      pointer-events: none;
      opacity: 0.7;
    `};

  ${({ isAnswerNotCorrect }) =>
    isAnswerNotCorrect &&
    css`
      animation: ${scaleUpDownAnimation} 600ms ease-in-out;
      border: 1px solid ${ERROR};
      pointer-events: none;
      opacity: 0.7;
    `};
`;

const beautyQuizMetadata = [
  {
    questionNumber: 1,
    question:
      "Which vitamin is known as the 'beauty vitamin' for its skin benefits?",
    answer: "VitE",
    // answer: "VitE",
  },
  {
    questionNumber: 2,
    question: "What is the essential step in a skincare routine?",
    answer: "vite",
    // answer: "Cleanse",
  },
  {
    questionNumber: 3,
    question:
      "Which flower is often used in beauty products for its soothing properties?",
    answer: "vite",
    // answer: "Chammy",
  },
  {
    questionNumber: 4,
    question: "What is the primary benefit of using a facial mask?",
    answer: "vite",
    // answer: "Hydrate",
  },
];

const QUIZ_TIME = 40;

const Quiz = () => {
  const [inputValue, setInputValue] = useState(Array(0).fill(""));
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isAnswerNotCorrect, setIsAnswerNotCorrect] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(QUIZ_TIME);
  // const [score, setScore] = useState(1);

  const inputRefs = useRef(
    Array(beautyQuizMetadata[0].answer.length).fill(null)
  );
  const router = useRouter();

  let currentQuestion = 0;

  //working fine (it will set timer to 20sec on each question change)
  useEffect(() => {
    // debugger;
    setInputValue(
      Array(beautyQuizMetadata[currentQuestionIndex]?.answer.length).fill("")
    );
    inputRefs?.current?.[0]?.focus();
    setTimer(QUIZ_TIME);
  }, [currentQuestionIndex]);

  // working fine (timer will check the clock - 1 each sec)
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [currentQuestionIndex]);

  const handleInputChange = (index, value) => {
    if (value.length === 1) {
      const updatedInputValue = [...inputValue];
      updatedInputValue[index] = value;
      setInputValue(updatedInputValue);

      if (index + 1 < inputValue.length) {
        inputRefs.current[index + 1].focus();
      }
      if (index + 1 === inputValue.length) {
        const userAnswer = updatedInputValue?.join("")?.toLowerCase();
        const correctAnswer =
          beautyQuizMetadata[currentQuestionIndex]?.answer.toLowerCase();
        setIsAnswerCorrect(userAnswer === correctAnswer);
        setIsAnswerNotCorrect(userAnswer !== correctAnswer);
      } else {
        setIsAnswerCorrect(false);
        setIsAnswerNotCorrect(false);
      }
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.key === "Backspace") {
      const updatedInputValue = [...inputValue];
      updatedInputValue[index] = "";
      setInputValue(updatedInputValue);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    if (timer === 0) {
      setIsAnswerCorrect(false);
      setIsAnswerNotCorrect(false);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }

    const isAllFilled = inputValue.every(value => value.trim() !== "");

    const handleTimeout = () => {
      inputRefs?.current[0]?.focus();
      setInputValue(
        Array(beautyQuizMetadata[currentQuestionIndex]?.answer.length).fill("")
      );
      setIsAnswerCorrect(false);
      setIsAnswerNotCorrect(false);
    };

    if (isAllFilled) {
      if (isAnswerNotCorrect) {
        setTimeout(() => {
          handleTimeout();
        }, 400);
      } else if (isAnswerCorrect) {
        setTimeout(() => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          handleTimeout();
        }, 400);
      }
    }
  }, [inputValue, timer, isAnswerCorrect, isAnswerNotCorrect]);

  if (currentQuestionIndex <= 4) {
    currentQuestion = beautyQuizMetadata[currentQuestionIndex];
  } else {
    currentQuestion = null;
  }

  let prize = "anirban";

  if (!currentQuestion || currentQuestionIndex === 4) {
    router.replace(`/holi-2024/${encodeURIComponent(prize)}`);
  }

  return (
    <Wrapper>
      <GamePageHeading
        heading="Beauty Quiz"
        subHeading="Lorem ipsum dolor sit amet consectetur. Bibendum dui porta leo sed neque."
      />
      <ItemContainer>
        <QuestionBox>
          <Body2>{`${currentQuestion?.questionNumber}/${beautyQuizMetadata.length}`}</Body2>
          <H3 bold>{currentQuestion?.question}</H3>
          <Timer>{`00:${timer < 10 ? `0${timer}` : timer} secs`}</Timer>
        </QuestionBox>
        <FlexBox>
          {inputValue.map((value, index) => (
            <InputBlock
              key={index}
              id={`input-${index}`}
              ref={inputRef => (inputRefs.current[index] = inputRef)}
              value={value}
              onChange={event => handleInputChange(index, event.target.value)}
              onKeyDown={event => handleKeyPress(index, event)}
              isAnswerCorrect={isAnswerCorrect}
              isAnswerNotCorrect={isAnswerNotCorrect}
              maxLength={1}
            />
          ))}
        </FlexBox>
      </ItemContainer>
    </Wrapper>
  );
};

export default Quiz;
