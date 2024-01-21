import React, { useState } from "react";
import styled from "styled-components";
import { TbDiscount } from "react-icons/tb";
import { FaChevronDown,FaChevronUp } from "react-icons/fa6";
import FlexBox from "@common/ui/FlexBox";
import { Body2} from "@common/ui/Headings";
import { PRIMARY_800, ACCENT_200 } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  border: 1px solid black;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.75rem;
`;

const SingleOfferBox = styled(FlexBox)`
  column-gap: 1rem;
  align-items: center;
  
`;

const DiscountIcon = styled(TbDiscount)`
color:${PRIMARY_800};
background-color:${ACCENT_200}
`;

const ViewMore = styled(FlexBox)`
color: ${PRIMARY_800};
column-gap:0.5rem;
align-items:center;
cursor:pointer;

`;

const ExpandContainer = styled(FlexBox)`
flex-direction:column;
`;


const PromotionalOfferContainer = () => {

  const offerData = [
    { id: 1, title: "20% off on Kotak Silk cards", description: "20% off up to INR 350" },
    { id: 2, title: "10% off on HDFC Bank cards", description: "10% off up to INR 200" },
  ];


const [isExpand,setIsExpand] = useState(false);


  return (
    <Wrapper column>
    <SingleOfferBox>
    <DiscountIcon size='2.5rem'/>
    <FlexBox column>
      <Body2 bold>20% off on Kotak Silk cards</Body2>
      <Body2>20% off upto INR 350</Body2>
      </FlexBox>
      </SingleOfferBox>


      {isExpand && (
        <ExpandContainer>
          {offerData.map((offer) => (
            <SingleOfferBox key={offer.id}>
              <DiscountIcon size='2.5rem' />
              <FlexBox column>
                <Body2 bold>{offer.title}</Body2>
                <Body2>{offer.description}</Body2>
              </FlexBox>
            </SingleOfferBox>
          ))}
        </ExpandContainer>
      )}

    <ViewMore onClick={()=>setIsExpand(!isExpand)}>
      <Body2 color={PRIMARY_800} bold>{isExpand?"View Less Offer":"View More Offer"}</Body2>
      {isExpand?<FaChevronUp color={PRIMARY_800}/>:<FaChevronDown color={PRIMARY_800}/>}
    </ViewMore>
      </Wrapper>
  );
};

export default PromotionalOfferContainer;