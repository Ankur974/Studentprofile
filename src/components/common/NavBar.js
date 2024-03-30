/* eslint-disable no-unused-vars */
import { useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { FiMoreHorizontal } from "react-icons/fi";

import { ACCENT_0, ACCENT_800, PRIMARY_800 } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";

const commonIconProps = {
  size: "1.5rem",
  cursor: "pointer",
  color: ACCENT_0,
};

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
  padding-block: 0.25rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: ${PRIMARY_800};

  @media ${device.laptop} {
    padding: 0.5rem 0;
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
  min-width: 7.5rem;
  max-width: 7.5rem;
  width: 7.5rem;

  @media only screen and (max-width: 48rem) {
    min-width: 5rem;
    max-width: 5rem;
    width: 5rem;
  }
`;

const Logo = styled.img`
  width: 100%;
  cursor: pointer;
`;

const Avatar = styled(FlexBox)`
  border: 2px solid ${ACCENT_0};
  border-radius: 50%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MoreActionsWrapper = styled(FlexBox)`
  @media screen and (max-width: 768px) {
    display: none;
  }
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

const NavBar = ({ navContainerStyles }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  const toggleProfileDropdown = () => setShowProfileDropdown(prev => !prev);
  const toggleMoreActions = () => setShowMoreActions(prev => !prev);
  const router = useRouter();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <NavContainer
      align="center"
      justify="center"
      navContainerStyles={navContainerStyles}
    >
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
        <FlexBox align="center" columnGap="1.5rem">
          <Avatar position="relative" align="center" justify="center">
            <ProviderImage
              alt="User Image"
              draggable="false"
              id="header-user-image"
              src="/assets/images/stylists/men.jpg"
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
      </NavMain>
    </NavContainer>
  );
};

export default NavBar;
