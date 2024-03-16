import styled from "styled-components";

import SessionCard from "@common/SessionCard";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Resposive";

const Divider = styled.div`
  height: 0.5rem;
  width: 100%;
`;

const SessionsWrapper = styled.div`
  @media ${device.tablet} {
    max-height: 60vh;
    overflow: auto;
  }
`;

const UpcomingSessions = ({ sessions, suggestedSessions }) => {
  return (
    <>
      <SessionsWrapper>
        <FlexBox column rowGap="1rem" padding="1.5rem">
          {sessions?.map((session, index) => (
            <SessionCard session={session} key={index} />
          ))}
          {suggestedSessions?.map((session, index) => (
            <SessionCard session={session} key={index} isNsp />
          ))}
        </FlexBox>
      </SessionsWrapper>
      <Divider />
      {/* <BookCTAWrapper>
        <Button outline onClick={toggleBookSessionWith}>
          BOOK Session
        </Button>
      </BookCTAWrapper> */}
    </>
  );
};

export default UpcomingSessions;
