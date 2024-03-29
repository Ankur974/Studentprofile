import React from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { H3 } from "@common/ui/Headings";
import { BABERBACKGROUND } from "@common/ui/colors";
import { categoryData } from "@metadata/CategoryData";
import { device } from "@components/common/ui/Resposive";
import { boxShadowDs1 } from "@components/common/ui/styles";

const CardWrapper = styled(FlexBox)`
  width: 8.25rem;
  height: 8.25rem;
  position: relative;
  border-radius: 0.75rem;
  background-color: ${props => props.color};
  cursor: pointer;
  ${boxShadowDs1}

  @media ${device.laptop} {
    width: 11.25rem;
    height: 11.25rem;
  }
`;

const Container = styled(FlexBox)`
  overflow-x: auto;
  column-gap: 1.25rem;
`;

const CategoryType = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 10;
  @media ${device.laptop} {
    top: 1rem;
    left: 1rem;
  }
`;

const Heading = styled(H3)`
  font-size: 1rem;

  @media ${device.laptop} {
    font-size: 1.25rem;
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 0.75rem;
`;

const Image = styled.img`
  object-fit: cover;
  transition: all 0.3s ease 0.1s;

  &:hover {
    transform: scale(1.15);
  }
`;

export const Card = ({ data }) => {
  return (
    <CardWrapper color={data?.bgColor}>
      <CategoryType>
        <Heading bold color={BABERBACKGROUND}>
          {data?.label}
        </Heading>
      </CategoryType>
      <ImageContainer>
        <Image src={data?.image}></Image>
      </ImageContainer>
    </CardWrapper>
  );
};

const Category = () => {
  return (
    <Container>
      {categoryData?.map((data, index) => (
        <Card data={data} key={index} />
      ))}
    </Container>
  );
};

export default Category;
