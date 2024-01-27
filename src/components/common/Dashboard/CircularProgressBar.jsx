import React from "react";

import { CircularProgressbar as ReactCircularProgressbar } from "react-circular-progressbar";
import { ACCENT_300, SECONDARY_800 } from "@common/ui/colors";

const CircularProgressBar = ({ progress }) => {
  return (
    <ReactCircularProgressbar
      strokeWidth={11}
      styles={{
        path: {
          stroke: SECONDARY_800,
          strokeLinecap: "round",
          transition: "stroke-dashoffset 0.5s ease 0s",
        },
        trail: {
          stroke: ACCENT_300,
        },
      }}
      value={progress}
    />
  );
};

export default CircularProgressBar;
