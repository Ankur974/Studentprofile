import styled from "styled-components";

import useMobileView from "@hooks/useMobileView";
import BottomNavigation from "./BottomNavigation";
import SideNavigation from "./SideNavigation";
import FlexBox from "@common/ui/FlexBox";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: -webkit-fill-available;
`;

/**
 * A component representing list of Navigation on the sidebar and mobile bottom navigation.
 *
 * @returns {JSX.Element} The rendered React component.
 */

const Navigation = () => {
  const isMobile = useMobileView();
  if (isMobile) {
    return (
      <Wrapper
        align="center"
        justify="space-around"
        columnGap="1rem"
        data-testid="bottom-navigation"
      >
        <BottomNavigation />
      </Wrapper>
    );
  } else {
    return (
      <div data-testid="side-navigation">
        <SideNavigation />
      </div>
    );
  }
};

export default Navigation;
