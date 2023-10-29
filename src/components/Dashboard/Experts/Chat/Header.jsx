import React, { useRef, useState } from "react";
import { FiArrowLeft, FiMoreHorizontal, FiX } from "react-icons/fi";
import styled from "styled-components";

import Dropdown from "@common/Dashboard/Dropdown";
import { Body1, Support } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import LazyImage from "@common/LazyImage";
import { ACCENT_800, ACCENT_100, ACCENT_800 } from "@common/ui/colors";
import useMobileView from "@hooks/useMobileView";
import { useProviderChatStatus } from "@hooks/useProviderChatStatus";
import { IconButton } from "@common/Dashboard/Buttons";

const ProviderImg = styled.div`
  img {
    height: 3rem;
    aspect-ratio: 1;
    border: 1px solid ${ACCENT_800};
    overflow: hidden;
    object-fit: cover;
    border-radius: 50%;
    object-position: top;
  }
`;

const BackIcon = styled(FlexBox)`
  height: 2rem;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
`;

const iconBtnStyles = {
  tertiary: true,
  color: ACCENT_800,
  hoverColor: ACCENT_800,
  borderColor: ACCENT_100,
};

const Header = ({
  closeChat,
  showSharedFiles,
  showChatInfo,
  openSharedFiles,
  openChatInfo,
  // FIXME: hardcoded
  providerFirebaseId = "mVZQRtYWYM11zk9ERocRzQfM4GFe",
  providerName = "Pratistha Trivedi Mirza",
  // FIXME: hardcoded
  providerImg = "https://assets.theinnerhour.com/profilepics/Nishtha_Baghla1665672703307.png",
}) => {
  const isMobile = useMobileView();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const providerStatus = useProviderChatStatus(providerFirebaseId);

  const options = [
    { label: "View shared files", handleNavigation: openSharedFiles },
    { label: "Chat info", handleNavigation: openChatInfo },
  ];

  const showCrossIcon = isMobile ? showChatInfo || showSharedFiles : true;

  return (
    <FlexBox justify="space-between" width="100%">
      <FlexBox align="center" columnGap="1rem">
        {isMobile ? (
          <BackIcon onClick={closeChat}>
            <FiArrowLeft color={ACCENT_800} size="1.5rem" />
          </BackIcon>
        ) : (
          <ProviderImg data-testid="provider-img">
            <LazyImage src={providerImg} alt={providerName} />
          </ProviderImg>
        )}
        <FlexBox column rowGap="0.25rem">
          <Body1 bold data-testid="provider-name">
            {providerName}
          </Body1>
          <Support bold color="#59876E" data-testid="provider-chat-status">
            {providerStatus}
          </Support>
        </FlexBox>
      </FlexBox>

      <FlexBox align="center" columnGap="1rem" ref={dropdownRef}>
        <IconButton
          {...iconBtnStyles}
          Icon={FiMoreHorizontal}
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showCrossIcon && (
          <IconButton
            {...iconBtnStyles}
            Icon={FiX}
            onClick={closeChat}
            data-testid="close-chat-btn"
          />
        )}
      </FlexBox>

      <Dropdown
        options={options}
        parentRef={dropdownRef}
        isOpen={showDropdown}
        setIsOpen={setShowDropdown}
        size="small"
        width="10rem"
        top="2.5rem"
        right={showCrossIcon ? "3rem" : 0}
      />
    </FlexBox>
  );
};

const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;
