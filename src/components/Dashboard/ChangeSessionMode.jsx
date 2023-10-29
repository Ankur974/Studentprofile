import { useEffect, useState } from "react";
import { FiMessageCircle, FiPhone, FiVideo, FiX } from "react-icons/fi";
import styled from "styled-components";

import { Button } from "@common/Dashboard/Buttons";
import { H3, Support } from "@common/Dashboard/Headings";
import { Modal } from "@common/Dashboard/Modal";
import { IconChip } from "@common/Dashboard/SelectionChip";
import SessionInfoCard from "@common/Dashboard/SessionInfoCard";
import FlexBox from "@common/ui/FlexBox";
import { DAVYS_GRAY_400 } from "@common/ui/colors";

const sessionModeItems = [
  {
    id: 1,
    name: "Video",
    sessionMode: "live",
    icon: FiVideo,
  },
  {
    id: 2,
    name: "Call",
    sessionMode: "voice",
    icon: FiPhone,
  },
  {
    id: 3,
    name: "Chat",
    sessionMode: "chat",
    icon: FiMessageCircle,
  },
];

const ModalBody = styled(FlexBox)`
  padding: 1.5rem;
`;

const ModalTitle = styled(FlexBox)`
  display: none;
  @media only screen and (max-width: 768px) {
    display: flex;
    padding: 1.5rem;
    border-bottom: 1px solid ${DAVYS_GRAY_400};
  }
`;

const ModalFooter = styled(FlexBox)`
  padding: 0 1.5rem 1.5rem;
  @media only screen and (max-width: 768px) {
    position: relative;
    margin-top: auto;
    justify-content: center;
  }
`;

const MobileView = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
    justify-content: space-between;
    position: absolute;
    width: 90%;
    bottom: 1.5rem;
    margin-left: 0;
  }
`;

const DesktopView = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ChangeSessionMode = ({ handleChangeSessionModal, sessionDetails }) => {
  const [availableSessionModes, setAvailableSessionModes] = useState([]);
  const [selectedSessionMode, setSelectedSessionMode] = useState(null);

  const isCoupleSession = sessionDetails?.sessionType === "couple";

  useEffect(() => {
    if (isCoupleSession) {
      setAvailableSessionModes([
        {
          id: 1,
          name: "Video",
          sessionMode: "live",
          icon: FiVideo,
        },
      ]);
    } else {
      setAvailableSessionModes(filterSessionModes(sessionDetails?.sessionMode));
    }
  }, [sessionDetails]);

  const filterSessionModes = currentSessionMode => {
    if (currentSessionMode === "in-person") {
      return [...sessionModeItems];
    } else {
      return [
        ...sessionModeItems.filter(
          item => item.sessionMode !== currentSessionMode
        ),
      ];
    }
  };

  const handleSelectSessionMode = sessionMode => {
    setSelectedSessionMode(sessionMode);
  };

  const handleConfirm = () => {
    alert("session mode changed");
    handleChangeSessionModal();
  };

  return (
    <Modal XS height="fit-content" width="30rem">
      <ModalTitle justify="space-between" align="center">
        <H3 bold>Session Details</H3>
        <FiX cursor="pointer" onClick={handleChangeSessionModal} />
      </ModalTitle>
      <ModalBody column rowGap="1rem">
        <SessionInfoCard sessionType="live" sessionDetails={sessionDetails} />
        <H3 bold>Change session mode to</H3>
        <FlexBox columnGap="1rem">
          {availableSessionModes.map(sessionMode => {
            const isSelected = selectedSessionMode?.id === sessionMode?.id;
            return (
              <IconChip
                key={sessionMode?.id}
                selected={isSelected}
                Icon={sessionMode?.icon}
                onClick={() => handleSelectSessionMode(sessionMode)}
              >
                {sessionMode?.name}
              </IconChip>
            );
          })}
        </FlexBox>
        <Support>
          Please note: Virtual sessions cannot be changed to in-person sessions.
        </Support>
      </ModalBody>
      <ModalFooter>
        <MobileView>
          <Button
            width="100%"
            primary
            onClick={handleConfirm}
            disabled={!selectedSessionMode}
          >
            CONFIRM
          </Button>
        </MobileView>
        <DesktopView>
          <Button outline secondary onClick={handleChangeSessionModal}>
            GO BACK
          </Button>
          <Button
            primary
            onClick={handleConfirm}
            disabled={!selectedSessionMode}
          >
            CONFIRM
          </Button>
        </DesktopView>
      </ModalFooter>
    </Modal>
  );
};

export default ChangeSessionMode;
