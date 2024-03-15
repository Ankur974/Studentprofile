import Link from "next/link";
import { useRouter } from "next/router";

import { Body1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { navigationOptions } from "../navigationOptions";

/**
 * A component representing Sidebar Navigation for Desktop.
 *
 * @returns {JSX.Element} The rendered React component.
 */

export const SideNavigation = () => {
  const router = useRouter();
  return (
    <FlexBox column rowGap="1rem">
      {navigationOptions.map(({ link, title }, index) => {
        const activeOption = link === router.pathname;
        return (
          <Link href={link} key={index}>
            <div className={`navigation-link${activeOption ? " active" : ""}`}>
              <Body1>{title}</Body1>
            </div>
          </Link>
        );
      })}
    </FlexBox>
  );
};

export default SideNavigation;
