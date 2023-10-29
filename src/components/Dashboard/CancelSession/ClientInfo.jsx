import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import { Body2, Support } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_400 } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  padding: 1rem;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_400};
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
