import styled from "styled-components";
import DatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";

import CustomHeader from "./Header";
import CustomContainer from "./Container";
import {
  ACCENT_0,
  PRIMARY_800,
  PRIMARY_700,
} from "@common/ui/colors";

const DatePickerBox = styled.div`
  margin: 0.2rem 0 0 0;
  height: 100vh;
  width: 100%;
  

  @media screen and (max-width: 768px) {
    margin: 2rem 0rem 3rem 0;
    height:auto;
  }

  .react-calendar {
    width: 100%;
    border: none;
    margin: auto;
  }

  .react-calendar__tile--now {
    background-color: ${PRIMARY_800};
    padding:1rem 0rem;
    border-radius: 50%;
    color: ${ACCENT_0} !important;
  }

  .react-calendar__tile--now:hover {
    background-color: ${PRIMARY_700};
  }

  .react-calendar__month-view__weekdays {
    border-bottom: none !important;
  }

  .react-calendar__month-view__weekdays__weekday {
    border-bottom: none !important;
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
