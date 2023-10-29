import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import { Text } from "@common/Text";
import FlexBox from "@common/ui/FlexBox";
import { SchedulesLoader } from "./Loaders";
import {
  ACCENT_400,
  ACCENT_500,
  WHITE,
  DAVYS_GRAY_400,
  SECONDARY_800,
} from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  .carousel-root {
    max-width: 100%;
  }

  .carousel-slider {
    display: flex;
    align-items: center;
  }
`;

const CarouselNav = styled(FlexBox)`
  min-width: 2rem;
  min-height: 2rem;
  max-width: 2rem;
  max-height: 2rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid ${ACCENT_400};
  margin-top: 1.25rem;

  svg {
    color: ${SECONDARY_800};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      cursor: not-allowed;
      border: 1px solid ${DAVYS_GRAY_400};

      svg {
        color: ${DAVYS_GRAY_400};
      }
    `}
`;

const DateSlot = styled(FlexBox)`
  flex: 1;
  cursor: pointer;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: center;
  background-color: ${WHITE};
  border: 1px solid ${ACCENT_500};

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
      cursor: not-allowed;
    `}
`;

const RenderDateSlot = ({
  date,
  dayName,
  onClick,
  selected,
  slotsAvailable,
}) => (
  <FlexBox column align="center" rowGap="0.5rem">
    <Text
      bold
      textAlign="center"
      fontSize="0.875rem"
      lineHeight="1.5"
      textTransform="uppercase"
    >
      {dayName}
    </Text>
    <DateSlot selected={selected} onClick={onClick} disabled={!slotsAvailable}>
      <Text textAlign="center" bold lineHeight="1.5">
        {date}
      </Text>
      <Text textAlign="center" fontSize="0.75rem" lineHeight="1.5">
        {!slotsAvailable ? "not available" : `${slotsAvailable} available`}
      </Text>
    </DateSlot>
  </FlexBox>
);

const SchedulesDesktop = ({
  selectedDate,
  schedules = [],
  setSelectedDate,
  fetchingSchedules,
}) => {
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    if (!schedules?.length) return;

    const index = schedules?.findIndex(scheduleArr =>
      scheduleArr?.find(schedule =>
        datesAreOnSameDay(selectedDate, dayjs(schedule?.epoch_time).toDate())
      )
    );

    setSelectedItem(index);
  }, [selectedDate, schedules]);

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
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={selectedItem}
        renderArrowPrev={(onClick, hasPrev, label) => (
          <CarouselNav label={label} disabled={!hasPrev} onClick={onClick}>
            <FaChevronLeft size="1rem" />
          </CarouselNav>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <CarouselNav
            label={label}
            disabled={!hasNext}
            onClick={onClickHandler}
          >
            <FaChevronRight size="1rem" />
          </CarouselNav>
        )}
      >
        {schedules?.map((scheduleArr, i) => (
          <FlexBox
            align="stretch"
            justify="center"
            columnGap="1rem"
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
                />
              );
            })}
          </FlexBox>
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default SchedulesDesktop;
