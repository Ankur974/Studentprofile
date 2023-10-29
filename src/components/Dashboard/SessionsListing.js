import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SessionCard from "@common/SessionCard";
import { WHITE, ACCENT_800 } from "@common/ui/colors";
import { useRouter } from "next/router";
import urls from "@urls";
import SessionsListingLoader from "./SessionsListingLoader";
import useSessions from "@hooks/useSessions";

const Container = styled.div``;

const Title = styled.p`
  color: ${ACCENT_800};
  font-size: 1rem;
  font-weight: bold;
  padding-bottom: 1rem;
  position: sticky;
  top: 0;
  letter-spacing: 0.48px;
  background-color: ${WHITE};
  margin-top: 0px;
`;

const Listing = styled.div`
  max-height: calc(100vh - 14rem);
  overflow-y: ${props => (props.dropDownStatus ? "hidden" : "auto")};
  display: grid;
  grid-row-gap: 20px;
  padding-bottom: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 768px) {
    max-width: auto;
    place-items: center;
  }
`;

const NullStateContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const NullStateString = styled.p`
  font-size: 0.75rem;
  color: ${ACCENT_800};
  letter-spacing: 0.19px;
  opacity: 60%;
`;

const SessionsListing = ({
  title,
  sessions,
  type,
  showTitle,
  source,
  sessionBackground,
  providerPublicProfile,
  loading,
  setPage,
}) => {
  const router = useRouter();
  const { dropDownStatus } = useSelector(state => ({
    dropDownStatus: state.sessions.sessionDropdown,
  }));

  const [targetElement, setTargetElement] = useState(null);
  let observerRef = useRef(null);

  const completedSessions = useSessions(
    urls.completedSessions,
    1,
    1,
    false,
    null,
    "completed"
  );

  const offlineCompletedSessions = useSessions(
    urls.completedSessions,
    1,
    1,
    false,
    "offline",
    "completed"
  );

  const offlineUpcomingSessions = useSessions(
    urls.upcomingSessions,
    1,
    1,
    false,
    "offline"
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver);
  }, []);

  useEffect(() => {
    if (targetElement) {
      observerRef.current.observe(targetElement);
    }
  }, [targetElement]);

  const isFirstSession = completedSessions.length === 1;

  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting) setPage(page => page + 1);
  };

  return (
    <Container>
      {showTitle && <Title>{title}</Title>}
      <Listing className="hide-scrollbar" dropDownStatus={dropDownStatus}>
        {sessions?.length > 0 && (
          <>
            {sessions?.map((item, index) => (
              <SessionCard
                item={item}
                source={source}
                sessionStatus={type === "completed" && item.status}
                key={index}
                index={index + 1}
                backgroundColor={sessionBackground}
                providerType={router.query.providertype}
                isFirstSession={isFirstSession}
                providerPublicProfile={providerPublicProfile}
                offlineCompleted={offlineCompletedSessions}
                offlineUpcoming={offlineUpcomingSessions}
              />
            ))}
            <div
              style={loading ? { display: "none" } : null}
              ref={setTargetElement}
            />
          </>
        )}
        {loading ? (
          <SessionsListingLoader />
        ) : (
          sessions?.length === 0 && (
            <NullStateContainer>
              <img
                src="https://cdn.theinnerhour.com/assets/images/null-calendar.svg"
                alt="No Sessions"
                width={120}
                height={120}
              />
              <NullStateString>You have no upcoming sessions</NullStateString>
            </NullStateContainer>
          )
        )}
      </Listing>
    </Container>
  );
};

export default SessionsListing;
