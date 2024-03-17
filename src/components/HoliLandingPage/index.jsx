import React, { useRef } from "react";
import { useEffect } from "react";

import Footer from "@common/Footer";
import Play from "@components/HoliLandingPage/Play";
import SpinWheel from "@components/HoliLandingPage/SpinWheel";
// import BeautyQuiz from "@components/HoliLandingPage/BeautyQuiz";
import FooterWaves from "@components/HoliLandingPage/FooterWaves";
import Widget from "./Widget";
import { trackEvent } from "../../utils/helpers";
import { MobileAndCoinSection } from "../MobileAndCareCoins.jsx";
import FaQ from "../common/FAQ.jsx";

const HoliLandingPage = () => {
  const targetRef = useRef(null);

  useEffect(() => {
    trackEvent({ event: "holi-lp-page-load" });
  }, []);

  return (
    <>
      <Play targetElement={targetRef} />
      <Widget />
      {/* <BeautyQuiz /> */}
      <MobileAndCoinSection />
      <SpinWheel targetElement={targetRef} />
      <FaQ />
      <FooterWaves />
      <Footer eventMobileView />
    </>
  );
};

export default HoliLandingPage;
