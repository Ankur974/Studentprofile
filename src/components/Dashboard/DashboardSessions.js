import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { fetchBseTools, showBseTag } from "@redux/actions/bseAction";
import AlertsContainer from "@components/common/AlertsContainer";
import { Text } from "@common/Text";
import FlexBox from "@common/ui/FlexBox";
import { Button } from "@common/Buttons";
import Loader from "@common/ui/Loader";
import SessionsListing from "./SessionsListing";
import LatestPrescription from "./LatestPrescription";
import useMobileView from "@hooks/useMobileView";
import SessionCredits from "./SessionCredits";
import SuggestedSession from "./SuggestedSession";
import BtobBookingLimitModal from "@components/Booking/BtobBookingLimitModal";
import BtobBookingLimitBottomSheet from "@components/Booking/BtobBookingLimitBottomSheet";
import {
  isVerifiedCorporateUser,
  trackEvent,
  currentFlow,
} from "@utils/helpers";
import {
  WHITE,
  LIGHT_GREY,
  ACCENT_200,
  ACCENT_800,
  SECONDARY_700,
  SECONDARY_800,
} from "@common/ui/colors";
import { PSYCHIATRIST, COUPLE_THERAPIST, THERAPIST, COACH } from "@constants";
import axiosInstance from "@axiosInstance";
import { getFirebaseClient } from "@firebaseInstance";
import urls from "@urls";
import Bugsnag from "@bugsnag/js";
import isEmpty from "lodash/isEmpty";
import OnlineOfflineBottomSheet from "@components/Booking/OnlineOfflineBottomSheet";
import OnlineOfflineModal from "@components/Booking/OnlineOfflineModal";
import * as storage from "@utils/storageFactory";
import { downloadFile } from "../../utils/interfaces";
import usePaginatedSessions from "@hooks/usePaginatedSessions";
import useSessions from "@hooks/useSessions";
import { CF_PROVIDER_ROLE, TFL_ORG_ID, WHATSAPP_URL } from "../../constants";
import ReferralCard from "./Referral";
import AddMemberDashboardCard from "../B2B/AddFamilyMember/DashboardCard";
import FirstSessionCard from "./FirstSessionCard";
import { BooleanParam, useQueryParam, withDefault } from "use-query-params";
// import NoteSharePopup from "../Popups/NoteSharePopup";

const Section = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const CardLeft = styled.div`
  background-color: ${ACCENT_200};
  border-radius: 1rem;
  position: relative;
  height: 75vh;
  padding: 0 1.5rem;
  /* padding: 2rem; */
  overflow-y: ${props => (props.dropDownStatus ? "hidden" : "auto")};
  width: 100%;

  @media screen and (max-width: 768px) {
    height: fit-content;
    background-color: ${WHITE};
    width: 100%;
    box-sizing: border-box;
    margin: auto;
  }
`;

const TextContainer = styled.div`
  position: static;
  top: 0;
  padding: 1.5rem 0;
  z-index: 2;
`;

const CardRight = styled.div`
  position: relative;
  background-color: ${WHITE};
  padding-top: 0;
  overflow-y: scroll;
  width: 100%;
  @media screen and (max-width: 768px) {
    height: fit-content;
    width: auto;
    padding: 0 1.5rem;
  }
`;

const Wrapper = styled.div`
  max-height: ${props => (props.nextSessionPrompt ? "13rem" : "30rem")};
  min-height: ${props =>
    props.isMobile ? "unset" : props.nextSessionPrompt ? "13rem" : "30rem"};
  overflow-y: auto;
  margin: 0 0 1rem 0;

  @media screen and (max-width: 768px) {
    overflow-y: unset;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  left: unset;
  width: 100%;
  padding-bottom: 1.5rem;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(0, white, 90%, transparent);
  @media screen and (max-width: 768px) {
    position: static;
    margin: auto;
    transform: translate(0, 0);
    margin-top: 1.5rem;
  }
`;

