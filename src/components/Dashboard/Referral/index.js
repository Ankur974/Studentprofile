/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useFeature } from "@growthbook/growthbook-react";
import { useDispatch, useSelector } from "react-redux";

import Success from "./SuccessCard";
import Message from "./ReferralCardMessage";
import ShareProviderCard from "./ShareProviderCard";
import ShareAmahaCard from "./ShareAmahaCard";

const ReferralCard = () => {
  const initialReferralState = {
    step: 1,
    shareIndividualProvider: true,
  };
  const [currentReferralState, setCurrentReferralState] =
    useState(initialReferralState);
  const referralsExperiment = useFeature("referrals-experiment");
  const [couponCode, setCouponCode] = useState(null);
  const [therapistData, setTherapistData] = useState(null);
  const [psychiatristData, setPsychiatristData] = useState(null);

  const dispatch = useDispatch();

  const { user, assignedProviders, provider } = useSelector(state => ({
    provider: state?.provider,
    user: state?.auth?.user,
    assignedProviders: state?.provider?.assignedProviders,
  }));
  const { providerType, loading: providerLoading } = provider;

  useEffect(() => {
    getAssignedProviders();
  }, []);

  const getAssignedProviders = async () => {};

  useEffect(() => {
    if (!providerLoading && providerType) {
      setCurrentReferralState({
        ...currentReferralState,
        selectedProviderType: providerType,
        serviceSelected: providerType,
        flow: providerType === "therapist" ? "therapy" : "psychiatry",
      });
    }
  }, [providerType]);

  return (
    <>
      {currentReferralState.step === 1 && (
        <ShareAmahaCard
          referralsExperiment={referralsExperiment}
          providerType={providerType}
          setCurrentReferralState={setCurrentReferralState}
          currentReferralState={currentReferralState}
        />
      )}

      {currentReferralState.step === 2 && (
        <ShareProviderCard
          currentReferralState={currentReferralState}
          setCurrentReferralState={setCurrentReferralState}
          therapist={therapistData?.therapist}
          psychiatrist={psychiatristData?.psychiatrist}
        />
      )}

      {currentReferralState.step === 3 && (
        <Message
          setCouponCode={setCouponCode}
          referralsExperiment={referralsExperiment}
          currentReferralState={currentReferralState}
          setCurrentReferralState={setCurrentReferralState}
          therapist={therapistData?.therapist}
          psychiatrist={psychiatristData?.psychiatrist}
        />
      )}

      {currentReferralState.step === 4 && (
        <Success
          couponCode={couponCode}
          referralsExperiment={referralsExperiment}
          setCurrentReferralState={setCurrentReferralState}
          currentReferralState={currentReferralState}
        />
      )}
    </>
  );
};

export default ReferralCard;
