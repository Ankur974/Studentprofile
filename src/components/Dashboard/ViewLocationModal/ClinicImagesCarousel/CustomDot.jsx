import React from "react";
import styled from "styled-components";
import { DAVYS_GREY_600, DAVYS_GREY_800 } from "@common/ui/colors";

const Dot = styled.div`
  width: ${props => (props.active ? "1rem" : "0.25rem")};
  height: 0.25rem;
  border-radius: 0.25rem;
  background-color: ${props =>
    props.active ? DAVYS_GREY_800 : DAVYS_GREY_600};
  margin: 0.25rem;
  cursor: pointer;
`;

const CustomDot = ({ index, active, items, onClick }) => {
  return (
    <Dot active={active} onClick={onClick}>
      {React.Children.toArray(items)[index]}
    </Dot>
  );
};

export default CustomDot;
