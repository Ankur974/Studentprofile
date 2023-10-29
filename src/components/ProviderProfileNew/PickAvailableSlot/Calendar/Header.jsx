import dayjs from "dayjs";
import styled, { css } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Text } from "@common/Text";
import FlexBox from "@common/ui/FlexBox";

import {
  PRIMARY_100,
  PRIMARY_800,
  ACCENT_400,
  ACCENT_800,
} from "@common/ui/colors";
import { trackEvent } from "@utils/helpers";

const Container = styled(FlexBox)`
  padding: 0 0.5rem;
  align-items: center;
  padding-bottom: 1rem;
  justify-content: space-between;
  border-bottom: 1px solid ${ACCENT_400};
`;

const CalendarNavigationButton = styled(FlexBox)`
  cursor: pointer;
  overflow: hidden;
  min-width: 1.5rem;
  min-height: 1.5rem;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY_100};

  svg {
    color: ${PRIMARY_800};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
      background-color: ${ACCENT_400};

      svg {
        color: ${ACCENT_800};
      }
    `}
`;

const Header = ({
  monthDate,
  increaseMonth,
  decreaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const navButtonTracker = () => {
    trackEvent({
      event: "therapy_psychiatry_see_months",
      payload: { expt_variant: "new_page" },
    });
  };

  return (
    <Container>
      <CalendarNavigationButton
        onClick={() => {
          decreaseMonth();
          navButtonTracker();
        }}
        disabled={prevMonthButtonDisabled}
      >
        <FaChevronLeft size="0.75rem" />
      </CalendarNavigationButton>

      <Text fontSize="1rem" fontWeight="500">
        {dayjs(monthDate).format("MMMM")}, {dayjs(monthDate).format("YYYY")}
      </Text>

      <CalendarNavigationButton
        onClick={() => {
          increaseMonth();
          navButtonTracker();
        }}
        disabled={nextMonthButtonDisabled}
      >
        <FaChevronRight size="0.75rem" />
      </CalendarNavigationButton>
    </Container>
  );
};

export default Header;
