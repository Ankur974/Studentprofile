import dynamic from "next/dynamic";
import styled from "styled-components";

import ProviderCard from "@common/Dashboard/ProviderCard";
import useMobileView from "@hooks/useMobileView";

const BottomDrawer = dynamic(() => import("@common/Dashboard/BottomDrawer"), {
  ssr: false,
});

const ChatWithProvidersModal = dynamic(
  () => import("./ChatWithProvidersModal"),
  { ssr: false }
);

const BottomDrawerWrapper = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const ChatWithProvidersComponent = ({ toggleDropdown = () => {} }) => {
  const isMobile = useMobileView();
  if (isMobile) {
    return (
      <BottomDrawerWrapper>
        <BottomDrawer title="Chat With" toggleBottomDrawer={toggleDropdown}>
          <ProviderCard />
          <ProviderCard />
        </BottomDrawer>
      </BottomDrawerWrapper>
    );
  } else {
    return <ChatWithProvidersModal toggleDropdown={toggleDropdown} />;
  }
};

export default ChatWithProvidersComponent;
