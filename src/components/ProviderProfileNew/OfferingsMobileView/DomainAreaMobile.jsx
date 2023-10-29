import React, { useMemo, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_800,
  SECONDARY_400,
  SECONDARY_700,
  WHITE,
} from "@common/ui/colors";
import { PSYCHIATRIST } from "@constants";
import { domainareas_images } from "@metadata/domainareas_images";
import { trackEvent, currentFlow } from "@utils/helpers";
import { H4 } from "@common/Headings";
import ProviderSummary from "../ProviderSummary";
import { Text } from "@common/Text";
import BottomSheet from "../BottomSheet";
import { RenderCfInfoCarousel } from "../BottomSection";
import { CF_PROVIDER_ROLE } from "../../../constants";

const Header = styled(FlexBox)`
  /* padding-block: ${props => props.paddingBlock || "0.5rem"}; */
`;

const Title = styled.span`
  color: ${ACCENT_800};
  font-weight: 700;
  font-size: ${props => props.titleSize || "0.875rem"};
  line-height: 1.5rem;
`;

const Body = styled.div`
  color: ${ACCENT_800};
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5rem;
`;

const OfferingsVisual = styled(FlexBox)`
  gap: 2.5rem;
`;

const OfferingBox = styled(FlexBox)`
  height: fit-content;
`;

const OfferingVisual = styled.img`
  width: 4rem;
  border-radius: 0.75rem;
  padding: 2px;
`;

const OfferingText = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${ACCENT_800};
  text-align: center;
`;

const VisualContainer = styled(FlexBox)`
  width: calc(100vw - 4rem);
  max-width: calc(100vw - 4rem);
  gap: 1rem;
  padding: 0 2rem;
  margin: auto -2rem;
  overflow-x: scroll;
`;

const TreatmentMethods = styled.div`
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FixedBody = styled.div`
  width: auto;
`;

const MethodsList = styled(FlexBox)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

const MethodCapsule = styled.div`
  flex-basis: 10%;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${SECONDARY_700};
  background-color: ${WHITE};
  border-radius: 0.75rem;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  cursor: pointer;
  border: 1px solid ${SECONDARY_400};
`;

const Languages = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Expertise = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 1rem;
`;

const Affiliations = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 1rem;
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

const DomainAreaMobile = ({
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

  const isCfProvider = providerData?.roles?.includes(CF_PROVIDER_ROLE);

  const payload = {
    flow,
    [`${type}_name`]: fullName,
    [`${type}_uuid`]: providerData?.uuid,
    expt_variant: "new_page",
  };

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

  const RenderThought = ({ thought }) => (
    <Thought>
      <img
        alt="Quote"
        draggable={false}
        src="https://cdn.theinnerhour.com/assets/images/comma.svg"
      />
      <Text bold fontSize="0.875rem" lineHeight="1.5">
        {thought?.replaceAll('"', "")}
      </Text>
    </Thought>
  );

  return (
    <>
      {modal && (
        <BottomSheet
          isOpen={modal}
          selectedMethod={selectedMethod}
          toggleModal={toggleModal}
        />
      )}

      <OfferingsVisual column>
        <ProviderSummary
          sessionType={sessionType}
          providerData={providerData}
          providerType={providerType}
        />
        {providerData?.user_phrases?.length > 0 && (
          <FlexBox column rowGap="1rem">
            <FlexBox align="center" columnGap="0.5rem">
              <img
                src="/assets/images/profile/concerns.svg"
                height="48px"
                width="48px"
              />
              <Title titleSize="1rem">Concerns my clients have</Title>
            </FlexBox>
            <FlexBox width="100%" wrap="wrap" columnGap="1rem" rowGap="1rem">
              {providerData?.user_phrases?.map(thought => (
                <RenderThought key={thought} thought={thought} />
              ))}
            </FlexBox>
          </FlexBox>
        )}

        <FlexBox column rowGap="1rem">
          <FlexBox align="center" columnGap="0.5rem">
            <img
              src="/assets/images/profile/domains-icon.svg"
              height="48px"
              width="48px"
            />
            <Title titleSize="1rem">
              I offer {providerType === PSYCHIATRIST ? "psychiatry" : "therapy"}{" "}
              for
            </Title>
          </FlexBox>
          <VisualContainer colGap="4rem">
            {providerData?.domainareas?.map((item, index) => {
              const imageIndex = domainareas_images.findIndex(
                image => image.slug === item.slug
              );
              if (imageIndex > 0)
                return (
                  <OfferingBox
                    key={index}
                    align="center"
                    column
                    rowGap="0.5rem"
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
          </VisualContainer>
        </FlexBox>

        {isCfProvider && <RenderCfInfoCarousel />}
        {providerData?.treatment_areas.length > 0 && (
          <TreatmentMethods>
            <Header align="center" columnGap="0.5rem">
              <img
                src="/assets/images/profile/treatment-methods.svg"
                height="48px"
                width="48px"
              />
              <Title titleSize="1rem" lineHeight="1.5rem">
                I specialise in
              </Title>
            </Header>
            <Body>
              {providerData?.treatment_areas?.length > 0 && (
                <FixedBody>
                  <MethodsList
                    wrap="wrap"
                    columnGap="1rem"
                    rowGap="0.6rem"
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
                  </MethodsList>
                </FixedBody>
              )}
            </Body>
          </TreatmentMethods>
        )}

        {providerData?.languages?.length > 0 && (
          <Languages>
            <Header align="center" columnGap="0.5rem">
              <img
                src="/assets/images/profile/my-languages.svg"
                height="48px"
                width="48px"
              />
              <Title titleSize="1rem" lineHeight="1.5rem">
                Languages I speak
              </Title>
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
                height="48px"
                width="48px"
              />
              <Title titleSize="1rem" lineHeight="1.5rem">
                I can help you with
              </Title>
            </Header>
            <Body>
              {typeof providerData?.otherinterests === "string"
                ? providerData?.otherinterests
                : providerData?.otherinterests?.join(", ")}
            </Body>
          </Expertise>
        )}
        {providerData?.affiliations?.length > 0 && (
          <Affiliations>
            <Header align="center" columnGap="1rem">
              <img
                src="/assets/images/profile/my-affiliations.svg"
                height="48px"
                width="48px"
              />
              <Title titleSize="1rem" lineHeight="1.5rem">
                My affiliations
              </Title>
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
                      <H4>
                        {aff.designation} at {aff.organisation} from{" "}
                        {dayjs(aff.startdate).format("MMM YYYY")} to{" "}
                        {aff.iscurrent
                          ? "present"
                          : dayjs(aff.enddate).format("MMM YYYY")}
                      </H4>
                    </Header>
                  ))}
                </FlexBox>
              )}
            </Body>
          </Affiliations>
        )}
      </OfferingsVisual>
    </>
  );
};

export default DomainAreaMobile;
