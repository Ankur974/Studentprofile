import styled, { css } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_100, ACCENT_500, SUCCESS_GREEN_500 } from "@common/ui/colors";

const ToggleContainer = styled(FlexBox)`
  padding: 2px;
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;
  align-items: center;
  border-radius: 0.875rem;
  background-color: ${ACCENT_500};

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${SUCCESS_GREEN_500};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const Switch = styled(FlexBox)`
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translateX(0);
  background-color: ${ACCENT_100};
  transition: transform 300ms ease-in-out;

  ${({ checked }) =>
    checked &&
    css`
      transform: translateX(117%);
    `}
`;

const ToggleSwitch = ({ checked, disabled, onClick }) => {
  return (
    <ToggleContainer
      checked={checked}
      disabled={disabled}
      onClick={disabled ? null : onClick}
    >
      <Switch checked={checked} />
    </ToggleContainer>
  );
};

export default ToggleSwitch;
