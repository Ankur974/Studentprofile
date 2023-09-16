import Bugsnag from "@bugsnag/js";
import styled, { css, keyframes } from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FiShare2, FiX } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useFeature } from "@growthbook/growthbook-react";

import { Text } from "@common/Text";
import { Button } from "@common/Buttons";
import { FlexBox } from "@common/FlexBox";
import { H1, H3 } from "@common/Headings";
import BtoBVerificationModal from "@components/BtoBVerificationModal";
import BtobBookingLimitModal from "@components/Booking/BtobBookingLimitModal";
import BtobBookingLimitBottomSheet from "@components/Booking/BtobBookingLimitBottomSheet";

import {
  trackEvent,
  currentFlow,
  isVerifiedCorporateUser,
} from "@utils/helpers";
import useMobileView from "@hooks/useMobileView";
import * as storage from "@utils/storageFactory";
import { mapping } from "@metadata/urlParamsMappping";
import { closeWebView, shareProvider } from "@utils/interfaces";
import { COUPLE_THERAPIST, PSYCHIATRIST, THERAPIST } from "@constants";
import {
  WHITE,
  ACCENT_800,
  ACCENT_100,
  SECONDARY_800,
} from "@constants/colors";
import { useSelector } from "react-redux";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { BooleanParam, useQueryParam, withDefault } from "use-query-params";
import { useRef } from "react";
import { RenderCfTag } from "../ProfileCardNew";
import { CF_PROVIDER_ROLE } from "../../constants";
import CfInfoModal from "../common/CF/CfInfoModal";

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

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 22.5rem;
  aspect-ratio: 2.34;
  align-items: flex-end;
  box-sizing: border-box;
  justify-content: center;

  /* background-attachment: fixed; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${({ providerImg }) =>
    providerImg &&
    css`
      background-image: url(${providerImg});
      background-size: cover;
    `}

  ${({ animated }) =>
    animated &&
    css`
      height: 80vh;
    `}

  * {
    box-sizing: border-box;
  }

  @media only screen and (max-width: 768px) {
    height: 11.25rem;
    aspect-ratio: 0.56;
    background-position: 50% 50%;
  }
`;

const BottomBar = styled(motion.div)`
  width: 83.35%;
  max-width: 75rem;
  margin: auto;
  height: 12rem;
  overflow: hidden;
  background-color: white;
  z-index: 1;

  @media only screen and (max-width: 768px) {
    height: 18.75rem;
    width: 100%;
  }
`;

const Gradient = styled(FlexBox)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;

  ${({ videoThumbExists }) =>
    videoThumbExists &&
    css`
      background: rgba(0, 0, 0, 0.4) !important;
      background-blend-mode: multiply;
    `}
`;

const Overlay = styled(FlexBox)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  /* z-index: 100; */
`;

const BackIcon = styled(BsFillArrowLeftCircleFill)`
  left: 6%;
  top: 1.5rem;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  background-color: ${ACCENT_800};
  z-index: 110;
