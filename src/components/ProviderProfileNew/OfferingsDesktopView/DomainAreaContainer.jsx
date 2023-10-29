import React, { useMemo, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_800,
  SECONDARY_100,
  SECONDARY_400,
  SECONDARY_700,
  SECONDARY_800,
  WHITE,
} from "@common/ui/colors";
import { PSYCHIATRIST } from "@constants";
import SelectedMethodModal from "../SelectedMethodModal";
import { domainareas_images } from "@metadata/domainareas_images";
import { trackEvent, currentFlow } from "@utils/helpers";
import { H4 } from "../../common/Headings";
import ProviderSummary from "../ProviderSummary";
import { Text } from "@common/Text";
import { RenderCfInfoCarousel } from "../BottomSection";
import { CF_PROVIDER_ROLE } from "@constants";

const Container = styled(FlexBox)`
  width: 100%;
`;

const Header = styled(FlexBox)``;

const Title = styled.span`
  color: ${ACCENT_800};
  font-weight: 700;
  font-size: ${props => props.titleSize || "0.875rem"};
  line-height: ${props => props.lineHeight || "1.5rem"};
`;

const Body = styled.div`
  color: ${ACCENT_800};
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5rem;
`;

const DomainCarousal = styled(FlexBox)`
  width: 100%;
  border-bottom: 1px solid #efefef;
`;

const CarouselBody = styled.div`
  width: 85%;
  height: fit-content;
  margin: 1.5rem 0 0 2rem;
  position: relative;

  .react-multi-carousel-item {
    align-items: flex-start;
  }
`;

const OfferingBox = styled(FlexBox)`
  height: fit-content;
`;

const OfferingVisual = styled.img`
  width: 4.5rem;
  border-radius: 0.75rem;
`;

const OfferingText = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${ACCENT_800};
  text-align: center;
`;

const TreatmentMethods = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  gap: 1.5rem;
`;

const MethodCapsule = styled.div`
  font-size: 0.875rem;
  line-height: 24px;
  font-weight: 700;
  color: ${SECONDARY_700};
  background-color: ${WHITE};
  border-radius: 0.75rem;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid ${SECONDARY_400};
`;

const Languages = styled.div`
  width: 45%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Expertise = styled.div`
  width: 45%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Affiliations = styled(FlexBox)`
  width: 100%;
  gap: 1rem;
  flex-direction: column;
`;

const CarouselNav = styled.div`
  width: 110%;
  transform: translate(-5%, -50%);
  display: flex;
  position: absolute;
  z-index: 20;
  top: 40%;
  justify-content: space-between;
  cursor: pointer;
`;

const ArrowIcon = styled(FlexBox)`
  height: 1.75rem;
  width: 1.75rem;
  z-index: 100;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${SECONDARY_800};
  cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
  background-color: ${props => props.isDisabled && SECONDARY_100};
`;

const Dot = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 1rem;
  background-color: ${ACCENT_800};
  margin-left: 1rem;
`;

const Thought = styled(FlexBox)`
  padding: 0.75rem;
  column-gap: 0.75rem;
  border-radius: 0.75rem;
  align-items: flex-start;
  width: max-content;
  background-color: ${WHITE};

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ButtonGroup = ({ next, previous, ...rest }) => {
  const { carouselState } = rest;
  const { currentSlide, totalItems, slidesToShow } = carouselState;
  const isPreviousDisabled = currentSlide === 0;
  const isNextDisabled =
    totalItems - slidesToShow === currentSlide ||
    totalItems - slidesToShow <= 0;

  return (
    <CarouselNav>
      <ArrowIcon onClick={previous} isDisabled={isPreviousDisabled}>
        <FiChevronLeft color={WHITE} fontSize="1.25rem" />
      </ArrowIcon>
      <ArrowIcon onClick={next} isDisabled={isNextDisabled}>
        <FiChevronRight fontSize="1.25rem" color={WHITE} />
      </ArrowIcon>
    </CarouselNav>
  );
};

