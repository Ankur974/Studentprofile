import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H1, Body1, Body2 } from "@common/ui/Headings";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { ACCENT_0, SECONDARY_100 } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  padding: 5rem 1.5rem;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const CardText = styled(FlexBox)`
  flex-direction: column;
  color: ${ACCENT_0};
  font-family: Poppins;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Icon = styled(FlexBox)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const headingData = [
  {
    Heading: "How can I list my salon on your platform as a merchant?",
    SubHeading:
      "Get our merchant app. Fill in your details. Our team will analyze and approve your request. You'll get a notification when your account is ready to use, along with a joining bonus in Coins!",
  },
  {
    Heading: "What are Care Coins and how do customers earn them",
    SubHeading:
      "Care Coins are our loyalty points program. Customers earn them as a welcome bonus, by completing appointments, writing reviews, and more. They can then redeem Care Coins for exciting rewards and exclusive benefits.",
  },
  {
    Heading:
      "Can customers redeem Care Coins for discounts or special offers at salons?",
    SubHeading:
      "Customers can redeem their Care Coins for discounts and special offers at participating salons. It's a fantastic way to enjoy exclusive benefits and save on salon services.",
  },
  {
    Heading: "How to do Self Care?",
    SubHeading:
      "Book through us and forget all the hassles. Calm down and enjoy your pampering.",
  },
  {
    Heading: "Why should I list my Salon on Pamprazzi?",
    SubHeading:
      "Listing your salon on Pamprazzi is a smart move. Expand your reach, boost your online presence, access powerful marketing tools, streamline appointment management, and join a vibrant community - all for free, forever!",
  },
  {
    Heading:
      "Are there any hidden fees or commissions for using Pamprazzi as a salon owner?",
    SubHeading:
      "No, there are no hidden fees or commissions for using Pamprazzi as a salon owner. It's completely free to list your salon, promote your services, and manage appointments. You only pay for any optional premium features or advertising you choose to utilize.",
  },
  {
    Heading:
      "What happens if I need assistance or have questions while using Pamprazzi?",
    SubHeading:
      "We've got you covered! Our dedicated customer support team is available to assist you. You can reach out to us via email or through our in-app messaging system, and we'll be happy to help you with any inquiries or concerns you may have.",
  },
];

const FaQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = index => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };
  return (
    <Wrapper column align="center">
      <H1 align="center">Frequently Asked Questions</H1>
      <FlexBox column rowGap="1.5rem" padding="0.5rem">
        {headingData.map((item, index) => (
          <Card
            key={index}
            onClick={() => toggleExpanded(index)}
            rowGap="0.75rem"
          >
            <FlexBox width="100%" justify="space-between" color={SECONDARY_100}>
              <Body1 bold>{item.Heading}</Body1>
              <Icon>
                {expandedIndex === index ? <RiSubtractFill /> : <IoMdAdd />}
              </Icon>
            </FlexBox>
            {expandedIndex === index && (
              <CardText>
                <Body2>{item.SubHeading}</Body2>
              </CardText>
            )}
          </Card>
        ))}
      </FlexBox>
    </Wrapper>
  );
};

export default FaQ;
