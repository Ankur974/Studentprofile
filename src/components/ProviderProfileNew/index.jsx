import { useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { FlexBox } from "@common/FlexBox";

import Header from "./Header";
import OfferingsMobileView from "./OfferingsMobileView";
import OfferingsDesktopView from "./OfferingsDesktopView";

import {
  fetchCompletedSessions,
  fetchUpcomingSessions,
} from "@redux/actions/sessionsActions";
import { ACCENT_400 } from "@constants/colors";
import { trackEvent, currentFlow } from "@utils/helpers";
import { PSYCHIATRIST, THERAPIST } from "@constants";

const Wrapper = styled(FlexBox)`
  flex-direction: column;

  .divider {
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid ${ACCENT_400};
  }
`;

const ProviderProfileNew = ({
  providerData,
  providerType,
  sessionType = "single",
}) => {
  const [initialTab, setInitialTab] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const dispatch = useDispatch();
  const availabilityRefMobile = useRef(null);
  const availabilityRefDesktop = useRef(null);
  const user = useSelector(state => state.auth?.user);
  const provider = useSelector(state => state?.provider);
  const type =
    providerType?.toLowerCase() === PSYCHIATRIST ? PSYCHIATRIST : THERAPIST;
  const sessions = useSelector(state => state?.sessions);
  const flow = currentFlow(type, sessionType);
  const fullName = useMemo(() => {
    if (providerData?.uuid === "a9c7f59f-13ed-4e6e-a665-3ad7b601e722") {
      return "Dr Divya Ganesh Nallur";
    }
    return `${providerData?.firstname || ""} ${
      providerData?.lastname || ""
    }`.trim();
  }, [providerData?.uuid]);
  const payload = {
    flow,
    [`${type}_name`]: fullName,
    [`${type}_uuid`]: providerData.uuid,
    expt_variant: "new_page",
  };

  useEffect(() => {
    if (!!user) {
      dispatch(fetchUpcomingSessions());
      dispatch(fetchCompletedSessions());
    }
  }, [user]);

  const handleCheckButton = () => {
    setInitialTab("availability");
    setTimeout(() => {
      availabilityRefDesktop?.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
      availabilityRefMobile?.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }, 100);
    trackEvent({
      event: "therapy_psychiatry_check_slots",
      payload: payload,
    });
  };

  return (
    <Wrapper>
      <FlexBox column>
        <Header
          user={user}
          provider={provider}
          sessions={sessions}
          sessionType={sessionType}
          providerData={providerData}
          providerType={providerType}
          handleCheckButton={handleCheckButton}
          videoPlaying={videoPlaying}
          setVideoPlaying={setVideoPlaying}
        />
      </FlexBox>
      <OfferingsMobileView
        sectionRef={availabilityRefMobile}
        providerData={providerData}
        providerType={providerType}
        sessionType={sessionType}
        initialTab={initialTab}
        setInitialTab={setInitialTab}
        videoPlaying={videoPlaying}
        setVideoPlaying={setVideoPlaying}
        handleCheckButton={handleCheckButton}
      />
      <OfferingsDesktopView
        videoPlaying={videoPlaying}
        setVideoPlaying={setVideoPlaying}
        sectionRef={availabilityRefDesktop}
        providerData={providerData}
        providerType={providerType}
        sessionType={sessionType}
      />
    </Wrapper>
  );
};

export default ProviderProfileNew;
