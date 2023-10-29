import dynamic from "next/dynamic";
import styled, { css } from "styled-components";

import { H3 } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";
import { Loader } from "@common/Loader";
import {
  DAVYS_GREY_100,
  DAVYS_GREY_800,
  SECONDARY_100,
  SECONDARY_800,
  WHITE,
} from "@common/ui/colors";
import Link from "next/link";

const Navigation = dynamic(() => import("./Navigation"), {
  loading: () => <Loader />,
  ssr: false,
});

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

const AmahaLogo = styled.img`
  width: 40%;
  min-width: 6rem;
  min-height: 2.5rem;
  max-width: 10rem;
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
  background-color: ${DAVYS_GREY_100};

  .navigation-link {
    width: 100%;
    cursor: pointer;
    padding: 1rem 2.5rem;

    ${H3} {
      font-weight: bold;
      white-space: nowrap;
      color: ${DAVYS_GREY_800};
    }

    :hover {
      background-color: ${SECONDARY_100};

      ${H3} {
        color: ${SECONDARY_800};
      }
    }
  }

  .navigation-link.active {
    background-color: ${SECONDARY_800};

    ${H3} {
      color: ${WHITE};
    }

    :hover {
      background-color: ${SECONDARY_800};
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ expanded }) => (
  <div data-testid="expanded-container">
    <NavigationContainer expanded={expanded}>
      <NavigationWrapper>
        <FlexBox column rowGap="2.5rem">
          <FlexBox padding="2.5rem">
            <Link href="/user/dashboard">
              <AmahaLogo
                src="https://cdn.theinnerhour.com/assets/images/AmahaLogo.svg"
                alt="Amaha logo"
                draggable="false"
              />
            </Link>
          </FlexBox>
          <Navigation />
        </FlexBox>
      </NavigationWrapper>
    </NavigationContainer>
  </div>
);

export default Sidebar;
