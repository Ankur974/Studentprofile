import React from "react";
import SpinWin from "@components/HoliLandingPage/Spin";
import EventPageLayout from "@layout/client/eventPageLayout";

const spinner = () => {
  return (
    <EventPageLayout>
      <SpinWin />
    </EventPageLayout>
  );
};

export default spinner;
