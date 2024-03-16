import React from "react";
import { useRouter } from "next/router";
import ScorePage from "@components/HoliLandingPage/QuizGame/ScorePage";

const ResultPage = () => {
  const router = useRouter();
  const { rewards } = router.query;

  return <ScorePage prize={rewards} />;
};

export default ResultPage;
