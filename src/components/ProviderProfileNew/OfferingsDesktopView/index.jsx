import styled, { css } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import DomainAreaContainer from "./DomainAreaContainer";
import BottomSection from "../BottomSection";
import AvailabilitySection from "../AvailabilitySection";
import { ACCENT_800, BRICK_TERRACOTA, WHITE } from "@common/ui/colors";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";
import { RenderCfTag } from "../../ProfileCardNew";
import CfInfoModal from "../../common/CF/CfInfoModal";
import { CF_PROVIDER_ROLE } from "../../../constants";

const Wrapper = styled(FlexBox)`
  justify-content: center;
  background-color: ${BRICK_TERRACOTA};
  min-height: 180vh;
  border-top: 1px solid ${ACCENT_800};

  @media only screen and (max-width: 768px) {
    border-top: none;
    display: none;
  }
`;

const InnerWrapper = styled(FlexBox)`
  width: 83.35%;
  max-width: 75rem;
  flex-direction: column;
`;

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const LHS = styled(FlexBox)`
  width: 54%;
  max-width: 54%;
  height: 100%;
  overflow-y: scroll;
  margin-bottom: 5rem;
`;

const RHS = styled(FlexBox)`
  width: 40.5%;
  max-width: 40.5%;
  position: sticky;
  overflow-y: scroll;
  top: 2.5rem;
  right: 0;
`;

const AnimatedContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
  aspect-ratio: 4;
  position: relative;
  z-index: 10;

  ${({ sticky }) =>
    sticky &&
    css`
      padding: 2.5rem 0;
      background-color: ${BRICK_TERRACOTA};
    `}
`;

const AnimatedProfile = styled(FlexBox)`
  height: 100%;
  min-height: 5rem;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
  border: 0.25rem solid ${WHITE};
  box-sizing: border-box;

  img {
    min-width: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 768px) {
    top: 10rem;
    width: 15rem;
    height: 15.25rem;
    transform: translateX(-50%);
  }
`;

const Designation = styled(motion.div)`
  color: ${ACCENT_800};
`;

const FullName = styled(motion.div)`
  font-weight: 700;
`;

const NameAndCfTagContainer = styled(FlexBox)`
  gap: 1rem;
  align-items: center;
`;

const OfferingsDesktopView = ({
  sectionRef,
  providerData,
  providerType,
  videoPlaying,
  sessionType = "single",
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const [showCfInfoModal, setShowCfInfoModal] = useState(false);

  const isCfProvider = providerData?.roles?.includes(CF_PROVIDER_ROLE);

  const toggleCfInfoModal = () => setShowCfInfoModal(prev => !prev);

  const handleCfExpertClick = e => {
    e.stopPropagation();
    toggleCfInfoModal();
  };

  const elementScale = useTransform(
    scrollYProgress,
    [0, 0.19],
    ["17.625rem", "5rem"]
  );
  const fontColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    [WHITE, ACCENT_800]
  );

  const topPosFix = useTransform(scrollYProgress, [0, 0.2], [0, 0]);
  const titleSizeFix = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["2rem", "2rem"]
  );
  const textOpacityFix = useTransform(scrollYProgress, [0.09, 0.2], [0, 1]);
  const elementScaleFix = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["5rem", "5rem"]
  );
  const fontColorFix = useTransform(
    scrollYProgress,
    [0, 0.1],
    [ACCENT_800, ACCENT_800]
  );
  const topPosContainer = useTransform(
    scrollYProgress,
    [0, 0.19],
    ["-16rem", "3.5rem"]
  );
  const topPos = useTransform(scrollYProgress, [0, 0.2], ["-23rem", "2.5rem"]);
  const titleSize = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["2.5rem", "1.5rem"]
  );
  const textOpacity = useTransform(scrollYProgress, [0.09, 0.2], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(scrollYProgress.get() > 0.1899);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fullName = useMemo(() => {
    if (providerData?.uuid === "a9c7f59f-13ed-4e6e-a665-3ad7b601e722") {
      return "Dr Divya Ganesh Nallur";
    }
    return `${providerData?.firstname || ""} ${
      providerData?.lastname || ""
    }`.trim();
  }, [providerData?.uuid]);

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
      {showCfInfoModal && <CfInfoModal onClose={toggleCfInfoModal} />}
      <Wrapper>
        <div id="availability-section" ref={sectionRef} />
        <InnerWrapper>
          <AnimatedContainer
            sticky={videoPlaying}
            style={{
              top: videoPlaying ? topPosFix : topPos,
              height: videoPlaying ? elementScaleFix : elementScale,
              transformOrigin: "left center",
            }}
          >
            <AnimatedProfile>
              <img
                alt={fullName}
                draggable="false"
                src={"https:" + providerData.image}
              />
            </AnimatedProfile>
            <FlexBox column rowGap="0.5rem">
              <NameAndCfTagContainer width="100%">
                <FullName
                  style={{
                    fontSize: videoPlaying ? titleSizeFix : titleSize,
                    color:
                      videoPlaying || !providerData?.video_thumb
                        ? fontColorFix
                        : fontColor,
                  }}
                >
                  {fullName}
                </FullName>
                {isCfProvider && <RenderCfTag onClick={handleCfExpertClick} />}
              </NameAndCfTagContainer>
              <Designation
                style={{ opacity: videoPlaying ? textOpacityFix : textOpacity }}
              >
                {!!providerData?.registration_number
                  ? `Reg. No.: ${providerData?.registration_number}`
                  : designation}
              </Designation>
            </FlexBox>
          </AnimatedContainer>
          <Container
            sticky={isSticky}
            style={{
              top: videoPlaying ? topPosFix : topPosContainer,
            }}
          >
            <LHS>
              <FlexBox width="100%" column rowGap="3rem">
                <DomainAreaContainer
                  providerData={providerData}
                  providerType={providerType}
                  sessionType={sessionType}
                />
                <BottomSection
                  providerData={providerData}
                  providerType={providerType}
                  sessionType={sessionType}
                />
              </FlexBox>
            </LHS>
            <RHS sticky={isSticky}>
              <AvailabilitySection
                providerData={providerData}
                providerType={providerType}
                sessionType={sessionType}
              />
            </RHS>
          </Container>
        </InnerWrapper>
      </Wrapper>
    </>
  );
};

export default OfferingsDesktopView;
