import React from "react";
import { FaCheck } from "react-icons/fa6";

import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox"; 
import {SECONDARY_500, SECONDARY_800} from "@common/ui/colors";
import { H3} from "@common/ui/Headings";

const PromiseWrapper = styled(FlexBox)`
  border: 1px solid ${SECONDARY_500};
  flex-direction: column;
  flex-direction: column;
  padding: 1rem 0.5rem;
  justify-content:center;
  align-items:center;
  width:20rem;
  margin:auto;
`;

const UCPromiseList = styled(FlexBox)`
  list-style: none;
  padding: 0.5rem;
  row-gap:0.5rem;
`;

const UCPromiseItem = styled(FlexBox)`
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
        <UCPromiseList column>
        {DummyData.map((item)=>(
            <FlexBox key={item.id} columnGap="1rem">
            <FaCheck />
            <UCPromiseItem>{item.title}</UCPromiseItem>
            </FlexBox>
    ))  }
        </UCPromiseList>
      </PromiseWrapper>
    );
};


export default PromiseContainer;
