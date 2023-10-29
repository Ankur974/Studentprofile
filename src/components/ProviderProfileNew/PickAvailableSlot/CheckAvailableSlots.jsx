import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FiCalendar, FiX } from "react-icons/fi";
import styled, { css } from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Text } from "@common/Text";

import TimeSlots from "./TimeSlots";
import { CalendarLoader } from "./Loaders";
import SchedulesMobile from "./SchedulesMobile";
import SchedulesDesktop from "./SchedulesDesktop";

import {
  ACCENT_400,
  ACCENT_800,
  PRIMARY_100,
  PRIMARY_800,
} from "@common/ui/colors";
import { trackEvent } from "@utils/helpers";
import { DAVYS_GRAY_400 } from "@common/ui/colors";

const Calendar = dynamic(() => import("./Calendar"), {
  ssr: false,
  loading: () => <CalendarLoader />,
});

const Wrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 1.5rem;
  flex-direction: column;
`;

const TitleText = styled(Text)`
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 700;

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const IconWrapper = styled(FlexBox)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease-in-out;
  border: 1px solid ${DAVYS_GRAY_400};

  svg {
    color: ${ACCENT_800};
    transition: all 200ms ease-in-out;
  }
`;

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid ${DAVYS_GRAY_400};
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
  commonAnalyticsPayload,
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
    trackEvent({
      event: "therapy_psychiatry_choose_date",
      payload: {
        ...commonAnalyticsPayload,
        date_view: "calendar",
      },
    });
    setShowCalendar(false);
  };

  const handleSelectDate = date => {
    setSelectedDate(date);
    trackEvent({
      event: "therapy_psychiatry_choose_date",
      payload: {
        ...commonAnalyticsPayload,
        date_view: "consolidated",
      },
    });
  };

  const handleSelectTimeSlot = slot => {
    setSelectedTimeSlot(slot);
    trackEvent({
      event: "therapy_psychiatry_choose_slot",
      payload: commonAnalyticsPayload,
    });
  };

  return (
    <Wrapper>
      <FlexBox
        width="100%"
        justify="space-between"
        align="center"
        columnGap="0.5rem"
      >
        <TitleText>Check available slots</TitleText>
        <Divider />
        <IconWrapper
          onClick={() => {
            setShowCalendar(prev => !prev);
            if (!showCalendar) {
              trackEvent({
                event: "therapy_psychiatry_see_calendar",
                payload: commonAnalyticsPayload,
              });
            }
          }}
        >
          {showCalendar ? <FiX size="1.5rem" /> : <FiCalendar size="1.5rem" />}
        </IconWrapper>
      </FlexBox>

      {formattedSchedules?.length === 0 ? (
        <div>No slots available</div>
      ) : (
        <>
          {showCalendar ? (
            <Calendar
              schedules={schedules}
              selectedDate={selectedDate}
              onChange={handleDateChange}
              popperClassName="profile-slot-selection-calendar"
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
