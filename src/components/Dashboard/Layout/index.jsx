import dynamic from "next/dynamic";
import { useState } from "react";
import {
  FiBell,
  FiMenu,
  FiMessageCircle,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { BooleanParam, useQueryParams } from "use-query-params";

import { H2 } from "@common/ui/Headings";
import { boxShadowDs1 } from "@common/Dashboard/boxShadowStyles";
import FlexBox from "@common/ui/FlexBox";
import Loader from "@common/ui/Loader";
import {
  ACCENT_300,
  ACCENT_400,
  ACCENT_800,
  ERROR,
  WHITE,
} from "@common/ui/colors";
import Sidebar from "./Sidebar";

const Navigation = dynamic(() => import("./Navigation"), {
  loading: () => <Loader />,
  ssr: false,
});

const NotificationsPopup = dynamic(
  () => import("../Notifications/NotificationsPopup"),
  { ssr: false }
);

const ProfileOptionsDropdown = dynamic(
  () => import("./ProfileOptionsDropdown"),
  { ssr: false }
);

const MoreActions = dynamic(() => import("./MoreActions"), {
  ssr: false,
});

const SessionDetails = dynamic(() => import("../SessionDetails"), {
  ssr: false,
});

const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
});

const LogoutModal = dynamic(() => import("../LogoutModal"), { ssr: false });

const Container = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }
`;

const ContentWrapper = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  max-height: calc(100vh - 5rem);
  margin-bottom: 5rem;
  @media screen and (min-width: 768px) {
    background: ${ACCENT_300};
    margin-bottom: 0;
  }
`;

const Content = styled(FlexBox)`
  flex: 1;
  height: 100%;
  overflow: auto;
  flex-direction: column;
  transition: max-width 300ms ease-in-out;
  /* max-width: calc(100vw - max(14.75rem, 16.4%)); */

  ${({ navigationCollapsed }) =>
    navigationCollapsed &&
    css`
      max-width: 100vw;
    `}

  @media screen and (max-width: 768px) {
    max-width: 100vw !important;
  }
`;

const Header = styled(FlexBox)`
  top: 0;
  height: 5rem;
  padding: 1.5rem;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
  background-color: ${WHITE};

  ${({ hideHeader }) =>
    hideHeader &&
    css`
      height: 0;
      padding: 0;
      pointer-events: none;
      transform: translateY(-8rem);
    `}
`;

const commonIconProps = {
  size: "1.5rem",
  cursor: "pointer",
  color: ACCENT_800,
};

const PageHading = styled(FlexBox)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BellIcon = styled(FiBell)`
  z-index: ${({ showNotifications }) => (showNotifications ? 100 : 2)};
`;

const NewNotificationBadge = styled(FlexBox)`
  width: 0.5rem;
  aspect-ratio: 1;
  top: -0.5rem;
  right: 0.5rem;
  z-index: 150;
  position: relative;
  border-radius: 0.5rem;
  background-color: ${ERROR};
`;

const ProviderImage = styled.img`
  min-width: 2rem;
  max-width: 2rem;
  cursor: pointer;
  min-height: 2rem;
  max-height: 2rem;
  overflow: hidden;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid ${ACCENT_800};
`;

const AvatarWithName = styled(FlexBox)`
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Avatar = styled(FlexBox)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MoreActionsWrapper = styled(FlexBox)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Footer = styled.div`
  width: 100%;
  @media screen and (min-width: 769px) {
    display: none;
  }
  padding: 1rem;
  position: fixed;
  height: 5rem;
  bottom: 0;
  border-radius: 1rem 1rem 0rem 0rem;
  border: 1px solid ${ACCENT_400};
  background: ${WHITE};
  ${boxShadowDs1}
  transform: ${({ hideFooter }) =>
    hideFooter ? "translateY(8rem)" : "translateY(0)"};
  pointer-events: ${({ hideFooter }) => (hideFooter ? "none" : "unset")};
  transition: all 0.2s ease-in-out;
