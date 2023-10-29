import FlexBox from "@common/ui/FlexBox";
import PropTypes from "prop-types";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

import {
  DAVYS_GREY_100,
  DAVYS_GREY_400,
  DAVYS_GREY_500,
  DAVYS_GREY_700,
  DAVYS_GREY_800,
} from "@common/ui/colors";
import { Body2, Support } from "./Headings";

const Card = styled(FlexBox)`
  border-radius: 0.5rem;
  border: 1px solid ${DAVYS_GREY_400};
  background: ${DAVYS_GREY_100};
  padding: 1rem;
  width: 100%;
  height: 5rem;
  box-sizing: border-box;
`;

const ProviderImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid ${DAVYS_GREY_800};
`;

const ProviderCard = ({
  providerType = "Therapist",
  provider,
  shouldShowActiveDate,
}) => {
  if (!provider) return null;
  const fullName = `${provider?.firstname || ""} ${provider?.lastname || ""}`;
  return (
    <Card align="center" justify="space-between">
      <FlexBox align="center" columnGap="0.5rem">
        <ProviderImg
          src={
            provider?.image ? `https://${provider?.image}` : provider?.avatar
          }
        />
        <FlexBox column justify="center" padding="1rem" rowGap="0.2rem">
          {!shouldShowActiveDate && (
            <Support color={DAVYS_GREY_700}>Your {providerType}</Support>
          )}
          <Body2 bold>{fullName}</Body2>
          {shouldShowActiveDate && (
            <Support color={DAVYS_GREY_700}>Your {providerType}</Support>
          )}
        </FlexBox>
      </FlexBox>
      <FlexBox>
        <FiChevronRight size="1rem" color={DAVYS_GREY_500} strokeWidth={3} />
      </FlexBox>
    </Card>
  );
};
ProviderCard.defaultProps = {
  isDashboardCard: true,
  provider: {
    uuid: "123",
    firstname: "Provider Name",
    lastname: "",
    type: "therapist",
    avatar: "https://cdn.theinnerhour.com/assets/images/avatar_flower_1.png",
    experience: 5,
    educations: [
      {
        degree: "MD",
        major: "Psychiatry",
      },
    ],
    registration_number: "fxhxcb2c5dsz",
  },
  tracker: () => {},
  loading: false,
};

ProviderCard.propTypes = {
  provider: PropTypes.object,
  isDashboardCard: PropTypes.bool,
  tracker: PropTypes.func,
};

export default ProviderCard;
