import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H3, H4, H5, TextCTA } from "@common/ui/Headings";
import {
  PRIMARY_800,
  PRIMARY_400,
  ACCENT_500,
  ACCENT_700,
  PRIMARY_100,
  ACCENT_800,
} from "@common/ui/colors";
import { FiCheck } from "react-icons/fi";
import { trackEvent } from "@utils/helpers";
import { useSelector } from "react-redux";

const Title = styled(H3)`
  font-size: 1rem;
  line-height: 24px;
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  gap: 1rem;
  border: 1px solid ${PRIMARY_400};
  width: 88%;
  min-height: 33.375rem;
  margin: auto;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: auto;
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  gap: 1rem;
  border: 1px solid ${ACCENT_500};
  width: 90%;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 24px;
  color: ${ACCENT_800};

  ${({ isActive }) =>
    isActive &&
    css`
      span {
        color: ${PRIMARY_800};
      }
    `};
`;

const IconWrapper = styled(FlexBox)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 8rem;
  background-color: ${PRIMARY_100};
  align-items: center;
  justify-content: center;
`;

const CTAContainer = styled(FlexBox)`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 0;
  }
`;

const ShareProviderCard = ({
  currentReferralState,
  setCurrentReferralState,
  therapist,
  psychiatrist,
}) => {
  const user = useSelector(state => state?.auth?.user);

  const [shareIndividualProvider, setShareIndividualProvider] = useState(true);

  useEffect(() => {
    if (!user) return;
    if (currentReferralState.selectedProviderType === "therapist") {
      user.mytherapist
        ? setShareIndividualProvider(true)
        : setShareIndividualProvider(false);
    } else if (currentReferralState.selectedProviderType === "psychiatrist") {
      user.mypsychiatrist
        ? setShareIndividualProvider(true)
        : setShareIndividualProvider(false);
    }
  }, [user, currentReferralState.selectedProviderType]);

  useEffect(() => {
    setCurrentReferralState({
      ...currentReferralState,
      shareIndividualProvider,
      serviceSelected:
        currentReferralState?.selectedProviderType === "therapist"
          ? shareIndividualProvider
            ? "therapist"
            : "therapy"
          : currentReferralState?.selectedProviderType === "psychiatrist"
          ? shareIndividualProvider
            ? "psychiatrist"
            : "psychiatry"
          : "coach call",
      providerId:
        currentReferralState?.selectedProviderType === "therapist"
          ? shareIndividualProvider
            ? user.mytherapist
            : null
          : currentReferralState?.selectedProviderType === "psychiatrist"
          ? shareIndividualProvider
            ? user.mypsychiatrist
            : null
          : null,
    });
  }, [shareIndividualProvider, currentReferralState?.selectedProviderType]);

  return (
    <Container>
      <FlexBox column rowGap="1rem">
        <FlexBox columnGap="1.1rem" align="center">
          <img src="/assets/images/referral-card-visual.svg" />
          <Title bold>How do you want to support your loved one?</Title>
        </FlexBox>
        <FlexBox column rowGap="1.25rem" align="center">
          <Card
            isActive={
              currentReferralState?.selectedProviderType === "therapist"
            }
            onClick={() => {
              setCurrentReferralState({
                ...currentReferralState,
                selectedProviderType: "therapist",
              });
            }}
          >
            {currentReferralState?.selectedProviderType === "therapist" ? (
              <FlexBox column rowGap="1rem">
                <FlexBox align="center" justify="space-between">
                  <H4 bold color={PRIMARY_800}>
                    Refer Therapy
                  </H4>
                  <IconWrapper>
                    <FiCheck color={PRIMARY_800} />
                  </IconWrapper>
                </FlexBox>
                <H5 color={ACCENT_700}>
                  Help your loved one manage their emotional and mental health
                  concerns.
                </H5>
                {user.mytherapist && (
                  <>
                    <FlexBox
                      align="center"
                      columnGap="0.75rem"
                      onClick={() => {
                        trackEvent({
                          event: "teleref_therapist_click",
                          payload: {
                            flow: currentReferralState.flow,
                            platform: window.ReactNativeWebView
                              ? "ios_app"
                              : window.Android
                              ? "android_app"
                              : "website",
                          },
                        });
                        setShareIndividualProvider(true);
                      }}
                    >
                      {!shareIndividualProvider ? (
                        <img src="/assets/images/icon-radio-green-inactive.svg" />
                      ) : (
                        <img src="/assets/images/icon-radio-green-active.svg" />
                      )}
                      <H5 bold>Refer Your Therapist</H5>
                    </FlexBox>
                    <FlexBox>
                      <H5 color={ACCENT_700}>
                        Share{" "}
                        <span>
                          {therapist?.lastname
                            ? `${therapist?.firstname} ${therapist?.lastname}`
                            : therapist?.firstname}
                          ’s
                        </span>{" "}
                        profile
                      </H5>
                    </FlexBox>
                  </>
                )}
                <FlexBox
                  align="center"
                  columnGap="0.75rem"
                  onClick={() => {
                    trackEvent({
                      event: "teleref_share_therapy_click",
                      payload: {
                        flow: currentReferralState.flow,
                        platform: window.ReactNativeWebView
                          ? "ios_app"
                          : window.Android
                          ? "android_app"
                          : "website",
                      },
                    });
                    setShareIndividualProvider(false);
                  }}
                >
                  {shareIndividualProvider ? (
                    <img src="/assets/images/icon-radio-green-inactive.svg" />
                  ) : (
                    <img src="/assets/images/icon-radio-green-active.svg" />
                  )}
                  <H5 bold>Share Therapy at Amaha</H5>
                </FlexBox>
                <FlexBox>
                  <H5 color={ACCENT_700}>
                    Share a list of therapists and let them choose their correct
                    fit.
                  </H5>
                </FlexBox>
              </FlexBox>
            ) : (
              "Refer Therapy"
            )}
          </Card>
          <Card
            isActive={
              currentReferralState?.selectedProviderType === "psychiatrist"
            }
            onClick={() => {
              setCurrentReferralState({
                ...currentReferralState,
                selectedProviderType: "psychiatrist",
              });
            }}
          >
            {currentReferralState?.selectedProviderType === "psychiatrist" ? (
              <FlexBox column rowGap="1rem">
                <FlexBox align="center" justify="space-between">
                  <H4 bold color={PRIMARY_800}>
                    Refer Psychiatry
                  </H4>
                  <IconWrapper>
                    <FiCheck color={PRIMARY_800} />
                  </IconWrapper>
                </FlexBox>
                <H5 color={ACCENT_700}>
                  Help your loved one get the right medical and therapeutic
                  support for their concerns.
                </H5>
                {user.mypsychiatrist && (
                  <>
                    <FlexBox
                      align="center"
                      columnGap="0.75rem"
                      onClick={() => {
                        trackEvent({
                          event: "teleref_psychiatrist_click",
                          payload: {
                            flow: currentReferralState.flow,
                            platform: window.ReactNativeWebView
                              ? "ios_app"
                              : window.Android
                              ? "android_app"
                              : "website",
                          },
                        });
                        setShareIndividualProvider(true);
                      }}
                    >
                      {!shareIndividualProvider ? (
                        <img src="/assets/images/icon-radio-green-inactive.svg" />
                      ) : (
                        <img src="/assets/images/icon-radio-green-active.svg" />
                      )}
                      <H5 bold>Refer Your Psychiatrist</H5>
                    </FlexBox>
                    <FlexBox>
                      <H5 color={ACCENT_700}>
                        Share{" "}
                        <span>
                          {psychiatrist?.lastname
                            ? `${psychiatrist?.firstname} ${psychiatrist?.lastname}`
                            : psychiatrist?.firstname}
                          ’s
                        </span>{" "}
                        profile
                      </H5>
                    </FlexBox>
                  </>
                )}
                <FlexBox
                  align="center"
                  columnGap="0.75rem"
                  onClick={() => {
                    trackEvent({
                      event: "teleref_share_psychiatry_click",
                      payload: {
                        flow: currentReferralState.flow,
                        platform: window.ReactNativeWebView
                          ? "ios_app"
                          : window.Android
                          ? "android_app"
                          : "website",
                      },
                    });
                    setShareIndividualProvider(false);
                  }}
                >
                  {shareIndividualProvider ? (
                    <img src="/assets/images/icon-radio-green-inactive.svg" />
                  ) : (
                    <img src="/assets/images/icon-radio-green-active.svg" />
                  )}
                  <H5 bold>Share Psychiatry at Amaha</H5>
                </FlexBox>
                <FlexBox>
                  <H5 color={ACCENT_700}>
                    Share a list of psychiatrists and let them choose their
                    correct fit.
                  </H5>
                </FlexBox>
              </FlexBox>
            ) : (
              "Refer Psychiatry"
            )}
          </Card>
          <Card
            isActive={currentReferralState?.selectedProviderType === "coach"}
            onClick={() => {
              trackEvent({
                event: "teleref_coach_call_click",
                payload: {
                  flow: currentReferralState.flow,
                  platform: window.ReactNativeWebView
                    ? "ios_app"
                    : window.Android
                    ? "android_app"
                    : "website",
                },
              });
              setCurrentReferralState({
                ...currentReferralState,
                selectedProviderType: "coach",
                serviceSelected: "coach call",
              });
            }}
          >
            {currentReferralState?.selectedProviderType === "coach" ? (
              <FlexBox column rowGap="1rem">
                <FlexBox align="center" justify="space-between">
                  <H4 bold color={PRIMARY_800}>
                    Refer a free 20-min coach call
                  </H4>
                  <IconWrapper>
                    <FiCheck color={PRIMARY_800} />
                  </IconWrapper>
                </FlexBox>
                <H5 color={ACCENT_700}>
                  Set up a free 20 minute call with a therapist. They will be
                  able to guide your loved one and give them some more clarity
                  and insight into the kind of care that they are looking for.
                </H5>
              </FlexBox>
            ) : (
              "Refer a free 20-min coach call"
            )}
          </Card>
        </FlexBox>
      </FlexBox>
      <FlexBox>
        <CTAContainer align="center" justify="space-between">
          <TextCTA
            color={PRIMARY_800}
            onClick={() => {
              trackEvent({
                event: "teleref_back_click",
                payload: {
                  flow: currentReferralState.flow,
                  platform: window.ReactNativeWebView
                    ? "ios_app"
                    : window.Android
                    ? "android_app"
                    : "website",
                  card: "Services",
                },
              });
              setCurrentReferralState({ ...currentReferralState, step: 1 });
            }}
          >
            BACK
          </TextCTA>
          <TextCTA
            color={PRIMARY_800}
            onClick={() => {
              trackEvent({
                event: "teleref_next_click",
                payload: {
                  flow: currentReferralState.flow,
                  platform: window.ReactNativeWebView
                    ? "ios_app"
                    : window.Android
                    ? "android_app"
                    : "website",
                  card: "Services",
                },
              });
              setCurrentReferralState({ ...currentReferralState, step: 3 });
            }}
          >
            NEXT
          </TextCTA>
        </CTAContainer>
      </FlexBox>
    </Container>
  );
};

export default ShareProviderCard;
