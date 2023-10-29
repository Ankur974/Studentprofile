import { useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

import { Text } from "@common/Text";
import FlexBox from "@common/ui/FlexBox";
import { SchedulesLoader } from "./Loaders";

import { ACCENT_500, SECONDARY_800, WHITE } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  display: none;

  @media only screen and (max-width: 768px) {
    display: flex;
    max-width: 100%;
    overflow-x: auto;
    column-gap: 1.5rem;
    align-items: center;
  }
`;

const DateSlot = styled(FlexBox)`
  cursor: pointer;
  row-gap: 0.375rem;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  flex-direction: column;
  border: 1px solid ${ACCENT_500};

  ${Text} {
    white-space: nowrap;
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${SECONDARY_800};
      background-color: ${SECONDARY_800};

      ${Text} {
        color: ${WHITE} !important;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

const RenderDateSlot = ({
  date,
  dayName,
  onClick,
  itemRef,
  selected,
  slotsAvailable,
}) => (
  <FlexBox ref={itemRef} column align="center" rowGap="0.5rem">
    <Text bold fontSize="0.75rem" lineHeight="1.25" textTransform="uppercase">
      {dayName}
    </Text>
    <DateSlot onClick={onClick} selected={selected} disabled={!slotsAvailable}>
      <Text bold color={SECONDARY_800} lineHeight="1.5">
        {date}
      </Text>
      <Text fontSize="0.75rem" lineHeight="1.25">
        {!slotsAvailable ? "not available" : `${slotsAvailable} available`}
      </Text>
    </DateSlot>
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
    if (!!selectedItemRef?.current)
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
          columnGap="1.5rem"
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
