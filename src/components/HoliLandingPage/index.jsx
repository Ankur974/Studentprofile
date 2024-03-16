import React, { useRef } from "react";

import Footer from "@common/Footer";
import Play from "@components/HoliLandingPage/Play";
import SpinWheel from "@components/HoliLandingPage/SpinWheel";
import BeautyQuiz from "@components/HoliLandingPage/BeautyQuiz";
import FooterWaves from "@components/HoliLandingPage/FooterWaves";

const HoliLandingPage = () => {
  const targetRef = useRef(null);
  return (
    <>
      <Play targetElement={targetRef} />
      <SpinWheel targetElement={targetRef} />
      <BeautyQuiz />
      <FooterWaves />
      <Footer eventMobileView />
    </>
  );
};

export default HoliLandingPage;
