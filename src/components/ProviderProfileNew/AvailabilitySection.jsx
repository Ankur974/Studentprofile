import isEmpty from "lodash/isEmpty";
import React, { useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { FlexBox } from "@common/FlexBox";
import { FaClinicMedical } from "react-icons/fa";
import {
  ACCENT_400,
  ACCENT_500,
  ACCENT_800,
  SECONDARY_800,
  WHITE,
  DAVYS_GRAY_400,
} from "@constants/colors";
import { THERAPIST, PSYCHIATRIST } from "@constants";
import { useSelector } from "react-redux";
import {
  FiPhone,
  FiMapPin,
  FiVideo,
  FiChevronLeft,
  FiChevronRight,
  FiMessageCircle,
} from "react-icons/fi";
import { clinics } from "@metadata/therapyPsychiatry/clinics";
import Carousel from "react-multi-carousel";
import { useRouter } from "next/router";
import PickAvailableSlot from "./PickAvailableSlot";
import {
  trackEvent,
  currentFlow,
  isVerifiedCorporateUser,
} from "@utils/helpers";
import * as storage from "@utils/storageFactory";
import { CF_PROVIDER_ROLE } from "../../constants";
import { PRIMARY_500 } from "../../constants/colors";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-sizing: border-box;
  background-color: ${WHITE};
  margin-bottom: 5rem;
  height: 90vh;
  overflow-y: scroll;

  @media only screen and (max-width: 768px) {
    padding: 0;
    height: 100%;
  }
`;

const Title = styled.div`
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 700;
  color: ${ACCENT_800};

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const SessionModes = styled(FlexBox)`
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const SessionTab = styled(FlexBox)`
  cursor: pointer;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 0.75rem;
  color: ${props => (props.selected ? "white" : ACCENT_800)};
  border: ${props =>
    props.selected ? "1px solid " + SECONDARY_800 : "1px solid " + ACCENT_400};
  background-color: ${props => props.selected && SECONDARY_800};
  white-space: nowrap;
  justify-content: center;
  max-width: 5.5rem;

  @media only screen and (max-width: 768px) {
    font-size: 0.625rem;
  }
`;

const OfflineInfo = styled(FlexBox)`
  width: 100%;
`;

const AddressHeader = styled.span`
  font-weight: 700;
  line-height: 1.25rem;
  color: ${ACCENT_800};
`;

const OfflineAddress = styled(FlexBox)`
  font-size: 0.813rem;
  line-height: 1.25rem;
`;

const SwitchView = styled(FlexBox)`
  padding-block: 0.7rem;
  font-size: 0.8rem;
  padding-inline: 0.6rem;
  font-weight: 700;
  color: ${ACCENT_800};
  border: 1px solid ${ACCENT_500};
  border-radius: 0.75rem;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    padding: 0.6rem;
  }
`;

const ImageCarousalContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto 2.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 11.25rem;
  object-fit: cover;
  border-radius: 0.75rem;
`;

const CarouselNav = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  z-index: 10;
  bottom: -2.5rem;
  justify-content: space-between;
`;

const ArrowIcon = styled(FlexBox)`
  height: 2rem;
  width: 2rem;
  z-index: 100;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid ${DAVYS_GRAY_400};

  svg {
    color: ${ACCENT_800};
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: not-allowed;
      border: 1px solid ${DAVYS_GRAY_400};

      svg {
        color: ${DAVYS_GRAY_400};
      }
    `}
`;

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid ${DAVYS_GRAY_400};
  flex: 1;
`;

const Dots = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  background-color: ${ACCENT_500};
  border-radius: 2rem;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${ACCENT_800};
      width: 1rem;
    `}
`;

const MulticenterChipContainer = styled(FlexBox)`
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const CenterChip = styled(FlexBox)`
  padding: 0.5rem 1rem;
  border: ${props => `2px solid ${props.selected ? PRIMARY_500 : ACCENT_500}`};
  font-size: 14px;
  cursor: pointer;
  border-radius: 0.5rem;
  color: ${ACCENT_800};
`;

