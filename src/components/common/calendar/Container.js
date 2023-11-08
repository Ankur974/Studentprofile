import styled from "styled-components";

const CalendarContainer = styled.div`
  height: 19rem;
  width: 19rem;
  font-size: 0.8rem;
  font-weight: 600;
`;
// const CalendarContainer = styled.div`
//   height: 19rem;
//   width: 19rem;
//   font-size: 0.8rem;
//   font-weight: 600;

// @media screen and (max-width: 768px) {
//   .react-datepicker__header {
//     border-bottom: none;
//     background-color: inherit;
//     border-radius: 0.8rem 0.8rem 0 0;
//   }
//   .react-datepicker__month-container {
//     background-color: ${LIGHT_WHITE_GREY};
//   }
// }

// .react-datepicker__day-names {
//   color: ${SECONDARY_500};
// }
// .react-datepicker__day-name {
//   color: ${DARK_BLUE} !important;
//   opacity: 0.2;
//   font-size: 0.8rem;
// }
// .react-datepicker__day {
//   color: ${SECONDARY_500};
// }
// .react-datepicker__header {
//   border-bottom: none;
//   background-color: inherit;
//   border-top-left-radius: 0;
//   border-top-right-radius: 0;
// }
// .few-left-slots {
//   color: ${PRIMARY_800} !important;
//   font-size: 0.8rem;
// }
// .more-left-slots {
//   color: ${SECONDARY_500};
//   font-size: 0.8rem;
// }
// .react-datepicker__month-container {
//   width: 100%;
//   box-sizing: border-box;
//   border-radius: 0 0 0.8rem 0.8rem;
// }
// .react-datepicker__day--disabled {
//   color: ${ACCENT_800} !important;
//   font-size: 0.8rem;
//   opacity: 0.2;
// }
// .react-datepicker__day--selected {
//   background-color: ${SECONDARY_700};
//   color: ${WHITE} !important;
//   font-size: 0.8rem;
// }
// .react-datepicker__week {
//   height: 2.4rem;
// }
// .react-datepicker__day--keyboard-selected {
//   background-color: ${WHITE};
// }
// .react-datepicker__day-name,
// .react-datepicker__day {
//   width: 2.1rem;
// }

const CustomContainer = ({ children }) => (
  <CalendarContainer>{children}</CalendarContainer>
);

export default CustomContainer;
