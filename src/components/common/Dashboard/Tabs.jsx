import { Children } from "react";
import styled, { css } from "styled-components";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import FlexBox from "@common/ui/FlexBox";
import {
  DAVYS_GREY_400,
  DAVYS_GREY_600,
  DAVYS_GREY_700,
  DARK_MOSS_GREEN_900,
} from "@common/ui/colors";
import { H2 } from "./Headings";

const Container = styled(FlexBox)`
  position: relative;
  height: ${({ headerHeight }) => `calc(100% - ${headerHeight})`};
  flex-direction: column;
`;

const TabsList = styled(FlexBox)`
  padding: 0 1.5rem;
  column-gap: 1rem;
  overflow-x: auto;
`;

const TabItem = styled(FlexBox)`
  position: relative;
  padding: 1rem;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      ::after {
        content: "";
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 2px solid ${DARK_MOSS_GREEN_900};
      }
    `}

  ${({ isActive }) =>
    !isActive &&
    css`
      :hover {
        ${H2} {
          color: ${DAVYS_GREY_700};
        }
      }
    `}
`;

const Divider = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 3.625rem;
  border-bottom: 2px solid ${DAVYS_GREY_400};
`;

const TabContent = styled.div`
  height: calc(100% - 3.75rem);
  overflow-y: auto;
`;

/**
 * @param {string} defaultTabId - child tab identifier for default selection
 * @param {string} headerHeight - height of the header section (if present); to calculate container height
 *
 * Required props for children
 * @param {string} tabId - child tab identifer
 * @param {string} tabLabel - child tab label
 *
 * @example
 * <Tabs defaultTabId="sessions" headerHeight="5rem">
 *   <Sessions tabId="sessions" tabLabel="Sessions" />
 *   <Tools tabId="tools" tabLabel="Tools" />
 * </Tabs>
 */

const Tabs = ({ children, defaultTabId, headerHeight = "0rem" }) => {
  const [currentTab, setCurrentTab] = useQueryParam(
    "current_tab",
    withDefault(StringParam, defaultTabId)
  );

  const ActiveChild = Children.toArray(children)?.find(
    child => child?.props?.tabId === currentTab
  );

  const switchTab = tabId => {
    setCurrentTab(tabId, "replaceIn");
  };

  return (
    <Container headerHeight={headerHeight}>
      <TabsList>
        {Children.map(children, child => {
          const { tabId, tabLabel } = child?.props || {};
          if (!tabId || !tabLabel) return;
          const isActive = currentTab === tabId;

          return (
            <TabItem
              key={tabId}
              isActive={isActive}
              onClick={() => switchTab(tabId)}
            >
              <H2
                bold
                color={isActive ? DARK_MOSS_GREEN_900 : DAVYS_GREY_600}
                whiteSpace="nowrap"
              >
                {tabLabel}
              </H2>
            </TabItem>
          );
        })}
      </TabsList>
      <Divider />
      <TabContent>{ActiveChild}</TabContent>
    </Container>
  );
};

export default Tabs;
