import styled from "styled-components";
import {
  ACCENT_300,
  ACCENT_800,
  PRIMARY_800,
  SECONDARY_500,
  SECONDARY_700,
  WHITE,
} from "@common/ui/colors";

const CalendarContainer = styled.div`
  height: 15rem;
  width: 19rem;
  font-size: 0.8rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    .react-calendar__header {
      border-bottom: none;
      background-color: inherit;
      border-radius: 0.8rem 0.8rem 0 0;
    }
    .react-calendar__month-container {
      background-color: ${ACCENT_300};
    }
  }

  .react-calendar__day-names {
    color: ${SECONDARY_500};
    border-bottom: none !important;
  }
  .react-calendar__day-name {
    color: blue !important;
    opacity: 0.2;
    font-size: 0.8rem;
    border-bottom: none !important;
  }
  .react-calendar__day {
    color: ${SECONDARY_500};
    border-bottom: none;
  }
  .react-calendar__header {
    border-bottom: none;
    background-color: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .few-left-slots {
    color: ${PRIMARY_800} !important;
    font-size: 0.8rem;
  }
  .more-left-slots {
    color: ${SECONDARY_500};
    font-size: 0.8rem;
  }
  .react-calendar__month-container {
    width: 100%;
    box-sizing: border-box;
    border-radius: 0 0 0.8rem 0.8rem;
  }
  .react-calendar__day--disabled {
    color: ${ACCENT_800} !important;
    font-size: 0.8rem;
    opacity: 0.2;
  }
  .react-calendar__day--selected {
    background-color: ${SECONDARY_700};
    color: ${WHITE} !important;
    font-size: 0.8rem;
  }
  .react-calendar__week {
    height: 2.4rem;
  }
  .react-calendar__day--keyboard-selected {
    background-color: ${WHITE};
  }
  .react-calendar__day-name,
  .react-calendar__day {
    width: 2.1rem;
  }
`;

const CustomContainer = ({ children }) => (
  <CalendarContainer>{children}</CalendarContainer>
);

export default CustomContainer;