`;

const DashboardLayout = ({
  children,
  title = "Dashboard",
  hideHeader,
  hideFooter,
  hideChat,
}) => {
  const user = useSelector(state => state.auth?.user);
  const [showNavigation, setShowNavigation] = useState(true);
  const [showChatWithProviders, setShowChatWithProviders] = useState(false);
  const [showNotificationsPopup, setShowNotificationsPopup] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [queryParams] = useQueryParams({
    showEmergencySosModal: BooleanParam,
    showSessionDetailsModal: BooleanParam,
    showPreferencesModal: BooleanParam,
  });

  const { showSessionDetailsModal } = queryParams;

  const toggleNavigation = () => setShowNavigation(!showNavigation);
  const toggleChatWithProviders = () =>
    setShowChatWithProviders(!showChatWithProviders);
  const toggleNotificationsPopup = () =>
    setShowNotificationsPopup(prev => !prev);
  const toggleProfileDropdown = () => setShowProfileDropdown(prev => !prev);
  const toggleMoreActions = () => setShowMoreActions(prev => !prev);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const toggleLogoutModal = () => setShowLogoutModal(!showLogoutModal);

  return (
    <>
      {showSessionDetailsModal && <SessionDetails />}
      {showNotificationsPopup && (
        <NotificationsPopup toggleDropdown={toggleNotificationsPopup} />
      )}
      {showProfileDropdown && (
        <ProfileOptionsDropdown
          toggleDropdown={toggleProfileDropdown}
          toggleLogoutModal={toggleLogoutModal}
        />
      )}
      {showMoreActions && <MoreActions toggleDropdown={toggleMoreActions} />}
      {showMobileMenu && <MobileMenu toggleMobileMenu={toggleMobileMenu} />}
      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
      <Container>
        <Sidebar expanded={showNavigation} />
        <Content navigationCollapsed={!showNavigation}>
          <Header hideHeader={hideHeader}>
            <PageHading align="center" columnGap="1.5rem">
              <FiMenu onClick={toggleNavigation} {...commonIconProps} />
              <H2 bold>{title}</H2>
            </PageHading>
            <AvatarWithName position="relative" align="center" justify="center">
              <FlexBox
                align="center"
                justify="center"
                className="bell-icon"
                cursor="pointer"
                columnGap="0.5rem"
                id="mobile-menu"
              >
                <ProviderImage
                  alt="User Image"
                  draggable="false"
                  src={"https:" + user?.image}
                  onClick={toggleMobileMenu}
                />
                <H2 bold>Hi, Varsha</H2>
              </FlexBox>
            </AvatarWithName>
            <FlexBox align="center" columnGap="1.5rem">
              {!hideChat && (
                <FlexBox
                  align="center"
                  justify="center"
                  id="chat-providers"
                  cursor="pointer"
                  onClick={toggleChatWithProviders}
                >
                  <FiMessageCircle
                    color={ACCENT_800}
                    size="1.5rem"
                    cursor="pointer"
                  />
                </FlexBox>
              )}
              <FlexBox
                align="center"
                justify="center"
                className="bell-icon"
                cursor="pointer"
                margin="0 -0.5rem 0 0"
                onClick={toggleNotificationsPopup}
              >
                <BellIcon
                  size="1.5rem"
                  strokeWidth={2}
                  color={ACCENT_800}
                  showAnimation={false}
                  pointerEvents="none"
                />
                <NewNotificationBadge />
              </FlexBox>
              <Avatar position="relative" align="center" justify="center">
                <ProviderImage
                  alt="User Image"
                  draggable="false"
                  id="header-user-image"
                  src={"https:" + user?.image}
                  onClick={toggleProfileDropdown}
                />
              </Avatar>

              <MoreActionsWrapper
                position="relative"
                align="center"
                justify="center"
              >
                <FlexBox
                  cursor="pointer"
                  id="header-actions"
                  onClick={toggleMoreActions}
                >
                  <FiMoreHorizontal {...commonIconProps} pointerEvents="none" />
                </FlexBox>
              </MoreActionsWrapper>
            </FlexBox>
          </Header>

          <ContentWrapper>{children}</ContentWrapper>

          <Footer hideFooter={hideFooter}>
            <Navigation />
          </Footer>
        </Content>
      </Container>
    </>
  );
};

export default DashboardLayout;
