import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { SchedulesLoader } from "./Loaders";
import {
  ACCENT_400,
  ACCENT_600,
  ACCENT_800,
  PRIMARY_800,
  WHITE,
} from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { Body2, Caption, H5 } from "@common/ui/Headings";
import { FilterChip } from "@common/Dashboard/SelectionChip";

dayjs.extend(advancedFormat);

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
    color: ${PRIMARY_800};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      cursor: not-allowed;
      border: 1px solid ${ACCENT_400};

      svg {
        color: ${ACCENT_400};
      }
    `}
`;

const SlotsContainer = styled(FlexBox)`
  background-color: ${WHITE};
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
          width="100%"
          textAlign="center"
          color={selected ? WHITE : ACCENT_600}
        >
          {!slotsAvailable ? "not available" : `${slotsAvailable} available`}
        </H5>
      </FlexBox>
    </FilterChip>
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
          <SlotsContainer
            align="stretch"
            justify="space-evenly"
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
          </SlotsContainer>
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default SchedulesDesktop;
