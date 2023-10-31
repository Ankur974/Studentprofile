import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import AlertsContainer from "@components/common/AlertsContainer";
import ProviderCard from "@components/ProviderCard";
import DashboardSessions from "@components/Dashboard/DashboardSessions";
import TherapistChange from "@components/Popups/TherapistChange";
import BottomSheet from "./BottomSheet";
import BtoBTherapistChange from "./BtoBTherapistChange";
import Sos from "./Sos";
import {
  trackEvent,
  currentFlow,
  isVerifiedCorporateUser,
} from "@utils/helpers";
import {
  THERAPIST,
  PSYCHIATRIST,
  COUPLE_THERAPIST,
  COACH,
  APP_DOWNLOAD_DEEP_LINK,
} from "@constants";
import {
  ACCENT_100,
  ACCENT_800,
  PRIMARY_100,
  PRIMARY_800,
  PRIMARY_700,
} from "@common/ui/colors";
import groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import Bugsnag from "@bugsnag/js";
import axiosInstance from "@axiosInstance";
import urls from "@urls";
import { FiFileText, FiBriefcase, FiCalendar } from "react-icons/fi";
import { Text } from "@common/Text";
import FlexBox from "@common/ui/FlexBox";
import useSessions from "@hooks/useSessions";
import SelfCareCard from "@components/SelfCareCard";
import WhatsAppMobileCTA from "./WhatsAppMobileCTA";

const MobileMain = styled.div`
  height: fit-content;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${PRIMARY_100};
`;

const ProviderCardContainer = styled.div`
  width: 86.67%;
  margin: 0 auto;
`;

const ServicesContainer = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const ServiceBox = styled.div`
  display: grid;
  place-items: center;
  margin: 0 1.5rem;
  cursor: pointer;
  position: relative;
`;

const ServiceBoxInnerContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: 3px solid #ee686333;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ServiceBoxAnimation = styled.div`
  position: absolute;
  height: 90%;
  width: 90%;
  border: 2px solid ${PRIMARY_700};
  z-index: 2;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: leaves 2s ease-in-out infinite alternate;
  animation: fadeout 2s ease-in-out infinite alternate;
  -webkit-animation: leaves 2s ease-in-out infinite alternate;
  -webkit-animation: fadeout 2s ease-in-out infinite alternate;

  @keyframes leaves {
    0% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    100% {
      transform: scale(1.1);
      -webkit-transform: scale(1.1);
    }
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const ServiceImage = styled(FlexBox)`
  height: 3rem;
  width: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${ACCENT_100};
`;

const ServiceName = styled.p`
  margin: 8px 0px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.19px;
  color: ${ACCENT_800};
`;

const TopAlertsContainer = styled.div`
  width: 90%;
  margin: auto;
`;

const PendingDot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${PRIMARY_700};
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: 3;
`;

const SupportText = styled.div`
  text-align: center;
  margin: 2rem 1rem 0;
  @media screen and (max-width: 768px) {
    margin: 2rem 1.5rem;
  }
`;

const EmailLink = styled.a`
  color: ${ACCENT_800};
  text-decoration: underline;
`;

const MobileScreen = ({
  prescriptions,
  updateStatus,
  toggleSos,
  providerPublicProfile,
}) => {
  const state = useSelector(state => state);
  const publicProfile = { ...providerPublicProfile };
  const {
    provider: { providerType, providerProfile, loading: providerLoading },
    auth: { user },
  } = state;

  const [isAdditionalServicesDashboard, setisAdditionalServicesDashboard] =
    useState(false);

  const [sessionCredits, setSessionCredits] = useState(null);
  const [isMobileApp, setIsMobileApp] = useState(false);

  const [therapistChangeModal, setTherapistChangeModal] = useState(false);
  const toggleModal = () => setTherapistChangeModal(!therapistChangeModal);

  const upcomingSessions = useSessions(urls.upcomingSessions, 1, 1, true);
  const completedSessions = useSessions(urls.completedSessions, 1, 1, true);
  const loadingConsents = useSelector(state => state.consent?.loadingConsents);
  const consents = useSelector(state => state.consent?.consents);
  const providerName = `${providerProfile?.firstname}${
    providerProfile?.lastname ? ` ${providerProfile?.lastname}` : ""
  }`;

  const type =
    providerType?.toLowerCase() === PSYCHIATRIST ? PSYCHIATRIST : THERAPIST;
  const flow = currentFlow(providerType?.toLowerCase());

  const payload = {
    flow,
    [`${type}_name`]: providerName,
    [`${type}_uuid`]: providerProfile?.uuid,
  };

  useEffect(() => {
    setIsMobileApp(
      window.Android || window.ReactNativeWebView || window.YouMatter
    );
  });

  const providerProfileTracker = () => {
    trackEvent({ event: "therapy_psychiatry_profile_card_click", payload });
  };

  const sosOnClick = () => {
    toggleSos();
    trackEvent({ event: "psychiatry_sos_click" });
  };

  const therapistChangeOnClick = () => {
    toggleModal();
    trackEvent({
      event: "therapist_change_click",
      payload: {
        organisation: user?.organisation_id,
      },
    });
  };

  useEffect(() => {
    if (window.location.pathname.includes("additional-services"))
      setisAdditionalServicesDashboard(true);
  }, []);

  useEffect(() => {
    setIsMobileApp(
      !!window?.Android || !!window?.ReactNativeWebView || !!window?.YouMatter
    );
  }, []);

  useEffect(async () => {
    if (!isEmpty(state.auth.user) && !!providerType && !!providerProfile?.id) {
      try {
        let providerKey = "";
        if (providerType === THERAPIST) {
          providerKey = "mytherapist";
        } else if (providerType === PSYCHIATRIST) {
          providerKey = "mypsychiatrist";
        } else if (providerType === COACH) {
          providerKey = "coach";
        } else {
          providerKey = "my_couple_therapist";
        }

        const res = await axiosInstance.get(urls.myPackages, {
          params: {
            provider_type: providerKey,
            provider_id: providerProfile?.id,
          },
        });
        const credits = groupBy(res.data, "sessionduration");
        setSessionCredits(credits);
      } catch (err) {
        Bugsnag.notify(err);
      }
    }
  }, [state.auth?.user, providerType, providerProfile?.id]);

  const getLatestSession = () => {
    if (upcomingSessions.length > 0) return upcomingSessions[0];
    if (completedSessions.length > 0) return completedSessions[0];
    return null;
  };

  const handleSelfCareButtonClick = () => {
    try {
      trackEvent({ event: "tnp_db_app_download_cta_click", payload });
      window.open(APP_DOWNLOAD_DEEP_LINK);
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  const showB2BTherapistChangeModal =
    state.provider.providerType === THERAPIST &&
    state.auth?.user?.usertype !== "patient";

  //TODO: this file can be removed
  return (
    <MobileMain>
      {!isAdditionalServicesDashboard && (
        <ProviderCardContainer>
          {!state?.provider?.providerProfile || providerLoading ? (
            <ProviderCard loading />
          ) : (
            <ProviderCard
              provider={state.provider.providerProfile}
              providerType={state.provider.providerType}
              tracker={providerProfileTracker}
              getLatestSession={getLatestSession}
              providerPublicProfile={publicProfile}
            />
          )}
        </ProviderCardContainer>
      )}

      <ServicesContainer>
        {(state.provider.providerType === THERAPIST ||
          state.provider.providerType === PSYCHIATRIST) && (
          <Link
            href={`/dashboard/${state.provider.providerType}/tools/pending`}
          >
            {state.bse.showNewTag ? (
              <ServiceBox
                onClick={() =>
                  trackEvent({
                    event: "assessment_entry_click",
                    payload: { flow },
                  })
                }
              >
                {state.bse.bseTools.length > 0 && <PendingDot />}
                <ServiceBoxInnerContainer>
                  <ServiceBoxAnimation />
                  <ServiceImage>
                    <FiFileText color={PRIMARY_800} size="1.75rem" />
                  </ServiceImage>
                </ServiceBoxInnerContainer>
                <ServiceName>Tools</ServiceName>
              </ServiceBox>
            ) : (
              <ServiceBox
                onClick={() =>
                  trackEvent({
                    event: "assessment_entry_click",
                    payload: { flow },
                  })
                }
              >
                {state.bse.bseTools.length > 0 && <PendingDot />}
                <ServiceImage>
                  <FiFileText color={PRIMARY_800} size="1.75rem" />
                </ServiceImage>
                <ServiceName>Tools</ServiceName>
              </ServiceBox>
            )}
          </Link>
        )}
        {state.provider.providerType === PSYCHIATRIST && (
          <Link
            href={`/dashboard/${state.provider.providerType}/prescriptions`}
          >
            <ServiceBox>
              <ServiceImage>
                <FiBriefcase color={PRIMARY_800} size="1.75rem" />
              </ServiceImage>
              <ServiceName>Prescriptions</ServiceName>
            </ServiceBox>
          </Link>
        )}
        <Link href={`/dashboard/${state.provider.providerType}/sessions`}>
          <ServiceBox
            onClick={() =>
              trackEvent({
                event: "session_entry_click",
                payload: { flow },
              })
            }
          >
            <ServiceImage>
              <FiCalendar color={PRIMARY_800} size="1.75rem" />
            </ServiceImage>
            <ServiceName>Sessions</ServiceName>
          </ServiceBox>
        </Link>
      </ServicesContainer>
      {state.provider.providerType === COUPLE_THERAPIST &&
        !!consents &&
        !loadingConsents && (
          <TopAlertsContainer>
            <AlertsContainer limit={1} />
          </TopAlertsContainer>
        )}
      {state.provider.providerType !== COUPLE_THERAPIST &&
        state.provider.providerType !== COACH && (
          <TopAlertsContainer>
            <AlertsContainer limit={2} />
          </TopAlertsContainer>
        )}
      <BottomSheet>
        <DashboardSessions
          prescriptions={prescriptions}
          updateStatus={updateStatus}
          sessionCredits={sessionCredits}
          providertype={providerType}
          providerPublicProfile={publicProfile}
        />

        {!isMobileApp &&
          providerType !== PSYCHIATRIST &&
          !isVerifiedCorporateUser(user) && (
            <FlexBox margin="1rem 0 0" padding="0 1.5rem">
              <SelfCareCard onButtonClick={handleSelfCareButtonClick} />
            </FlexBox>
          )}

        <SupportText>
          <Text opacity="0.2" fontSize="0.75rem">
            If you have any questions, contact Amaha on{" "}
            <EmailLink href="mailto:support@amahahealth.com">
              support@amahahealth.com
            </EmailLink>
          </Text>
        </SupportText>

        {showB2BTherapistChangeModal && (
          <BtoBTherapistChange onClick={therapistChangeOnClick} />
        )}
        {state.provider.providerType === PSYCHIATRIST && (
          <Sos toggleSos={sosOnClick} />
        )}
        {!isMobileApp && !showB2BTherapistChangeModal && <WhatsAppMobileCTA />}
      </BottomSheet>
      {therapistChangeModal && <TherapistChange onClick={toggleModal} />}
    </MobileMain>
  );
};

export default MobileScreen;
