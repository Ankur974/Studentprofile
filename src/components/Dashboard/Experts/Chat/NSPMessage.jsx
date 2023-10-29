import Bugsnag from "@bugsnag/js";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiMessageCircle,
  FiPhone,
  FiVideo,
} from "react-icons/fi";
import styled from "styled-components";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";

import axiosInstance from "@axiosInstance";
import { Button } from "@common/Dashboard/Buttons";
import { Body2, Caption } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { COUPLE_THERAPIST, PSYCHIATRIST, THERAPIST } from "@constants";
import {
  ACCENT_800,
  DARK_MOSS_GREEN_100,
  ACCENT_600,
  SECONDARY_800,
} from "@common/ui/colors";
import urls from "@urls";
import { formatSlotTime } from "@utils/helpers";
import * as storage from "@utils/storageFactory";

const Container = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.5rem;
  margin: 0.75rem 0;
`;

const Card = styled(FlexBox)`
  max-width: 75%;
  flex-direction: column;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  row-gap: 1rem;
  color: ${ACCENT_800};
  background-color: ${DARK_MOSS_GREEN_100};
  overflow-wrap: break-word;
  word-break: break-word;
  align-self: start;
  border-radius: 0.5rem 0.5rem 0.5rem 0;
`;

const ButtonContainer = styled(FlexBox)`
  justify-content: flex-start;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Timestamp = styled(FlexBox)`
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const MODE_SLUG = {
  offline: "In-person",
  chat: "Chat",
  live: "Video",
  voice: "Voice",
};

const commonIconConfig = {
  color: SECONDARY_800,
  size: "1.2rem",
};

const NSPMessage = ({
  providerName = "Pratistha Trivedi Mirza",
  providerType = THERAPIST,
  message,
  getTimestampString,
}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const nspConfig = JSON.parse(message.message);

  const [queryParams] = useQueryParams({
    providerId: NumberParam,
    providerUuid: StringParam,
  });

  const { providerId, providerUuid } = queryParams || {};

  const goToBooking = () => {
    const bookingUrl = new URL(
      `/booking/${providerUuid}/${
        providerType === PSYCHIATRIST ? PSYCHIATRIST : THERAPIST
      }/${providerType === COUPLE_THERAPIST ? "couple" : "single"}`,
      window?.location?.origin
    );
    bookingUrl.searchParams.append("slot", nspConfig?.slot);
    bookingUrl.searchParams.append("mode", nspConfig?.session_mode);
    bookingUrl.searchParams.append("date", nspConfig?.session_date);
    bookingUrl.searchParams.append("journey", "next_prompt");
    bookingUrl.searchParams.append("clinic_id", nspConfig?.ih_clinic_id || "");

    router.push(bookingUrl);
  };

  // Calls suggested session API and return NSP applicable specs
  const getSuggestedSession = async () => {
    if (!providerId) return;
    const providerCategory =
      providerType === PSYCHIATRIST ? PSYCHIATRIST : THERAPIST;
    try {
      setLoading(true);
      const res = await axiosInstance.get(urls.suggestedSessions, {
        params: {
          [`${providerCategory}_id`]: providerId,
        },
      });
      const suggestedSession = res?.data?.suggested_bookings?.[0] || null;
      return suggestedSession;
    } catch (err) {
      Bugsnag.notify(err);
      console.log({ err });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async () => {
    const suggestedSession = await getSuggestedSession();
    if (suggestedSession) {
      const isSame = matchSessionDetails(suggestedSession);
      if (isSame) {
        const packageString = JSON.stringify(suggestedSession?.package);
        storage.session.setItem("suggestedSessionPackage", packageString);
        goToBooking();
      } else {
        // Specs not same - Case for older NSP in chat and new NSP exists
        alert("Slot expired");
      }
    } else {
      // Case of older NSP and no new NSP exists
      alert("Slot expired");
    }
  };

  const matchSessionDetails = suggestedSession => {
    // checks if slot, date, session mode and clinic is same response from suggested session API response
    return (
      suggestedSession?.slot === nspConfig?.slot &&
      suggestedSession?.datetime_at_customer_timezone?.date ===
        nspConfig?.session_date &&
      suggestedSession?.session_mode === nspConfig?.session_mode &&
      suggestedSession?.ih_clinic_id === nspConfig?.ih_clinic_id
    );
  };

  return (
    <Container>
      <Card>
        <Body2 bold>
          {providerName} has recommended a slot for your next session
        </Body2>
        <FlexBox column rowGap="0.5rem">
          <FlexBox align="center" columnGap="0.5rem">
            <FiCalendar {...commonIconConfig} />
            <Body2>
              {dayjs(nspConfig?.session_date).format("ddd, DD/MM/YYYY	")}
            </Body2>
          </FlexBox>
          <FlexBox align="center" columnGap="0.5rem">
            <FiClock {...commonIconConfig} />
            <Body2>{formatSlotTime(nspConfig?.slot)}</Body2>
          </FlexBox>
          <FlexBox align="center" columnGap="0.5rem">
            {nspConfig?.session_mode?.toLowerCase() === "live" ? (
              <FiVideo {...commonIconConfig} />
            ) : nspConfig?.session_mode?.toLowerCase() === "voice" ? (
              <FiPhone {...commonIconConfig} />
            ) : nspConfig?.session_mode?.toLowerCase() === "chat" ? (
              <FiMessageCircle {...commonIconConfig} />
            ) : nspConfig?.session_mode?.toLowerCase() === "offline" ? (
              <FlexBox>
                <img
                  height={20}
                  width={20}
                  alt="Inperson Icon"
                  src="/assets/images/offline-nsp.svg"
                />
              </FlexBox>
            ) : null}
            <Body2>{MODE_SLUG?.[nspConfig?.session_mode]}</Body2>
          </FlexBox>
        </FlexBox>
        <ButtonContainer>
          <Button secondary onClick={handleBookClick} disabled={loading}>
            {loading ? "Booking..." : "Book Session"}
          </Button>
        </ButtonContainer>
      </Card>
      <Timestamp>
        <Caption bold color={ACCENT_600}>
          {getTimestampString(message.time_stamp)}
        </Caption>
      </Timestamp>
    </Container>
  );
};

export default NSPMessage;
