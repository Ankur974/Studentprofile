import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { fetchProvider } from "@redux/actions/providerAction";
import { TitleText } from "@common/TitleText";
import FlexBox from "@common/ui/FlexBox";
import { H4 } from "@common/Headings";
import {
  WHITE,
  LIGHT_BLUE,
  SECONDARY_400,
  SECONDARY_100,
  ACCENT_400,
  SECONDARY_800,
  PRIMARY_100,
  PRIMARY_800,
  ACCENT_700,
} from "@common/ui/colors";
import { PSYCHIATRIST, COUPLE_THERAPIST, THERAPIST } from "@constants";
import { trackEvent } from "@utils/helpers";
import Meta from "./Meta";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import { updateSwitchToTele } from "@redux/actions/chatActions";
import { tokenKey } from "@axiosInstance";
import { getFirebaseClient } from "@firebaseInstance";
import * as storage from "@utils/storageFactory";
import { Text } from "@common/Text";

const DashboardContainer = styled.div`
  display: none;
  flex-direction: column;
  height: 100vh;

  @media only screen and (max-width: 768px) {
    display: flex;
  }
`;

const Mobileheader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${SECONDARY_100};
`;

const ChatContainer = styled.div`
  position: relative;
  margin-left: auto;
  height: 28px;
  width: 28px;
`;

const ChatPopup = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  background-color: ${SECONDARY_400};
  border-radius: 12px;
  z-index: 2;
`;

const ChatPromptHeading = styled.p`
  font-size: 0.8rem;
  line-height: 1.25rem;
  color: white;
  font-weight: bold;
  letter-spacing: 0.22px;
  margin: 0;
  white-space: nowrap;
`;

const ChatPromptDescription = styled.p`
  font-size: 0.75rem;
  color: white;
  letter-spacing: 0.19px;
  width: 86px;
  line-height: 1.25rem;
  margin: 0;
`;

const ChatPromptCone = styled.div`
  position: absolute;
  top: -10px;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid ${SECONDARY_400};
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  width: 1.75rem;
  height: 1.75rem;
`;

const BackIcon = styled(FlexBox)`
  background-color: ${ACCENT_400};
  height: 2rem;
  width: 2rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const MessageNotification = styled(FlexBox)`
  position: absolute;
  background-color: ${PRIMARY_800};
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  border-radius: 50%;
  top: 0;
  right: -2px;
  cursor: pointer;
`;

const UnreadMessages = styled.span`
  color: ${WHITE};
  font-weight: bold;
  font-size: 9px;
  line-height: 0;
`;

const ConsentBar = styled(FlexBox)`
  align-items: center;
  padding: 0.8rem 1rem;
  gap: 0.6rem;
  background-color: ${PRIMARY_100};
`;

const ConsentText = styled(Text)`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 100%;
`;

const ConsentAction = styled(FlexBox)`
  justify-content: end;
  gap: 1rem;
  width: 100%;
`;

const ActionCTA = styled(FlexBox)`
  align-items: center;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  justify-content: center;
  background-color: ${props => !props.outline && PRIMARY_800};
  color: ${props => (props.outline ? PRIMARY_800 : WHITE)};
  cursor: pointer;
  border: ${props => props.outline && `1px solid ${PRIMARY_800}`};
  padding: 0.6rem 1rem;
  border-radius: 10rem;
  height: fit-content;
  width: 45%;
  &:hover {
    opacity: 0.9;
  }
