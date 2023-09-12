import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FiMenu,
  FiBell,
  FiLogOut,
  FiChevronRight,
  FiMoreHorizontal,
  FiX,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { BooleanParam, useQueryParams } from "use-query-params";
import { NavLink, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import dayjs from "dayjs";
import Bugsnag from "@bugsnag/js";
import Select from "react-select";

import URL from "../../urls";
import axiosInstance from "../../axiosInstance";
import {
  addProviderRoles,
  setIsLoadingRoles,
} from "../../Store/Actions/supervisionActions";
import {
  H2,
  H3,
  H4,
  H5,
  H6,
  Body2,
  ButtonText,
} from "../../components/common/ui/Headings";
import FlexBox from "../../components/common/FlexBox";
import SidebarLink from "../components/Supervision/SidebarLink";

import { logout, removeAllToasts } from "../../Store/Actions";
import { trackEvent } from "../../helperFunctions";
import { TYPE_PSYCHIATRIST } from "../../variable";
import useOutsideAlert from "../../hooks/useOutsideAlert";

import logo from "../assets/amaha-logo.png";
import DropdownOld from "../../components/common/ui/DropdownOld";
import { useToasts } from "react-toast-notifications";
import { setShowCrossIcon } from "../../Store/Actions/commonActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  ACCENT_800,
  BRICK_TERRACOTA_200,
  BRICK_TERRACOTA_800,
} from "../../components/common/colors";
import { SuperviseeProfileContext } from "../../context/SuperviseeProfileProvider";
import AddPrescriptionModal from "../components/Clients/ClientProfile/Prescriptions/AddPrescriptionModal";
import AddDiagnosisModal from "../components/Clients/ClientProfile/Diagnosis/AddDiagnosisModal";
import CrossProviderPrompt from "../components/Clients/ProfileHeader/CrossProviderPrompt";
import ClientDetails from "../components/Clients/ProfileHeader/ClientDetails";
import NotesModal from "../components/Clients/ClientProfile/AllNotes/NotesModal";
import PrivateNotesModal from "../components/Clients/ClientProfile/AllNotes/PrivateNotesModal";
import NspModal from "../components/Clients/ClientProfile/Sessions/NspModal";
import UpdateProvider from "../components/Clients/ProfileHeader/UpdateProvider";
import { Modal } from "../../components/common/ui/Modal";
import { Button } from "../../components/common/ui/Buttons";
import { timeFilterOptions } from "../../metaData/analytics";
import { setGlobalTimeFilter } from "../../Store/Actions/analyticsNewActions";
import dropdownStyles from "../../components/common/ui/SelectDropdown/dropdownStyles";
import DropdownIndicator from "../../components/common/ui/SelectDropdown/DropdownIndicator";
import Option from "../../components/common/ui/SelectDropdown/Option";

const Translate = keyframes`
  0% {transform: translateX(0);}
  25% {transform: translateY(-9px);}
  35% {transform: translateY(-9px) rotate(17deg);}
  55% {transform: translateY(-9px) rotate(-17deg);}
  65% {transform: translateY(-9px) rotate(17deg);}
  75% {transform: translateY(-9px) rotate(-17deg);}
  100% {transform: translateY(0) rotate(0);}
`;

const Wrapper = styled(FlexBox)`
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

const SideBar = styled.div`
  height: 100%;
  width: 16.4%;
  display: grid;
  overflow: hidden;
  min-width: 14.75rem;
  grid-template-columns: 1fr;
  transition: all 300ms ease-in-out;

  ${({ expanded }) =>
    !expanded &&
    css`
      width: 0;
      min-width: 0;
      grid-template-columns: 0fr;
    `}
`;

const Logo = styled.img`
  width: 40%;
  min-width: 6rem;
`;

const SidebarContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
  row-gap: 2.5rem;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--accent-100);

  .sidebar-link {
    width: 100%;
    cursor: pointer;
    padding: 1rem 2.5rem;

    ${H3} {
      font-weight: bold;
      white-space: nowrap;
      color: var(--accent-800);
    }

    &:hover {
      background-color: var(--green-100);

      ${H3} {
        color: var(--green-800);
      }
    }
  }

  .sidebar-link.active {
    background-color: var(--green-800);

    ${H3} {
      color: var(--accent-100);
    }

    &:hover {
      background-color: var(--green-800);
    }
  }
`;

