import { useRef, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { SchedulesLoader } from "./Loaders";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_600, WHITE, ACCENT_800 } from "@common/ui/colors";
import { Body2, Caption, H5 } from "@common/ui/Headings";
import { FilterChip } from "@common/Dashboard/SelectionChip";

dayjs.extend(advancedFormat);

const Wrapper = styled(FlexBox)`
  display: none;

  @media only screen and (max-width: 768px) {
    display: flex;
    max-width: 100%;
    overflow-x: auto;
    column-gap: 0.5rem;
    align-items: center;
  }
`;

const RenderDateSlot = ({
  date,
  dayName,
  onClick,
  selected,
  slotsAvailable,
}) => (
  <FlexBox column align="center" rowGap="0.25rem">
    <Caption
      bold
      textAlign="center"
      textTransform="uppercase"
      color={ACCENT_600}
    >
      {dayName}
    </Caption>
    <FilterChip
      selected={selected}
      onClick={onClick}
      disabled={!slotsAvailable}
      padding="0.5rem"
    >
      <FlexBox column>
        <Body2 textAlign="center" bold color={selected ? WHITE : ACCENT_800}>
          {date}
        </Body2>
        <H5
          textAlign="center"
          color={selected ? WHITE : ACCENT_800}
          whiteSpace="nowrap"
        >
          {!slotsAvailable ? "not available" : `${slotsAvailable} available`}
        </H5>
      </FlexBox>
    </FilterChip>
  </FlexBox>
);

const SchedulesMobile = ({
  selectedDate,
  schedules = [],
  setSelectedDate,
  fetchingSchedules,
}) => {
  const selectedItemRef = useRef(null);

  useEffect(() => {
    if (selectedItemRef?.current)
      selectedItemRef.current?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
  }, [selectedItemRef?.current]);

  const datesAreOnSameDay = (day1, day2) => dayjs(day1).isSame(day2, "day");

  if (fetchingSchedules) {
    return (
      <Wrapper>
        <SchedulesLoader />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {schedules?.map((scheduleArr, i) => (
        <FlexBox
          align="center"
          justify="center"
          columnGap="0.5rem"
          key={"scheduleArr" + i}
        >
          {scheduleArr?.map(schedule => {
            const today = dayjs().toDate();
            const scheduleDate = dayjs(schedule?.epoch_time).toDate();
            const dayName = dayjs(scheduleDate).format("ddd");
            const dayOfMonth = dayjs(scheduleDate).format("Do");
            const month = dayjs(scheduleDate).format("MMM");
            const isToday = datesAreOnSameDay(today, scheduleDate);
            const dateLabel = isToday ? "Today" : dayOfMonth + " " + month;
            const isCurrentDateSelected = datesAreOnSameDay(
              selectedDate,
              scheduleDate
            );

            return (
              <RenderDateSlot
                date={dateLabel}
                dayName={dayName}
                key={schedule?.epoch_time}
                selected={isCurrentDateSelected}
                slotsAvailable={schedule?.available_slots}
                onClick={() => setSelectedDate(scheduleDate)}
                itemRef={isCurrentDateSelected ? selectedItemRef : null}
              />
            );
          })}
        </FlexBox>
      ))}
    </Wrapper>
  );
};

export default SchedulesMobile;
