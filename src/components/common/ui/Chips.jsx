import styled, { css } from "styled-components";
import {
  ACCENT_400,
  ACCENT_300,
  PRIMARY_800,
  ACCENT_0,
  ACCENT_800,
} from "./colors";
import FlexBox from "./FlexBox";
import { Body2 } from "./Headings";

const Wrapper = styled(FlexBox)`
  flex: 1;
  cursor: pointer;
  align-items: center;
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: center;
  background-color: ${ACCENT_300};
  white-space: nowrap;
  border: ${({ border }) => border || "1px solid ACCENT_500 "};
  max-width: ${({ width }) => width};
  padding: ${({ padding }) => padding || "0.25rem 1rem"};

  &:hover {
    border-color: ${ACCENT_400};
    background-color: ${ACCENT_300};
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${PRIMARY_800};
      background-color: ${PRIMARY_800};

      &:hover {
        border-color: ${PRIMARY_800};
        background-color: ${PRIMARY_800};
      }
    `}

  ${({ disabled }) =>
    !!disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

const Chip = ({
  onClick,
  selected,
  disabled,
  children,
  width,
  margin,
  padding,
}) => (
  <Wrapper
    selected={selected}
    onClick={onClick}
    disabled={disabled}
    width={width}
    margin={margin}
    padding={padding}
  >
    <Body2 color={selected ? ACCENT_0 : ACCENT_800}>{children}</Body2>
  </Wrapper>
);

export default Chip;
