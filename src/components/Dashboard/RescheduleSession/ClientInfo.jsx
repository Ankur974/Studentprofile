import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import { Body2, Support } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  gap: 0.25rem;
`;

const ClientInfo = ({ bookingDetails }) => {
  return (
    <Wrapper>
      <FlexBox align="center" columnGap="0.5rem">
        <Body2 bold>Mira Schleifer</Body2>
      </FlexBox>
      <Support>
        {dayjs(bookingDetails?.dateTime).format("DD MMM YYYY, hh:mm A")} |{" "}
        {bookingDetails?.duration / 60} MIN
      </Support>
    </Wrapper>
  );
};

export default ClientInfo;
