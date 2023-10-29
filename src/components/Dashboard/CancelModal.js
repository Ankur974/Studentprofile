import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useMobileView from "@hooks/useMobileView";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import axiosInstance from "@axiosInstance";
import urls from "@urls";
import { Modal } from "@common/Modal";
import { Text } from "@common/Text";
import { Button } from "@common/Button";
import FlexBox from "@common/ui/FlexBox";
import { openLink } from "@utils/helpers";
import {
  SECONDARY_800,
  ACCENT_200,
  PRIMARY_800,
  WHITE,
  SEA_BLUE,
  SECONDARY_600,
  SECONDARY_700,
  ACCENT_800,
  ACCENT_400,
} from "@common/ui/colors";
import { FiPhone, FiMessageCircle, FiVideo } from "react-icons/fi";
import { isVerifiedCorporateUser } from "@utils/helpers";
import { useSelector } from "react-redux";
dayjs.extend(advancedFormat);

const Content = styled.div`
  background-color: #fefefe;
  overflow: auto;
  border-radius: 12px;
  padding: 0 1rem 0 1rem;
  max-height: fit-content;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 1rem;
    width: 90%;
  }
`;

const StyledModal = styled(Modal)`
  .custom-scrollbar {
    margin: 1rem auto;

    ::-webkit-scrollbar-track {
      background-color: #d9d9d9;
    }
    ::-webkit-scrollbar {
      display: block;
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: ${PRIMARY_800};
    }
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  background-color: #fefefe;
  overflow: auto;
  border-radius: 12px;
  padding: 0 0.5rem;
  max-height: fit-content;
  position: relative;
  width: 36rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const SessionCard = styled.div`
  padding: 1rem;
  border-radius: 12px;
  width: 12rem;
  height: 2rem;
  margin: 0 auto;
  border: 1px solid ${SECONDARY_700};
  display: flex;
  align-items: center;
  background-color: ${ACCENT_200};
`;

const SessionCardNew = styled.div`
  padding: 1rem;
  border-radius: 12px;
  width: 100%;
  height: 5.25rem;
  margin: 0 auto;
  border: 1px solid ${ACCENT_400};
  display: flex;
  align-items: center;
  background-color: ${ACCENT_200};
  box-sizing: border-box;
`;

const SessionDetails = styled.div`
  margin-left: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${props =>
    props.hideReschedule ? "center" : "space-between"};
  margin-top: 24px;
  padding: 1rem 0 1rem 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 1rem 1.25rem;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Ul = styled.ul`
  margin: 0;
`;

const Li = styled.li`
  font-size: 0.875rem;
  line-height: 24px;
  font-weight: 500;
  color: ${ACCENT_800};
  margin: 0.25rem auto;
`;

