import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_100, ACCENT_300 } from "@common/ui/colors";
import NotificationItem from "./NotificationItem";
import { boxShadowDs2 } from "@common/ui/styles";

const Main = styled(FlexBox)`
  width: 100%;
  height: 100%;
  @media screen and (min-width: 769px) {
    background-color: ${ACCENT_300};
    padding: 1.5rem;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${ACCENT_100};
  overflow-y: auto;
  @media screen and (min-width: 769px) {
    border-radius: 1rem;
    ${boxShadowDs2}
  }
`;

export const notificationsData = [
  {
    id: 1,
    description:
      "[provider name] has sent you a prompt to book your next session with them.",
    date: new Date().toISOString(),
    isRead: true,
    category: "sessions",
    metadata: {
      sessionId: 632,
      sessionType: "tentative", // tentative, upcoming, completed, cancelled, abandoned
    },
  },
  {
    id: 2,
    description:
      "[Provider Name] has shared the [Audio Name] with you. Take a moment to listen and discover improved coping strategies.",
    date: new Date().toISOString(),
    isRead: true,
    category: "tools",
    metadata: {
      toolId: 23,
      toolType: "audio", // 0-1, audio, journal, worksheet, resources, assessment
      isInitialAssessment: true, // in case of assessment tool type
    },
  },
  {
    id: 3,
    description:
      "Your therapist, Pratistha Trivedi Mirza has shared a prescription with you.",
    date: new Date().toISOString(),
    isRead: false,
    category: "documents",
    metadata: {
      documentId: 91,
      documentType: "prescription", // prescription, assessment_report
    },
  },
  {
    id: 4,
    description:
      "[provider A name] has assigned [provider B name] as your new [provider role].",
    date: new Date().toISOString(),
    isRead: true,
    category: "experts",
  },
  {
    id: 5,
    description: "[provider name] has sent a new message.",
    date: new Date().toISOString(),
    isRead: false,
    category: "chat",
    metadata: {
      providerId: 813,
    },
  },
];

const Notifications = () => {
  return (
    <Main>
      <Container>
        {notificationsData.map(notification => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </Container>
    </Main>
  );
};

export default Notifications;
