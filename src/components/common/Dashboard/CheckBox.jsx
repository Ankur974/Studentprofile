import styled, { css } from "styled-components";
import { FiCheck } from "react-icons/fi";
import FlexBox from "@common/ui/FlexBox";
import {
  DAVYS_GREY_100,
  DAVYS_GREY_400,
  DAVYS_GREY_500,
  DARK_MOSS_GREEN_800,
} from "@common/ui/colors";

const Container = styled.div`
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      border-color: ${DAVYS_GREY_400};
    `}
`;

const Wrapper = styled(FlexBox)`
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid ${DARK_MOSS_GREEN_800};
  background-color: ${({ checked }) =>
    checked ? DARK_MOSS_GREEN_800 : DAVYS_GREY_100};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      border: 1px solid ${DAVYS_GREY_400};
      cursor: not-allowed;
      background-color: ${({ checked }) =>
        checked ? DAVYS_GREY_500 : DAVYS_GREY_100};
    `}
`;

const Checkbox = ({ checked, disabled, onClick }) => (
  <Container disabled={disabled} onClick={disabled ? null : onClick}>
    <Wrapper checked={checked} disabled={disabled}>
      {checked && <FiCheck color={DAVYS_GREY_100} strokeWidth={3} />}
    </Wrapper>
  </Container>
);

export default Checkbox;
