import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import Header from "@components/Header";
import SidebarNew from "@components/SidebarNew";
import FlexBox from "@common/ui/FlexBox";
import { WHITE, PRIMARY_100, PRIMARY_800 } from "@common/ui/colors";
import Meta from "./Meta";
import { tokenKey } from "@axiosInstance";
import { PSYCHIATRIST, COUPLE_THERAPIST, THERAPIST } from "@constants";
import { closeWebView } from "@utils/interfaces";
import * as storage from "@utils/storageFactory";
import { Text } from "@common/Text";
import NewProviderPopup from "@components/Popups/NewProviderPopup";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  line-height: normal;
  overflow: none;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const DashboardContent = styled(FlexBox)`
  flex-direction: column;
  flex: 1;
  background-color: ${WHITE};
  min-width: 300px;
`;

const PageContent = styled.div`
  flex: 1;
  position: ${props => (props.positionStyle ? props.positionStyle : "unset")};
  overflow-y: ${props => (props.hideOverflow ? "hidden" : "scroll")};
  padding: ${props =>
    props.noTopPadding
      ? "0rem 2rem 2rem 2rem"
      : props.noBottomPadding
      ? "2rem 2rem 0 2rem"
      : props.noPadding
      ? "0"
      : "2rem"};
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const ConsentBar = styled(FlexBox)`
  align-items: center;
  padding: 0.8rem 2rem;
  background-color: ${PRIMARY_100};
`;

const ConsentText = styled(Text)`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 70%;
`;

const ConsentAction = styled(FlexBox)`
  justify-content: end;
  gap: 1rem;
  width: 30%;
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
  &:hover {
    opacity: 0.9;
  }
`;

const DashboardWebLayout = ({
  title,
  timeLeft,
  children,
  noTopPadding,
  noBottomPadding,
  noPadding,
  positionStyle,
  hideOverflow,
  sessionId,
  providerPublicProfile,
  providerStatus,
  isAncillaryDB = false,
}) => {
  const [showNoteSharingConsentBar, setShowNoteSharingConsentBar] =
    useState(false);
  const [showNewProviderPopup, setShowNewProviderPopup] = useState(false);

  const noteSharingConsent = false; // TODO : replace with note sharing consent value from api
  const providerData = useSelector(state => state.provider);
  const user = useSelector(state => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!!providerData.providerProfile) {
      const shownNewProviderPopup = localStorage.getItem(
        "shownNewProviderPopup"
      );
      if (!shownNewProviderPopup) setShowNewProviderPopup(true);
    }
  }, [providerData]);

  useEffect(() => {
    if (!noteSharingConsent) {
      setShowNoteSharingConsentBar(true);
    }
  }, [noteSharingConsent]);

  useEffect(async () => {
    if (router.isReady && !isAncillaryDB) {
      const queryToken = router.query?.token;
      const localToken = storage.local.getItem(tokenKey);

      if (!queryToken && !localToken && !user) {
        closeWebView();
        window.Android?.closeWebView();
        window.ReactNativeWebView?.postMessage("closeWebView");
        const redirectPath = encodeURIComponent(router.asPath);
        router.replace(`/auth/log-in?redirectPath=${redirectPath}`);
      } else if (!!user) {
        const { providertype } = router.query;
        if (
          (providertype === COUPLE_THERAPIST && !user.my_couple_therapist) ||
          (providertype === PSYCHIATRIST && !user.mypsychiatrist) ||
          (providertype === THERAPIST && !user.mytherapist)
        ) {
          router.replace("/therapy-psychiatry");
        }
      }
    }
  }, [router.isReady, user]);

  useEffect(() => {
    if (window?.Tawk_API) {
      window.Tawk_API.onLoad = () => window?.Tawk_API?.hideWidget?.();
    }
    window?.Tawk_API?.hideWidget?.();
    return () => {
      if (window?.Tawk_API) {
        window.Tawk_API?.showWidget?.();
      }
    };
  }, []);

  const handleNoteSharingConsentAction = allow => {
    setShowNoteSharingConsentBar(false);
    // if (allow) {
    // } else {
    // }
  };

  const handleNewProviderPopup = () => {
    localStorage.setItem("shownNewProviderPopup", true);
    setShowNewProviderPopup(false);
  };

  //TODO: to be confirmed and deleted - deepesh
  return (
    <DashboardContainer>
      <Meta title="Dashboard | Amaha" />
      {showNewProviderPopup && (
        <NewProviderPopup onClick={handleNewProviderPopup} />
      )}
      <SidebarNew
        providerType={
          router.query.providertype === "coach"
            ? "coach"
            : providerData.providerType || router.query.providertype
        }
        providerProfile={providerData.providerProfile}
        providerPublicProfile={providerPublicProfile}
        showNewProviderPopup={showNewProviderPopup}
      />
      <DashboardContent>
        <Header
          title={title}
          sessionId={sessionId}
          timeLeft={timeLeft}
          providerType={router.query.providertype}
          user={user}
          providerStatus={providerStatus}
        />
        {/* TODO : revisite for rendering logic during api integration */}
        {providerData?.providerProfile && showNoteSharingConsentBar && (
          <ConsentBar justify="space-between">
            <ConsentText>
              Your therapist, {providerData?.providerProfile?.firstname}, has
              requested permission to share session notes with your interim
              therapist, {providerData?.providerProfile?.firstname}.
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
        <PageContent
          hideOverflow={hideOverflow}
          noTopPadding={noTopPadding}
          positionStyle={positionStyle}
          noBottomPadding={noBottomPadding}
          noPadding={noPadding}
        >
          {children}
        </PageContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardWebLayout;