const DomainAreaContainer = ({
  providerType,
  providerData,
  sessionType = "single",
}) => {
  const [modal, setModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

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

  const isCfProvider = providerData?.roles?.includes(CF_PROVIDER_ROLE);

  const toggleModal = () => setModal(!modal);

  const selectMethod = method => {
    setSelectedMethod(method);
    trackEvent({
      event: "therapy_psychiatry_approach_click",
      payload: {
        ...payload,
        approach_viewed: method.name,
      },
    });
    toggleModal();
  };

  const responsive = {
    desktopLg: {
      breakpoint: { max: 4000, min: 1150 },
      items: 5,
      slidesToSlide: 1,
      partialVisibilityGutter: 10,
    },
    desktopMd: {
      breakpoint: { max: 1149, min: 921 },
      items: 4,
      slidesToSlide: 1,
      partialVisibilityGutter: 10,
    },
    desktopSm: {
      breakpoint: { max: 920, min: 768 },
      items: 3,
      slidesToSlide: 1,
      partialVisibilityGutter: 10,
    },
  };

  const RenderThought = ({ thought }) => (
    <Thought>
      <img
        alt="Quote"
        draggable={false}
        src="https://cdn.theinnerhour.com/assets/images/comma.svg"
      />
      <Text bold fontSize="0.875rem" lineHeight="1.5" whiteSpace="nowrap">
        {thought?.replaceAll('"', "")}
      </Text>
    </Thought>
  );

  return (
    <Container rowGap="3rem" column>
      {modal && (
        <SelectedMethodModal
          selectedMethod={selectedMethod}
          toggleModal={toggleModal}
        />
      )}
      <ProviderSummary
        sessionType={sessionType}
        providerData={providerData}
        providerType={providerType}
      />
      {providerData?.user_phrases?.length > 0 && (
        <FlexBox column rowGap="1.5rem">
          <FlexBox align="center" columnGap="0.5rem">
            <img
              src="/assets/images/profile/concerns.svg"
              height="48px"
              width="48px"
            />
            <Title titleSize="1.25rem">Concerns my clients have</Title>
          </FlexBox>
          <FlexBox width="100%" wrap="wrap" columnGap="1rem" rowGap="1rem">
            {providerData?.user_phrases?.map(thought => (
              <RenderThought key={thought} thought={thought} />
            ))}
          </FlexBox>
        </FlexBox>
      )}
      <DomainCarousal column justify="center">
        <FlexBox align="center" columnGap="0.5rem">
          <img
            src="/assets/images/profile/domains-icon.svg"
            height="48px"
            width="48px"
          />
          <Title titleSize="1.25rem">
            I offer {providerType === PSYCHIATRIST ? "psychiatry" : "therapy"}{" "}
            for
          </Title>
        </FlexBox>
        <CarouselBody>
          <Carousel
            partialVisible
            responsive={responsive}
            autoplay={false}
            arrows={false}
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}
            shouldResetAutoplay={false}
            draggable={false}
            swipeable={false}
          >
            {providerData?.domainareas?.map((item, index) => {
              const imageIndex = domainareas_images.findIndex(
                image => image.slug === item.slug
              );
              if (imageIndex > -1)
                return (
                  <OfferingBox
                    key={index}
                    align="center"
                    column
                    rowGap="1rem"
                    justify="start"
                  >
                    <OfferingVisual
                      src={domainareas_images[imageIndex]?.image_path}
                    />
                    <OfferingText>
                      {domainareas_images[index]?.slug ===
                      "bipolar-affective-disorder"
                        ? domainareas_images[index].name
                            .split(" ")
                            .map((text, id) => (
                              <div key={`${id}text`} textAlign="center">
                                {text}
                              </div>
                            ))
                        : item.name}
                    </OfferingText>
                  </OfferingBox>
                );
            })}
          </Carousel>
        </CarouselBody>
      </DomainCarousal>
      {isCfProvider && <RenderCfInfoCarousel />}
      {providerData?.treatment_areas.length > 0 && (
        <TreatmentMethods>
          <Header align="center" columnGap="0.5rem">
            <img
              src="/assets/images/profile/treatment-methods.svg"
              height="48px"
              width="48px"
            />
            <Title titleSize="1.25rem" lineHeight="2rem">
              I specialise in
            </Title>
          </Header>
          <Body>
            {providerData?.treatment_areas?.length > 0 && (
              <FlexBox
                wrap="wrap"
                columnGap="1rem"
                rowGap="1rem"
                align="center"
              >
                {providerData?.treatment_areas?.map((method, index) => {
                  return (
                    <MethodCapsule
                      onClick={() => selectMethod(method)}
                      key={index}
                    >
                      {method.name}
                    </MethodCapsule>
                  );
                })}
              </FlexBox>
            )}
          </Body>
        </TreatmentMethods>
      )}
      <FlexBox column rowGap="1.5rem">
        <FlexBox align="center" columnGap="0.5rem">
          <img
            src="/assets/images/profile/treatment-methods.svg"
            height="48px"
            width="48px"
          />
          <Title titleSize="1.25rem" lineHeight="2rem">
            About me
          </Title>
        </FlexBox>

        <FlexBox
          justify="space-between"
          width="100%"
          align="top"
          rowGap="1rem"
          columnGap="1rem"
        >
          {providerData?.languages?.length > 0 && (
            <Languages>
              <Header align="center" columnGap="0.5rem">
                <img
                  src="/assets/images/profile/my-languages.svg"
                  height="36px"
                  width="36px"
                />
                <Title>Languages I speak</Title>
              </Header>
              <Body>
                {providerData?.languages?.map((language, index) => (
                  <span key={index}>{`${language.name}${
                    index !== providerData?.languages?.length - 1 ? ", " : ""
                  }`}</span>
                ))}
              </Body>
            </Languages>
          )}
          {providerData?.otherinterests.length > 0 && (
            <Expertise>
              <Header align="center" columnGap="0.5rem">
                <img
                  src="/assets/images/profile/my-expertise.svg"
                  height="36px"
                  width="36px"
                />
                <Title>I can help you with</Title>
              </Header>
              <Body>
                {typeof providerData?.otherinterests === "string"
                  ? providerData?.otherinterests
                  : providerData?.otherinterests?.join(", ")}
              </Body>
            </Expertise>
          )}
        </FlexBox>
        {providerData?.affiliations?.length > 0 && (
          <Affiliations>
            <Header align="center" columnGap="1rem">
              <img
                src="/assets/images/profile/my-affiliations.svg"
                height="36px"
                width="36px"
              />
              <Title>My affiliations</Title>
            </Header>
            <Body>
              {providerData?.affiliations?.length > 0 && (
                <FlexBox rowGap="1rem" column>
                  {providerData.affiliations.map((aff, index) => (
                    <Header
                      align="center"
                      key={index}
                      columnGap="1rem"
                      paddingBlock="0.1rem"
                    >
                      <Dot />
                      <Body>
                        {aff.designation} at {aff.organisation} from{" "}
                        {dayjs(aff.startdate).format("MMM YYYY")} to{" "}
                        {aff.iscurrent
                          ? "present"
                          : dayjs(aff.enddate).format("MMM YYYY")}
                      </Body>
                    </Header>
                  ))}
                </FlexBox>
              )}
            </Body>
          </Affiliations>
        )}
      </FlexBox>
    </Container>
  );
};

export default DomainAreaContainer;