const LinkToPolicy = styled.div`
  color: ${ACCENT_800};
  padding-bottom: 0.5rem;
  text-decoration: underline;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const CancelModal = ({
  item,
  toggleModal,
  tracker,
  cancellationOption,
  ContentIndex,
  confirmToggle,
  providerDetails,
  providerType,
  isPackagingFlow,
  isFirstSession,
  setShowOfflineModal,
  providerPublicProfile,
}) => {
  const isMobile = useMobileView();
  const router = useRouter();
  const user = useSelector(state => state.auth.user);
  const index = ContentIndex();
  const cancelSession = async () => {
    try {
      const payload = {
        booking_id: item.id,
        session_cancel_by: "patient",
        cash_refund: false,
        session_cancelled_on: window.Android
          ? "ANDROID_APP"
          : window.ReactNativeWebView
          ? "IOS_APP"
          : "website",
      };
      await axiosInstance.post(`${urls.cancelSession}`, payload);
      tracker("therapy_psychiatry_cancel_confirm");
      handleConfirm();
    } catch (error) {
      console.log("Error while cancelling session", error);
    }
  };
  const rescheduleSession = () => {
    tracker("session_reschedule_flow_start");
    if (
      providerPublicProfile?.offline_offering?.[0] &&
      !isVerifiedCorporateUser(user)
    ) {
      setShowOfflineModal(true);
    } else {
      const query = {
        providerUuid: providerDetails.uuid,
        providerType: providerType,
        isFirstSession,
        isReschedule: true,
      };
      if (
        isVerifiedCorporateUser(user) &&
        !!item.ih_clinic_id &&
        item.typeofsession === "offline"
      ) {
        query.clinic_id = item.ih_clinic_id;
      }
      router.push({
        pathname: `/booking/reschedule/${item.id}`,
        query,
      });
    }
  };
  const CancellationContent = [
    {
      heading: "Reschedule instead?",
      desc: "You can reschedule the session upto 12 hours before the session. If you cancel, the refund will be credited to your account as session credit",
      ctaCancel: "cancel anyway",
      ctaConfirm: "RESCHEDULE",
      colorCancelCta: PRIMARY_800,
      colorCancelConfirm: SEA_BLUE,
      ctaCancelFunc: cancelSession,
      ctaConfirmFunc: rescheduleSession,
    },
    {
      heading: "Reschedule Session?",
      desc: `Are you sure you want to reschedule the ${
        item.duration / 60
      } mins session scheduled on ${dayjs(
        item.datetime_at_customer_timezone?.datetime || item.date
      ).format("Do MMM, YYYY")} ${dayjs(
        item.datetime_at_customer_timezone?.datetime || item.date
      ).format("hh:mm A")}? `,
      ctaConfirm: "RESCHEDULE",
      ctaCancel: "back",
      colorCancelCta: SEA_BLUE,
      colorCancelConfirm: "RGBA(24, 42, 136, 0.8)",
      ctaCancelFunc: toggleModal,
      ctaConfirmFunc: rescheduleSession,
    },
    {
      heading: "Are you sure you want to\ncancel this session?",
      desc: "Please note that you will not receive a credit for sessions that are cancelled less than 12 hours before the scheduled time.",
      ctaCancel: "DON’T CANCEL",
      ctaConfirm: "YES, CANCEL",
      colorCancelCta: PRIMARY_800,
      colorCancelConfirm: PRIMARY_800,
      ctaCancelFunc: toggleModal,
      ctaConfirmFunc: cancelSession,
    },
    {
      heading: "Are you sure you want to cancel this session?",
      desc: "Please note that you will not receive a credit for sessions that are cancelled less than 12 hours before the scheduled time.",
      substr: null,
      ctaCancel: "DON’T CANCEL",
      ctaConfirm: "YES, CANCEL",
      colorCancelCta: PRIMARY_800,
      colorCancelConfirm: PRIMARY_800,
      ctaCancelFunc: toggleModal,
      ctaConfirmFunc: cancelSession,
    },
    {
      heading: "Reschedule instead?",
      desc: "You can reschedule the session upto 12 hours before the session.\n",
      substr:
        "If you cancel, the refund will be credited to your account as\n session credit.",
      ctaCancel: "CANCEL",
      ctaConfirm: "RESCHEDULE",
      colorCancelCta: PRIMARY_800,
      colorCancelConfirm: SECONDARY_800,
      ctaCancelFunc: cancelSession,
      ctaConfirmFunc: rescheduleSession,
    },
    {
      heading: "Cancel Session?",
      desc: "Are you sure you want to cancel this session?",
      ctaCancel: "CANCEL",
      ctaConfirm: "GO BACK",
      colorCancelCta: PRIMARY_800,
      colorCancelConfirm: SECONDARY_800,
      ctaCancelFunc: cancelSession,
      ctaConfirmFunc: toggleModal,
    },
  ];
  const handleConfirm = () => {
    toggleModal(isMobile ? false : true);
    confirmToggle();
  };

  if (index === 3 || index === 2) {
    return (
      <StyledModal
        isMobile={isMobile}
        onClose={toggleModal}
        showFooter={false}
        showHeader={false}
        bold
        closeIcon={false}
        togglePopup={toggleModal}
        noOverflow={!isMobile}
        scrollbar={isMobile}
      >
        <Container>
          <Text
            whiteSpace="break-spaces"
            fontSize="1.25rem"
            block
            bold
            lineHeight="28px"
            margin={isMobile ? "0.5rem 0" : "1.5rem 0 0.5rem 0"}
          >
            {CancellationContent[index].heading}
          </Text>
          <FlexBox column rowGap={isMobile ? "1.5rem" : "2rem"}>
            <Text
              whiteSpace="break-spaces"
              fontSize="0.85rem"
              block
              spacing="0.30px"
              lineHeight="1.2rem"
            >
              {CancellationContent[index].desc}
              <b>{CancellationContent[index].substr}</b>
            </Text>
            <FlexBox column rowGap="0.5rem">
              <Text>We’d recommend you to not cancel, because:</Text>
              <Ul>
                <Li>
                  being consistent with your sessions will help you make
                  progress
                </Li>
                <Li>
                  it is important to stick to your commitment to the recovery
                  journey
                </Li>
                <Li>
                  your mental health provider has already blocked this time for
                  you
                </Li>
              </Ul>
            </FlexBox>
            <SessionCardNew>
              {item.typeofsession === "live" ? (
                <FiVideo color={SECONDARY_600} size="2rem" />
              ) : item.typeofsession === "voice" ? (
                <FiPhone color={SECONDARY_600} size="2rem" />
              ) : item.typeofsession === "offline" ? (
                <img src="https://cdn.theinnerhour.com/assets/images/icon-inperson-filled.svg" />
              ) : (
                <FiMessageCircle color={SECONDARY_600} size="2rem" />
              )}
              <SessionDetails>
                <Text fontSize="0.875rem" block bold>
                  {dayjs(
                    item.datetime_at_customer_timezone?.datetime || item.date
                  ).format("Do MMM, YYYY")}
                </Text>
                <Text
                  fontSize="0.875rem"
                  block
                  lineHeight="24px"
                  fontWeight="500"
                  margin="0.2rem 0 0 0"
                >{`${dayjs(
                  item.datetime_at_customer_timezone?.datetime || item.date
                ).format("hh:mm A")} | ${item.duration / 60} Mins`}</Text>
              </SessionDetails>
            </SessionCardNew>
            {isMobile && (
              <FlexBox align="center" justify="center">
                <LinkToPolicy
                  onClick={() => {
                    openLink("/cancellation-policy/");
                  }}
                >
                  Cancellation Policy
                </LinkToPolicy>
              </FlexBox>
            )}
            <ButtonWrapper>
              <Button
                backgroundColor={WHITE}
                color={SECONDARY_800}
                border={`1px solid ${SECONDARY_800}`}
                onClick={CancellationContent[index].ctaCancelFunc}
              >
                {CancellationContent[index].ctaCancel}
              </Button>
              <Button
                backgroundColor={CancellationContent[index].colorCancelConfirm}
                onClick={CancellationContent[index].ctaConfirmFunc}
              >
                {CancellationContent[index].ctaConfirm}
              </Button>
            </ButtonWrapper>
          </FlexBox>
          {!isMobile && (
            <FlexBox align="center" justify="center">
              <LinkToPolicy
                onClick={() => {
                  openLink("/cancellation-policy/");
                }}
              >
                Cancellation Policy
              </LinkToPolicy>
            </FlexBox>
          )}
        </Container>
      </StyledModal>
    );
  }

  return (
    <>
      <Modal
        isMobile={isMobile}
        onClose={toggleModal}
        showFooter={false}
        width="30rem"
        showHeader={true}
        title={!isMobile && CancellationContent[index].heading}
        bold
        closeIcon={!isMobile}
        togglePopup={toggleModal}
        imgHeader={isMobile}
        headerSrc="https://cdn.theinnerhour.com/assets/images/back-modal-img.svg"
        coverTop={isMobile}
        noOverflow
        backgroundClickDisabled={!isMobile}
      >
        <Content>
          {isMobile ? (
            <>
              <Text fontSize="1.1rem" bold>
                {CancellationContent[index].heading}
              </Text>
              <br />
              <Text
                fontSize="0.8rem"
                lineHeight="1.125rem"
                block
                margin="0.8rem 0 0 0"
              >
                {CancellationContent[index].desc}
              </Text>

              <FlexBox
                column={index === 0}
                justify="space-between"
                align="flex-end"
                padding={isMobile ? "1rem 0 0" : "1rem 0"}
                index={index}
                margin={index === 0 ? "0.5rem 0 0" : "1rem 0 0"}
                rowGap="1.25rem"
              >
                <>
                  <Text
                    fontSize="1.1rem"
                    block
                    textTransform="uppercase"
                    cursor="pointer"
                    onClick={CancellationContent[index].ctaConfirmFunc}
                    spacing="1.22px"
                    color={CancellationContent[index].colorCancelConfirm}
                  >
                    {CancellationContent[index].ctaConfirm}
                  </Text>
                </>

                <>
                  <Text
                    fontSize="1.1rem"
                    textTransform="uppercase"
                    color={CancellationContent[index].colorCancelCta}
                    onClick={CancellationContent[index].ctaCancelFunc}
                    cursor="pointer"
                    spacing="1.22px"
                    block={index === 0}
                  >
                    {CancellationContent[index].ctaCancel}
                  </Text>
                </>
              </FlexBox>
            </>
          ) : (
            <>
              <SessionCard>
                {item.typeofsession === "live" ? (
                  <FiVideo color={SECONDARY_700} size="2rem" />
                ) : item.typeofsession === "voice" ? (
                  <FiPhone color={SECONDARY_700} size="2rem" />
                ) : item.typeofsession === "offline" ? (
                  <img src="https://cdn.theinnerhour.com/assets/images/icon-inperson-filled.svg" />
                ) : (
                  <FiMessageCircle color={SECONDARY_700} size="2rem" />
                )}
                <SessionDetails>
                  <Text fontSize="0.75rem" block bold>
                    {dayjs(
                      item.datetime_at_customer_timezone?.datetime || item.date
                    ).format("Do MMM, YYYY")}
                  </Text>
                  <Text
                    fontSize="0.75rem"
                    block
                    bold
                    margin="0.2rem 0 0 0 "
                  >{`${dayjs(
                    item.datetime_at_customer_timezone?.datetime || item.date
                  ).format("hh:mm A")} | ${item.duration / 60} Mins`}</Text>
                </SessionDetails>
              </SessionCard>
              <Text
                whiteSpace="break-spaces"
                fontSize="0.85rem"
                block
                spacing="0.30px"
                lineHeight="1.2rem"
                margin="2rem 0 1rem 0"
              >
                {CancellationContent[index].desc}
                <b>{CancellationContent[index].substr}</b>
              </Text>
              <ButtonContainer>
                <Button
                  width="11.5rem"
                  backgroundColor={WHITE}
                  color={index === 3 ? SECONDARY_800 : PRIMARY_800}
                  border={`1px solid ${
                    index === 3 ? SECONDARY_800 : PRIMARY_800
                  }`}
                  onClick={CancellationContent[index].ctaCancelFunc}
                >
                  {CancellationContent[index].ctaCancel}
                </Button>

                <Button
                  width="11rem"
                  backgroundColor={
                    CancellationContent[index].colorCancelConfirm
                  }
                  onClick={CancellationContent[index].ctaConfirmFunc}
                >
                  {CancellationContent[index].ctaConfirm}
                </Button>
              </ButtonContainer>
            </>
          )}
        </Content>
      </Modal>
    </>
  );
};

CancelModal.defaultProps = {
  tracker: () => {},
};

export default CancelModal;
