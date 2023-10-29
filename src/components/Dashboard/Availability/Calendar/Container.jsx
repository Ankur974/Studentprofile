import styled from "styled-components";

import {
  WHITE,
  SECONDARY_500,
  PRIMARY_800,
  ACCENT_400,
  ACCENT_500,
  ACCENT_600,
  ACCENT_800,
} from "@common/ui/colors";

const CalendarContainer = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  .few-left-slots {
    font-size: 0.875rem;
    color: ${PRIMARY_800} !important;
  }
  .slots-available {
    font-size: 0.875rem;
    color: ${SECONDARY_500};
  }

  .react-datepicker__month-container {
    width: 100%;
    display: flex;
    row-gap: 1.25rem;
    flex-direction: column;
  }
  .react-datepicker__month {
    margin: 0;
    width: 100%;
    padding: 0 1.5rem;
  }

  .react-datepicker__week {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .react-datepicker__day-names {
    display: flex;
    padding: 0 1.5rem;
    align-items: center;
    padding-bottom: 0.5rem;
    color: ${SECONDARY_500};
    justify-content: space-between;
    border-bottom: 1px solid ${ACCENT_400};
  }
  .react-datepicker__day-name {
    font-size: 0.875rem;
    color: ${ACCENT_600} !important;
  }
  .react-datepicker__day {
    color: ${SECONDARY_500};
    margin: 0.5rem;
  }
  .react-datepicker__day:hover {
    border-radius: 50%;
  }

  .react-datepicker__day--disabled {
    font-size: 0.875rem;
    color: ${ACCENT_500} !important;
  }
  .react-datepicker__day--selected {
    border-radius: 50%;
    font-size: 0.875rem;
    color: ${WHITE} !important;
    background-color: ${ACCENT_800};
  }

  @media only screen and (max-width: 768px) {
    .react-datepicker__month,
    .react-datepicker__day-names {
      padding: 0;
    }
  }
`;

const Container = ({ children }) => (
  <CalendarContainer>{children}</CalendarContainer>
);

export default Container;
