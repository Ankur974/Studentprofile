import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import { Body2, Support } from "@common/ui/Headings";
import { ACCENT_0, ACCENT_200, SECONDARY_901 } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { boxShadowDs1 } from "@common/ui/styles";
import { logout } from "@redux/slices/auth";
import Avatar from "@common/ui/Avatar";
import { Button } from "@components/common/ui/Buttons";

const Wrapper = styled(FlexBox)`
  position: relative;
  align-items: center;
  width: 10rem;
  padding: 0 0.25rem;
  justify-items: center;
  border-radius: 2.25rem;
  border: 1px solid ${SECONDARY_901};
  background: ${ACCENT_0};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.11);
`;
const DropdownContainer = styled(FlexBox)`
  background-color: ${ACCENT_0};
  position: absolute;
  right: 0;
  top: 2.75rem;
  width: 10rem;
  border-radius: 1rem;
  overflow: hidden;
  ${boxShadowDs1}
`;

const DropdownOption = styled(FlexBox)`
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 250ms ease-in-out;

  &:hover {
    background-color: ${ACCENT_200};
  }
`;

const profileOptions = [
  // { label: "My Stores", link: "/my-stores?source=top-nav" },
  // { label: "Add a store", link: "/onboarding-merchant?source=top-nav" },
  { label: "Privacy", link: "/privacy-policy?source=top-nav" },
];

const UserAvatar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(prev => !prev);
  };

  // const getUserRole = userType => {
  //   return userType === "admin" ? "Administrator" : "User";
  // };

  return (
    <Wrapper>
      {user ? (
        <FlexBox
          align="center"
          justify="center"
          columnGap="0.5rem"
          cursor="pointer"
          onClick={toggleProfileDropdown}
        >
          <Avatar name={user?.name} />
          <FlexBox column>
            <Body2>{user?.name}</Body2>
            <Support>100 Care coins</Support>
          </FlexBox>
          {showProfileDropdown ? (
            <SlArrowUp size={12} />
          ) : (
            <SlArrowDown size={12} />
          )}
        </FlexBox>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}

      {showProfileDropdown && (
        <DropdownContainer column>
          {profileOptions.map(option => (
            <DropdownOption
              key={option.label}
              onClick={() => router.push(option.link)}
            >
              {option.label}
            </DropdownOption>
          ))}
          <DropdownOption onClick={handleLogout}>
            Logout <FiLogOut />
          </DropdownOption>
        </DropdownContainer>
      )}
    </Wrapper>
  );
};

export default UserAvatar;
