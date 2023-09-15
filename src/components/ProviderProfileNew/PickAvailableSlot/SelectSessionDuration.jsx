import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";
import styled, { css } from "styled-components";

import { Text } from "@common/Text";
import { FlexBox } from "@common/FlexBox";
import { SessionDurationLoader, PackagesLoader } from "./Loaders";

import {
  ACCENT_500,
  PRIMARY_100,
  PRIMARY_800,
  SECONDARY_200,
  SECONDARY_800,
  WHITE,
} from "@constants/colors";
import { copyToClipboard } from "@utils/helpers";
import { couponCodes, DEFAULT_COUPON } from "@metadata/BookingNew/couponCodes";
import { DAVYS_GRAY_400 } from "../../../constants/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 1.5rem;
  flex-direction: column;
  box-sizing: border-box;
  align-items: flex-start;

  * {
    box-sizing: border-box;
  }
`;

const TitleText = styled(Text)`
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 700;

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  row-gap: 1.5rem;
  flex-direction: column;

  @media only screen and (min-width: 769px) {
    border-radius: 0.75rem;
    background-color: ${WHITE};
  }
`;

const DurationsFlex = styled(FlexBox)`
  width: 100%;
  column-gap: 1.5rem;
  align-items: center;

  @media only screen and (max-width: 768px) {
    column-gap: 1rem;
  }
`;

const DurationButton = styled(FlexBox)`
  flex: 1;
  cursor: pointer;
  padding: 0.75rem 0;
  align-items: center;
  border-radius: 0.75rem;
  justify-content: center;
  background-color: ${WHITE};
  transition: all 250ms linear;
  border: 1px solid ${ACCENT_500};
  max-width: 50%;

  ${Text} {
    line-height: 1.5;
    font-weight: bold;
    text-align: center;
    font-size: 0.875rem;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-color: ${SECONDARY_800};
      background-color: ${SECONDARY_800};

      ${Text} {
        color: ${WHITE};
      }
    `}
`;

const CouponStrip = styled(FlexBox)`
  column-gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  justify-content: space-between;
  background-color: ${PRIMARY_100};
  border: 1px solid ${PRIMARY_800};

  @media only screen and (max-width: 768px) {
    row-gap: 0.25rem;
    flex-direction: column;
  }
`;

const CopyText = styled(Text)`
  font-weight: bold;

  @media only screen and (max-width: 768px) {
    font-weight: 500;
  }
`;

const CopiedNotification = styled.div`
  top: 2rem;
  right: 2.5rem;
  position: absolute;
  font-size: 0.75rem;
  pointer-events: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: ${SECONDARY_800};
  background: ${SECONDARY_200};

  @media only screen and (max-width: 768px) {
    top: 4rem;
    right: 50%;
    transform: translateX(50%);
  }
`;

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid ${DAVYS_GRAY_400};
  flex: 1;
`;

const WithDivider = ({ children }) => {
  return (
    <FlexBox
      width="100%"
      justify="space-between"
      align="center"
      columnGap="0.5rem"
    >
      {children} <Divider />
    </FlexBox>
  );
};

const RenderDurationButton = ({ duration, isSelected, onClick }) => {
  const mins = duration / 60;

  if (!mins) return null;
  return (
    <DurationButton onClick={onClick} isSelected={isSelected}>
      <Text>
        {mins} min{mins > 1 ? "s" : ""}
      </Text>
    </DurationButton>
  );
};

const RenderCouponStrip = ({ onClick, couponData, isCouponCopied }) => (
  <CouponStrip>
    <CopyText color={PRIMARY_800}>
      Copy this {couponData?.discountPercentage}% Discount Code
    </CopyText>
    <FlexBox align="center" columnGap="0.5rem">
      <Text bold color={PRIMARY_800}>
        {couponData?.name}
      </Text>
      <FiCopy
        size="1.05rem"
        strokeWidth={3}
        cursor="pointer"
        color={PRIMARY_800}
        onClick={() => onClick(couponData)}
      />
    </FlexBox>

    {isCouponCopied && <CopiedNotification>Copied!</CopiedNotification>}
  </CouponStrip>
);

const SelectSessionDuration = ({
  selectedPackage,
  selectedDuration,
  setSelectedDuration,
  offeredDurations = [],
  fetchingOfferedDurations,
  fetchingAvailablePackages,
}) => {
  const user = useSelector(state => state.auth?.user);
  const isTflFlow = useSelector(state => state.tfl?.isTflFlow);
  const [isCouponCopied, setIsCouponCopied] = useState(false);
  const isProviderAssigned = !!(
    user?.mytherapist ||
    user?.mypsychiatrist ||
    user?.my_couple_therapist
  );

  const showCoupon =
    selectedPackage?.is_coupon_code_valid && !isProviderAssigned && !isTflFlow;

  useEffect(() => {
    if (!!offeredDurations?.length) {
      const maxDuration = Math.max(...offeredDurations?.map(o => o.duration));
      const maxDurationObj = offeredDurations?.find(
        ({ duration }) => duration === maxDuration
      );

      if (!selectedDuration) setSelectedDuration(maxDurationObj || {});
    }
  }, [offeredDurations]);

  const handleCouponCopy = couponCodeData => {
    try {
      if (window.Android) {
        window.Android.copyCoupon(couponCodeData.name);
      } else if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          `copyText,${couponCodeData.name}`
        );
      } else {
        copyToClipboard(couponCodeData.name);
      }

      setIsCouponCopied(true);
      setTimeout(() => {
        setIsCouponCopied(false);
      }, 3000);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  if (fetchingOfferedDurations) {
    return (
      <Wrapper>
        <WithDivider>
          <TitleText>Select session duration</TitleText>
        </WithDivider>
        <Container>
          <SessionDurationLoader />
          <PackagesLoader />
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <WithDivider>
        <TitleText>Select session duration</TitleText>
      </WithDivider>
      <Container>
        <DurationsFlex>
          {offeredDurations
            ?.sort((a, b) => b?.duration - a?.duration)
            ?.map(offer => (
              <RenderDurationButton
                key={offer?.duration}
                duration={offer?.duration}
                onClick={() => setSelectedDuration(offer)}
                isSelected={offer?.duration === selectedDuration?.duration}
              />
            ))}
        </DurationsFlex>

        <FlexBox column width="100%" rowGap="0.75rem">
          {fetchingAvailablePackages ? (
            <PackagesLoader />
          ) : (
            <FlexBox align="center" justify="space-between">
              <Text bold>{selectedPackage?.display_title}</Text>
              {showCoupon ? (
                <FlexBox align="center" columnGap="0.5rem">
                  <Text>
                    <s>₹{selectedPackage?.flatprice}</s>
                  </Text>
                  <Text fontSize="0.75rem" color={PRIMARY_800}>
                    <Text bold fontSize="0.75rem" color={PRIMARY_800}>
                      ₹
                      {Math.ceil(
                        selectedPackage?.flatprice *
                        ((100 -
                          couponCodes[DEFAULT_COUPON].discountPercentage) /
                          100)
                      )}
                      /
                    </Text>
                    session
                  </Text>
                </FlexBox>
              ) : (
                <Text>₹{selectedPackage?.flatprice} /session</Text>
              )}
            </FlexBox>
          )}

          {showCoupon && (
            <RenderCouponStrip
              onClick={handleCouponCopy}
              isCouponCopied={isCouponCopied}
              couponData={couponCodes[DEFAULT_COUPON]}
            />
          )}
        </FlexBox>
      </Container>
    </Wrapper>
  );
};

export default SelectSessionDuration;
