import dynamic from "next/dynamic";
import styled from "styled-components";

import ProviderCard from "@common/Dashboard/ProviderCard";
import useMobileView from "@hooks/useMobileView";

const BottomDrawer = dynamic(() => import("@common/Dashboard/BottomDrawer"), {
  ssr: false,
});

const BookSessionWithModal = dynamic(() => import("./BookSessionWithModal"), {
  ssr: false,
});

const BottomDrawerWrapper = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const BookSessionWithComponent = ({ toggleDropdown = () => {} }) => {
  const isMobile = useMobileView();
  if (isMobile) {
    return (
      <BottomDrawerWrapper>
        <BottomDrawer
          title="Book Session With"
          toggleBottomDrawer={toggleDropdown}
        >
          <ProviderCard shouldShowActiveDate />
          <ProviderCard shouldShowActiveDate />
        </BottomDrawer>
      </BottomDrawerWrapper>
    );
  } else {
    return <BookSessionWithModal toggleDropdown={toggleDropdown} />;
  }
};

export default BookSessionWithComponent;