const ButtonGroup = ({ next, previous, payload, ...rest }) => {
  const { carouselState } = rest;
  const { currentSlide, totalItems, slidesToShow } = carouselState;
  const isPreviousDisabled = currentSlide === 0;
  const isNextDisabled =
    totalItems - slidesToShow === currentSlide ||
    totalItems - slidesToShow <= 0;

  const handePrevious = () => {
    trackEvent({
      event: "therapy_psychiatry_image_center_scroll",
      payload: {
        ...payload,
        view: "profile_section",
      },
    });
    previous();
  };

  const handleNext = () => {
    trackEvent({
      event: "therapy_psychiatry_image_center_scroll",
      payload: {
        ...payload,
        view: "profile_section",
      },
    });
    next();
  };

  return (
    <CarouselNav>
      <ArrowIcon onClick={handePrevious} isDisabled={isPreviousDisabled}>
        <FiChevronLeft fontSize="1.25rem" />
      </ArrowIcon>
      <FlexBox align="center" justify="center" columnGap="0.25rem">
        {[...Array(totalItems)]?.map((val, index) => {
          return <Dots isActive={index === currentSlide} />;
        })}
      </FlexBox>
      <ArrowIcon onClick={handleNext} isDisabled={isNextDisabled}>
        <FiChevronRight fontSize="1.25rem" />
      </ArrowIcon>
    </CarouselNav>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 768 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const sessionModeItems = {
  "in-person": {
    name: "In-Person",
    bookingSlug: "offline",
    bookingType: "offline",
    icon: <FaClinicMedical size={18} />,
  },
  live: {
    name: "Video",
    bookingSlug: "live",
    bookingType: "online",
    icon: <FiVideo size={18} />,
  },
  voice: {
    name: "Call",
    bookingSlug: "voice",
    bookingType: "online",
    icon: <FiPhone size={18} />,
  },
  chat: {
    name: "Chat",
    bookingSlug: "chat",
    bookingType: "online",
    icon: <FiMessageCircle size={18} />,
  },
};

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

const AvailabilitySection = ({
  providerData,
  providerType,
  sessionType = "single",
}) => {
  const bookingData = JSON.parse(storage.session.getItem("bookingData"));
  const isSameProvider = bookingData?.providerUuid === providerData?.uuid;
  const [scroll, setScroll] = useState(false);

  //used for multiple center offering for CF provider
  const [offlineOffering, setOfflineOffering] = useState([]);

  const [sessionMode, setSessionMode] = useState(() => {
    if (!!bookingData?.mode && isSameProvider) {
      if (bookingData?.mode !== "offline") {
        return sessionModeItems?.[bookingData?.mode];
      }
      return sessionModeItems["in-person"];
    }
    return {};
  });
  const [providerSessionModes, setProviderSessionModes] = useState([]);
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);

  const isCfProvider = providerData?.roles?.includes(CF_PROVIDER_ROLE);

  const user = useSelector(state => state.auth?.user);
  const appVisibility = useSelector(state => state.appConfig.appVisibility);
  const isTflFlow = useSelector(state => state.tfl?.isTflFlow);

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

  const route = useRouter();
  const isCoupleTherapist = route?.query?.sessionType === "couple";

  const offlineForB2b = {
    [THERAPIST]: appVisibility?.isTherapyOfferedOffline,
    [PSYCHIATRIST]: appVisibility?.isPsychiatryOfferedOffline,
  };

  const isB2bUser = isVerifiedCorporateUser(user);

  const clinicDetails = offlineOffering?.clinic || {};
  const foundClinic = clinics.find(clinic => clinic.id === clinicDetails?.id);
  const centreGallery = foundClinic?.images || [];
  const clinicImagesAvailable = centreGallery.length > 0;

  const sessionModes = providerData?.commercials?.medium?.map(
    sessionMode => sessionModeItems[sessionMode]
  );

  useEffect(() => {
    if (providerData) {
      let sessions = [...sessionModes];
      const offlineOffering = (function () {
        if (isTflFlow) return null;

        const offline = providerData?.offline_offering;
        if (
          !isCoupleTherapist ||
          (isCoupleTherapist && offline?.[0]?.couple?.offering_couple)
        ) {
          return offline;
        }
        return null;
      })();
      const isOfflineOffering = !!offlineOffering?.length;
      const chatFiltered = sessionModes?.filter(
        medium => medium.name !== "Chat"
      );

      if (isB2bUser) {
        const isB2bOfflineOffering =
          isOfflineOffering && offlineForB2b[providerType];
        if (isCoupleTherapist) {
          sessions = isB2bOfflineOffering
            ? [sessionModeItems["in-person"], sessionModeItems["live"]]
            : [sessionModeItems["live"]];
        } else if (providerType === PSYCHIATRIST) {
          sessions = isB2bOfflineOffering
            ? [sessionModeItems["in-person"], ...chatFiltered]
            : chatFiltered;
        } else if (isB2bOfflineOffering) {
          sessions = [sessionModeItems["in-person"], ...sessionModes];
        }
      } else {
        if (isCoupleTherapist) {
          sessions = isOfflineOffering
            ? providerData?.commercials?.medium?.length > 0
              ? [sessionModeItems["in-person"], sessionModeItems["live"]]
              : [sessionModeItems["in-person"]]
            : [sessionModeItems["live"]];
        } else if (providerType === PSYCHIATRIST) {
          sessions = isOfflineOffering
            ? [sessionModeItems["in-person"], ...chatFiltered]
            : chatFiltered;
        } else if (isOfflineOffering) {
          sessions = [sessionModeItems["in-person"], ...sessionModes];
        }
      }
      sessions.sort((a, b) => {
        return (
          Object.values(sessionModeItems).indexOf(a) -
          Object.values(sessionModeItems).indexOf(b)
        );
      });
      setProviderSessionModes(sessions);
      if (sessions?.length > 0) setSessionMode(sessions[0]);
    }
  }, [providerData]);

  const handleSessionMode = session => {
    trackEvent({
      event: "therapy_psychiatry_mode_click",
      payload: {
        ...payload,
        mode_clicked: session?.name,
        view: "profile_section",
      },
    });
    setSessionMode(session);
  };

  const handleMapClick = () => {
    trackEvent({
      event: "therapy_psychiatry_map_view",
      payload: {
        ...payload,
        view: "profile_section",
      },
    });
    window.open(
      `https://maps.google.com/maps?q=${clinicDetails?.geo_lat},${clinicDetails?.geo_long}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
      "_blank"
    );
  };

  const handleScrollEvent = () => {
    if (!scroll) {
      trackEvent({
        event: "therapy_psychiatry_image_center_scroll",
        payload: {
          ...payload,
          view: "profile_section",
        },
      });
      setScroll(true);
    }
    setTimeout(() => {
      setScroll(false);
    }, 4000);
  };

  useEffect(() => {
    if (!!providerSessionModes.length && isEmpty(sessionMode))
      setSessionMode(providerSessionModes[0]);
  }, []);

  useEffect(() => {
    if (sessionMode.name === "In-Person") {
      setShowPlaceInfo(true);
    } else {
      setShowPlaceInfo(false);
    }
  }, [sessionMode]);

  useEffect(() => {
    // initially setting first clinic ID in array
    setOfflineOffering(providerData?.offline_offering?.[0]);
  }, [providerData]);

  return (
    <Container column rowGap="2.5rem">
      <FlexBox column rowGap="1.5rem">
        <WithDivider>
          <Title>
            {providerData?.firstname + " " + providerData?.lastname} is
            available on
          </Title>
        </WithDivider>
        <SessionModes columnGap="1rem">
          {providerSessionModes?.map((item, index) => {
            return (
              <SessionTab
                selected={sessionMode.name === item.name}
                onClick={() => handleSessionMode(item)}
                columnGap={"0.5rem"}
                align="center"
                key={index}
              >
                {item.icon}
                {item.name}
              </SessionTab>
            );
          })}
        </SessionModes>
        {showPlaceInfo && (
          <>
            {isCfProvider && (
              <MulticenterChipContainer>
                {providerData?.offline_offering?.map(item => (
                  <CenterChip
                    onClick={() => setOfflineOffering(item)}
                    selected={item?.clinic?.id === offlineOffering?.clinic?.id}
                  >
                    {item?.clinic.short_name}
                  </CenterChip>
                ))}
              </MulticenterChipContainer>
            )}
            <OfflineInfo align="center" justify="space-between">
              <OfflineAddress column>
                <AddressHeader>{offlineOffering?.clinic?.name}</AddressHeader>
                {offlineOffering?.clinic?.address_line_1},{" "}
                {offlineOffering?.clinic?.location?.city}
                <AddressHeader>
                  {offlineOffering?.clinic?.location?.city} centre{" "}
                  {offlineOffering?.clinic?.landline_no}
                </AddressHeader>
              </OfflineAddress>
              {showPlaceInfo && (
                <SwitchView onClick={handleMapClick} columnGap="0.4rem">
                  <FiMapPin color={SECONDARY_800} size={24} />
                </SwitchView>
              )}
            </OfflineInfo>
          </>
        )}
        {showPlaceInfo && !!clinicImagesAvailable && (
          <>
            <ImageCarousalContainer>
              <Carousel
                partialVisible
                responsive={responsive}
                autoplay={false}
                arrows={false}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup payload={payload} />}
                shouldResetAutoplay={false}
                draggable={false}
                swipeable={false}
              >
                {centreGallery.map((src, index) => (
                  <Image src={src} key={index} />
                ))}
              </Carousel>
            </ImageCarousalContainer>
          </>
        )}
      </FlexBox>
      <PickAvailableSlot
        sessionMode={sessionMode}
        providerData={providerData}
        providerType={providerType}
        clinicId={offlineOffering?.clinic?.id} //used in making API calls in multiple center case if CF provider
      />
    </Container>
  );
};

export default AvailabilitySection;
