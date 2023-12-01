import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import HolidayList from "./HolidayList";
import CalendarForm from "./CalendarForm";
import { device } from "@common/ui/Resposive";
import { SECONDARY_0 } from "@common/ui/colors";

const EventListAndFormWrapper = styled(FlexBox)`
  flex-direction: column;
  max-width: 25rem;
  row-gap: 1rem;
  background-color: ${SECONDARY_0};

  @media ${device.laptop} {
    max-width: 40rem;
    row-gap: 2rem;
    margin: auto;
  }
`;

const MyCalendar = () => {
  return (
    <>
      <EventListAndFormWrapper column>
        <HolidayList />
        <CalendarForm />
      </EventListAndFormWrapper>
    </>
  );
};

export default MyCalendar;
