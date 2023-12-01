import dayjs from "dayjs";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styled, { css } from "styled-components";

import { Case, Default, Switch } from "@common/ConditionalRendering";
import FlexBox from "@common/ui/FlexBox";
import { Body2 } from "@common/ui/Headings";
import { ACCENT_800, PRIMARY_800 } from "@common/ui/colors";
import JourneyItem from "./JourneyItem";

const SecondaryContainer = styled(FlexBox)``;

const SideBorder = styled.div`
  width: 1px;
  position: absolute;
  left: 0.5rem;
  bottom: 0;
  height: 100%;
  ${({ isOpen }) =>
    isOpen
      ? css`
          background-color: ${ACCENT_800};
        `
      : css`
          background: repeating-linear-gradient(
              to bottom,
              transparent 0 4px,
              ${ACCENT_800} 4px 8px
            )
            80%/2px 100% no-repeat;
        `}
`;

const SecondaryHeader = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0 0.5rem 1.5rem;
`;

const CollapsedState = ({ journeyObject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExpandList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SecondaryContainer column isOpen={isOpen}>
      <SecondaryHeader>
        <SideBorder isOpen={isOpen} />
        <FlexBox style={{ width: "94%" }}>
          <FlexBox
            align="center"
            columnGap="0.5rem"
            onClick={handleExpandList}
            style={{ cursor: "pointer" }}
          >
            <Body2 bold color={PRIMARY_800}>
              {journeyObject?.event_list?.length} more row/s
            </Body2>
            <Switch>
              <Case condition={isOpen}>
                <FiChevronUp strokeWidth={"0.2rem"} color={PRIMARY_800} />
              </Case>
              <Default>
                <FiChevronDown strokeWidth={"0.2rem"} color={PRIMARY_800} />
              </Default>
            </Switch>
          </FlexBox>
        </FlexBox>
      </SecondaryHeader>
      {isOpen && (
        <FlexBox column>
          {journeyObject?.event_list?.map(journeyObject => {
            return (
              <JourneyItem
                key={"primary" + journeyObject?.id}
                title={dayjs(journeyObject?.datetime).format(
                  "DD MMMM YYYY, hh:mm a"
                )}
                content={journeyObject?.description}
                isPrimary={false}
                redirectionLink={journeyObject?.redirectionLink}
              />
            );
          })}
        </FlexBox>
      )}
    </SecondaryContainer>
  );
};

export default CollapsedState;
