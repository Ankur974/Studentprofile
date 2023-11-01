import { useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Text } from "@common/Text";
import { Button } from "@common/ui/Buttons";
import FlexBox from "@common/ui/FlexBox";
import {
  PRIMARY_100,
  ACCENT_800,
  PRIMARY_700,
  PRIMARY_800,
} from "@common/ui/colors";
import { trackEvent, currentFlow } from "@utils/helpers";
import { COUPLE_THERAPIST, PSYCHIATRIST, THERAPIST } from "@constants";
import { FiPhone, FiMessageCircle, FiVideo } from "react-icons/fi";
import * as storage from "@utils/storageFactory";

const Wrapper = styled.div`
  margin: 1rem 0;
`;

const SessionContainer = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.75rem;
  background-color: ${PRIMARY_100};
`;

const Icon = styled.div`
  min-width: 2.5rem;
  min-height: 2.5rem;
`;

const SuggestedSession = ({ session, provider, source }) => {
  const router = useRouter();
  const user = useSelector(state => state?.auth?.user);
  const providerProfile = provider?.providerProfile;

  const analyticPayload = {
    client_id: user?.id,
    suggested_slot_local: session?.slot,
    provider_uuid: providerProfile?.uuid,
    suggested_mode: session?.session_mode,
    provider_name: `${providerProfile?.firstname} ${
      providerProfile?.lastname || ""
    }`.trim(),
    suggested_date_local: dayjs(
      session?.datetime_at_customer_timezone?.datetime
    ).format("ddd, MMM D, YYYY"),
    flow:
      session?.provider_role === "couple" ? "couples" : session?.provider_role,
  };

  const goToBooking = () => {
    trackEvent({
      event: "next_session_prompt_click",
      payload: analyticPayload,
    });

    const packageString = JSON.stringify(session?.package);
    storage.session.setItem("suggestedSessionPackage", packageString);

    router.push({
      pathname: `/booking/${provider?.providerProfile?.uuid}/${
        provider.providerType === PSYCHIATRIST ? PSYCHIATRIST : THERAPIST
      }/${provider.providerType === COUPLE_THERAPIST ? "couple" : "single"}`,
      query: {
        slot: session?.datetime_at_customer_timezone?.slot,
        mode: session?.session_mode,
        date: session?.datetime_at_customer_timezone?.date,
        journey: "next_prompt",
        clinic_id: session?.ih_clinic_id || null,
      },
    });
  };

  return (
    <Wrapper>
      <Text color={ACCENT_800} margin="0 0 0.5rem" fontSize="0.75rem" block>
        Your {provider.providerType} has blocked the slot for your next session:
      </Text>
      <SessionContainer onClick={goToBooking}>
        <FlexBox align="center" justify="space-between">
          <FlexBox align="center" columnGap="1.75rem">
            {session?.session_mode?.toLowerCase() === "live" ? (
              <FiVideo color={PRIMARY_700} size="2rem" />
            ) : session?.session_mode?.toLowerCase() === "voice" ? (
              <FiPhone color={PRIMARY_700} size="2rem" />
            ) : session?.session_mode?.toLowerCase() === "chat" ? (
              <FiMessageCircle color={PRIMARY_700} size="2rem" />
            ) : session?.session_mode?.toLowerCase() === "offline" ? (
              <Icon>
                <img
                  height={40}
                  width={40}
                  alt="Inperson Icon"
                  src="https://cdn.theinnerhour.com/assets/images/icon-inperson-filled.svg"
                />
              </Icon>
            ) : null}
            <FlexBox column rowGap="0.5rem">
              <Text bold fontSize="0.75rem">
                {dayjs(session?.datetime_at_customer_timezone?.datetime).format(
                  "DD MMM, YYYY"
                )}
              </Text>
              <Text bold fontSize="0.75rem">
                {dayjs(session?.datetime_at_customer_timezone?.datetime).format(
                  "hh:mm A"
                )}{" "}
                | {session?.duration / 60} Mins
              </Text>
            </FlexBox>
          </FlexBox>
          <Button small color={PRIMARY_800} hoverColor={PRIMARY_700}>
            Book
          </Button>
        </FlexBox>
      </SessionContainer>
      <Text block margin="0.5rem 0 0" color={ACCENT_800} fontSize="0.75rem">
        {session.expiry_display_text}
      </Text>
    </Wrapper>
  );
};

SuggestedSession.propTypes = {
  session: PropTypes.object,
  provider: PropTypes.object,
};

export default SuggestedSession;
