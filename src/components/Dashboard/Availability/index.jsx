import dynamic from "next/dynamic";
import { FiCalendar, FiX } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import TimeSlots from "./TimeSlots";
import { CalendarLoader } from "./Loaders";
import SchedulesMobile from "./SchedulesMobile";
import SchedulesDesktop from "./SchedulesDesktop";
import { ACCENT_800, ACCENT_400 } from "@common/ui/colors";
import { Body2 } from "@common/ui/Headings";

const Calendar = dynamic(() => import("./Calendar"), {
  ssr: false,
  loading: () => <CalendarLoader />,
});

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  row-gap: 1.5rem;
  flex-direction: column;
`;

const IconWrapper = styled(FlexBox)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease-in-out;

  svg {
    color: ${ACCENT_800};
    transition: all 200ms ease-in-out;
  }
`;

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid ${ACCENT_400};
  flex: 1;
`;

const CheckAvailableSlots = ({
  selectedDate,
  schedules = [],
  setSelectedDate,
  selectedTimeSlot,
  fetchingSchedules,
  fetchingTimeSlots,
  setSelectedTimeSlot,
  timeSlotsForDate = [],
  // commonAnalyticsPayload,
  sectionTitle,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [formattedSchedules, setFormattedSchedules] = useState([]);

  useEffect(() => {
    if (schedules) {
      let tempSchedulesArr = [];
      for (let i = 0; i < schedules?.length; i += 3) {
        const subarray = schedules?.slice(i, i + 3);
        tempSchedulesArr = [...tempSchedulesArr, subarray];
      }
      setFormattedSchedules(tempSchedulesArr);
    }
  }, [schedules]);

  const handleDateChange = date => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleSelectDate = date => {
    setSelectedDate(date);
  };

  const handleSelectTimeSlot = slot => {
    setSelectedTimeSlot(slot);
  };

  const showNullState = formattedSchedules?.length === 0 && !fetchingSchedules;

  return (
    <Wrapper>
      <FlexBox
        width="100%"
        justify="space-between"
        align="center"
        columnGap="0.5rem"
      >
        <Body2 bold>{sectionTitle}</Body2>
        <Divider />
        <IconWrapper
          onClick={() => {
            setShowCalendar(prev => !prev);
          }}
        >
          {showCalendar ? <FiX size="1.5rem" /> : <FiCalendar size="1.5rem" />}
        </IconWrapper>
      </FlexBox>

      {showNullState ? (
        <Body2 bold>No slots available</Body2>
      ) : (
        <>
          {showCalendar ? (
            <Calendar
              schedules={schedules}
              selectedDate={selectedDate}
              onChange={handleDateChange}
              popperClassName="reschedule-slot-selection-calendar"
            />
          ) : (
            <>
              <SchedulesDesktop
                selectedDate={selectedDate}
                schedules={formattedSchedules}
                setSelectedDate={handleSelectDate}
                fetchingSchedules={fetchingSchedules}
              />
              <SchedulesMobile
                selectedDate={selectedDate}
                schedules={formattedSchedules}
                setSelectedDate={handleSelectDate}
                fetchingSchedules={fetchingSchedules}
              />
              <TimeSlots
                timeSlots={timeSlotsForDate}
                selectedTimeSlot={selectedTimeSlot}
                fetchingTimeSlots={fetchingTimeSlots}
                setSelectedTimeSlot={handleSelectTimeSlot}
              />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default CheckAvailableSlots;
