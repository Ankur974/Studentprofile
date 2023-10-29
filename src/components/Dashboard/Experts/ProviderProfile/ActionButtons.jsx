import Bugsnag from "@bugsnag/js";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { FiShare2 } from "react-icons/fi";

import FlexBox from "@common/ui/FlexBox";
import { trackEvent } from "@utils/helpers";
import useMobileView from "@hooks/useMobileView";
import { shareProvider } from "@utils/interfaces";
import { WHITE, ACCENT_800 } from "@common/ui/colors";
import { Button, IconButton } from "@common/Dashboard/Buttons";
import { H4 } from "@common/Dashboard/Headings";

const CopiedAnimation = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled(FlexBox)`
  align-items: center;
  padding: 1.5rem 2.5rem;
  gap: 1.5rem;

  @media only screen and (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CopyPopup = styled.div`
  top: 80%;
  left: 50%;
  position: absolute;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transform: translate(-50%, -50%);
  animation: ${CopiedAnimation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  background-color: ${ACCENT_800};
`;

const ActionButtons = ({
  handleCheckButton,
  fullName,
  commonAnalyticsPayload,
}) => {
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const isMobile = useMobileView();

  const shareProviderTracker = () => {
    trackEvent({
      event: "share_provider_cta_click",
      commonAnalyticsPayload,
    });
  };

  const handleShare = () => {
    if (isMobile) handleMobileShare();
    else handleDesktopShare();
  };

  const handleDesktopShare = () => {
    try {
      const fullNameEnding = fullName && !fullName.endsWith("s") ? "s" : "";
      const linkMessage = `Hey! I think you might be interested in checking ${fullName}${fullNameEnding} profile on Amaha - ${window.location.href}`; //TODO - to be updated

      navigator?.clipboard
        ?.writeText(linkMessage)
        ?.then(() => {
          setShowCopyPopup(prev => !prev);

          setTimeout(() => {
            setShowCopyPopup(prev => !prev);
          }, 3000);
        })
        .catch(err => Bugsnag.notify(err));
      shareProviderTracker();
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const handleMobileShare = async () => {
    const message = `Hey! I think you might be interested in checking ${fullName}'${
      !fullName?.endsWith("s") ? "s" : ""
    } profile on Amaha -`;

    shareProviderTracker();
    shareProvider("Share provider profile", "", window.location.href);
    if (window.Android) {
      window.Android.shareProvider(
        "Share provider profile",
        message,
        window.location.href
      );
      return;
    }

    if (window.ReactNativeWebView) {
      const data = JSON.stringify({
        subject: "Share provider profile",
        message: message,
        url: window.location.href,
      });

      window.ReactNativeWebView.postMessage(`shareProvider,${data}`);
      return;
    }

    try {
      await navigator?.share?.({
        title: "Share provider profile",
        text: message,
        url: window.location.href,
      });
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  return (
    <Wrapper>
      <Button width="100%" onClick={handleCheckButton}>
        BOOK NEW
      </Button>
      <IconButton
        outline
        secondary
        width="100%"
        onClick={handleShare}
        Icon={FiShare2}
      >
        SHARE
      </IconButton>
      {showCopyPopup && (
        <CopyPopup>
          <H4 color={WHITE}>Link Copied!</H4>
        </CopyPopup>
      )}
    </Wrapper>
  );
};

export default ActionButtons;
