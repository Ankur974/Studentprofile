import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { Button } from "@common/ui/Buttons";
import { WHITE, PRIMARY_700, PRIMARY_800, ACCENT_200 } from "@common/ui/colors";
import * as storage from "@utils/storageFactory";
import { Text } from "@common/Text";

const Wrapper = styled(FlexBox)`
  margin-top: 1.5rem;
  padding: 2.5rem;
  background-color: ${WHITE};
  border-radius: 0.75rem;
  gap: 1.5rem;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    background-color: ${ACCENT_200};
    margin-bottom: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  height: 4.5rem;
  width: 4.5rem;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const Heading = styled(Text)`
  font-size: 1.125rem;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SubHeading = styled(Text)`
  font-size: 0.875rem;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const FirstSessionCard = ({
  providerPublicProfile,
  routeToBooking,
  bookSessionTracker,
}) => {
  const [bookClicked, setBookClicked] = useState(false);
  const bookButtonClick = () => {
    if (!providerPublicProfile) return;

    if (!bookClicked) {
      bookSessionTracker(false);
      // if (canShowInpersonModal) {
      //   setShowOfflineModal(true);
      // } else {
      setBookClicked(true);

      // required for tracking of package_screen_load
      storage.session.removeItem("package_screen_load_tracked");

      routeToBooking();
      // }
    }
  };

  return (
    <Wrapper>
      <IconWrapper>
        <img src="/assets/images/new-session-user-icon.svg" alt="" />
      </IconWrapper>
      <FlexBox column rowGap="0.75rem">
        <Heading bold textAlign="center">
          Book your first session to start your journey
        </Heading>
        <SubHeading textAlign="center">
          Please book your session and get started with your journey
        </SubHeading>
      </FlexBox>
      <ButtonWrapper>
        <Button
          color={PRIMARY_800}
          hoverColor={PRIMARY_700}
          onClick={bookButtonClick}
          width="14rem"
          display="block"
          margin="auto"
          style={{ opacity: bookClicked && "0.3" }}
        >
          {bookClicked ? "LOADING..." : "BOOK SESSION"}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default FirstSessionCard;
