import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FiX } from "react-icons/fi";

import Modal from "@common/ui/Modal";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_400, WHITE } from "@common/ui/colors";
import { Button } from "@common/ui/Buttons";
import { H3 } from "@common/ui/Headings";
import ClientInfo from "./ClientInfo";
import ReasonSelector from "./ReasonSelector";
import RecommendRescheduling from "./RecommendRescheduling";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const ModalHeader = styled(FlexBox)`
  padding: 1rem 1rem 1rem 1.5rem;
  justify-content: space-between;
  border-bottom: 1px solid ${ACCENT_400};
`;

const CloseIconWrapper = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ModalBody = styled(FlexBox)`
  height: calc(100% - 4rem);
  @media screen and (max-width: 768px) {
    flex-direction: column;
    overflow-y: scroll;
  }
`;

const HideDesktop = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1.5rem 10rem;
    gap: 2rem;
  }
`;

const HideMobile = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ModalFooter = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid ${ACCENT_400};
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  z-index: 5;
  background-color: ${WHITE};
  height: 5rem;

  @media screen and (max-width: 768px) {
    padding: 0.5rem 1.5rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    height: auto;
    border: none;
  }
`;

const Left = styled(FlexBox)`
  height: 100%;
  padding: 1rem 1.5rem 6rem;
  flex: 1;
  max-width: 50%;
  border-right: 1px solid ${ACCENT_400};
  overflow-y: scroll;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const Right = styled(FlexBox)`
  height: 100%;
  max-width: 50%;
  padding: 1.5rem 1.5rem 6.5rem;
  flex: 1;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const Buttons = styled(Button)`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CancelSession = ({
  bookingDetails,
  toggleModal,
  reloadSessionList,
  toggleRescheduleModal,
}) => {
  const initialReason = {
    value: "--not selected--",
    label: "--Not Selected--",
  };

  const [cancellationReasonText, setCancellationReasonText] = useState(null);
  const [reasonValue, setReasonValue] = useState(initialReason);

  const handleCancelSession = () => {
    // TODO - Add logic to cancel the session
    setTimeout(() => {
      reloadSessionList();
    }, 1000);

    toggleModal?.();
  };

  const handleRescheduleClick = () => {
    toggleModal?.();
    toggleRescheduleModal?.();
  };

  const isCTADisabled = !(reasonValue?.value !== initialReason?.value);

  return (
    <Modal M1 borderRadius="1rem" togglePopup={toggleModal}>
      <Wrapper>
        <ModalHeader>
          <H3 bold>Cancel Session</H3>
          <CloseIconWrapper onClick={toggleModal}>
            <FiX />
          </CloseIconWrapper>
        </ModalHeader>
        <ModalBody>
          <HideMobile>
            <Left column rowGap="1.5rem" className="hide-scrollbar">
              <ClientInfo bookingDetails={bookingDetails} />
              <RecommendRescheduling />
            </Left>
            <Right column rowGap="1.5rem">
              <ReasonSelector
                cancellationReasonText={cancellationReasonText}
                setCancellationReasonText={setCancellationReasonText}
                reasonValue={reasonValue}
                setReasonValue={setReasonValue}
              />
            </Right>
          </HideMobile>
          <HideDesktop>
            <ClientInfo bookingDetails={bookingDetails} />
            <ReasonSelector
              cancellationReasonText={cancellationReasonText}
              setCancellationReasonText={setCancellationReasonText}
              reasonValue={reasonValue}
              setReasonValue={setReasonValue}
            />
            <RecommendRescheduling />
          </HideDesktop>
        </ModalBody>
        <ModalFooter>
          <Buttons secondary outline onClick={handleRescheduleClick}>
            RESCHEDULE
          </Buttons>
          <Buttons
            danger
            onClick={handleCancelSession}
            disabled={isCTADisabled}
          >
            CONFIRM CHANGES
          </Buttons>
        </ModalFooter>
      </Wrapper>
    </Modal>
  );
};

export default CancelSession;
