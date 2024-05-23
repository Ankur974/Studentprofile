/* eslint-disable no-unused-vars */
import { useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";

import { PRIMARY_800 } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";
import { Button } from "./ui/Buttons";
import { useSelector } from "react-redux";
import Avatar from "@common/ui/Avatar";
import LoginModal from "@components/Login";
import { trackEvent } from "@utils/helpers";
import UserAvatar from "@components/Dashboard/Layout/UserAvatar";

const FallBack = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.4;
  z-index: 401;

  @media only screen and (max-width: 48rem) {
    display: ${props => (props.navState ? "block" : "none")};
  }
`;

const NavContainer = styled(FlexBox)`
  padding-block: 0.5rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: ${PRIMARY_800};

  @media ${device.laptop} {
    padding-block: 0.875rem;
  }

  ${({ navContainerStyles }) =>
    navContainerStyles &&
    css`
      ${navContainerStyles}
    `}
`;

const NavMain = styled(FlexBox)`
  max-width: 75rem;
  width: 86.67%;
  @media only screen and (max-width: 48rem) {
    position: unset;
  }
`;

const LogoContainer = styled.div`
  min-width: 6rem;
  max-width: 6rem;
  @media ${device.laptop} {
    min-width: 7.5rem;
    max-width: 7.5rem;
  }
`;

const Logo = styled.img`
  width: 100%;
  cursor: pointer;
`;

const NavBar = ({ navContainerStyles }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const user = useSelector(state => state.auth?.user);
  const router = useRouter();

  const toggleModal = () => setLoginModal(!loginModal);
  const closeMenu = () => setIsMenuOpen(false);

  const track = () => {
    trackEvent("cta-login-click", {
      current_page: "waitlist-lp",
    });
  };

  return (
    <NavContainer
      align="center"
      justify="center"
      navContainerStyles={navContainerStyles}
    >
      {loginModal && <LoginModal setModalOpen={setLoginModal} page="home" />}
      <FallBack navState={isMenuOpen} onClick={closeMenu} />
      <NavMain justify="space-between" align="center" width="90%">
        <LogoContainer onClick={() => router.push("/")}>
          <Logo
            isStatic
            height={36}
            draggable={false}
            src="/assets/images/pamprazzi-logo-white.svg"
            alt="pamprazzi Logo"
          />
        </LogoContainer>
        {user ? (
          <UserAvatar name={user?.name} />
        ) : (
          <Button
            whiteButton
            color={PRIMARY_800}
            onClick={() => {
              toggleModal();
              track();
            }}
          >
            Login
          </Button>
        )}
      </NavMain>
    </NavContainer>
  );
};

export default NavBar;
