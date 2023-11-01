import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H3, H5, TextCTA } from "@common/ui/Headings";
import {
  PRIMARY_800,
  PRIMARY_500,
  ACCENT_800,
  PRIMARY_600,
  WHITE,
} from "@common/ui/colors";
import { trackEvent } from "@utils/helpers";
import { FiChevronDown, FiChevronUp, FiCopy } from "react-icons/fi";
import useMobileView from "@hooks/useMobileView";
// import * as storage from "@utils/storageFactory";

const Title = styled(H3)`
  font-size: 1rem;
  line-height: 24px;
`;

const CardWrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  width: 96%;
  margin: auto;
  border: 1px solid ${PRIMARY_500};
  border-radius: 0.75rem;
  cursor: pointer;
  gap: 1rem;

  ${TextCTA} {
    padding-bottom: 1rem;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0.5rem;
  }

  ${({ hasCouponCode }) =>
    hasCouponCode &&
    css`
      border-radius: 0.75rem 0.75rem 0 0;
      @media only screen and (max-width: 768px) {
        border-radius: 0.5rem 0.5rem 0 0;
      }
    `}
`;

const CouponCodeWrapper = styled(FlexBox)`
  max-width: 18.75rem;
  width: fit-content;
  margin: 0 auto;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: ${PRIMARY_800};
  border: 1px dashed ${PRIMARY_600};
  border-image-width: 3;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 24px;
  padding: 0.75rem;
  gap: 0.5rem;
`;

const CouponContainer = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid ${PRIMARY_500};
  border-top: none;
  padding: 1.5rem;
  border-radius: 0 0 0.75rem 0.75rem;
  gap: 1rem;
  width: 96%;
  margin: auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0.5rem;
  }
  @media only screen and (max-width: 768px) {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

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

const LinkCopiedToast = styled(FlexBox)`
  top: 3.5rem;
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

const ShareAmahaCard = ({
  referralsExperiment,
  providerType,
  setCurrentReferralState,
  currentReferralState,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMobileView();
  const [showCouponCopied, setShowCouponCopied] = useState(false);
  const [couponCode, setCouponCode] = useState(null);

  useEffect(() => {
    // storage.local.getItem("isReferralCardExpanded") === "true"
    //   ? setIsExpanded(true)
    //   : setIsExpanded(false);
    getOwnCouponCode();
  }, []);

  const showToast = () => {
    setShowCouponCopied(true);
    setTimeout(() => {
      setShowCouponCopied(false);
    }, 3000);
  };

  const handleCopy = () => {
    navigator?.clipboard
      ?.writeText(couponCode)
      ?.then(() => showToast())
      ?.catch(() => window?.alert?.("Unable to copy"));
  };

  const getOwnCouponCode = async () => {
    // try {
    //   const res = await axiosInstance.get(urls.ownReferralCoupon);
    //   setCouponCode(res?.data?.coupon_id);
    // } catch (error) {
    //   Bugsnag.notify(error);
    // }
  };

  const toggleExpanded = () => {
    if (!isExpanded) {
      trackEvent({
        event: "teleref_open",
        payload: {
          flow: providerType === "therapist" ? "therapy" : "psychiatry",
          platform: window.ReactNativeWebView
            ? "ios_app"
            : window.Android
            ? "android_app"
            : "website",
        },
      });
    }
    // storage.local.setItem("isReferralCardExpanded", !isExpanded);
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <CardWrapper hasCouponCode={!!couponCode}>
        <FlexBox columnGap="1rem" align="center">
          <img src="https://cdn.theinnerhour.com/assets/images/referral-card-visual.svg" />
          <Title bold>Show a loved one that they’re not alone</Title>
          {isMobile && (
            <>
              {isExpanded ? (
                <FiChevronUp
                  size="2rem"
                  color={ACCENT_800}
                  onClick={toggleExpanded}
                />
              ) : (
                <FiChevronDown
                  size="2rem"
                  color={ACCENT_800}
                  onClick={toggleExpanded}
                />
              )}
            </>
          )}
        </FlexBox>
        {(isExpanded || !isMobile) && (
          <FlexBox column rowGap="1.5rem" align="center">
            {!couponCode ? (
              <H5>
                {referralsExperiment.value === "v0"
                  ? `We know that seeing your loved ones struggle with their
                      mental health is not easy. It’s time to take a step forward
                      and refer someone you care about to Amaha. You can help your
                      friends and family feel better. As a token of support from
                      us, get a discount for you and your loved ones.`
                  : `We know that seeing your loved ones struggle with
                         their mental health is not easy. It’s time to take a
                          step forward and refer someone you care about to Amaha.
                           You can help your friends and family feel better. `}
              </H5>
            ) : (
              <H5>
                Refer Amaha with someone in need and make a positive impact on
                their mental health journey.
              </H5>
            )}
            <TextCTA
              color={PRIMARY_800}
              onClick={() => {
                trackEvent({
                  event: "teleref_share_click",
                  payload: {
                    flow:
                      providerType === "therapist" ? "therapy" : "psychiatry",
                    platform: window.ReactNativeWebView
                      ? "ios_app"
                      : window.Android
                      ? "android_app"
                      : "website",
                  },
                });
                setCurrentReferralState({
                  ...currentReferralState,
                  step: 2,
                });
              }}
            >
              Share Amaha
            </TextCTA>
          </FlexBox>
        )}
      </CardWrapper>
      {couponCode && (
        <CouponContainer>
          <H5 bold>Here’s a discount code for 20% off on your next session</H5>
          <CouponCodeWrapper onClick={handleCopy}>
            <span>{couponCode}</span>
            <FiCopy strokeWidth="2.5" color={PRIMARY_800} />
          </CouponCodeWrapper>
          {showCouponCopied && (
            <LinkCopiedToast onClick={e => e.stopPropagation()}>
              coupon code copied
            </LinkCopiedToast>
          )}
        </CouponContainer>
      )}
    </>
  );
};

export default ShareAmahaCard;
