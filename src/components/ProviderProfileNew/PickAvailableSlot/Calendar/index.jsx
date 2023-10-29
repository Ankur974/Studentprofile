import dayjs from "dayjs";
import Bugsnag from "@bugsnag/js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FlexBox from "@common/ui/FlexBox";

import Header from "./Header";
import Container from "./Container";
import StatusIndicators from "./StatusIndicators";

const DatePickerBox = styled(FlexBox)`
  row-gap: 1.25rem;
  flex-direction: column;

  .profile-slot-selection-calendar {
    padding: 0;
    transform: none !important;
    position: relative !important;
  }
  .react-datepicker-wrapper {
    display: none;
  }
  .react-datepicker__header {
    padding: 0;
    display: flex;
    row-gap: 0.75rem;
    border-bottom: none;
    flex-direction: column;
    background-color: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const Calendar = ({ onChange, schedules, selectedDate, popperClassName }) => {
  const [lastSchedule, setLastSchedule] = useState(null);
  const [fewSlotsDates, setFewSlotsDates] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    getLastScheduleDate();
    sortSlotsByAvailability();
  }, [schedules]);

  const datesAreOnSameDay = (day1, day2) => dayjs(day1).isSame(day2, "day");

  const getLastScheduleDate = () => {
    if (!schedules?.length) setLastSchedule(null);

    try {
      const lastSchedule = schedules?.[schedules?.length - 1];
      setLastSchedule(dayjs(lastSchedule.epoch_time).toDate());
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const sortSlotsByAvailability = () => {
    if (!schedules?.length) return;

    try {
      const fewSlotsDatesList = [];
      const unavailableSlotsDatesList = [];

      schedules?.forEach(schedule => {
        if (!!schedule?.available_slots && schedule?.available_slots < 6) {
          fewSlotsDatesList.push(new Date(schedule?.epoch_time));
        } else if (!schedule?.available_slots) {
          unavailableSlotsDatesList.push(new Date(schedule?.epoch_time));
        }
      });

      setFewSlotsDates(fewSlotsDatesList);
      setUnavailableDates(unavailableSlotsDatesList);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  return (
    <DatePickerBox>
      <StatusIndicators />

      <DatePicker
        open
        onChange={onChange}
        maxDate={lastSchedule}
        dateFormat="d/MM/yyyy"
        minDate={dayjs().toDate()}
        disabledKeyboardNavigation
        renderCustomHeader={Header}
        calendarContainer={Container}
        excludeDates={unavailableDates}
        popperClassName={popperClassName}
        maxTime={dayjs().endOf("day").toDate()}
        selected={dayjs(selectedDate).toDate()}
        dayClassName={selectedDate =>
          fewSlotsDates?.map(date =>
            datesAreOnSameDay(date, selectedDate)
              ? "few-left-slots"
              : "slots-available"
          )
        }
        formatWeekDay={nameOfDay =>
          nameOfDay && weekdays?.[dayjs(nameOfDay).day()]
        }
      />
    </DatePickerBox>
  );
};

export default Calendar;
