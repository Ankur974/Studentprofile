import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useMobileView from "@hooks/useMobileView";
import FlexBox from "@common/ui/FlexBox";
import SessionsListing from "./SessionsListing";
import { Text } from "@common/Text";
import { trackEvent } from "@utils/helpers";
import { ACCENT_800 } from "@common/ui/colors";
import { THERAPIST, PSYCHIATRIST } from "@constants";
import urls from "@urls";
import usePaginatedSessions from "@hooks/usePaginatedSessions";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.6rem;
`;

const Underline = styled.div`
  margin-left: -10%;
  width: 120%;
  height: 5px;
  background-color: ${ACCENT_800};
  margin-top: 10px;
  border-radius: 8px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const SessionsWrapper = styled.div`
  width: 50%;
  text-align: left;
`;

const Sessions = ({ providerType, providerPublicProfile }) => {
  const isMobile = useMobileView();
  const [selected, setSelected] = useState("upcoming");
  const [upcomingSessionsLoading, setUpcomingSessionsLoading] = useState(false);
  const [completedSessionsLoading, setCompletedSessionsLoading] =
    useState(false);
  const [upcomingSessionsPage, setUpcomingSessionsPage] = useState(1);
  const [completedSessionsPage, setCompletedSessionsPage] = useState(1);

  const providerProfile = useSelector(
    state => state?.provider?.providerProfile
  );

  useEffect(() => {
    setUpcomingSessionsPage(1);
    setCompletedSessionsPage(1);
  }, [providerProfile?.id]);

  const upcomingSessions = usePaginatedSessions(
    urls.upcomingSessions,
    upcomingSessionsPage,
    setUpcomingSessionsLoading
  );

  const completedSessions = usePaginatedSessions(
    urls.completedSessions,
    completedSessionsPage,
    setCompletedSessionsLoading
  );

  const selectedStyle = {
    opacity: "1",
  };

  if (isMobile) {
    return (
      <>
        <Container>
          <FlexBox columnGap="2rem">
            <Text
              spacing="1px"
              bold
              onClick={() => setSelected("upcoming")}
              style={selected === "upcoming" ? selectedStyle : {}}
            >
              UPCOMING
              {selected === "upcoming" && <Underline />}
            </Text>
            <Text
              spacing="1px"
              bold
              onClick={() => {
                trackEvent({
                  event: "completed_session_tab_click",
                  payload: {
                    flow:
                      providerType === THERAPIST
                        ? "therapy"
                        : providerType === PSYCHIATRIST
                        ? "psychiatry"
                        : "couples",
                  },
                });
                setSelected("completed");
              }}
              style={selected === "completed" ? selectedStyle : {}}
            >
              PAST
              {selected === "completed" && <Underline />}
            </Text>
          </FlexBox>
        </Container>
        {selected === "upcoming" && (
          <SessionsListing
            source="sessions_section"
            sessions={upcomingSessions}
            type={selected === "completed" && "completed"}
            providerPublicProfile={providerPublicProfile}
            loading={upcomingSessionsLoading}
            setPage={setUpcomingSessionsPage}
          />
        )}
        {selected === "completed" && (
          <SessionsListing
            source="sessions_section"
            sessions={completedSessions}
            type={selected === "completed" && "completed"}
            providerPublicProfile={providerPublicProfile}
            loading={completedSessionsLoading}
            setPage={setCompletedSessionsPage}
          />
        )}
      </>
    );
  }

  return (
    <FlexContainer>
      <SessionsWrapper className="mr-2">
        <SessionsListing
          source="sessions_section"
          title="Upcoming Sessions:"
          sessions={upcomingSessions}
          providerPublicProfile={providerPublicProfile}
          showTitle
          loading={upcomingSessionsLoading}
          setPage={setUpcomingSessionsPage}
        />
      </SessionsWrapper>
      <SessionsWrapper>
        <SessionsListing
          source="sessions_section"
          title="Past Sessions:"
          sessions={completedSessions}
          type="completed"
          providerPublicProfile={providerPublicProfile}
          showTitle
          loading={completedSessionsLoading}
          setPage={setCompletedSessionsPage}
        />
      </SessionsWrapper>
    </FlexContainer>
  );
};

export default Sessions;