`;

const PlayIcon = styled(FlexBox)`
  top: 50%;
  left: 50%;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  transition: transform 200ms ease-in-out;
  transform: translate(-50%, -50%) scale(1);
  z-index: 200;

  svg {
    top: 50%;
    left: 50%;
    width: auto;
    height: 3rem;
    position: absolute;
    color: ${ACCENT_100};
    transform: translate(-45%, -45%);
    cursor: pointer;
  }

  @media only screen and (min-width: 769px) {
    :hover {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  @media only screen and (max-width: 768px) {
    top: 5.25rem;
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(255, 255, 255, 0.4);

    svg {
      width: auto;
      color: ${ACCENT_100};
      height: 1rem;
    }
  }
`;

const InfoContainer = styled(FlexBox)`
  align-items: flex-end;
  column-gap: 1.5rem;
  margin: 1.5rem 0 0 19rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 3.75rem auto 0;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const ContainerWrapper = styled(FlexBox)`
  width: 100%;
  padding-bottom: 2.5rem;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    background: unset;
  }
`;

const Container = styled(FlexBox)`
  z-index: 10;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    width: 86.67%;
    margin: auto;
    align-items: center;
    justify-content: center;
  }
`;

const InfoRow = styled(FlexBox)`
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;

  @media only screen and (max-width: 768px) {
    align-items: flex-start;
    row-gap: ${({ gapY }) => gapY};
    flex-direction: ${({ dir }) => dir};
  }
`;

const ButtonsFlex = styled(FlexBox)`
  flex-wrap: wrap;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
    column-gap: 1rem;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
  }
`;

const BookButton = styled(Button)`
  order: 1;

  @media only screen and (max-width: 768px) {
    order: 2;
    width: 80%;
  }
`;

const ShareIcon = styled(FlexBox)`
  order: 2;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 2px solid ${SECONDARY_800};

  @media only screen and (max-width: 768px) {
    order: 1;
  }
`;

const CopyPopup = styled.div`
  top: -3rem;
  width: 6rem;
  height: 1.9rem;
  position: absolute;
  pointer-events: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${WHITE};

  animation: ${CopiedAnimation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const CloseIconWrapper = styled(FlexBox)`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-color: ${WHITE};

  @media only screen and (max-width: 768px) {
    top: 0.75rem;
    right: 1rem;
  }
`;

const InfoTextWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const InfoText = styled(H3)`
  font-size: 1.25rem;
  text-align: left;

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const Video = styled.video`
  object-fit: contain;
`;

const Header = ({
  user,
  provider,
  sessions,
  providerData,
  providerType,
  handleCheckButton,
  videoPlaying,
  setVideoPlaying,
  sessionType = "single",
}) => {
  const router = useRouter();
  const isMobile = useMobileView();
  const isTflFlow = useSelector(state => state.tfl?.isTflFlow);
  const [videoSrc, setVideoSrc] = useState(null);
  const [showBackBtn, setShowBackBtn] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);

  const [virtualMode, setVirtualMode] = useState(true);
  const [b2BDismissed, setB2bDismissed] = useState(false);
  const [showB2BLimitModal, setShowB2BLimitModal] = useState(false);
  const [showB2BVerificationModal, setShowB2BVerificationModal] =
    useState(false);
  const [filteredUpcomingSessions, setFilteredUpcomingSessions] = useState([]);
  const [showCfInfoModal, setShowCfInfoModal] = useState(false);

  const isCfProvider = providerData?.roles?.includes(CF_PROVIDER_ROLE);
  const videoPlayerRef = useRef(null);

  const { source, origin, listingExperimentVariant, clinic_id } =
    router.query || {};

  const [video, setVideo] = useQueryParam(
    "video",
    withDefault(BooleanParam, false)
  );

  useEffect(() => {
    if (video && videoPlayerRef?.current) videoPlayerRef?.current?.play();
  }, [video]);

  const type = providerType?.toLowerCase();
  const flow = currentFlow(type, sessionType);
  const extractedSourceName = source?.replace?.("condition_", "");
  const extractedSource = mapping?.[extractedSourceName]
    ? `condition_${mapping[extractedSourceName]}`
    : source;
  const fullName = useMemo(() => {
    if (providerData?.uuid === "a9c7f59f-13ed-4e6e-a665-3ad7b601e722") {
      return "Dr Divya Ganesh Nallur";
    }
    return `${providerData?.firstname || ""} ${
      providerData?.lastname || ""
    }`.trim();
  }, [providerData?.uuid]);

  let payload = {
    flow,
    expt_variant: "new_page",
    [`${type}_name`]: fullName,
    [`${type}_uuid`]: providerData?.uuid,
    waitlisted: !providerData?.show_book_cta,
  };

  const today = new Date().setHours(0, 0, 0, 0);
  const videoThumbExists = !!providerData?.video_thumb;
  const isB2BClient = isVerifiedCorporateUser(user);
  const couponCarouselExperiment = useFeature("show-coupon-carousel");
  const isCouponCarouselApplicable =
    couponCarouselExperiment?.value &&
    providerType === PSYCHIATRIST &&
    !isB2BClient;

  const ProviderOfflineOffering = providerData?.offline_offering?.[0];
  const ProviderOnlineOffering = providerData?.online_offering;

  useEffect(() => {
    const showBackButton = router.query?.showBackButton;
    setShowBackBtn(
      window.Android ||
        window.ReactNativeWebView ||
        window.YouMatter ||
        showBackButton ||
        isTflFlow
    );
  });

  useEffect(() => {
    if (router.isReady) {
      profileLoadTracker();
      if (router?.query?.clinic_id) {
        setVirtualMode(router?.query?.default_mode === "online");
      }
    }
  }, [router.isReady]);

  const { scrollYProgress } = useViewportScroll();

  const elementOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const elementOpacityMobile = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const containerMaxHeight = isMobile ? "19rem" : "12rem";
  const parallaxOffset = useTransform(
    scrollYProgress,
    [0, 0.2],
    [containerMaxHeight, "0rem"]
  );
  const parallaxOffsetMobile = useTransform(
    scrollYProgress,
    [0, 0.1],
    [containerMaxHeight, "0rem"]
  );
  const parallaxOffsetFix = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0rem", "0rem"]
  );

  const checkDesignation = () => {
    let latestAffiliation;
    let designation;

    if (!!providerData?.affiliations?.length) {
      if (providerData?.affiliations?.length === 1) {
        latestAffiliation = providerData?.affiliations?.[0];
        if (
          latestAffiliation?.organisation?.toLowerCase().includes("amaha") ||
          latestAffiliation?.organisation?.toLowerCase().includes("innerhour")
        ) {
          designation = latestAffiliation?.designation;
        }
      } else {
        providerData?.affiliations?.forEach(affiliation => {
          if (
            affiliation?.organisation?.toLowerCase().includes("amaha") ||
            affiliation?.organisation?.toLowerCase().includes("innerhour")
          ) {
            designation = affiliation?.designation;
          }
        });
      }
    }

    return designation;
  };

  const handleBack = () => {
    const { platform, filter } = router.query;
    // If profile is directly opened from app, close webview on back press.
    if (platform === "android" || platform === "ios") {
      if (filter) {
        let filterValue = `${filter.charAt(0)}${filter.charAt(
          filter.length - 1
        )}`;
        router.replace(
          `/therapy-psychiatry?filter_for=${
            THERAPIST ? "t" : "p"
          }&filter_category=e&filter_value=${filterValue}`
        );
      } else {
        closeWebView();
        window.Android?.closeWebView();
        window.ReactNativeWebView?.postMessage("closeWebView");
      }
    } else {
      router.back();
    }
  };

  const shareProviderTracker = () => {
    trackEvent({
      event: "share_provider_cta_click",
      payload,
    });
  };

  const handleDesktopShare = () => {
    try {
      navigator?.clipboard
        ?.writeText(
          `Hey! I think you might be interested in checking ${fullName}'${
            !fullName?.endsWith("s") ? "s" : ""
          } profile on Amaha - ${window.location.href}`
        )
        ?.then(() => {
          setShowCopyPopup(prev => !prev);

          setTimeout(() => {
            setShowCopyPopup(prev => !prev);
          }, 3000);
        })
        .catch(err => Bugsnag.notify(err));
      shareProviderTracker();
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const handleMobileShare = async () => {
    const message = `Hey! I think you might be interested in checking ${fullName}'${
      !fullName?.endsWith("s") ? "s" : ""
    } profile on Amaha -`;

    shareProviderTracker();
    shareProvider("Share provider profile", ``, window.location.href);
    if (window.Android) {
      window.Android.shareProvider(
        "Share provider profile",
        message,
        window.location.href
      );
      return;
    }

    if (window.ReactNativeWebView) {
      const data = JSON.stringify({
        subject: "Share provider profile",
        message: message,
        url: window.location.href,
      });

      window.ReactNativeWebView.postMessage(`shareProvider,${data}`);
      return;
    }

    try {
      await navigator?.share?.({
        title: "Share provider profile",
        text: message,
        url: window.location.href,
      });
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const showB2BPopup = () => {
    if (
      !b2BDismissed &&
      user?.is_verified === false &&
      user?.usertype !== "patient"
    ) {
      trackEvent({ event: "b2b_resend_verification_pop_up_show" });
      setShowB2BVerificationModal(true);
      return true;
    }
    return false;
  };

  const profileLoadTracker = () => {
    if (listingExperimentVariant) {
      payload.flow = "therapy";
    }

    if (isCfProvider) {
      try {
        payload.is_cf_provider = "yes";
        const cfProfileAnalyticsData = JSON.parse(
          sessionStorage.getItem("cfProfileAnalyticsData")
        );
        if (cfProfileAnalyticsData) {
          payload = { ...payload, ...cfProfileAnalyticsData };
          sessionStorage.removeItem("cfProfileAnalyticsData");
        }
      } catch (err) {
        console.log({ err });
        Bugsnag.notify(err);
      }
    }

    trackEvent({
      event: "provider_profile_load",
      payload: {
        ...payload,
        variant: listingExperimentVariant || "null",
        source:
          payload?.source ||
          extractedSource ||
          storage.session.getItem("profileLoadSource"),
      },
    });
  };

  const bookingTracker = () => {
    const eventName =
      type === PSYCHIATRIST ? "psychiatrist_list_book" : "therapist_list_book";

    if (listingExperimentVariant) payload.variant = listingExperimentVariant;

    const eventPayload = {
      ...payload,
      source: "profile",
      expt_variant: "new_page",
    };

    trackEvent({
      event: eventName,
      payload: eventPayload,
    });

    if (!!window.Android) {
      window.Android.trackAppsFlyerEvent(
        eventName,
        JSON.stringify(eventPayload)
      );
    }

    if (!!window.ReactNativeWebView) {
      const iOSPayload = { eventName, eventPayload };
      const stringifiedPayload = JSON.stringify(iOSPayload);

      window.ReactNativeWebView.postMessage(
        `trackAppsFlyerEvent,${stringifiedPayload}`
      );
    }
  };

  const checkTwoSessionsAlreadyBookedCondition = () => {
    const { upcomingSessions } = sessions || {};
    const { providerType, providerProfile } = provider || {};

    const filteredSessions =
      upcomingSessions?.filter(
        session =>
          (providerType === COUPLE_THERAPIST
            ? session.bookingtype === "couple"
            : session.bookingtype !== "couple") &&
          session[`${type}_id`] === providerProfile?.id
      ) || [];
    setFilteredUpcomingSessions(filteredSessions);

    return filteredSessions.length === 2;
  };

  const bookAnyWayClick = () => {
    storage.local.setItem(`case3/understood/${today}/${user.uuid}`, "true");
    bookingTracker();
    if (origin === "package") {
      router.push(
        `/booking/${providerData.uuid}/${providerType}/${sessionType}?origin=package`
      );
    } else {
      router.push(
        `/booking/${providerData.uuid}/${providerType}/${sessionType}`
      );
    }
  };

  const providerFee = (() => {
    const isOfferingCouple =
      sessionType === "couple" &&
      (ProviderOnlineOffering?.couple?.offering_couple ||
        ProviderOfflineOffering?.couple?.offering_couple);

    let onlineDisplayText = isOfferingCouple
      ? ProviderOnlineOffering?.couple?.display_text
      : ProviderOnlineOffering?.display_text;
    let offlineDisplayText = isOfferingCouple
      ? ProviderOfflineOffering?.couple?.display_text
      : ProviderOfflineOffering?.display_text;

    let onlinePrice = parseInt(onlineDisplayText?.slice(1) ?? 0);
    let offlinePrice = parseInt(offlineDisplayText?.slice(1) ?? 0);

    const isOfferingOnline = providerData?.commercials?.medium?.length > 0;
    const isOfferingOffline = !!ProviderOfflineOffering;

    if (isOfferingOffline && isOfferingOnline) {
      return onlinePrice < offlinePrice
        ? onlineDisplayText
        : offlineDisplayText;
    }

    if (isOfferingOffline) {
      return offlineDisplayText;
    }

    return onlineDisplayText;
  })();

  const designation = useMemo(() => checkDesignation(), [providerData]);

  const handleVideoPlay = () => {
    setVideoPlaying(true);
    setVideo(true);
    if (!videoSrc) {
      trackEvent({
        event: "therapy_psychiatry_video_click",
        payload: { ...payload, source: "profile" },
      });
    }
  };

  const fixedEncodeURIComponent = str => {
    return encodeURI(str).replaceAll(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  };

  const toggleCfInfoModal = () => setShowCfInfoModal(prev => !prev);

  const handleCfExpertClick = e => {
    e.stopPropagation();
    toggleCfInfoModal();
  };

  return (
    <>
      {showCfInfoModal && <CfInfoModal onClose={toggleCfInfoModal} />}

      {!videoPlaying ? (
        <Wrapper
          providerImg={
            providerData?.video_thumb
              ? fixedEncodeURIComponent(providerData?.video_thumb)
              : "/assets/images/profile/no-video.png"
          }
        >
          {showB2BLimitModal && (
            <>
              <BtobBookingLimitBottomSheet
                description={`You already have two upcoming sessions. We recommended you finish atleast one of them before making further bookings.</br></br> Your ${provider.providerType} can help you decide when you would need the next session.`}
                toggleModal={() => setShowB2BLimitModal(!showB2BLimitModal)}
                onUnderstoodClick={() => {
                  storage.local.setItem(
                    `case3/understood/${today}/${user.uuid}`,
                    "true"
                  );
                }}
                ctaText="BOOK ANYWAY"
                onCtaClick={bookAnyWayClick}
              />
              <BtobBookingLimitModal
                sessions={filteredUpcomingSessions}
                description={`You already have two upcoming sessions. We recommended you finish atleast one of them before making further bookings.</br></br> Your ${provider.providerType} can help you decide when you would need the next session.`}
                toggleModal={() => setShowB2BLimitModal(!showB2BLimitModal)}
                onUnderstoodClick={() => {
                  storage.local.setItem(
                    `case3/understood/${today}/${user.uuid}`,
                    "true"
                  );
                }}
                ctaText={"BOOK ANYWAY"}
                onCtaClick={bookAnyWayClick}
              />
            </>
          )}
          {showB2BVerificationModal && (
            <BtoBVerificationModal
              togglePopup={() => {
                setB2bDismissed(true);
                setShowB2BVerificationModal(false);
              }}
              email={user.email}
            />
          )}

          <Gradient videoThumbExists={videoThumbExists}>
            {showBackBtn && (
              <BackIcon color={WHITE} size="2rem" onClick={handleBack} />
            )}
          </Gradient>
          <Overlay>
            {providerData?.video && (
              <PlayIcon onClick={handleVideoPlay}>
                <IoPlay />
              </PlayIcon>
            )}
          </Overlay>

          <ContainerWrapper
            videoThumbExists={videoThumbExists}
          ></ContainerWrapper>
        </Wrapper>
      ) : (
        <Wrapper animated={videoPlaying}>
          <CloseIconWrapper
            onClick={() => {
              setVideoPlaying(false);
              setVideo(false);
            }}
          >
            <FiX size="1rem" color={ACCENT_800} bold strokeWidth={3} />
          </CloseIconWrapper>
          <Video
            ref={videoPlayerRef}
            src={providerData?.video}
            width="100%"
            height="100%"
            playsInline
            autoplay
            controls
            disablePictureInPicture
            controlsList="nodownload noremoteplayback noplaybackrate"
          />
        </Wrapper>
      )}
      <BottomBar
        style={{
          maxHeight: videoPlaying
            ? parallaxOffsetFix
            : isMobile
            ? parallaxOffsetMobile
            : parallaxOffset,
        }}
      >
        <Container>
          <InfoContainer>
            <FlexBox width="100%" column rowGap="3rem">
              <InfoRow dir="column" gapY="1.5rem">
                <InfoTextWrapper
                  style={{
                    opacity: isMobile ? elementOpacityMobile : elementOpacity,
                  }}
                >
                  {isMobile && <H1 bold>{fullName}</H1>}
                  {isMobile && isCfProvider && (
                    <RenderCfTag onClick={handleCfExpertClick} />
                  )}
                  <InfoText bold>
                    {providerData?.educations
                      ?.map(edu => edu.degree)
                      ?.join(", ")}{" "}
                  </InfoText>
                  <InfoText bold>
                    {providerData?.experience?.year}+ years of experience
                  </InfoText>
                  {!isTflFlow && (
                    <InfoText bold>Starts at {providerFee}</InfoText>
                  )}
                </InfoTextWrapper>
                <ButtonsFlex>
                  <BookButton
                    onClick={handleCheckButton}
                    disabled={!providerData?.show_book_cta}
                  >
                    BOOK SESSION
                  </BookButton>
                  <ShareIcon
                    onClick={() => {
                      if (isMobile) handleMobileShare();
                      else handleDesktopShare();
                    }}
                  >
                    <FiShare2 size="1.5rem" color={SECONDARY_800} />
                    {showCopyPopup && (
                      <CopyPopup>
                        <Text>Link Copied!</Text>
                      </CopyPopup>
                    )}
                  </ShareIcon>
                </ButtonsFlex>
              </InfoRow>
            </FlexBox>
          </InfoContainer>
        </Container>
      </BottomBar>
    </>
  );
};

export default Header;
