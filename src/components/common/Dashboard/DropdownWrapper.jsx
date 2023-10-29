import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { boxShadowDs1 } from "./boxShadowStyles";
import { DAVYS_GRAY_400, WHITE } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  z-index: 22;
  width: 100%;
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${WHITE};
  border: 1px solid ${DAVYS_GRAY_400};
  ${boxShadowDs1}
`;

const DropdownWrapper = ({ onClick, active, disabled, children }) => (
  <Wrapper active={active} onClick={onClick} disabled={disabled}>
    {children}
  </Wrapper>
);

export default DropdownWrapper;
