import styled from "styled-components";

import { Body1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Link from "next/link";
import { navigationOptions } from "../navigationOptions";

const NavLink = styled.div``;

/**
 * A component representing Sidebar Navigation for Desktop.
 *
 * @returns {JSX.Element} The rendered React component.
 */

export const SideNavigation = () => {
  return (
    <FlexBox column rowGap="1rem">
      {navigationOptions.map(({ link, title }, index) => {
        const activeOption = index === 0;
        return (
          <Link href={link} key={index}>
            <NavLink
              className={`navigation-link${activeOption ? " active" : ""}`}
            >
              <Body1>{title}</Body1>
            </NavLink>
          </Link>
        );
      })}
    </FlexBox>
  );
};

export default SideNavigation;
