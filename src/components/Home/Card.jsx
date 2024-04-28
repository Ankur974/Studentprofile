import React from "react";
import styled from "styled-components";
import { Body1, Body2 } from "@common/ui/Headings";
import { Button } from "@common/ui/Buttons";
import { useRouter } from "next/router";
import { WHITE } from "@common/ui/colors";
import { device } from "@components/common/ui/Responsive";

const CardContainer = styled.div`
  width: 100%;
  min-width: 90%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 1rem;
  transition: transform 0.2s ease-in-out;
  position: relative;
  cursor: pointer;

  @media ${device.laptop} {
    max-width: 20rem;
    min-width: 18.75rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${WHITE};

  ${CardContainer}:hover & {
    display: flex;
  }
`;

const Card = ({ title, description, imageUrl, redirectUrl }) => {
  const router = useRouter();

  return (
    <CardContainer
      onClick={() => {
        router.push(redirectUrl);
      }}
    >
      <CardImage src={imageUrl} alt="Card Image" />
      <CardContent>
        <Body1 bold>{title}</Body1>
        <Body2>{description}</Body2>
        <Button>View Details</Button>
      </CardContent>
      <CardOverlay />
    </CardContainer>
  );
};

export default Card;
