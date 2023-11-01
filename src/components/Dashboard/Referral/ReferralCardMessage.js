import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ReactHtmlParser from "react-html-parser";
import FlexBox from "@common/ui/FlexBox";
import { H3, H5, H6, TextCTA } from "@common/ui/Headings";
import {
  WHITE,
  PRIMARY_800,
  PRIMARY_400,
  ACCENT_500,
  ACCENT_800,
  ACCENT_600,
  PRIMARY_100,
  PRIMARY_700,
  PRIMARY_800,
} from "@common/ui/colors";
import useMobileView from "@hooks/useMobileView";
import { TextButton } from "@common/ui/Buttons";
import { FiBook, FiCopy } from "react-icons/fi";
import { useSelector } from "react-redux";
import axiosInstance from "@axiosInstance";
import urls from "@urls";
import Bugsnag from "@bugsnag/js";
import { trackEvent } from "@utils/helpers";
import { copyCoupon, shareProvider } from "../../../utils/interfaces";

const Title = styled(H3)`
  font-size: 1rem;
  line-height: 24px;
`;

const MessageCard = styled(FlexBox)`
  flex-direction: column;
  gap: 1.375rem;
  border: 1px solid ${PRIMARY_400};
  width: 88%;
  min-height: ${props => (props.height ? props.height : "auto")};
  justify-content: space-between;
  margin: auto;
  border-radius: 0.75rem;
  padding: 1rem;

  @media only screen and (max-width: 768px) {
    width: auto;
  }
`;

const InputContainer = styled(FlexBox)`
  width: 90%;
  border-radius: 0.5rem;
  border: ${props =>
    props.hasError ? `1px solid ${PRIMARY_800}` : `1px solid ${ACCENT_500}`};
  padding: 0.875rem;
  color: ${ACCENT_600};
  font-size: 0.875rem;
  line-height: 24px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  color: ${ACCENT_800};
  font-size: 0.875rem;
  line-height: 24px;
  margin-left: 0.5rem;
`;

const MessageContainer = styled(FlexBox)`
  flex-direction: column;
  background-color: ${PRIMARY_100};
  padding: 1.5rem;
  border-radius: 0.5rem;
`;

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

const LinkCopiedToast = styled(FlexBox)`
  top: 7rem;
  right: 1rem;
  color: ${WHITE};
  font-size: 0.7rem;
  position: absolute;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${ACCENT_800};

  animation: ${CopiedAnimation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
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

const Text = styled.div`
  font-size: 0.875rem;
  line-height: 24px;
  font-weight: 500;
