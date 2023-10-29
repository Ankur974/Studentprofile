import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { H4, Support } from "@common/dashboard/Headings";
import { DAVYS_GREY_100, DAVYS_GREY_400 } from "@common/ui/colors";

const Card = styled(FlexBox)`
  border-radius: 0.5rem;
  background: ${DAVYS_GREY_100};
  border: 1px solid ${DAVYS_GREY_400};
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled(FlexBox)`
  gap: 0.5rem;
`;

const Content = styled.div``;

const SessionInfoCard = ({ sessionType, sessionDetails }) => {
  const { providerName, sessionTime, sessionDuration } = sessionDetails;
  return (
    <Card column rowGap="0.25rem">
      <Title>
        <H4 bold>{providerName}</H4>
      </Title>
      <Content>
        <Support>
          {dayjs(sessionTime).format("DD MMM YYYY, hh:mm A")} |{" "}
          {sessionDuration}
        </Support>
      </Content>
    </Card>
  );
};

export default SessionInfoCard;
