import dynamic from "next/dynamic";
import styled, { css } from "styled-components";
import Link from "next/link";

import { Body1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Loader from "@common/ui/Loader";
import {
  ACCENT_100,
  ACCENT_800,
  PRIMARY_100,
  PRIMARY_800,
  WHITE,
} from "@common/ui/colors";

const Navigation = dynamic(() => import("./Navigation"), {
  loading: () => <Loader />,
  ssr: false,
});

const Logo = styled.img`
  width: 100%;
  cursor: pointer;
`;

const NavigationContainer = styled.div`
  height: 100%;
  width: 16.4%;
  display: grid;
  overflow: hidden;
  min-width: 14.75rem;
  grid-template-columns: 1fr;
  transition: all 300ms ease-in-out;

  ${({ expanded }) =>
    !expanded &&
    css`
      width: 0;
      min-width: 0;
      grid-template-columns: 0fr;
    `}

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavigationWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  row-gap: 2.5rem;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${ACCENT_100};

  .navigation-link {
    width: 100%;
    cursor: pointer;
    padding: 0 2.5rem;

    ${Body1} {
      font-weight: bold;
      white-space: nowrap;
      color: ${ACCENT_800};
    }

    :hover {
      background-color: ${PRIMARY_100};

      ${Body1} {
        color: ${PRIMARY_800};
      }
    }
  }

  .navigation-link.active {
    background-color: ${PRIMARY_800};
    padding: 1rem 2.5rem;

    ${Body1} {
      color: ${WHITE};
    }

    :hover {
      background-color: ${PRIMARY_800};
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ expanded }) => (
  <NavigationContainer expanded={expanded}>
    <NavigationWrapper>
      <FlexBox column rowGap="2.5rem">
        <FlexBox padding="2.5rem">
          <Link href="/user/dashboard">
            <Logo
              isStatic
              height={36}
              draggable={false}
              src="/assets/pamprazzi-logo.svg"
              alt="pamprazzi Logo"
            />
          </Link>
        </FlexBox>
        <Navigation />
      </FlexBox>
    </NavigationWrapper>
  </NavigationContainer>
);

export default Sidebar;
