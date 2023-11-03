import { useState } from "react";
import styled from "styled-components";

import Card from "@common/Dashboard/Card";
import NullState from "@common/Dashboard/NullState";
// import SessionCreditCard from "@common/Dashboard/SessionCreditCard";
import Loader from "@common/ui/Loader";
import FlexBox from "@common/ui/FlexBox";
import { Button } from "@common/ui/Buttons";
import { Support } from "@common/ui/Headings";
import AllSessions from "./AllSessions";
import UpcomingSessions from "./UpcomingSessions";

const Container = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  row-gap: 2rem;
  column-gap: 0;
  @media screen and (min-width: 768px) {
    padding: 1.5rem;
    flex-direction: row;
    column-gap: 1.5rem;
    row-gap: 0;
  }
`;

const YourUpdatesWrapper = styled.div`
  @media screen and (min-width: 768px) {
    max-height: 30vh;
    overflow: auto;
  }
`;

const SessionCreditsWrapper = styled.div`
  @media screen and (min-width: 768px) {
    max-height: 30vh;
    overflow: auto;
  }
`;

const SectionRight = styled(FlexBox)`
  row-gap: 1rem;
  @media screen and (max-width: 768px) {
    row-gap: 2rem;
  }
`;

const NullStateWrapper = styled.div`
  margin-top: 5rem;
`;

const CreditsNullStateWrapper = styled.div`
  overflow: auto;
  max-height: 14rem;
`;

const Dashboard = () => {
  const [showBookSessionWith, setShowBookSessionWith] = useState(false);
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [suggestedSessions, setSuggestedSessions] = useState([]);

  const showCreditsNullState = true; //todo: to be updated
  const loading = false;
  const upcomingSessions = [
    {
      session: {
        id: 1,
        provider_role: "Haircut",
        datetime_at_customer_timezone: {
          datetime: "2023-11-05T14:30:00",
          slot: "14:30",
        },
        duration: 60,
        provider: {
          firstname: "Salon",
          lastname: "A",
          avatar: "https://example.com/salon_a_avatar.png",
        },
      },
      isNsp: false,
    },
    {
      session: {
        id: 2,
        provider_role: "Spa",
        datetime_at_customer_timezone: {
          datetime: "2023-11-06T10:00:00",
          slot: "10:00",
        },
        duration: 90,
        provider: {
          firstname: "Salon",
          lastname: "B",
          avatar: "https://example.com/salon_b_avatar.png",
        },
      },
      isNsp: true,
    },
    {
      session: {
        id: 3,
        provider_role: "Manicure",
        datetime_at_customer_timezone: {
          datetime: "2023-11-07T16:45:00",
          slot: "16:45",
        },
        duration: 45,
        provider: {
          firstname: "Salon",
          lastname: "C",
          avatar: "https://example.com/salon_c_avatar.png",
        },
      },
      isNsp: false,
    },
  ];

  const toggleBookSessionWith = () =>
    setShowBookSessionWith(!showBookSessionWith);

  const toggleAllSessionsScreen = () => setShowAllSessions(!showAllSessions);

  return (
    <Container>
      <Card
        title={showAllSessions ? "All Sessions" : "Upcoming Sessions"}
        padding="0"
        showViewAllCTA={!showAllSessions}
        hasDashboardRedirection={showAllSessions}
        toggleScreens={toggleAllSessionsScreen}
      >
        {loading ? (
          <Loader height="60vh" />
        ) : !upcomingSessions.length ? (
          <NullStateWrapper>
            <NullState
              imgSrc="/assets/images/dashboard/nullimg.svg"
              text="No Upcoming Sessions"
              subtext="Book your next session now and keep progressing<br />towards your pampering goals."
              Button={<Button>BOOK SESSION</Button>}
            />
          </NullStateWrapper>
        ) : showAllSessions ? (
          <AllSessions />
        ) : (
          <UpcomingSessions
            toggleBookSessionWith={toggleBookSessionWith}
            sessions={upcomingSessions}
            suggestedSessions={suggestedSessions}
          />
        )}
      </Card>
      <SectionRight column width="100%">
        <Card title="Your Updates" redirectTo="" padding="0 1.5rem">
          {/* <YourUpdatesWrapper>
              <FlexBox column rowGap="1rem" margin="1.5rem 0">
                <AlertCard />
                <AlertCard />
                <AlertCard />
              </FlexBox>
            </YourUpdatesWrapper> */}
        </Card>
        <Card title="Session Credits" redirectTo="" padding="0 1.5rem">
          {showCreditsNullState ? (
            <CreditsNullStateWrapper>
              <NullState
                imgSrc="/assets/images/dashboard/sessions-credits-null-state.png"
                text="No Credits!"
                subtext="You can use session credits to book a session.<br />Check out our packages to get more credits."
                Button={<Button>EXPLORE PACKAGES</Button>}
              />
            </CreditsNullStateWrapper>
          ) : (
            <SessionCreditsWrapper>
              <FlexBox column rowGap="1rem" margin="1.5rem 0 0">
                <FlexBox column rowGap="1rem">
                  {/* <SessionCreditCard />
                    <SessionCreditCard /> */}
                </FlexBox>
                <Support margin="0 0 1.5rem 0">
                  You can use your credits to book an online or in-person
                  session. The credits will be automatically deducted at the
                  time of payment.
                </Support>
              </FlexBox>
            </SessionCreditsWrapper>
          )}
        </Card>
      </SectionRight>
    </Container>
  );
};

export default Dashboard;
