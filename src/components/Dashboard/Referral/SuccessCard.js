import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H4, H5, H6, TextCTA } from "@common/Headings";
import {
  WHITE,
  PRIMARY_800,
  SECONDARY_400,
  ACCENT_800,
  SECONDARY_100,
  SECONDARY_600,
  SECONDARY_800,
} from "@common/ui/colors";
import { trackEvent } from "@utils/helpers";
import { FiCopy } from "react-icons/fi";
import { copyCoupon } from "../../../utils/interfaces";

const CopiedAnimation = keyframes`
    0% {
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const CopiedToast = styled(FlexBox)`
  top: 19rem;
  color: ${WHITE};
  font-size: 0.7rem;
  position: absolute;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${ACCENT_800};

  animation: ${CopiedAnimation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const MessageCopiedToast = styled(FlexBox)`
  top: 10rem;
  color: ${WHITE};
  font-size: 0.7rem;
  position: absolute;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${ACCENT_800};

  animation: ${CopiedAnimation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const SuccessCardWrapper = styled(FlexBox)`
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96%;
  margin: auto;
  height: 32.875rem;
  border: 1px solid ${SECONDARY_400};
  border-radius: 1rem;
  padding: 1rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SuccessTitle = styled(H4)`
  font-size: 1rem;
  text-align: center;
`;

const SuccessMessage = styled(H4)`
  font-size: 0.875rem;
  max-width: 15.25rem;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const BackToHomeCTA = styled(TextCTA)`
  padding-top: 1rem;
  letter-spacing: 0.08rem;
`;

const CouponWrapper = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  margin: 0 auto;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${SECONDARY_100};
  gap: 1rem;
  border-radius: 0.5rem;

  ${H5} {
    width: auto;
    max-width: 18.75rem;
    text-align: center;
  }
`;

const CouponCodeWrapper = styled(FlexBox)`
  max-width: 18.75rem;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  background-color: ${WHITE};
  color: ${PRIMARY_800};
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 24px;
`;

const TextCta = styled(TextCTA)`
  letter-spacing: 0.08rem;
`;

const SuccessCard = ({
  couponCode,
  referralsExperiment,
  setCurrentReferralState,
  currentReferralState,
}) => {
  const [showCouponCopied, setShowCouponCopied] = useState(false);
  const [showMessageCopied, setShowMessageCopied] = useState(false);

  const showToast = isCouponCode => {
    if (isCouponCode) {
      setShowCouponCopied(true);
      setTimeout(() => {
        setShowCouponCopied(false);
      }, 3000);
    } else {
      setShowMessageCopied(true);
      setTimeout(() => {
        setShowMessageCopied(false);
      }, 3000);
    }
  };

  const handleCopy = (text, isCouponCode = false) => {
    copyCoupon(text);
    if (window.Android) {
      window.Android.copyCoupon(text);
      showToast(isCouponCode);
    } else if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(`copyText,${text}`);
      showToast(isCouponCode);
    } else {
      navigator?.clipboard
        ?.writeText(text)
        ?.then(() => showToast(isCouponCode))
        ?.catch(() => window?.alert?.("Unable to copy"));
    }
  };

  return (
    <SuccessCardWrapper column rowGap="1.5rem">
      <img
        height="60px"
        width="60px"
        src="https://cdn.theinnerhour.com/assets/images/referral-tick-done.svg"
      />
      {referralsExperiment.value === "v0" && (
        <>
          <SuccessTitle bold>SMS Sent!</SuccessTitle>
          <TextCta
            color={PRIMARY_800}
            onClick={() => {
              trackEvent({
                event: "telerefer_text_copy_click",
                payload: {
                  flow: currentReferralState.flow,
                  platform: window.ReactNativeWebView
                    ? "ios_app"
                    : window.Android
                    ? "android_app"
                    : "website",
                  card: "success",
                },
              });
              handleCopy(currentReferralState?.messageText, false);
            }}
          >
            <FlexBox columnGap="0.5rem">
              Copy message to share
              <FiCopy strokeWidth="2.5" color={PRIMARY_800} />
            </FlexBox>
          </TextCta>
          {showMessageCopied && (
            <MessageCopiedToast onClick={e => e.stopPropagation()}>
              message copied
            </MessageCopiedToast>
          )}
          <CouponWrapper>
            <H5 bold>
              Here’s a thank you from us.
              <br /> Get 20% off on your next session with this coupon code:
            </H5>
            <CouponCodeWrapper
              onClick={() => {
                trackEvent({
                  event: "teleref_coupon_copy_click",
                  payload: {
                    flow: currentReferralState.flow,
                    platform: window.ReactNativeWebView
                      ? "ios_app"
                      : window.Android
                      ? "android_app"
                      : "website",
                    card: "success",
                    expt_flow: referralsExperiment.value === "v0" ? 1 : 2,
                    coupon_code: couponCode,
                  },
                });
                handleCopy(couponCode, true);
              }}
            >
              {couponCode}
              <FiCopy strokeWidth="2.5" color={PRIMARY_800} />
            </CouponCodeWrapper>
          </CouponWrapper>
          {showCouponCopied && (
            <CopiedToast onClick={e => e.stopPropagation()}>
              coupon code copied
            </CopiedToast>
          )}
        </>
      )}
      {referralsExperiment.value === "v1" && (
        <FlexBox column rowGap="1rem">
          <SuccessTitle bold>Thank you!</SuccessTitle>
          <SuccessMessage>
            You've made a positive impact on your loved one's mental health
            journey. Keep being amazing!
          </SuccessMessage>
        </FlexBox>
      )}
      <BackToHomeCTA
        color={referralsExperiment.value === "v0" ? SECONDARY_800 : PRIMARY_800}
        onClick={() => {
          trackEvent({
            event: "teleref_back_click",
            payload: {
              flow: currentReferralState.flow,
              platform: window.ReactNativeWebView
                ? "ios_app"
                : window.Android
                ? "android_app"
                : "website",
              card: "success",
              expt_flow: referralsExperiment.value === "v0" ? 1 : 2,
            },
          });
          setCurrentReferralState({
            ...currentReferralState,
            step: 1,
          });
        }}
      >
        Back to home
      </BackToHomeCTA>
    </SuccessCardWrapper>
  );
};

export default SuccessCard;
