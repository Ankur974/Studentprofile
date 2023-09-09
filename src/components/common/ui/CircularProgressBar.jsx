import React from "react";

import { CircularProgressbar as ReactCircularProgressbar } from "react-circular-progressbar";
import { DAVYS_GREY_300, MOSS_GREEN_800 } from "../colors";

const CircularProgressBar = ({ progress }) => {
  return (
    <ReactCircularProgressbar
      strokeWidth={11}
      styles={{
        path: {
          stroke: MOSS_GREEN_800,
          strokeLinecap: "round",
          transition: "stroke-dashoffset 0.5s ease 0s",
        },
        trail: {
          stroke: DAVYS_GREY_300,
        },
      }}
      value={progress}
    />
  );
};

export default CircularProgressBar;
