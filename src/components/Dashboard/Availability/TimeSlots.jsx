import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

import { formatSlotTime } from "@utils/helpers";
import FlexBox from "@common/ui/FlexBox";
import { Body2, Support } from "@common/ui/Headings";
import { FilterChip } from "@common/ui/SelectionChip";
import { ACCENT_600, white } from "@common/ui/colors";
import { SlotsLoader } from "./Loaders";

dayjs.extend(advancedFormat);

const Wrapper = styled(FlexBox)`
  row-gap: 1.5rem;
  flex-direction: column;
  background-color: ${white};
  height: auto;
  overflow-y: scroll;

  .divider:last-child {
    display: none;
  }

  ${Body2} {
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

const SlotsContainer = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;

  @media only screen and (max-width: 768px) {
    gap: 0.75rem;
  }
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
    <Wrapper className="hide-scrollbar">
      {Object?.keys(groupedSlots)?.map(key => {
        if (groupedSlots?.[key]?.length > 0) {
          return (
            <Fragment key={key}>
              <FlexBox column rowGap="1rem">
                <FlexBox
                  padding="0.25rem"
                  align="center"
                  justify="space-between"
                >
                  <Support bold color={ACCENT_600} textTransform="uppercase">
                    {key}
                  </Support>
                  <Support bold color={ACCENT_600}>
                    {slotTimeRanges[key]}
                  </Support>
                </FlexBox>
                <SlotsContainer>
                  {groupedSlots?.[key]?.map(slot => (
                    <FilterChip
                      width="max-content"
                      key={slot}
                      selected={slot === selectedTimeSlot}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      <Support
                        whiteSpace="nowrap"
                        color={slot === selectedTimeSlot && white}
                      >
                        {formatSlotTime(slot)}
                      </Support>
                    </FilterChip>
                  ))}
                </SlotsContainer>
              </FlexBox>
            </Fragment>
          );
        }
      })}
    </Wrapper>
  );
};

export default TimeSlots;
