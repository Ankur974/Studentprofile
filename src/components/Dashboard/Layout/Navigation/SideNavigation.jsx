import styled from "styled-components";

import { H3 } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";
import Link from "next/link";
import { navigationOptions } from "../navigationOptions";

const NavLink = styled.span``;

/**
 * A component representing Sidebar Navigation for Desktop.
 *
 * @returns {JSX.Element} The rendered React component.
 */

export const SideNavigation = () => {
  return (
    <FlexBox column>
      {navigationOptions.map(({ link, title }, index) => {
        const activeOption = index === 0;
        return (
          <Link href={link} key={index}>
            <NavLink
              className={`navigation-link${activeOption ? " active" : ""}`}
              data-testid={`nav-link-${index}`}
            >
              <H3 data-testid={`menu-item-${index}`}>{title}</H3>
            </NavLink>
          </Link>
        );
      })}
    </FlexBox>
  );
};

export default SideNavigation;
