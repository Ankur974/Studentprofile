import { useRef } from "react";
import styled from "styled-components";

import DropdownWrapper from "@common/Dashboard/DropdownWrapper";
import { Body2 } from "@common/Dashboard/Headings";
import ProviderCard from "@common/Dashboard/ProviderCard";
import FlexBox from "@common/ui/FlexBox";
import useOutsideAlert from "@hooks/useOutsideAlert";

const DropdownContainer = styled(FlexBox)`
  right: 8rem;
  top: 3rem;
  width: 22.5rem;
  position: absolute;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ProvidersList = styled(FlexBox)`
  max-height: 16rem;
  overflow: auto;
`;

const ChatWithProvidersModal = ({ toggleDropdown }) => {
  const containerRef = useRef(null);
  useOutsideAlert(containerRef, toggleDropdown, "chat-providers");
  return (
    <DropdownContainer ref={containerRef}>
      <DropdownWrapper>
        <FlexBox column rowGap="1rem" padding="1.5rem">
          <Body2 bold>Chat With</Body2>
          <ProvidersList column rowGap="1rem">
            <ProviderCard />
            <ProviderCard />
          </ProvidersList>
        </FlexBox>
      </DropdownWrapper>
    </DropdownContainer>
  );
};

export default ChatWithProvidersModal;
