import { useRef } from "react";
import { FiChevronRight, FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import { useSelector } from "react-redux";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_200, ACCENT_800 } from "@common/ui/colors";
import useOutsideAlert from "@hooks/useOutsideAlert";
import DropdownWrapper from "@common/Dashboard/DropdownWrapper";
import { Body2, H5, Support } from "@common/ui/Headings";
import { IconButton } from "@common/Dashboard/Buttons";
import { profileOptions } from "./allOptions";

const DropdownContainer = styled(FlexBox)`
  right: 4rem;
  top: 4.5rem;
  width: 22.5rem;
  position: absolute;
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

  :hover {
    background-color: ${ACCENT_200};

    svg {
      color: ${ACCENT_800};
    }
  }
`;

const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ProfileOptionsDropdown = ({
  toggleDropdown = () => {},
  toggleLogoutModal,
}) => {
  const user = useSelector(state => state?.auth?.user);
  const containerRef = useRef(null);
  useOutsideAlert(containerRef, toggleDropdown, "header-user-image");

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownWrapper>
        <FlexBox column>
          <FlexBox align="center" columnGap="1rem" padding="1.5rem">
            <ProfileImage
              alt="User Image"
              draggable="false"
              src={"https:" + user?.image}
            />

            <FlexBox column rowGap="0.375rem">
              <H5 bold>{user?.firstname}</H5>
              <Support>joined on {user?.doj || "24 June 2015"}</Support>
            </FlexBox>
          </FlexBox>

          {profileOptions?.map(({ label }, index) => (
            <DropdownOption key={index}>
              <Body2 bold>{label}</Body2>
              <FiChevronRight size="1.5rem" color={ACCENT_800} />
            </DropdownOption>
          ))}

          <FlexBox justify="flex-end" padding="1.5rem">
            <IconButton textCta Icon={FiLogOut} onClick={toggleLogoutModal}>
              LOG OUT
            </IconButton>
          </FlexBox>
        </FlexBox>
      </DropdownWrapper>
    </DropdownContainer>
  );
};

export default ProfileOptionsDropdown;
