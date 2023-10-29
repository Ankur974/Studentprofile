import styled from "styled-components";

import { Caption } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";
import Link from "next/link";
import { DAVYS_GREY_600, PRIMARY_800 } from "../../../../constants/colors";
import { navigationOptions } from "../navigationOptions";

const NavLink = styled(FlexBox)``;

/**
 * A component representing Bottom Navigation for Mobile.
 *
 * @returns {JSX.Element} The rendered React component.
 */

const BottomNavigation = () => {
  return navigationOptions.map(({ icon, iconActive, link, title }, index) => {
    const activeOption = index === 0;
    return (
      <Link key={index} href={link}>
        <NavLink
          align="center"
          column
          rowGap="0.2rem"
          key={index}
          data-testid={`nav-link-${index}`}
          className={`navigation-link${activeOption ? " active" : ""}`}
        >
          <img
            src={activeOption ? iconActive : icon}
            alt={title}
            data-testid={`menu-icon-${index}`}
          />
          <Caption
            color={activeOption ? PRIMARY_800 : DAVYS_GREY_600}
            data-testid={`menu-item-${index}`}
          >
            {title}
          </Caption>
        </NavLink>
      </Link>
    );
  });
};

export default BottomNavigation;
