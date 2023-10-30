import React from "react";
import { Body1, H1 } from "../common/ui/Headings";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { SlSymbleFemale } from "react-icons/sl";
import { ACCENT_0 } from "../common/ui/colors";
import { AiFillStar } from "react-icons/ai";
import {device} from "../common/ui/Resposive";


const Img = styled.img`
  height: auto;
  width: 50%;
  object-fit: cover;
  opacity: 1;
`;

const Banner = styled(FlexBox)`
  
  width:100%;
  justify-content:center;
  height: 100%;
  margin:auto;
  max-height: 30vh;
  column-gap:20px;
  @media ${device.laptop}{
    width:80%;
  }
`;

const BannerContent = styled(FlexBox)`
width: 100%;
  padding: 1rem;

  max-width: 75rem;
  margin: auto;
`;

const Wrapper =styled(FlexBox)`
width:100%;

justify-content:center;
// border:1px solid black;
padding:1rem;
flex-direction:column;

`;
const GroupImage=styled(FlexBox)`
flex-direction: row;
    flex-wrap: wrap;
    width: 50%;
    column-gap: 15px;
    row-gap: 10px;


`;
const Imggrp=styled.img`
width:47%;
// height:125px;

@media ${device.laptop}{
width:48%;
height:auto;
height:135px;
opacity:1;
}
`;
const HeroBanner = () => {
  return (
    <Wrapper>
       <BannerContent column rowGap="0.25rem">
        <H1 bold >
          Gigis Salon
        </H1>
       
        <FlexBox columnGap="0.75rem">
          <FlexBox columnGap="0.25rem">
            <Body1 >Salon for Men</Body1>
            <SlSymbleFemale  />
          </FlexBox>
          <FlexBox columnGap="0.25rem">
            <Body1 >Salon for Men</Body1>
            <SlSymbleFemale  />
          </FlexBox>
        </FlexBox>
       
        <FlexBox columnGap="1rem" align="center">
          <FlexBox align="center" columnGap="0.5rem"> 
            <AiFillStar color="black" />
            <Body1 bold>4.2</Body1>
          </FlexBox>
          
          <Body1 bold>|</Body1>
          <Body1 bold textDecoration="underline">23 Reviews</Body1>
          
          <Body1 bold textDecoration="underline">Kolkata, West Bengal India</Body1>
        </FlexBox>
      </BannerContent>
    <Banner>

      <Img src="/assets/banner-new.svg" />
      <GroupImage>
        <Imggrp src="/assets/salon-image 1.jpg"/>
        <Imggrp src="/assets/salon-image 1.jpg"/>
        <Imggrp src="/assets/salon-image 1.jpg"/>
        <Imggrp src="/assets/salon-image 1.jpg"/>
      </GroupImage>

     
    </Banner>
    </Wrapper>
  );
};

export default HeroBanner;
