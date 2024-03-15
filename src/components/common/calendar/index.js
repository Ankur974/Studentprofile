import styled from "styled-components";
import DatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";

import CustomHeader from "./Header";
import CustomContainer from "./Container";
import {
  ACCENT_0,
  PRIMARY_800,
  PRIMARY_700,
  ACCENT_400,
} from "@common/ui/colors";

const DatePickerBox = styled.div`
  margin: 0.2rem 0 0 0;
  min-height: 42rem;
  max-height: 30rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    margin: 2rem 0rem 1rem 0;
    height: 100%;
  }

  .react-calendar {
    width: 100%;
    border: none;
    margin: auto;
  }

  .react-calendar__tile {
    max-width: 5rem;
    height: 3rem;
    margin: 0;
    padding: 0;
  }

  .react-calendar__tile:hover {
    border-radius: 50%;
    background-color: ${ACCENT_400};
  }

  .react-calendar__tile--now {
    background-color: ${PRIMARY_800};
    border-radius: 50%;
    color: ${ACCENT_0} !important;
  }

  .react-calendar__tile--now:hover {
    background-color: ${PRIMARY_700};
  }

  .react-calendar__month-view {
    
  }
  .react-calendar__month-view__weekdays {
    margin-top: -1.2rem;
  }

  .react-calendar__month-view__weekdays__weekday {
    border: none !important;
  }

  .popper-className {
    position: relative !important;
    transform: none !important;
    padding: 0;
  }
  .react-datepicker-wrapper {
    display: none;
  }
`;

const Calendar = ({
  open,
  selected,
  onChange,
  customInput,
  popperClassName,
  minDate,
  maxDate,
  maxTime,
  excludeDates,
  dateFormat,
  formatWeekDay,
  dayClassName,
  increaseMonthTracker,
  decreaseMonthTracker,
}) => {
  return (
    <DatePickerBox>
      <DatePicker
        open={open}
        selected={selected}
        onChange={onChange}
        customInput={customInput}
        popperClassName={popperClassName}
        calendarContainer={CustomContainer}
        minDate={minDate}
        maxDate={maxDate}
        maxTime={maxTime}
        excludeDates={excludeDates}
        dateFormat={dateFormat}
        formatWeekDay={formatWeekDay}
        dayClassName={dayClassName}
        renderCustomHeader={({
          monthDate,
          increaseMonth,
          decreaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CustomHeader
            monthDate={monthDate}
            increaseMonth={() => {
              increaseMonthTracker?.(monthDate);
              increaseMonth();
            }}
            decreaseMonth={() => {
              decreaseMonthTracker?.(monthDate);
              decreaseMonth();
            }}
            prevMonthButtonDisabled={prevMonthButtonDisabled}
            nextMonthButtonDisabled={nextMonthButtonDisabled}
          />
        )}
      />
    </DatePickerBox>
  );
};

export default Calendar;
