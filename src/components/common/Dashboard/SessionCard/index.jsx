import dynamic from "next/dynamic";
import React, { useState } from "react";
import { FiMoreHorizontal, FiX } from "react-icons/fi";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import RescheduleSession from "@components/Dashboard/RescheduleSession";
import ViewLocationModal from "@components/Dashboard/ViewLocationModal";
import {
  BRICK_TERRACOTA,
  DAVYS_GREY_100,
  DAVYS_GREY_400,
  DAVYS_GREY_700,
  DAVYS_GREY_800,
  PRIMARY_400,
  PRIMARY_800,
  WHITE,
} from "@common/ui/colors";
import dayjs from "dayjs";
import { Button } from "../Buttons";
import { Body2, Support } from "../Headings";
import SessionOptionsDropdown from "./SessionOptionsDropdown";
import CancelSession from "@components/Dashboard/CancelSession";

const dummySessionDetails = {
  providerName: "Pratistha Trivedi Mirza",
  sessionTime: "2023-09-08T08:30:00.000Z",
  sessionType: "single",
  sessionMode: "in-person",
  sessionDuration: 1800,
};

const ChangeSessionMode = dynamic(
  () => import("../../../Dashboard/ChangeSessionMode"),
  { ssr: false }
);

const Card = styled(FlexBox)`
  border-radius: 0.5rem;
  background: ${({ isNsp }) => (isNsp ? BRICK_TERRACOTA : DAVYS_GREY_100)};
  border: ${({ isNsp }) =>
    isNsp ? `1px dashed ${PRIMARY_800}` : `1px solid ${DAVYS_GREY_400}`};
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const ProviderImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const commonIconProps = {
  size: "1.5rem",
  cursor: "pointer",
  color: DAVYS_GREY_800,
};

const SessionDetails = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  grid-gap: 1em;
  div:nth-child(2) {
    justify-self: center;
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    div:nth-child(2) {
      justify-self: end;
      align-items: flex-end;
    }
    div:last-child {
      grid-column: span 2;
      justify-content: center;
    }
    ${Button} {
      width: 100%;
    }
  }
`;

const RoundedCloseIcon = styled.div`
  display: flex;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  background: ${WHITE};
  border-radius: 2.5rem;
  border: 1px solid ${PRIMARY_400};
`;

const NSPText = styled(Support)`
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const RelativeDiv = styled(FlexBox)`
  row-gap: 1rem;
  position: relative;
`;

const SessionIcon = styled.div`
  cursor: pointer;
`;

const SessionCard = ({ session, isNsp }) => {
  const [showSessionOptions, setShowSessionOptions] = useState(false);
  const [showViewLocationModal, setShowViewLocationModal] = useState(false);
  const [showRescheduleScreen, setShowRescheduleScreen] = useState(false);

  const [showChangeSessionModeModal, setShowChangeSessionModeModal] =
    useState(false);

  const handleChangeSessionModal = () => {
    setShowChangeSessionModeModal(!showChangeSessionModeModal);
  };

  const toggleSessionOptions = () => setShowSessionOptions(!showSessionOptions);
  const toggleViewLocationModal = () =>
    setShowViewLocationModal(!showViewLocationModal);

  const toggleShowRescheduleScreen = () =>
    setShowRescheduleScreen(!showRescheduleScreen);

  const providerName = session.provider?.firstname + session.provider?.lastname;
  return (
    <RelativeDiv column>
      {showSessionOptions && (
        <SessionOptionsDropdown
          toggleDropdown={toggleSessionOptions}
          bookingId={session?.id}
          handleChangeSessionModal={handleChangeSessionModal}
          toggleShowRescheduleScreen={toggleShowRescheduleScreen}
        />
      )}
      {showViewLocationModal && (
        <ViewLocationModal
          toggleModal={toggleViewLocationModal}
          // clinicDetails={clinicDetails}    // TODO: Add clinicDetails
        />
      )}

      {false && (
        <RescheduleSession
          handleOnClose={toggleShowRescheduleScreen}
          bookingDetails={session}
          // reloadSessionList={reloadSessionList}
        />
      )}

      {true && (
        <CancelSession
          handleOnClose={toggleShowRescheduleScreen}
          bookingDetails={session}
          // reloadSessionList={reloadSessionList}
        />
      )}

      {showChangeSessionModeModal && (
        <ChangeSessionMode
          handleChangeSessionModal={handleChangeSessionModal}
          sessionDetails={dummySessionDetails} // TODO PK: Add session details
        />
      )}
      <Card column isNsp={isNsp}>
        <FlexBox align="center" justify="space-between" width="100%">
          <FlexBox align="center" columnGap="0.5rem">
            <ProviderImg src="https://cdn.theinnerhour.com/assets/images/avatar_flower_1.png" />
            <FlexBox column justify="center" padding="0 1rem" rowGap="0.5rem">
              <Support color={DAVYS_GREY_700} textTransform="capitalize">
                {session.provider_role} session with
              </Support>
              <Body2 bold>{providerName || "Varsha Shinde"}</Body2>
            </FlexBox>
          </FlexBox>
          {!isNsp && (
            <FlexBox>
              <FiMoreHorizontal
                {...commonIconProps}
                onClick={toggleSessionOptions}
              />
            </FlexBox>
          )}
        </FlexBox>
        <SessionDetails>
          <FlexBox column rowGap="0.5rem">
            <Body2 bold>
              {dayjs(session.datetime_at_customer_timezone.datetime).format(
                "DD MMM YYYY"
              )}
              ,
            </Body2>
            <Support bold>
              {dayjs(
                session.datetime_at_customer_timezone.slot,
                "HH:mm"
              ).format("hh:mm A")}
            </Support>
          </FlexBox>
          <FlexBox column justify="center" rowGap="0.5rem">
            <SessionIcon>
              <img
                src="/assets/images/dashboard/icon-offline.svg"
                width={24}
                onClick={toggleViewLocationModal}
                cursor="pointer"
              />
            </SessionIcon>
            <Support bold>{session.duration / 60} mins</Support>
          </FlexBox>
          <FlexBox align="center" justify="flex-end" columnGap="0.5rem">
            {isNsp ? <Button>BOOK</Button> : <Button>JOIN</Button>}
            {isNsp && (
              <RoundedCloseIcon id="session-options">
                <FiX
                  color={PRIMARY_800}
                  size="1rem"
                  cursor="pointer"
                  strokeWidth={3}
                />
              </RoundedCloseIcon>
            )}
          </FlexBox>
        </SessionDetails>
      </Card>
      {isNsp && (
        <NSPText>
          Please ensure that you book this session before 08 Jan 2021, 04:35 PM.
        </NSPText>
      )}
    </RelativeDiv>
  );
};

export default SessionCard;