const AlertDiv = styled(FlexBox)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--accent-400);
`;

const Content = styled(FlexBox)`
  flex: 1;
  height: 100%;
  overflow: auto;
  flex-direction: column;
  transition: max-width 300ms ease-in-out;
  max-width: calc(100vw - max(14.75rem, 16.4%));

  ${({ sidebarCollapsed }) =>
    sidebarCollapsed &&
    css`
      max-width: 100vw;
    `}
`;

const Header = styled(FlexBox)`
  top: 0;
  height: 5rem;
  padding: 1.5rem;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
  background-color: var(--accent-100);
`;

const SupervisionHeaderText = styled.div`
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
  background-color: ${BRICK_TERRACOTA_200};
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
  border: 1px solid var(--accent-800);
`;

const BellIcon = styled(FiBell)`
  padding: 2px;
  cursor: pointer;
  border-radius: 50%;
  z-index: ${({ showNotifications }) => (showNotifications ? 100 : 2)};

  ${({ showNotifications, isNotificationPage }) => {
    if (isNotificationPage) {
      return css`
        background-color: var(--primary);
      `;
    } else if (showNotifications) {
      return css`
        background-color: var(--accent-100);
      `;
    }
  }}

  ${({ showAnimation }) =>
    showAnimation &&
    css`
      z-index: 100;
      animation: ${Translate} 1s infinite;
    `}
`;

const NewNotificationBadge = styled(FlexBox)`
  width: 9px;
  top: -10px;
  right: 9px;
  height: 9px;
  z-index: 150;
  position: relative;
  border-radius: 0.5rem;
  background-color: var(--danger);
`;

const DropdownContainer = styled(FlexBox)`
  right: 0;
  top: 2.5rem;
  width: 22.5rem;
  position: absolute;
`;

const DropdownInterior = styled(FlexBox)`
  flex-direction: column;
`;

const DropdownOption = styled(FlexBox)`
  padding: 1rem;
  cursor: pointer;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  transition: background-color 250ms ease-in-out;

  svg {
    color: var(--accent-500);
    transition: color 250ms ease-in-out;
  }

  &:hover {
    background-color: var(--accent-200);

    svg {
      color: var(--accent-800);
    }
  }
`;

const ProfileImage = styled.img`
  width: 3rem;
  height: 4.5rem;
  overflow: hidden;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const Container = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  max-height: calc(100vh - 5rem);
`;

const CrossIcon = styled(FlexBox)`
  cursor: pointer;
`;

const commonIconProps = {
  size: "1.5rem",
  cursor: "pointer",
  color: "var(--accent-800)",
};

const ModalHeader = styled(FlexBox)`
  padding: 1rem 1rem 0 1.5rem;
  justify-content: space-between;
`;

const CloseIconWrapper = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ContentWrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;
  width: 100%;
`;

const ModalFooter = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-self: flex-end;
  box-sizing: border-box;
