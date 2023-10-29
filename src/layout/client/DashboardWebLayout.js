import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import Header from "@components/Header";
import Sidebar from "@components/SidebarNew";
import FlexBox from "@common/ui/FlexBox";
import { WHITE, PRIMARY_100, PRIMARY_800 } from "@common/ui/colors";
import Meta from "./Meta";
import axiosInstance, { tokenKey } from "@axiosInstance";
import {
  PSYCHIATRIST,
  COUPLE_THERAPIST,
  THERAPIST,
  ADDITIONAL_SERVICES,
  ADMIN,
} from "@constants";
import { closeWebView } from "@utils/interfaces";
import * as storage from "@utils/storageFactory";
import NewProviderPopup from "@components/Popups/NewProviderPopup";
import { Text } from "@common/Text";
import { updateConsent } from "@redux/actions/consentActions";
import { capitalizeFirstLetter, trackEvent } from "@utils/helpers";
import urls from "@urls";
import Bugsnag from "@bugsnag/js";

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
  showNewProviderPopup,
  setShowNewProviderPopup,
  showKebabMenu = false,
  kebabOptions = null,
  kebabRef,
  providerAvailabilityStatus,
}) => {
  const [providersList, setProvidersList] = useState([]);
  const [newProvider, setNewProvider] = useState(null);
  const [selectedProviderId, setSelectedProviderId] = useQueryParam(
    "id",
    withDefault(NumberParam, null)
  );

  const dispatch = useDispatch();
  const providerData = useSelector(state => state.provider);
  const loadingConsents = useSelector(state => state.consent?.loadingConsents);
  const consents = useSelector(state => state.consent?.consents);
  const user = useSelector(state => state.auth.user);
  const router = useRouter();
  const elem2Ref = useRef(null);
  const isAdditionalServicesDashboard =
    router?.pathname?.includes(ADDITIONAL_SERVICES) ||
    router?.query?.providertype?.includes(ADDITIONAL_SERVICES); // check for providerType added primarily for edit-profile route where pathname is dynamic

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

  useEffect(async () => {
    if (router.isReady && !!user) {
      const { providertype } = router?.query || {};

      const provider_type = (() => {
        if (isAdditionalServicesDashboard) {
          return "ancillary";
        }
        if (providertype === COUPLE_THERAPIST) {
          return "couple_therapist";
        }
        return providertype;
      })();

      const res = await axiosInstance.get(urls.myProvidersDropdown, {
        params: { provider_type },
      });

      const providersList = res?.data?.data || [];
      setProvidersList(providersList);

      // to set current provider for ancillary services
      // in case there is no provider provided from ancillary service card
      if (
        !selectedProviderId &&
        !!providersList?.length &&
        isAdditionalServicesDashboard
      ) {
        const additionalServiceProvider = providersList?.[0];
        const providerId = additionalServiceProvider?.id;

        if (providerId) setSelectedProviderId(providerId);
      }

      const newProvider = res?.data?.data?.filter(
        provider => provider?.is_new_temp_provider
      );

      if (newProvider?.length > 0) {
        setNewProvider(newProvider[0]);
        setShowNewProviderPopup?.(true);
      }
    }
  }, [router.isReady, user]);

  const handleNewProviderPopup = async () => {
    setShowNewProviderPopup?.(false);
    try {
      await axiosInstance.patch(`${urls.updateTempFlag}`, {
        provider_id: newProvider?.id,
        provider_type:
          router?.query?.providertype === "couplestherapist"
            ? "couple_therapist"
            : router?.query?.providertype,
      });
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const handleConsentAction = (approveConsent, id) => {
    const payload = {
      cta: approveConsent ? "allow" : "don't allow",
      source: "top banner",
      provider_tagged: `${providerData?.providerProfile?.firstname} ${
        providerData?.providerProfile?.lastname || ""
      }`,
      tagging_type: consents?.waiting?.[0]?.tagging_type || "null",
    };

    trackEvent({
      event: "user_consent_modal_click",
      payload,
    });

    const serviceType = isAdditionalServicesDashboard
      ? "ancillary"
      : router?.query?.providertype;

    let status_id = approveConsent ? 3 : 2;
    dispatch(
      updateConsent(
        status_id,
        id,
        serviceType,
        user,
        providerData?.providerProfile?.id
      )
    );
  };

  const userType = consents?.waiting?.[0]?.provider_details?.usertype;
  const providerType = userType?.includes("assessment")
    ? "assessment administrator"
    : userType;
  const isAdminAction =
    consents?.waiting?.[0]?.shared_by_details?.usertype?.toLowerCase() ===
    ADMIN;
  const consentText = isAdminAction
    ? `${capitalizeFirstLetter(
        consents?.waiting?.[0]?.provider_details?.firstname
      )} ${capitalizeFirstLetter(
        consents?.waiting?.[0]?.provider_details?.lastname || ""
      )} has been added to your account. Please allow access to your notes.`
    : `Please give permission to access your notes with ${providerType}, ${capitalizeFirstLetter(
        consents?.waiting?.[0]?.provider_details?.firstname
      )} ${capitalizeFirstLetter(
        consents?.waiting?.[0]?.provider_details?.lastname || ""
      )}.`;

  return (
    <DashboardContainer>
      <Meta title="Dashboard | Amaha" />
      {showNewProviderPopup && elem2Ref.current && (
        <NewProviderPopup
          onClick={handleNewProviderPopup}
          provider={newProvider}
          providerType={router.query.providertype}
          isFirstProvider={providersList?.length === 1} //this flag signifies that user has only one provider of a type
        />
      )}
      <Sidebar
        providerType={
          router.query.providertype === "coach"
            ? "coach"
            : providerData.providerType || router.query.providertype
        }
        providerProfile={providerData.providerProfile}
        providersList={providersList}
        providerPublicProfile={providerPublicProfile}
        showNewProviderPopup={showNewProviderPopup}
        elem2Ref={elem2Ref}
      />
      <DashboardContent>
        <Header
          title={title}
          sessionId={sessionId}
          timeLeft={timeLeft}
          providerType={router.query.providertype}
          user={user}
          providerStatus={providerStatus}
          showKebabMenu={showKebabMenu}
          kebabOptions={kebabOptions}
          kebabRef={kebabRef}
          providerAvailabilityStatus={providerAvailabilityStatus}
        />
        {providerData?.providerProfile &&
          !loadingConsents &&
          consents?.waiting?.[0] && (
            <ConsentBar justify="space-between">
              <ConsentText>{consentText}</ConsentText>
              <ConsentAction>
                <ActionCTA
                  onClick={() =>
                    handleConsentAction(false, consents?.waiting?.[0]?.id)
                  }
                  outline
                >
                  CLOSE
                </ActionCTA>
                <ActionCTA
                  onClick={() =>
                    handleConsentAction(true, consents?.waiting?.[0]?.id)
                  }
                >
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