const SupportText = styled.div`
  text-align: center;
  margin: 2rem 1rem 0;
  @media screen and (max-width: 768px) {
    margin: 2rem 1.5rem;
  }
`;

const WhatsAppLink = styled.a`
  color: ${ACCENT_800};
  text-decoration: underline;
  text-underline-offset: 2px;
`;

const DashboardSessions = ({
  loading,
  prescriptions,
  updateStatus,
  sessionCredits,
  providertype,
  providerPublicProfile,
}) => {
  const [bookClicked, setBookClicked] = useState(false);
  const [showBtobLimitModal, setShowBtobLimitModal] = useState(false);
  const [isMobileApp, setIsMobileApp] = useState(false);
  const dispatch = useDispatch();
  const isMobile = useMobileView();
  const router = useRouter();
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [suggestedSessions, setSuggestedSessions] = useState([]);
  const appVisibility = useSelector(state => state.appConfig.appVisibility);
  const loadingConsents = useSelector(state => state.consent?.loadingConsents);
  const consents = useSelector(state => state.consent?.consents);
  // TODO : add logic to show note sharing consent popup
  const [showNoteSharingConsent, setShowNoteSharingConsent] = useState(true);
  const [page, setPage] = useState(1);

  const { user, dropDownStatus, bseTools, provider, providerId } = useSelector(
    state => ({
      user: state?.auth?.user,
      dropDownStatus: state?.sessions?.sessionDropdown,
      bseTools: state?.bse?.bseTools,
      provider: state?.provider,
      providerId: state?.provider?.providerProfile?.id,
    })
  );

  const { providerType, providerProfile } = provider || {};
  const sessionType = providerType === COUPLE_THERAPIST ? "couple" : "single";
  const providerCategory =
    providerType === PSYCHIATRIST ? PSYCHIATRIST : THERAPIST;
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const canShowInpersonModal =
    providerPublicProfile?.offline_offering?.length > 0 &&
    !isEmpty(providerPublicProfile?.online_offering) &&
    !isVerifiedCorporateUser(user) &&
    !user?.is_package_client &&
    providerType !== COUPLE_THERAPIST;
  const [reload, setReload] = useQueryParam(
    "reload",
    withDefault(BooleanParam, false)
  );

  const isCfProvider = providerPublicProfile?.roles?.includes(CF_PROVIDER_ROLE);

  useEffect(() => {
    setIsMobileApp(
      window.Android || window.ReactNativeWebView || window.YouMatter
    );
  });

  useEffect(() => {
    if (providerType && providerId) {
      checkIfNewToolsAssigned();
    }
  }, [providerType, providerId]);

  useEffect(() => {
    setPage(1);
  }, [providerId]);

  // To refresh sessions list post cancellation
  useEffect(() => {
    if (reload) {
      setPage(1);
      setReload(false);
    }
  }, [providerId, reload]);

  const upcomingSessions = usePaginatedSessions(
    urls.upcomingSessions,
    page,
    setSessionsLoading
  );

  useEffect(async () => {
    if (!providerProfile?.id || !providerType) return;
    try {
      const res = await axiosInstance.get(urls.suggestedSessions, {
        params: {
          [`${providerCategory}_id`]: providerProfile?.id,
        },
      });
      setSuggestedSessions(res?.data?.suggested_bookings || []);
    } catch (err) {
      Bugsnag.notify(err);
    }
  }, [providerProfile?.id, providerType]);

  const completedSessions = useSessions(urls.completedSessions, 1, 1, true);

  useEffect(() => {
    if (bseTools?.length > 0) {
      if (
        storage.local.getItem(`${user?.uuid}/${providerType}/lastSortKey`) &&
        storage.local.getItem(`${user?.uuid}/${providerType}/lastSortKey`) >=
          bseTools?.[0]?.sort_key
      ) {
        dispatch(showBseTag(false));
        return;
      } else if (
        !storage.local.getItem(`${user?.uuid}/${providerType}/lastSortKey`) ||
        storage.local.getItem(`${user?.uuid}/${providerType}/lastSortKey`) <
          bseTools?.[0]?.sort_key
      ) {
        dispatch(showBseTag(true));
      }
    } else {
      dispatch(showBseTag(false));
    }
  }, [bseTools]);

  // const handleConsentAction = allow => {
  //   setShowNoteSharingConsent(false);
  //   // if (allow) {
  //   // } else {
  //   // }
  // };

  const checkIfNewToolsAssigned = () =>
    dispatch(fetchBseTools(providerType, "pending", 20, providerId));

  const providerName = `${providerProfile?.firstname}${
    providerProfile?.lastname ? ` ${providerProfile?.lastname}` : ""
  }`;

  const flow = currentFlow(providerCategory);

  const payload = {
    flow,
    [`${providerCategory}_name`]: providerName,
    [`${providerCategory}_uuid`]: providerProfile?.uuid,
    provider_type: providerType,
  };

  const noProviderAssigned =
    !user?.mytherapist && !user?.mypsychiatrist && !user?.package_coach_id;

  const bookSessionTracker = (fromCredit, duration) => {
    const analyticsPayload = {
      ...payload,
      credit_flow: fromCredit ? "yes" : "no",
      credit_package: fromCredit ? duration.toString() : "NA",
      source: "provider_dashboard",
    };

    if (user.is_package_client) {
      (analyticsPayload.packaging_condition =
        user?.package?.package?.info?.analytics?.package_type),
        (analyticsPayload.package_type =
          user?.package?.package?.info?.analytics?.package_sub_type),
        (analyticsPayload.intake_session =
          user?.is_package_client &&
          noProviderAssigned &&
          user?.package?.package?.info?.id !== 3);
    }

    trackEvent({
      event: "therapy_psychiatry_book_session_click",
      payload: analyticsPayload,
    });
  };

  // To check if therapist/psychiatrist
  const suggestedSessionId = suggestedSessions?.findIndex(
    session => session?.provider_id === providerProfile?.id
  );

  const getLatestSession = () => {
    if (upcomingSessions.length > 0) return upcomingSessions[0];
    if (completedSessions.length > 0) return completedSessions[0];
    return null;
  };

  const routeToBooking = () => {
    try {
      if (user?.organisation_id === TFL_ORG_ID) {
        router.push({
          pathname: `/booking/${providerProfile?.uuid}/${providerCategory}/${sessionType}`,
          query: { credit_duration: 1800 },
        });

        return;
      }

      var today = new Date().setHours(0, 0, 0, 0);
      if (
        upcomingSessions.length === 2 &&
        user.usertype !== "patient" &&
        storage.local.getItem(`case3/understood/${today}/${user.uuid}`) !==
          "true"
      ) {
        setShowBtobLimitModal(true);
      } else {
        const latestSession = getLatestSession();

        const query = { journey: "rebooking" };

        if (providerPublicProfile?.offline_offering?.length > 0) {
          query.clinic_id = providerPublicProfile.offline_offering[0].clinic.id;
        }

        // If latest session is not offline, show "Virtual" mode selected by default in Booking flow
        if (!latestSession?.ih_clinic_id) {
          query.default_mode = "online";
        }

        router.push({
          pathname: `/booking/${providerProfile?.uuid}/${providerCategory}/${sessionType}`,
          query,
        });
      }
    } catch (err) {
      console.log(err);
      Bugsnag.notify(err);
    }
  };

  const routeToCreditBooking = creditDetails => {
    const query = { journey: "rebooking" };

    if (!!creditDetails) {
      const { sessionduration, ih_clinic_id } = creditDetails;

      query.credit_duration = sessionduration;
      if (ih_clinic_id) {
        query.clinic_id = ih_clinic_id;
      }
    }

    router.push({
      pathname: `/booking/${providerProfile?.uuid}/${providerCategory}/${sessionType}`,
      query,
    });
  };

  const bookButtonClick = () => {
    if (!providerPublicProfile) return;

    if (!bookClicked) {
      bookSessionTracker(false);
      // if (canShowInpersonModal) {
      //   setShowOfflineModal(true);
      // } else {
      setBookClicked(true);

      // required for tracking of package_screen_load
      storage.session.removeItem("package_screen_load_tracked");

      routeToBooking();
      // }
    }
  };

  const bookAnyWayClick = () => {
    var today = new Date().setHours(0, 0, 0, 0);
    storage.local.setItem(`case3/understood/${today}/${user.uuid}`, "true");
    setBookClicked(true);
    bookSessionTracker(false);
    routeToBooking();
  };

  // route to booking from OfflineOnlineModal/Bottomsheet
  const routeToBookingFromModal = clinic_id => {
    const query = { journey: "rebooking" };

    if (!!clinic_id) {
      query.clinic_id = clinic_id;
    }

    const uuid = providerProfile?.uuid;

    router.push({
      pathname: `/booking/${uuid}/${providerCategory}/${sessionType}`,
      query,
    });
  };

  const handleDownload = async (fileUrl, name) => {
    const { FIRESTORAGE } = await getFirebaseClient();
    const isFirebaseUrl = fileUrl.includes("firebase");
    let fileName = "prescription.pdf";
    if (isFirebaseUrl) {
      fileName = FIRESTORAGE.refFromURL(fileUrl)?.name;
    } else if (name) {
      fileName = name;
    }
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        `downloadFile,${fileUrl},${fileName}`
      );
    } else if (window.Android) {
      window.Android.downloadFile(fileUrl, fileName);
    } else if (window.YouMatter) {
      downloadFile(fileUrl, fileName);
    } else {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <>
      {/* {showNoteSharingConsent && (
        <NoteSharePopup handleConsentAction={handleConsentAction} />
      )} */}
      {showOfflineModal && (
        <>
          <OnlineOfflineBottomSheet
            providerType={providertype}
            provider={providerPublicProfile}
            onClose={() => setShowOfflineModal(false)}
            routeToBookingFromModal={routeToBookingFromModal}
          />
          <OnlineOfflineModal
            providerType={providertype}
            provider={providerPublicProfile}
            onClose={() => setShowOfflineModal(false)}
            routeToBookingFromModal={routeToBookingFromModal}
          />
        </>
      )}

      {showBtobLimitModal && (
        <>
          <BtobBookingLimitBottomSheet
            description={`You already have two upcoming sessions. We recommended you finish atleast one of them before making further bookings.<br /><br /> Your ${providerType} can help you decide when you would need the next session.`}
            toggleModal={() => setShowBtobLimitModal(!showBtobLimitModal)}
            onUnderstoodClick={() => {
              var today = new Date().setHours(0, 0, 0, 0);
              storage.local.setItem(
                `case3/understood/${today}/${user.uuid}`,
                "true"
              );
              setBookClicked(false);
            }}
            ctaText={"BOOK ANYWAY"}
            onCtaClick={bookAnyWayClick}
          />
          <BtobBookingLimitModal
            sessions={upcomingSessions}
            description={`You already have two upcoming sessions. We recommended you finish atleast one of them before making further bookings.<br /><br /> Your ${providerType} can help you decide when you would need the next session.`}
            toggleModal={() => setShowBtobLimitModal(!showBtobLimitModal)}
            onUnderstoodClick={() => {
              var today = new Date().setHours(0, 0, 0, 0);
              storage.local.setItem(
                `case3/understood/${today}/${user.uuid}`,
                "true"
              );
              setBookClicked(false);
            }}
            ctaText={"BOOK ANYWAY"}
            onCtaClick={bookAnyWayClick}
          />
        </>
      )}

      <Section>
        <CardLeft
          dropDownStatus={dropDownStatus}
          className="mr-2 hide-scrollbar"
          fiveSessionOrMore={upcomingSessions?.length >= 5}
        >
          {providerProfile?.number_of_session_booked !== 0 ? (
            <FlexBox column justify="space-between" noPosition="unset">
              <TextContainer
                style={{ backgroundColor: !isMobile && ACCENT_200 }}
              >
                <Text fontSize="1rem" bold block>
                  Upcoming Sessions
                </Text>
              </TextContainer>
              <Wrapper
                className="hide-scrollbar"
                nextSessionPrompt={suggestedSessionId >= 0}
                isMobile={isMobile}
              >
                <SessionsListing
                  source="provider_dashboard"
                  sessions={upcomingSessions}
                  sessionBackground={isMobile ? LIGHT_GREY : WHITE}
                  providerPublicProfile={providerPublicProfile}
                  loading={sessionsLoading}
                  setPage={setPage}
                />
              </Wrapper>

              {providerType !== COUPLE_THERAPIST &&
                providerType !== COACH &&
                suggestedSessionId >= 0 && (
                  <SuggestedSession
                    session={suggestedSessions?.[suggestedSessionId]}
                    provider={provider}
                  />
                )}
              {/* {!(
              (sessionCreditsData?.thirtyMinuteSessionCredits > 0 &&
                sessionCreditsData?.sixtyMinuteSessionCredits > 0) ||
              router.query.providertype === COACH
            ) ? ( */}
              <ButtonWrapper
                style={{ backgroundColor: !isMobile && ACCENT_200 }}
              >
                <Button
                  color={SECONDARY_800}
                  hoverColor={SECONDARY_700}
                  onClick={bookButtonClick}
                  width="14rem"
                  display="block"
                  margin="auto"
                  style={{ opacity: bookClicked && "0.3" }}
                  // Users can't book a session again from dashboard for a CF provider
                  disabled={isCfProvider}
                >
                  {bookClicked ? "LOADING..." : "BOOK SESSION"}
                </Button>
              </ButtonWrapper>
            </FlexBox>
          ) : (
            <FlexBox column justify="space-between" noPosition="unset">
              <FirstSessionCard
                providerPublicProfile={providerPublicProfile}
                routeToBooking={routeToBooking}
                bookSessionTracker={bookSessionTracker}
              />
              {/* <RecommendedActivityCard /> */}
            </FlexBox>
          )}
        </CardLeft>
        <CardRight className="hide-scrollbar">
          {!isMobile &&
            providerType === COUPLE_THERAPIST &&
            !!consents &&
            !loadingConsents && (
              <AlertsContainer limit={1} source="provider_dashboard" />
            )}
          {!isMobile &&
            providerType !== COUPLE_THERAPIST &&
            providerType !== COACH && (
              <AlertsContainer limit={2} source="provider_dashboard" />
            )}
          {!isMobileApp &&
            providerType === PSYCHIATRIST &&
            (loading ? (
              <Loader />
            ) : (
              prescriptions?.[0] && (
                <LatestPrescription
                  prescription={prescriptions?.[0]}
                  updateStatus={updateStatus}
                  handleDownload={handleDownload}
                />
              )
            ))}
          {(completedSessions.length > 0 || providertype !== "coach") && (
            <SessionCredits
              sessionCredits={sessionCredits}
              tracker={bookSessionTracker}
              routeToCreditBooking={routeToCreditBooking}
            />
          )}
          {/* Not to show referral card for CF providers as well */}
          {user?.usertype === "patient" &&
            !!providertype &&
            providertype !== COUPLE_THERAPIST &&
            providerPublicProfile?.isapproved &&
            !isCfProvider && <ReferralCard providerType={providertype} />}
        </CardRight>
      </Section>

      {user?.organisation_id === TFL_ORG_ID && appVisibility?.showAddMember && (
        <AddMemberDashboardCard />
      )}
      {!isMobileApp && !isMobile && (
        <SupportText>
          <Text fontSize="0.75rem">
            {user?.organisation_id === TFL_ORG_ID
              ? "If you have any questions or would like to switch your therapist,"
              : "If you have any questions,"}{" "}
            <WhatsAppLink href={WHATSAPP_URL} target="_blank">
              chat with us via WhatsApp.
            </WhatsAppLink>
          </Text>
        </SupportText>
      )}
    </>
  );
};

export default DashboardSessions;
