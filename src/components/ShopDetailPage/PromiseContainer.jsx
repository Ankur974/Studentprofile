import React from "react";
import { FaCheck } from "react-icons/fa6";

import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox"; 
import {SECONDARY_200, SECONDARY_800} from "@common/ui/colors";
import { H3} from "@common/ui/Headings";

const PromiseWrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  padding: 1rem 2rem;
  row-gap: 0.5rem;
  border: 1px solid ${SECONDARY_200};
  transition: opacity 0.3s ease-in-out;
  border-radius: 0.5rem;
  min-height: 5rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const PromiseList = styled(FlexBox)`
  list-style: none;
  padding: 0.5rem;
  row-gap:0.5rem;
`;

const PromiseItem = styled(FlexBox)`
  color: ${SECONDARY_800};
  font-size: 1rem;
`;

const DummyData = [
    {id:1,title:"Luxary Salon Experience"},
    {id:2,title:"Premium Brand Products"},
    {id:3,title:"4.5+ Rated Beauticians"}
];



const PromiseContainer = () =>{
    return (
        <PromiseWrapper column>
        <H3 bold>Pamprazzi Promise</H3>
        <PromiseList column>
        {DummyData.map((item)=>(
            <FlexBox key={item.id} columnGap="1rem">
            <FaCheck />
            <PromiseItem>{item.title}</PromiseItem>
            </FlexBox>
    ))  }
        </PromiseList>
      </PromiseWrapper>
    );
};


export default PromiseContainer;