`;

const DashboardMobileLayout = ({
  children,
  title,
  showChat,
  customBackButton,
  showEditCta,
  setPinkBackground,
  origin,
  dispatchFetchProvider = true,
  sessionId,
  timeLeft,
  providerStatus,
  isAncillaryDB = false,
}) => {
  const [showNoteSharingConsentBar, setShowNoteSharingConsentBar] =
    useState(false);
  const dispatch = useDispatch();
  const route = useRouter();
  const providerType = useSelector(state => state.provider.providerType);
  const providerProfile = useSelector(state => state.provider.providerProfile);
  const unreadMessages = useSelector(state => state.chat?.unreadMessages);
  const user = useSelector(state => state.auth.user);
  const bse = useSelector(state => state.bse);
  const [showEditProfileIcon, setShowEditProfileIcon] = useState(false);
  const [isAdditionalServicesDashboard, setisAdditionalServicesDashboard] =
    useState(false);

  const noteSharingConsent = false; // TODO : replace with note sharing consent value from api

  useEffect(() => {
    setShowEditProfileIcon(
      !(window.Android || window.ReactNativeWebView || window.YouMatter)
    );
  });

  useEffect(async () => {
    if (route.isReady && !isAncillaryDB) {
      const queryToken = route.query?.token;
      const localToken = storage.local.getItem(tokenKey);

      if (!queryToken && !localToken && !user) {
        window.Android?.closeWebView();
        window.ReactNativeWebView?.postMessage("closeWebView");
        const redirectPath = encodeURIComponent(route.asPath);
        route.replace(`/auth/log-in?redirectPath=${redirectPath}`);
      } else if (!!user) {
        const { providertype } = route.query;
        if (
          (providertype === COUPLE_THERAPIST && !user.my_couple_therapist) ||
          (providertype === PSYCHIATRIST && !user.mypsychiatrist) ||
          (providertype === THERAPIST && !user.mytherapist)
        ) {
          route.replace("/therapy-psychiatry");
        }
      }
    }
  }, [route.isReady, user]);

  // TODO To be revisted DS
  // VS commented as chat was not working on mobile
  useEffect(() => {
    if (!route.isReady || !user || isAncillaryDB) return;
    const provider = route.query.providertype;
    dispatchFetchProvider && dispatch(fetchProvider(provider));
  }, [route.isReady, user]);

  useEffect(() => {
    if (window?.Tawk_API) {
      window.Tawk_API.onLoad = () => window?.Tawk_API?.hideWidget?.();
    }
    window?.Tawk_API?.hideWidget?.();

    if (window.location.pathname.includes("additional-services"))
      setisAdditionalServicesDashboard(true);

    return () => {
      if (window?.Tawk_API) {
        window.Tawk_API?.showWidget?.();
      }
    };
  }, []);

  useEffect(() => {
    if (!noteSharingConsent) {
      setShowNoteSharingConsentBar(true);
    }
  }, [noteSharingConsent]);

  const handleNoteSharingConsentAction = allow => {
    setShowNoteSharingConsentBar(false);
    // if (allow) {
    // } else {
    // }
  };

  const onClickSwitchToTele = () => dispatch(updateSwitchToTele(true));

  const backgroundColor =
    route.route.includes(`/dashboard/[providertype]/`) && !setPinkBackground
      ? WHITE
      : origin
      ? LIGHT_BLUE
      : SECONDARY_100;

  const RenderProviderStatus = () => {
    try {
      if (!!providerStatus) {
        if (providerStatus === "Typing") return "Online";
        return providerStatus;
      }
      return null;
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  return (
    <DashboardContainer>
      <Meta />
      <Mobileheader style={{ backgroundColor }}>
        <BackIcon
          onClick={customBackButton ? customBackButton : () => route.back()}
        >
          <img src="/assets/images/back-arrow.svg" alt="back" />
        </BackIcon>
        <FlexBox column margin="0 1rem">
          <TitleText>{title}</TitleText>
          {route.pathname?.includes("chat") && (
            <FlexBox margin="0.125rem 0 0" columnGap="2rem" align="center">
              <H4 color={ACCENT_700}>
                <RenderProviderStatus />
              </H4>
            </FlexBox>
          )}
        </FlexBox>
        <FlexBox align="center" columnGap="1.5rem" margin="0 0 0 auto">
          {showChat && (
            <Link href={`/dashboard/${route.query.providertype}/chat`} passHref>
              <ChatContainer>
                <FlexBox
                  onClick={() => {
                    const providerKey =
                      providerType === PSYCHIATRIST ? PSYCHIATRIST : THERAPIST;
                    if (route.pathname.includes("tools")) {
                      trackEvent({
                        event: "homework_chat_click",
                        payload: {
                          flow:
                            providerType === COUPLE_THERAPIST
                              ? "couples"
                              : providerType === PSYCHIATRIST
                              ? "psychiatry"
                              : "therapy",
                          [`${providerKey}_name`]: `${providerProfile?.firstname} ${providerProfile?.lastname}`,
                          [`${providerKey}_uuid`]: providerProfile?.uuid,
                        },
                      });
                    } else {
                      trackEvent({
                        event: "therapy_psychiatry_chat_click",
                        payload: {
                          flow:
                            providerType === COUPLE_THERAPIST
                              ? "couples"
                              : providerType === PSYCHIATRIST
                              ? "psychiatry"
                              : "therapy",
                          [`${providerKey}_name`]: `${providerProfile?.firstname} ${providerProfile?.lastname}`,
                          [`${providerKey}_uuid`]: providerProfile?.uuid,
                        },
                      });
                    }
                  }}
                >
                  <FiMessageCircle color={SECONDARY_800} size="1.8rem" />
                  {!!unreadMessages && (
                    <MessageNotification justify="center" align="center">
                      <UnreadMessages>
                        {unreadMessages > 9 ? "9+" : unreadMessages}
                      </UnreadMessages>
                    </MessageNotification>
                  )}
                </FlexBox>
                {bse.showChatPrompt && route.pathname.includes("tools") && (
                  <ChatPopup>
                    <ChatPromptCone />
                    <ChatPromptHeading>Need Help?</ChatPromptHeading>
                    <ChatPromptDescription>
                      {`Chat with your ${route.query.providertype}to clarify your doubts!`}
                    </ChatPromptDescription>
                  </ChatPopup>
                )}
              </ChatContainer>
            </Link>
          )}
          {showEditCta && showEditProfileIcon && (
            <Link
              href={
                isAdditionalServicesDashboard
                  ? "/dashboard/additional-service/edit-profile"
                  : `/dashboard/${providerType}/edit-profile`
              }
            >
              <Profile>
                <Image src={user?.image} />
              </Profile>
            </Link>
          )}
          {/* {timeLeft && (
            <FiPhone
              color={SECONDARY_800}
              size="1.5rem"
              onClick={onClickSwitchToTele}
            />
          )} */}
        </FlexBox>
      </Mobileheader>
      {/* TODO : revisite for rendering logic during api integration */}
      {/* TODO can be deleted */}
      {providerProfile && showNoteSharingConsentBar && (
        <ConsentBar column justify="space-between">
          <ConsentText>
            Your therapist, {providerProfile?.firstname}, has requested
            permission to share session notes with your interim therapist,{" "}
            {providerProfile?.firstname}.
          </ConsentText>
          <ConsentAction>
            <ActionCTA onClick={handleNoteSharingConsentAction} outline>
              CLOSE
            </ActionCTA>
            <ActionCTA onClick={handleNoteSharingConsentAction}>
              ALLOW
            </ActionCTA>
          </ConsentAction>
        </ConsentBar>
      )}
      {children}
    </DashboardContainer>
  );
};

export default DashboardMobileLayout;