`;

const Message = ({
  setCouponCode,
  referralsExperiment,
  setCurrentReferralState,
  currentReferralState,
  therapist,
  psychiatrist,
}) => {
  const [showCouponCopied, setShowCouponCopied] = useState(false);
  const [isShareEnabled, setIsShareEnabled] = useState(false);
  const [couponCodeData, setCouponCodeData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [number, setNumber] = useState(null);
  const [messageBody, setMessageBody] = useState(null);
  const [messageText, setMessageText] = useState(null);
  const [linkToBook, setLinkToBook] = useState(null);

  const isMobile = useMobileView();
  const user = useSelector(state => state?.auth?.user);

  const showToast = () => {
    setShowCouponCopied(true);
    setTimeout(() => {
      setShowCouponCopied(false);
    }, 3000);
  };

  const handleCopy = () => {
    copyCoupon(messageText);
    if (window.Android) {
      window.Android.copyCoupon(messageText);
      showToast();
    } else if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(`copyText,${messageText}`);
      showToast();
    } else {
      navigator?.clipboard
        ?.writeText(messageText)
        ?.then(() => showToast())
        ?.catch(() => window?.alert?.("Unable to copy"));
    }
  };

  useEffect(() => {
    getCouponCode();
    getShortUrl();
  }, []);

  useEffect(() => {
    if (
      !linkToBook ||
      (user?.mytherapist && !therapist) ||
      (user?.mypsychiatrist && !psychiatrist)
    )
      return;

    let messageHTML = "";
    let messageText = "";

    if (referralsExperiment.value === "v0") {
      if (!couponCodeData) return;
      switch (currentReferralState?.serviceSelected) {
        case "therapist":
          messageHTML = `Hi,<br/>
          Amaha is a mental health platform that wants to help you feel better, get better, and stay better.<br/>
          Your loved one, ${user.name}, has sent you a referral for ${
            therapist?.lastname
              ? `${therapist?.firstname} ${therapist?.lastname}`
              : therapist?.firstname
          }, a therapist at Amaha. Book a session with them by clicking on this link: <a href=${linkToBook}>${linkToBook}</a>.<br/>
          Here's a 55% discount code for you to get started: ${
            couponCodeData?.coupon_code
          }.<br/>
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi,\nAmaha is a mental health platform that wants to help you feel better, get better, and stay better.\nYour loved one, ${
            user.name
          }, has sent you a referral for ${
            therapist?.lastname
              ? `${therapist?.firstname} ${therapist?.lastname}`
              : therapist?.firstname
          }, a therapist at Amaha. Book a session with them by clicking on this link: ${linkToBook}.\nHere's a 55% discount code for you to get started: ${
            couponCodeData?.coupon_code
          }.\n\n- Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;

        case "therapy":
          messageHTML = `Hi,<br/>
          Amaha is a mental health platform that wants to help you feel better, get better, and stay better.<br/> 
          Your loved one, ${user.name}, has sent you a referral for therapy at Amaha. Take the next step and click on this link to find a list of therapists who can help: <a href=${linkToBook}>${linkToBook}</a>.<br/>
          Here's a 55% discount code for you to get started: ${couponCodeData?.coupon_code}.
          <br/>
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi,\nAmaha is a mental health platform that wants to help you feel better, get better, and stay better.\nYour loved one, ${user.name}, has sent you a referral for therapy at Amaha. Take the next step and click on this link to find a list of therapists who can help: ${linkToBook}.\nHere's a 55% discount code for you to get started: ${couponCodeData?.coupon_code}.\n\n- Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;

        case "psychiatrist":
          messageHTML = `Hi,<br/>
          Amaha is a mental health platform that wants to help you feel better, get better, and stay better.<br/>
          Your loved one, ${user.name}, has sent you a referral for ${
            psychiatrist?.lastname
              ? `${psychiatrist?.firstname} ${psychiatrist?.lastname}`
              : psychiatrist?.firstname
          }, a psychiatrist at Amaha. Book a session with them by clicking on this link: <a href=${linkToBook}>${linkToBook}</a>.<br/>
          Here's a 55% discount code for you to get started: ${
            couponCodeData?.coupon_code
          }.<br/>
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi,\nAmaha is a mental health platform that wants to help you feel better, get better, and stay better.\nYour loved one, ${
            user.name
          }, has sent you a referral for ${
            psychiatrist?.lastname
              ? `${psychiatrist?.firstname} ${psychiatrist?.lastname}`
              : psychiatrist?.firstname
          }, a psychiatrist at Amaha. Book a session with them by clicking on this link: ${linkToBook}.\nHere's a 55% discount code for you to get started: ${
            couponCodeData?.coupon_code
          }.\n\n- Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;

        case "psychiatry":
          messageHTML = `Hi,<br/>
          Amaha is a mental health platform that wants to help you feel better, get better, and stay better.<br/>
          Your loved one, ${user.name}, has sent you a referral for psychiatry at Amaha. Take the next step and click on this link to find a list of psychiatrists who can help: <a href=${linkToBook}>${linkToBook}</a>.<br/>
          Here's a 55% discount code for you to get started: ${couponCodeData?.coupon_code}.
          <br/>
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi,\nAmaha is a mental health platform that wants to help you feel better, get better, and stay better.\nYour loved one, ${user.name}, has sent you a referral for psychiatry at Amaha. Take the next step and click on this link to find a list of psychiatrists who can help: ${linkToBook}.\nHere's a 55% discount code for you to get started: ${couponCodeData?.coupon_code}.\n\n- Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;

        case "coach call":
          messageHTML = `Hi,<br/>
          Amaha is a mental health platform that wants to help you feel better, get better, and stay better.<br/>
          I am sending you a referral for a free 20-minute consultation with a mental health coach at Amaha. Your coach will understand your concerns better and create a personalised mental healthcare plan for you. Book your free call today: <a href=${linkToBook}>${linkToBook}</a>.<br/>
          ${user.name}
          <br/>
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)
          `;
          messageText = `Hi,\nAmaha is a mental health platform that wants to help you feel better, get better, and stay better.\nI am sending you a referral for a free 20-minute consultation with a mental health coach at Amaha. Your coach will understand your concerns better and create a personalised mental healthcare plan for you. Book your free call today: ${linkToBook}.\n${user.name}\n\n- Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;
      }
    } else if (referralsExperiment.value === "v1") {
      switch (currentReferralState?.serviceSelected) {
        case "therapist":
          messageHTML = `Hi there,
            <br/>
            I wanted to let you know that you are important to me. It takes a lot of courage to seek help, and I want you to consider booking a session with ${
              therapist?.lastname
                ? `${therapist?.firstname} ${therapist?.lastname}`
                : therapist?.firstname
            }, an excellent therapist at Amaha.<br/> 
            Here's the link to book a session with them: <a href=${linkToBook}>${linkToBook}</a>.
              <br/>
              ${user.name}
              <br/>
              - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi there,
          I wanted to let you know that you are important to me. It takes a lot of courage to seek help, and I want you to consider booking a session with ${
            therapist?.lastname
              ? `${therapist?.firstname} ${therapist?.lastname}`
              : therapist?.firstname
          }, an excellent therapist at Amaha. 
            Here's the link to book a session with them: ${linkToBook}.
            ${user.name}
            - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;
        case "therapy":
          messageHTML = `Hi there,
              <br/>
              I wanted to let you know that you are important to me. It takes a lot of courage to seek help, and I want you to consider booking a therapy session with an expert at Amaha, a digital mental health platform.<br/>
              Here's the link in which you will find a list of therapists: <a href=${linkToBook}>${linkToBook}</a>.
              <br/>
              ${user.name}
              <br/>
              - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi there,
          I wanted to let you know that you are important to me. It takes a lot of courage to seek help, and I want you to consider booking a therapy session with an expert at Amaha, a digital mental health platform. Here's the link in which you will find a list of therapists: ${linkToBook}.
          ${user.name}
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;

        case "psychiatrist":
          messageHTML = `
              Hi there,
              <br/>
              I wanted to let you know that you are important to me. It takes a lot of courage to seek help, and I want you to consider booking a session with ${
                psychiatrist?.lastname
                  ? `${psychiatrist?.firstname} ${psychiatrist?.lastname}`
                  : psychiatrist?.firstname
              }, an excellent psychiatrist at Amaha.<br/> 
              Here's the link to book a session with them: <a href=${linkToBook}>${linkToBook}</a>.<br/>
              ${user.name}
              <br/>
              - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi there,
          I wanted to let you know that you are important to me. It takes a lot of courage to seek help, and I want you to consider booking a session with ${
            psychiatrist?.lastname
              ? `${psychiatrist?.firstname} ${psychiatrist?.lastname}`
              : psychiatrist?.firstname
          }, an excellent psychiatrist at Amaha. 
          Here's the link to book a session with them: ${linkToBook}.
          ${user.name}
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;

        case "psychiatry":
          messageHTML = `
            Hi there,<br/>
            I wanted to let you know that you are important to me. It takes a lot of courage to seek help, and I want you to consider booking a psychiatry session with an expert at Amaha, a digital mental health platform. <br/>
            Here's the link in which you will find a list of psychiatrists: <a href=${linkToBook}>${linkToBook}</a>.<br/>
            ${user.name}
            <br/>
            - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi there,
          I wanted to let you know that you are important to me. It takes a lot of courage to seek help, and I want you to consider booking a psychiatry session with an expert at Amaha, a digital mental health platform.
          Here's the link in which you will find a list of psychiatrists ${linkToBook}.
          ${user.name}
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;

        case "coach call":
          messageHTML = `Hi,<br/>
          Amaha is a mental health platform that wants to help you feel better, get better, and stay better.<br/>
          I am sending you a referral for a free 20-minute consultation with a mental health coach at Amaha. Your coach will understand your concerns better and create a personalised mental healthcare plan for you. Book your free call today: <a href=${linkToBook}>${linkToBook}</a>.
          <br/>
          ${user.name}
          <br/>
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;

          messageText = `Hi
          Amaha is a mental health platform that wants to help you feel better, get better, and stay better. I am sending you a referral for a free 20-minute consultation with a mental health coach at Amaha. Your coach will understand your concerns better and create a personalised mental healthcare plan for you. Book your free call today: ${linkToBook}.
          ${user.name}
          - Amaha (MINDCRESCENT WELLNESS VENTURES PRIVATE LIMITED)`;
          break;
      }
    }
    setMessageText(messageText);
    setMessageBody(messageHTML);
    setCurrentReferralState({
      ...currentReferralState,
      messageText,
    });
  }, [user, couponCodeData, linkToBook, therapist, psychiatrist]);

  useEffect(() => {
    if (number?.length === 10) {
      setIsShareEnabled(true);
    } else {
      setIsShareEnabled(false);
    }
  }, [number]);

  const sendSMS = async () => {
    try {
      const referral = {
        id: couponCodeData?.referral_id,
        mobile_number: number,
        country_code: "91",
        sms_text: messageText,
      };

      if (currentReferralState?.providerId) {
        referral.provider_id = `${currentReferralState?.providerId}`;
      }
      const res = await axiosInstance.put(
        `${urls.sendSMS}/${couponCodeData?.referral_id}`,
        { referral }
      );
      if (res?.data?.status?.code === 200) {
        trackEvent({
          event: "teleref_send_success",
          payload: {
            flow: currentReferralState.flow,
            platform: window.ReactNativeWebView
              ? "ios_app"
              : window.Android
              ? "android_app"
              : "website",
            service_selected: currentReferralState?.serviceSelected,
          },
        });
        setCurrentReferralState({ ...currentReferralState, step: 4 });
        setCouponCode(res?.data?.data?.coupon_code);
      }
    } catch (error) {
      if (error.response?.data?.status.code === 422) {
        setErrorMessage(error.response?.data?.status.message[0]);
      }
    }
  };

  const onMobileShare = async () => {
    shareProvider("", messageText, linkToBook);

    if (window.Android) {
      window.Android.shareProvider("", messageText, linkToBook);
      return;
    }

    if (window.ReactNativeWebView) {
      const data = JSON.stringify({
        subject: "",
        message: messageText,
        url: linkToBook,
      });

      window.ReactNativeWebView.postMessage(`shareProvider,${data}`);
      return;
    }

    try {
      await navigator?.share?.({
        title: " ",
        text: messageText,
        url: linkToBook,
      });
    } catch (error) {
      console.log("Error while referring", error);
      Bugsnag.notify(error);
    }
  };

  const getCouponCode = async () => {
    try {
      const res = await axiosInstance.get(urls.getRefreeCouponCode);
      setCouponCodeData(res.data);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const getShortUrl = async () => {
    try {
      let params = {};
      if (
        currentReferralState?.serviceSelected === "psychiatry" ||
        currentReferralState?.serviceSelected === "therapy"
      ) {
        params.page = currentReferralState?.serviceSelected;
      }

      if (currentReferralState?.serviceSelected === "coach call") {
        params.page = "coach";
      }

      if (
        currentReferralState?.serviceSelected === "psychiatrist" ||
        currentReferralState?.serviceSelected === "therapist"
      ) {
        params.provider_id = currentReferralState?.providerId;
      }

      const res = await axiosInstance.get(urls.getShortLink, {
        params,
      });
      setLinkToBook(res?.data?.short_url);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const getContacts = async () => {
    const props = ["tel"];
    const opts = { multiple: false };
    try {
      const contact = await navigator.contacts.select(props, opts);
      setNumber(
        contact?.[0]?.tel?.[0]?.replace(/^\+[0-9]{1,3}(\s|\-)|(\s|\-)/g, "") ||
          null
      );
    } catch (error) {
      alert("Not supported in this browser");
      Bugsnag.notify(error);
    }
  };

  const showContactPicker =
    isMobile &&
    !window?.Android &&
    !window?.ReactNativeWebView &&
    "contacts" in window?.navigator &&
    "select" in window?.navigator?.contacts;

  const cardHeight = referralsExperiment.value === "v0" ? "32.875rem" : "34rem";

  if (referralsExperiment.source !== "experiment") {
    return null;
  }

  return (
    <>
      <MessageCard column rowGap="1rem" height={cardHeight}>
        <FlexBox columnGap="1.1rem" align="center">
          <img src="https://cdn.theinnerhour.com/assets/images/referral-card-visual.svg" />
          <Title bold>Your loved one’s details</Title>
        </FlexBox>
        {referralsExperiment.value === "v0" && (
          <>
            <FlexBox column>
              <H6 color={PRIMARY_700}>Here’s the message they will get:</H6>
              <Text>{ReactHtmlParser(messageBody)}</Text>
              {/* <Text dangerouslySetInnerHTML={{ __html: messageBody }}></Text> */}
            </FlexBox>
            <H6 color={PRIMARY_700}>
              Enter your loved one’s mobile number on which they will recieve
              this message
            </H6>
            <FlexBox column>
              <InputContainer hasError={errorMessage}>
                +91
                <Input
                  type="tel"
                  value={number}
                  onChange={e => {
                    setErrorMessage(null);
                    setNumber(e.target.value);
                  }}
                />
                {showContactPicker && (
                  <FiBook
                    size="1.25rem"
                    color={PRIMARY_800}
                    onClick={getContacts}
                  />
                )}
              </InputContainer>
              {errorMessage && <H6 color={PRIMARY_800}>{errorMessage}</H6>}
            </FlexBox>
          </>
        )}

        {referralsExperiment.value === "v1" && (
          <>
            <FlexBox justify="space-between">
              <H5 color={PRIMARY_700}>Curated Message:</H5>
              <TextCTA
                color={PRIMARY_800}
                onClick={() => {
                  trackEvent({
                    event: "teleref_copy_click",
                    payload: {
                      flow: currentReferralState.flow,
                      platform: window.ReactNativeWebView
                        ? "ios_app"
                        : window.Android
                        ? "android_app"
                        : "website",
                      card: "share message",
                    },
                  });
                  handleCopy();
                }}
              >
                <FlexBox align="center" columnGap="0.5rem">
                  Copy
                  <FiCopy strokeWidth="2.5" color={PRIMARY_800} />
                </FlexBox>
              </TextCTA>
            </FlexBox>
            <MessageContainer>
              <Text>{ReactHtmlParser(messageBody)}</Text>
              {/* <Text dangerouslySetInnerHTML={{ __html: messageBody }}></Text> */}
            </MessageContainer>
          </>
        )}

        <CTAContainer align="center" justify="space-between">
          {referralsExperiment.value === "v0" && (
            <>
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
                      card: "phone number",
                    },
                  });
                  setCurrentReferralState({ ...currentReferralState, step: 2 });
                }}
              >
                BACK
              </TextCTA>
              <TextButton
                color={PRIMARY_800}
                disabled={!isShareEnabled}
                Icon={() => {
                  return null;
                }}
                onClick={sendSMS}
              >
                SEND MESSAGE
              </TextButton>
            </>
          )}
          {referralsExperiment.value === "v1" && (
            <>
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
                      card: "share message",
                    },
                  });
                  setCurrentReferralState({ ...currentReferralState, step: 2 });
                }}
              >
                BACK
              </TextCTA>
              <TextCTA
                color={PRIMARY_800}
                onClick={() => {
                  if (isMobile) {
                    trackEvent({
                      event: "teleref_share_message_click",
                      payload: {
                        flow: currentReferralState.flow,
                        platform: window.ReactNativeWebView
                          ? "ios_app"
                          : window.Android
                          ? "android_app"
                          : "website",
                        card: "share message",
                      },
                    });
                    onMobileShare();
                  }
                  setCurrentReferralState({ ...currentReferralState, step: 4 });
                }}
              >
                {isMobile ? "Share Message" : "Done"}
              </TextCTA>
            </>
          )}
        </CTAContainer>
        {showCouponCopied && (
          <LinkCopiedToast onClick={e => e.stopPropagation()}>
            message copied
          </LinkCopiedToast>
        )}
      </MessageCard>
    </>
  );
};

export default Message;
