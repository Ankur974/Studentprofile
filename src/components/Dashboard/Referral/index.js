import React, { useEffect, useState } from "react";
import { trackEvent } from "@utils/helpers";
import { useFeature } from "@growthbook/growthbook-react";
import Success from "./SuccessCard";
import Message from "./ReferralCardMessage";
import ShareProviderCard from "./ShareProviderCard";
import * as storage from "@utils/storageFactory";
import axiosInstance from "@axiosInstance";
import urls from "@urls";
import Bugsnag from "@bugsnag/js";
import { useDispatch, useSelector } from "react-redux";
import ShareAmahaCard from "./ShareAmahaCard";
import { PSYCHIATRIST, THERAPIST } from "@constants";
import { setAssignedProviders } from "@redux/actions/providerAction";
import { getPartnerSlug } from "../../../utils/helpers";

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

  const getAssignedProviders = async () => {
    if (user.mytherapist && !assignedProviders?.therapist) {
      try {
        const res = await axiosInstance.get(urls.getTherapistSummaryNew);
        setTherapistData(res?.data?.data);
        dispatch(setAssignedProviders(THERAPIST, res?.data?.data));
      } catch (err) {
        Bugsnag.notify(err);
      }
    } else {
      setTherapistData(assignedProviders?.therapist);
    }

    if (user?.mypsychiatrist && !assignedProviders?.psychiatrist) {
      try {
        const res = await axiosInstance.get(urls.getPsychiatristSummaryNew);
        setPsychiatristData(res?.data?.data);
        dispatch(setAssignedProviders(PSYCHIATRIST, res?.data?.data));
      } catch (err) {
        Bugsnag.notify(err);
      }
    } else {
      setPsychiatristData(assignedProviders?.psychiatrist);
    }
  };

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

  useEffect(() => {
    if (
      referralsExperiment.source === "experiment" &&
      storage.local.getItem("expt_assigned_fired") !== "true" &&
      !getPartnerSlug()
    ) {
      trackEvent({
        event: "teleref_expt_assigned",
        payload: {
          expt_flow: referralsExperiment.value === "v0" ? 1 : 2,
          platform: window.ReactNativeWebView
            ? "ios_app"
            : window.Android
            ? "android_app"
            : "website",
        },
      });
      storage.local.setItem("expt_assigned_fired", "true");
    }
  }, [referralsExperiment.source]);

  if (referralsExperiment.source !== "experiment" || getPartnerSlug()) {
    return null;
  }

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
