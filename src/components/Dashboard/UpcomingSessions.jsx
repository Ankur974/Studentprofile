import styled from "styled-components";

import { Button } from "@common/Dashboard/Buttons";
import SessionCard from "@common/Dashboard/SessionCard";
import FlexBox from "@common/ui/FlexBox";
import { DAVYS_GREY_300, WHITE } from "@common/ui/colors";

const Divider = styled.div`
  height: 1px;
  width: 100%;
`;

const SessionsWrapper = styled.div`
  @media screen and (min-width: 768px) {
    max-height: 60vh;
    overflow: auto;
  }
`;

const BookCTAWrapper = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${WHITE};
  border-radius: 0 0 1rem 1rem;
  @media screen and (min-width: 768px) {
    padding: 1.5rem;
    border-top: 1px solid ${DAVYS_GREY_300};
    position: absolute;
    bottom: 0;
  }
`;

const UpcomingSessions = ({
  toggleBookSessionWith,
  sessions,
  suggestedSessions,
}) => {
  return (
    <>
      <SessionsWrapper>
        <FlexBox column rowGap="1rem" padding="1.5rem">
          {sessions.map((session, index) => (
            <SessionCard session={session} key={index} />
          ))}
          {suggestedSessions.map((session, index) => (
            <SessionCard session={session} key={index} isNsp />
          ))}
        </FlexBox>
      </SessionsWrapper>
      <Divider />
      <BookCTAWrapper>
        <Button outline onClick={toggleBookSessionWith}>
          BOOK Session
        </Button>
      </BookCTAWrapper>
    </>
  );
};

export default UpcomingSessions;