`;

const ProfileDropdown = ({
  user,
  logout,
  userName,
  supervisionMode,
  toggleDropdown = () => {},
  toggleLogoutModal,
}) => {
  const containerRef = useRef(null);
  useOutsideAlert(containerRef, toggleDropdown, "header-user-image");

  const profileOptions = [
    { label: "Availability", link: "/profile?currentOption=availability" },
    {
      label: "Personal Information",
      link: "/profile?currentOption=personalinformation",
    },
    {
      label: "About & FAQs",
      link: "/profile?currentOption=about",
    },
    {
      label: "Qualifications & Experience",
      link: "/profile?currentOption=qualifications",
    },
    { label: "Files & Documents", link: "/profile?currentOption=documents" },
    { label: "Fees & Payments", link: "/profile?currentOption=feeandpayment" },
  ];

  const history = useHistory();

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownOld>
        <DropdownInterior>
          <FlexBox align="center" columnGap="1rem" padding="1.5rem">
            <ProfileImage
              alt="User Image"
              draggable="false"
              src={"https:" + user?.image}
            />

            <FlexBox column rowGap="0.375rem">
              <H4 bold>{userName}</H4>
              {user?.doj && (
                <H6 color="var(--accent-700)">joined on {user?.doj}</H6>
              )}
            </FlexBox>
          </FlexBox>

          {profileOptions?.map(({ label, link }) => (
            <DropdownOption onClick={() => history.push(link)}>
              <Body2 bold fontSize="0.875rem" color="var(--accent-800)">
                {label}
              </Body2>
              <FiChevronRight size="1.5rem" />
            </DropdownOption>
          ))}

          {!supervisionMode && (
            <FlexBox
              justify="flex-end"
              padding="1.5rem"
              onClick={toggleLogoutModal}
            >
              <FlexBox
                align="center"
                cursor="pointer"
                onClick={logout}
                columnGap="0.5rem"
              >
                <FiLogOut
                  size="1.125rem"
                  strokeWidth={2.75}
                  color="var(--primary-800)"
                />
                <ButtonText color="var(--primary-800)">LOG OUT</ButtonText>
              </FlexBox>
            </FlexBox>
          )}
        </DropdownInterior>
      </DropdownOld>
    </DropdownContainer>
  );
};

const ActionsDropdown = ({ toggleDropdown = () => {} }) => {
  const containerRef = useRef(null);
  useOutsideAlert(containerRef, toggleDropdown, "header-actions");

  const history = useHistory();

  const actionOptions = [
    { label: "Provider Tagging", link: "/provider-tagging/update-history" },
    // { label: "Transactions", link: "/transactions" },
    // { label: "Canned Messages", link: "" },
    // { label: "Help & Updates", link: "" },
  ];

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownOld>
        <DropdownInterior padding="1.5rem 0">
          {actionOptions?.map(({ label, link }) => (
            <DropdownOption
              key={label}
              onClick={() => {
                history.push(link);
              }}
            >
              <Body2 bold fontSize="0.875rem" color="var(--accent-800)">
                {label}
              </Body2>
              <FiChevronRight size="1.5rem" />
            </DropdownOption>
          ))}
        </DropdownInterior>
      </DropdownOld>
    </DropdownContainer>
  );
};

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user);
  // const hasUnreadNotification = useSelector(
  //   state => state?.notification?.hasUnreadNotification
  // );
  const roles = useSelector(state => state?.supervision?.roles);
  const toasts = useSelector(state => state.toast.toasts);

  const headerTitle = useSelector(state => state.commonReducer.headerTitle);
  const showCrossIcon = useSelector(state => state.commonReducer.showCrossIcon);

  const { addToast } = useToasts();

  const [queryParams] = useQueryParams({
    showCrossProviderPrompt: BooleanParam,
    showClientDetailsModal: BooleanParam,
    showNotesModal: BooleanParam,
    showPrivateNotesModal: BooleanParam,
    showAddPrescriptionModal: BooleanParam,
    showAddDiagnosisModal: BooleanParam,
    showNspModal: BooleanParam,
    showUpdateProviderModal: BooleanParam,
  });

  const {
    showCrossProviderPrompt,
    showClientDetailsModal,
    showNotesModal,
    showPrivateNotesModal,
    showAddPrescriptionModal,
    showAddDiagnosisModal,
    showNspModal,
    showUpdateProviderModal,
  } = queryParams;

  const { isSupervisionMode, superviseeProfile } = useContext(
    SuperviseeProfileContext
  );
  const superviseeName = superviseeProfile?.name;

  const userType = user?.usertype;
  const userName = `${user?.firstname || ""} ${user?.lastname || ""}`;

  // const isNotificationPage = location?.pathname?.includes("notifications");
  const isAnalyticsPage = location?.pathname?.includes("analytics");

  // const commonAnalyticsPayload = {
  //   provider_name: userName,
  //   service_type: userType === TYPE_PSYCHIATRIST ? "psychiatry" : "therapy",
  // };

  const [showSidebar, setShowSidebar] = useState(true);
  // const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedAnalyticsTimeFilter, setSelectedAnalyticsTimeFilter] =
    useState(timeFilterOptions[0]);
  const history = useHistory();

  useEffect(() => {
    dispatch(removeAllToasts());

    toasts.map(toast =>
      addToast(toast.msg, {
        appearance: toast.appearance || "success",
        autoDismiss: toast.autoDismiss || true,
        autoDismissTimeout: toast.autoDismissTimeout
          ? toast.autoDismissTimeout
          : 5000,
        showUndoBtn: toast.showUndoBtn || false,
        onUndoClick: toast.onUndoClick,
      })
    );
  }, [toasts, addToast, dispatch]);

  useEffect(() => {
    if (!user) return;
    const fetchProviderRoles = async () => {
      dispatch(setIsLoadingRoles(true));
      try {
        const res = await axiosInstance.get(URL.getProvidersRoles);
        const roles = res?.data?.data || [];
        dispatch(addProviderRoles(roles || []));
      } catch (err) {
        Bugsnag.notify(err);
      } finally {
        dispatch(setIsLoadingRoles(false));
      }
    };
    fetchProviderRoles();
  }, [user, dispatch]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const toggleProfileDropdown = () => setShowProfileDropdown(prev => !prev);

  const toggleActionsDropdown = () => setShowActionsDropdown(prev => !prev);

  const getClientsLink = () =>
    isSupervisionMode ? "/supervision-mode/clients" : "/clients";

  const handleTabClick = event => {
    const { id, uuid, name, usertype } = user || {};

    trackEvent({
      event: event,
      payload: {
        provider_id: id,
        provider_name: name,
        provider_uuid: uuid,
        provider_type: usertype,
      },
    });

    dispatch(setGlobalTimeFilter(timeFilterOptions[0].value));
  };

  // const handleNotificationClick = () => {
  //   if (!showNotifications) {
  //     trackEvent({
  //       event: "notification_bell_click",
  //       payload: commonAnalyticsPayload,
  //     });
  //   }
  //   setShowNotifications(!showNotifications);
  // };

  // TODO: clear client data on click??

  const handleCrossIconClick = () => {
    dispatch(setShowCrossIcon(false));
    history.push(`/dashboard?date=${dayjs(new Date()).format("YYYY-MM-DD")}`);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleGlobalTimeFilter = option => {
    setSelectedAnalyticsTimeFilter(option);
    const { id, uuid, name, usertype } = user || {};
    trackEvent({
      event: "analytics_time_click",
      payload: {
        time_selected: option,
        provider_name: name,
        provider_id: id,
        provider_uuid: uuid,
        provider_type: usertype,
      },
    });
    dispatch(setGlobalTimeFilter(option.value));
  };

  return (
    <>
      {showAddPrescriptionModal && <AddPrescriptionModal />}
      {showAddDiagnosisModal && <AddDiagnosisModal />}
      {showCrossProviderPrompt && <CrossProviderPrompt />}
      {showClientDetailsModal && <ClientDetails />}
      {showNotesModal && <NotesModal />}
      {showPrivateNotesModal && <PrivateNotesModal />}
      {showNspModal && <NspModal />}
      {showUpdateProviderModal && <UpdateProvider />}
      {showLogoutModal && (
        <Modal
          borderRadius="1rem"
          xs
          maxWidth={"27rem"}
          height="fit-content"
          id="header-user-image"
        >
          <ModalHeader>
            <H3 bold>Are you sure you want to log out?</H3>
            <CloseIconWrapper onClick={() => setShowLogoutModal(false)}>
              <FiX />
            </CloseIconWrapper>
          </ModalHeader>
          <ContentWrapper>
            <H5>
              Once you log out, you will need to use your Amaha Professional
              credentials to log in again.
            </H5>

            <ModalFooter>
              <Button
                outline
                secondary
                onClick={() => setShowLogoutModal(false)}
              >
                CANCEL
              </Button>
              <Button primary onClick={handleLogout}>
                LOG OUT
              </Button>
            </ModalFooter>
          </ContentWrapper>
        </Modal>
      )}
      <Wrapper>
        <SideBar expanded={showSidebar}>
          <SidebarContainer>
            <FlexBox column rowGap="2.5rem">
              <FlexBox padding="2.5rem">
                <Logo src={logo} alt="Amaha logo" draggable="false" />
              </FlexBox>

              <FlexBox column>
                <SidebarLink>
                  <NavLink to="/dashboard" className="sidebar-link">
                    <H3>Dashboard</H3>
                  </NavLink>
                </SidebarLink>

                <NavLink to={getClientsLink} className="sidebar-link">
                  <H3>Clients</H3>
                </NavLink>

                <SidebarLink>
                  <NavLink
                    to="/analytics"
                    className="sidebar-link"
                    onClick={() => handleTabClick("twa_analytics_click")}
                  >
                    <H3>Analytics</H3>
                  </NavLink>
                </SidebarLink>

                <SidebarLink>
                  <NavLink
                    to="/profile?currentOption=availability&currentView=monthlyview"
                    className="sidebar-link"
                  >
                    <H3>Availability</H3>
                  </NavLink>
                </SidebarLink>

                {/* <SidebarLink>
                  <NavLink to="/provider-transfer" className="sidebar-link">
                    <H3>Provider updates</H3>
                  </NavLink>
                </SidebarLink> */}

                {/* <SidebarLink>
                <NavLink to="/profile" className="sidebar-link">
                  <H3>Profile</H3>
                </NavLink>
              </SidebarLink> */}

                {/* <SidebarLink>
                <NavLink to="/transactions" className="sidebar-link">
                  <H3>Transactions</H3>
                </NavLink>
              </SidebarLink> */}

                {/* <SidebarLink>
                <NavLink to="/settings" className="sidebar-link">
                  <H3>Settings</H3>
                </NavLink>
              </SidebarLink> */}

                {!!roles?.length && (
                  <SidebarLink>
                    <NavLink
                      to="/supervision"
                      className="sidebar-link"
                      onClick={() => handleTabClick("twa_supervision_click")}
                    >
                      <H3>Supervision</H3>
                    </NavLink>
                  </SidebarLink>
                )}
              </FlexBox>
            </FlexBox>

            {/* <FlexBox padding="2.5rem">
              <AlertDiv>
                <FiHelpCircle {...commonIconProps} />
              </AlertDiv>
            </FlexBox> */}
            {/* <SidebarLink>
              <FlexBox padding="2.5rem">
                <AlertDiv>
                  <FiHelpCircle {...commonIconProps} />
                </AlertDiv>
              </FlexBox>
            </SidebarLink> */}
          </SidebarContainer>
        </SideBar>

        <Content sidebarCollapsed={!showSidebar}>
          {isSupervisionMode ? (
            <Header>
              <FlexBox align="center" columnGap="1.5rem">
                <FiMenu onClick={toggleSidebar} {...commonIconProps} />
                <H2 bold>{superviseeName && `${superviseeName}'s Clients`}</H2>
              </FlexBox>
              <SupervisionHeaderText>
                <Body2 bold color={BRICK_TERRACOTA_800}>
                  Supervision Mode
                </Body2>
              </SupervisionHeaderText>
            </Header>
          ) : (
            <Header>
              <FlexBox align="center" columnGap="1.5rem">
                <FiMenu onClick={toggleSidebar} {...commonIconProps} />
                <FlexBox align="center" columnGap="0.5rem">
                  <H2 bold>{headerTitle}</H2>
                  {/* to be enabled later for coachmark */}
                  {/* <FiHelpCircle
                    {...commonIconProps}
                    size="1.25rem"
                    strokeWidth={2.5}
                  /> */}
                </FlexBox>
              </FlexBox>

              {showCrossIcon ? (
                <CrossIcon onClick={handleCrossIconClick}>
                  <FiX
                    color={ACCENT_800}
                    strokeWidth={2.5}
                    fontSize={"1.5rem"}
                  />
                </CrossIcon>
              ) : (
                <FlexBox align="center" columnGap="1.5rem">
                  {isAnalyticsPage && (
                    <Select
                      options={timeFilterOptions}
                      value={selectedAnalyticsTimeFilter}
                      styles={dropdownStyles}
                      onChange={handleGlobalTimeFilter}
                      isSearchable={false}
                      components={{
                        DropdownIndicator,
                        Option,
                      }}
                    />
                  )}
                  <FlexBox
                    align="center"
                    justify="center"
                    className="bell-icon"
                  >
                    {/* TODO: notifications integration
                    <BellIcon
                      size="1.5rem"
                      strokeWidth={2.5}
                      onClick={handleNotificationClick}
                      showNotifications={showNotifications}
                      isNotificationPage={isNotificationPage}
                      color={isNotificationPage ? "var(--accent-100)" : "unset"}
                      showAnimation={
                        !isNotificationPage && hasUnreadNotification
                      }
                    />

                    {!!hasUnreadNotification && <NewNotificationBadge />} */}
                  </FlexBox>

                  <FlexBox position="relative" align="center" justify="center">
                    <ProviderImage
                      alt="User Image"
                      draggable="false"
                      id="header-user-image"
                      src={"https:" + user?.image}
                      onClick={toggleProfileDropdown}
                    />

                    {showProfileDropdown && (
                      <ProfileDropdown
                        user={user}
                        userName={userName}
                        userType={userType}
                        // TODO: logout not working
                        logout={() => dispatch(logout)}
                        supervisionMode={isSupervisionMode}
                        toggleDropdown={toggleProfileDropdown}
                        toggleLogoutModal={() => setShowLogoutModal(true)}
                      />
                    )}
                  </FlexBox>

                  <FlexBox position="relative" align="center" justify="center">
                    <FlexBox
                      cursor="pointer"
                      id="header-actions"
                      onClick={toggleActionsDropdown}
                    >
                      <FiMoreHorizontal
                        {...commonIconProps}
                        pointerEvents="none"
                      />
                    </FlexBox>

                    {showActionsDropdown && (
                      <ActionsDropdown toggleDropdown={toggleActionsDropdown} />
                    )}
                  </FlexBox>
                </FlexBox>
              )}
            </Header>
          )}

          <Container>{children}</Container>
        </Content>
      </Wrapper>
    </>
  );
};

export default DashboardLayout;
