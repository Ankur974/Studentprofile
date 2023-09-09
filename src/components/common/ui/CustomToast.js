import styled from "styled-components";
import { DAVYS_GREY_100, DAVYS_GREY_800, ERROR_RED_400 } from "../colors";
import { Body1 } from "./Headings";

const Toast = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background: ${props =>
    props.appearance === "error" ? ERROR_RED_400 : DAVYS_GREY_800};
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.04);
`;

const CustomToast = ({ appearance, children }) => (
  <Toast appearance={appearance}>
    <Body1 bold color={DAVYS_GREY_100}>
      {children}
    </Body1>
  </Toast>
);

export default CustomToast;
