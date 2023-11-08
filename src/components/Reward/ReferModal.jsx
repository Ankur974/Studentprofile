import React, { useState } from "react";
import styled from "styled-components";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

import { H3, Body1 } from "@common/ui/Headings";
import Modal from "@common/ui/Modal";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_0, PRIMARY_0, PRIMARY_900 } from "@common/ui/colors";

const steps = [
  {
    id: 1,
    content: "share it with your friends",
  },
  {
    id: 2,
    content: "Your friends uses your referral code",
  },
  {
    id: 3,
    content: "You earn 10 care coins for each friend that signs up.",
  },
];

const Wrapper = styled(FlexBox)`
  row-gap: 1rem;
  padding: 1rem;
  position: relative;
`;

const MainContainer = styled(FlexBox)`
  padding: 1rem;
  background-color: ${PRIMARY_0};
  border-radius: 1rem;
  row-gap: 1rem;
`;

const HeadingSec = styled(FlexBox)`
  column-gap: 0.8rem;
  color: ${PRIMARY_900};
  align-items: center;
  justify-content: center;
`;

const StepBox = styled(FlexBox)`
  column-gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
`;

const StepCount = styled(FlexBox)`
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  background-color: ${PRIMARY_900};
  color: ${ACCENT_0};
`;

const CouponBox = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  column-gap: 0;
`;

const CodeBox = styled(FlexBox)`
  font-size: small;
  padding: 1rem;
  color: ${PRIMARY_900};
  border: 1px dashed;
  justify-content: center;
  border-radius: 0.5rem 0 0 0.5rem;
  cursor: no-drop;
`;

const CopyButton = styled(FlexBox)`
  font-size: small;
  padding: 1rem;
  color: ${ACCENT_0};
  background-color: ${PRIMARY_900};
  justify-content: center;
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: pointer;
`;

const Copiedmsg = styled(FlexBox)`
  background-color: black;
  border-radius: 1rem;
  padding: 0.5rem;
  color: white;
  width: fit-content;
  position: absolute;
  bottom: 0;
  align-self: center;
  opacity: 0.7;
`;

const ShareBox = styled(FlexBox)`
  justify-content: center;
  width: fit-content;
  align-self: center;
`;

const IconWrapper = styled(FlexBox)`
  align-self: flex-end;
`;

const ReferModal = ({ toggleModal, action }) => {
  const [copied, setCopied] = useState(false);

  const couponCode = "PAMPRAZZIREF";

  const handleCopyCouponCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareContent = async () => {
    const shareData = {
      title: "Example Title",
      text: "Check out this example!",
      url: "https://example.com",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } else {
        console.error("Web Share API is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Modal borderRadius="0.5rem" M1 height="fit-content">
      <Wrapper column>
        <IconWrapper padding="0.5rem" cursor="pointer" onClick={toggleModal}>
          <AiOutlineClose />
        </IconWrapper>
        <H3 bold textAlign="center">
          Refer a Friend
        </H3>
        <MainContainer column>
          <HeadingSec row>
            <img src="/assets/images/gift.svg" alt="picture" width="50rem" />
            <H3 color={PRIMARY_900} bold>
              Share your referral code and earn care coins
            </H3>
          </HeadingSec>
          <Body1 bold>How it works?</Body1>
          <FlexBox column rowGap="0.5rem">
            {steps.map((item, index) => (
              <StepBox key={index}>
                <StepCount>{item.id}</StepCount>
                {item.content}
              </StepBox>
            ))}
          </FlexBox>
          <CouponBox>
            <CodeBox>{couponCode}</CodeBox>
            <CopyButton onClick={handleCopyCouponCode}>COPY COUPON</CopyButton>
          </CouponBox>
        </MainContainer>
        <FlexBox justify="center">or share via</FlexBox>
        {copied && <Copiedmsg>Copied!</Copiedmsg>}
        <ShareBox onClick={shareContent}>
          <IoShareSocialOutline size="2rem" />
        </ShareBox>
      </Wrapper>
    </Modal>
  );
};

export default ReferModal;
