import { useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import FlexBox from "@common/ui/FlexBox";
import useOutsideAlert from "@hooks/useOutsideAlert";
import { Body1 } from "@common/Dashboard/Headings";
import { Button } from "@common/Dashboard/Buttons";
import {
  DAVYS_GREY_100,
  DAVYS_GRAY_400,
  DAVYS_GREY_800,
} from "@common/ui/colors";
import { boxShadowDs1 } from "@common/Dashboard/boxShadowStyles";
import NotificationItem from "./NotificationItem";
import { notificationsData } from ".";

const Container = styled(FlexBox)`
  position: absolute;
  z-index: 22;
  inset: 0;
  flex-direction: column;
  background-color: ${DAVYS_GREY_100};
  overflow-y: auto;
  @media screen and (min-width: 769px) {
    width: 25rem;
    height: 28.75rem;
    top: 4.5rem;
    right: 7rem;
    left: unset;
    bottom: unset;
    border: 1px solid ${DAVYS_GRAY_400};
    border-radius: 1rem;
    ${boxShadowDs1}
  }
`;

const Header = styled(FlexBox)`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${DAVYS_GREY_100};
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const CloseIcon = styled(FiX)`
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  color: ${DAVYS_GREY_800};
  cursor: pointer;
  stroke-width: 3;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Footer = styled(FlexBox)`
  position: sticky;
  bottom: 0;
  z-index: 1;
  background-color: ${DAVYS_GREY_100};
  padding: 1rem 1rem 1.5rem;
  justify-content: center;
  align-items: center;
`;

const NotificationsPopup = ({ toggleDropdown }) => {
  const containerRef = useRef(null);
  useOutsideAlert(containerRef, toggleDropdown, "bell-icon");

  return (
    <Container ref={containerRef}>
      <Header>
        <Body1 bold>Notifications</Body1>
        <CloseIcon onClick={toggleDropdown} />
      </Header>
      {notificationsData.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          padding="1rem"
        />
      ))}
      <Footer>
        <Link href="/user/notifications">
          <Button outline>VIEW ALL NOTIFICATIONS</Button>
        </Link>
      </Footer>
    </Container>
  );
};

export default NotificationsPopup;
