import React, { useState, useRef } from "react";
import { TbDiscount } from "react-icons/tb";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Body2 } from "@common/ui/Headings";
import { PRIMARY_800, ACCENT_200, SECONDARY_200 } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const DiscountIcon = styled(TbDiscount)`
  color: ${PRIMARY_800};
  background-color: ${ACCENT_200};
  border-radius: 0.5rem;
`;

const ViewMore = styled(FlexBox)`
  padding: 0.25rem 1rem;
  column-gap: 0.5rem;
  align-items: center;
  cursor: pointer;
`;

const ExpandContainer = styled(FlexBox)`
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: all 600ms ease-in-out;
  max-height: ${({ isExpanded, singleCardHeight, numberOfCards }) =>
    isExpanded
      ? `${singleCardHeight * numberOfCards}px`
      : `${singleCardHeight}px`};
`;

const offerData = [
  {
    id: 1,
    title: "20% off on Kotak Silk cards",
    description: "20% off up to INR 350",
  },
  {
    id: 2,
    title: "20% off on Kotak Silk cards",
    description: "20% off up to INR 350",
  },
  {
    id: 2,
    title: "20% off on Kotak Silk cards",
    description: "20% off up to INR 350",
  },
  {
    id: 2,
    title: "20% off on Kotak Silk cards",
    description: "20% off up to INR 350",
  },
  {
    id: 2,
    title: "20% off on Kotak Silk cards",
    description: "20% off up to INR 350",
  },
];

const PromotionalOfferContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const offerCardRef = useRef(null);

  return (
    <Wrapper>
      <ExpandContainer
        isExpanded={isExpanded}
        singleCardHeight={offerCardRef?.current?.offsetHeight}
        numberOfCards={offerData?.length}
      >
        {offerData.map(offer => (
          <FlexBox
            padding="0.5rem 1rem"
            align="center"
            key={offer.id}
            ref={offerCardRef}
            columnGap="1rem"
          >
            <DiscountIcon size="2.5rem" />
            <FlexBox column>
              <Body2 bold>{offer.title}</Body2>
              <Body2>{offer.description}</Body2>
            </FlexBox>
          </FlexBox>
        ))}
      </ExpandContainer>
      <ViewMore onClick={() => setIsExpanded(prev => !prev)}>
        <Body2 color={PRIMARY_800} bold>
          {isExpanded ? "View Less Offer" : "View More Offer"}
        </Body2>
        {isExpanded ? (
          <FaChevronUp color={PRIMARY_800} />
        ) : (
          <FaChevronDown color={PRIMARY_800} />
        )}
      </ViewMore>
    </Wrapper>
  );
};

export default PromotionalOfferContainer;
