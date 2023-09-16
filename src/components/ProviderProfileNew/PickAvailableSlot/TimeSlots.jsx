import { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

import { Text } from "@common/Text";
import { FlexBox } from "@common/FlexBox";

import {
  ACCENT_400,
  ACCENT_700,
  SECONDARY_800,
  WHITE,
} from "@constants/colors";
import { formatSlotTime } from "@utils/helpers";
import { SlotsLoader } from "./Loaders";
import { ACCENT_100 } from "../../../constants/colors";

const Wrapper = styled(FlexBox)`
  row-gap: 1.5rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  flex-direction: column;
  background-color: ${WHITE};

  .divider:last-child {
    display: none;
  }

  ${Text} {
    line-height: 1.25;
    font-size: 0.75rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 0;
    border-radius: unset;
    background-color: unset;

    .divider {
      display: none;
    }
  }
`;

const SlotText = styled(Text)`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const SlotsContainer = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem 0.75rem;

  @media only screen and (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const SlotPill = styled(FlexBox)`
  width: 4.25rem;
  cursor: pointer;
  padding: 0.5rem 0;
  justify-content: center;
  border-radius: 1.125rem;
  border: 1px solid ${ACCENT_400};

  ${Text} {
    font-size: 0.75rem;
    color: ${ACCENT_700};
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${SECONDARY_800};
      background-color: ${SECONDARY_800};

      ${Text} {
        color: ${ACCENT_100};
      }
    `}
`;

const slotTimeRanges = {
  morning: "08:00 AM - 12:00 PM",
  noon: "12:00 PM - 04:00 PM",
  evening: "04:00 PM - 08:00 PM",
  night: "08:00 PM - 12:00 AM",
};

const TimeSlots = ({
  timeSlots = [],
  selectedTimeSlot,
  fetchingTimeSlots,
  setSelectedTimeSlot,
}) => {
  const [groupedSlots, setGroupedSlots] = useState({
    morning: [],
    noon: [],
    evening: [],
    night: [],
  });

  useEffect(() => {
    if (timeSlots) {
      const slotGroups = {
        morning: [],
        noon: [],
        evening: [],
        night: [],
      };

      timeSlots?.map(slot => {
        if (slot >= "20:00" || (slot >= "00:00" && slot < "08:00")) {
          slotGroups.night.push(slot);
        } else if (slot >= "08:00" && slot < "12:00") {
          slotGroups.morning.push(slot);
        } else if (slot >= "12:00" && slot < "16:00") {
          slotGroups.noon.push(slot);
        } else if (slot >= "16:00" && slot < "20:00") {
          slotGroups.evening.push(slot);
        }
      });

      setGroupedSlots(slotGroups);
    }
  }, [timeSlots]);

  if (fetchingTimeSlots) {
    return (
      <Wrapper>
        <SlotsLoader />
        <SlotsLoader />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {Object?.keys(groupedSlots)?.map(key => {
        if (!!groupedSlots?.[key]?.length) {
          return (
            <Fragment key={key}>
              <FlexBox column rowGap="1rem">
                <FlexBox
                  padding="0.25rem"
                  align="center"
                  justify="space-between"
                >
                  <Text bold textTransform="uppercase">
                    {key}
                  </Text>
                  <SlotText bold>{slotTimeRanges[key]}</SlotText>
                </FlexBox>
                <SlotsContainer>
                  {groupedSlots?.[key]?.map(slot => (
                    <SlotPill
                      key={slot}
                      selected={slot === selectedTimeSlot}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      <Text>{formatSlotTime(slot)}</Text>
                    </SlotPill>
                  ))}
                </SlotsContainer>
              </FlexBox>
              <div className="divider" />
            </Fragment>
          );
        }
      })}
    </Wrapper>
  );
};

export default TimeSlots;
