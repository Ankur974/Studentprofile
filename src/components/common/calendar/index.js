import styled from "styled-components";
import DatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";

import CustomHeader from "./Header";
import CustomContainer from "./Container";

const DatePickerBox = styled.div`
  @media screen and (max-width: 768px) {
    margin: 2rem 0rem 3rem 0;
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
