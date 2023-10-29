import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import {
  ACCENT_500,
  ACCENT_800,
  BRICK_TERRACOTA,
  SECONDARY_800,
  WHITE,
} from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import DomainAreaMobile from "./DomainAreaMobile";
import AvailabilitySection from "../AvailabilitySection";
import { trackEvent, currentFlow } from "@utils/helpers";
import BottomSection from "../BottomSection";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { Button } from "@common/Buttons";

const Wrapper = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: ${props => props?.bgColor};
  }
`;

const TabsWrapper = styled.div`
  width: 100%;
  background-color: ${props => props?.bgColor};
  border-bottom: 2px solid ${ACCENT_500};
  z-index: 20;
`;

const Tabs = styled.div`
  gap: 1.5rem;
  margin: auto;
  display: flex;
  width: 86.67%;
  justify-content: space-between;
`;

const TabTitle = styled.div`
  width: 100%;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  padding: 0.75rem 1rem 1rem;
  color: ${props => (props.selected ? SECONDARY_800 : ACCENT_800)};
  border-bottom: ${props => props.selected && "2px solid" + SECONDARY_800};
  margin-bottom: -2px;
`;

const DetailsTabSection = styled(FlexBox)`
  width: 85%;
  padding-top: 2.5rem;
  margin: auto;
  gap: 2.5rem;
  margin-bottom: 2.5rem;

  ${({ display }) =>
    !display &&
    css`
      display: none;
    `}
`;

const AvailabilityTabSection = styled.div`
  width: 86.67%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;
  margin: 2.5rem auto 1rem;
  border-radius: 0.75rem;
  ${({ display }) =>
    !display &&
    css`
      display: none;
    `}
`;

const AnimatedProfile = styled(motion.div)`
  display: flex;
  width: 7.5rem;
  position: absolute;
  z-index: 300;

  img {
    overflow: hidden;
    border-radius: 50%;
    aspect-ratio: 1;
    min-width: 100%;
    object-fit: cover;
    border: 0.25rem solid ${WHITE};
    box-sizing: border-box;
  }
`;

const Designation = styled(motion.div)`
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: ${ACCENT_800};
  font-weight: 500;
`;

const TitleContainer = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.25rem;
  height: 6.5rem;
  background-color: ${props => props?.bgColor};
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 700;
  padding-left: 6rem;
`;

const FullName = styled(motion.div)`
  color: ${ACCENT_800};
  font-weight: 700;
`;

const OutlineBtn = styled(Button)`
  margin: 2.5rem auto;
  width: 100%;
`;

const OfferingsMobileView = ({
  sectionRef,
  providerData,
  providerType,
  initialTab,
  setInitialTab,
  videoPlaying,
  sessionType = "single",
  handleCheckButton,
}) => {
  const [viewTab, setViewTab] = useState(initialTab || "details");
  const [isSticky, setIsSticky] = useState(false);

  const { scrollYProgress } = useViewportScroll();

  const elementScaleFix = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["3.5rem", "3.5rem"]
  );
  const elementScale = useTransform(
    scrollYProgress,
    [0, 0.0785],
    ["7.5rem", "3.5rem"]
  );
  const elementShiftFix = useTransform(
    scrollYProgress,
    [0, 0.0785],
    ["6%", "6%"]
  );
  const elementShift = useTransform(
    scrollYProgress,
    [0, 0.0785],
    ["35%", "6%"]
  );
  const topPos = useTransform(
    scrollYProgress,
    [0, 0.0785],
    ["-23rem", "1.5rem"]
  );
  const textOpacityFix = useTransform(scrollYProgress, [0, 0.0785], [1, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.0785], [0, 1]);
  const topPosFix = useTransform(scrollYProgress, [0, 1], ["1.5rem", "1.5rem"]);
  const textContainerHeightFix = useTransform(
    scrollYProgress,
    [0, 0.0785],
    ["6.5rem", "6.5rem"]
  );

  const textContainerHeight = useTransform(
    scrollYProgress,
    [0, 0.0785],
    ["0.5rem", "6.5rem"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(scrollYProgress.get() > 0.0785);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const type = providerType?.toLowerCase();
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
    [`${type}_uuid`]: providerData?.uuid,
    expt_variant: "new_page",
  };

  const handleViewTab = tabString => {
    if (tabString === "availability") {
      trackEvent({
        event: "therapy_psychiatry_check_slots",
        payload: payload,
      });
    }
    setViewTab(tabString);
  };

  const handeDetailsTab = () => {
    trackEvent({
      event: "therapy_psychiatry_close_slots",
      payload,
    });
    setInitialTab(null);
    handleViewTab("details");
  };

  useEffect(() => {
    if (initialTab) {
      setViewTab(initialTab);
    }
  }, [initialTab]);

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

  const designation = useMemo(() => checkDesignation(), [providerData]);

  return (
    <>
      <div id="availability-section" ref={sectionRef} />
      <Wrapper bgColor={viewTab === "details" ? BRICK_TERRACOTA : WHITE}>
        <AnimatedProfile
          bgColor={viewTab === "details" ? BRICK_TERRACOTA : WHITE}
          sticky={isSticky}
          style={{
            width: videoPlaying ? elementScaleFix : elementScale,
            top: videoPlaying ? topPosFix : topPos,
            left: videoPlaying ? elementShiftFix : elementShift,
            transformOrigin: "left center",
          }}
        >
          <img
            alt={fullName}
            draggable="false"
            src={"https:" + providerData.image}
          />
        </AnimatedProfile>
        <TitleContainer
          bgColor={viewTab === "details" ? BRICK_TERRACOTA : WHITE}
          style={{
            maxHeight: videoPlaying
              ? textContainerHeightFix
              : textContainerHeight,
          }}
        >
          <FullName
            style={{
              opacity: videoPlaying ? textOpacityFix : textOpacity,
            }}
          >
            {fullName}
          </FullName>
          <Designation
            style={{ opacity: videoPlaying ? textOpacityFix : textOpacity }}
          >
            {!!providerData?.registration_number
              ? `Reg. No.: ${providerData?.registration_number}`
              : designation}
          </Designation>
        </TitleContainer>
        <TabsWrapper
          sticky={isSticky}
          bgColor={viewTab === "details" ? BRICK_TERRACOTA : WHITE}
        >
          <Tabs>
            <TabTitle
              onClick={handeDetailsTab}
              selected={viewTab === "details"}
            >
              Information
            </TabTitle>
            <TabTitle
              onClick={() => handleViewTab("availability")}
              selected={viewTab === "availability"}
            >
              Availability
            </TabTitle>
          </Tabs>
        </TabsWrapper>
        <DetailsTabSection display={viewTab === "details"}>
          <DomainAreaMobile
            providerData={providerData}
            providerType={providerType}
            sessionType={sessionType}
          />
          <BottomSection
            providerData={providerData}
            providerType={providerType}
            sessionType={sessionType}
          />
          <OutlineBtn outline onClick={handleCheckButton}>
            CHECK AVAILABILITY
          </OutlineBtn>
        </DetailsTabSection>
        <AvailabilityTabSection display={viewTab === "availability"}>
          <AvailabilitySection
            providerData={providerData}
            providerType={providerType}
            sessionType={sessionType}
          />
        </AvailabilityTabSection>
      </Wrapper>
    </>
  );
};

export default OfferingsMobileView;
