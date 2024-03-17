import React from "react";
import SpinWin from "@components/HoliLandingPage/Spin";
import EventPageLayout from "@layout/client/EventPageLayout";
import Gamify from "../../../components/HoliLandingPage/QuizGame";

const spinner = () => {
  return (
    <>
    <Gamify/>
    <EventPageLayout>
      <SpinWin />
    </EventPageLayout>
    </>
  );
};

export default spinner;
