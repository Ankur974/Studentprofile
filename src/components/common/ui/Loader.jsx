import React from "react";
import styled from "styled-components";
import FlexBox from "./FlexBox";
import loader from "../../../revamp/assets/loading.gif";

const Wrapper = styled(FlexBox)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Loader = ({ height }) => {
  return (
    <Wrapper>
      <img src={loader} height={height || "90px"} alt="loader" />
    </Wrapper>
  );
};

export default Loader;
