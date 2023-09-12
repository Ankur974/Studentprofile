import styled, { css } from "styled-components";
import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_400,
  ACCENT_500,
  PRIMARY_800,
  GREEN_200,
} from "./colors";
import FlexBox from "./FlexBox";

const Wrapper = styled(FlexBox)`
  flex: 1;
  cursor: pointer;
  align-items: center;
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: center;
  background-color: ${ACCENT_100};
  white-space: nowrap;
  border: 1px solid ${ACCENT_500};
  max-width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || "0.5rem 1rem"};

  :hover {
    border-color: ${ACCENT_400};
    background-color: ${ACCENT_200};
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${PRIMARY_800};
      background-color: ${PRIMARY_800};

      :hover {
        border-color: ${PRIMARY_800};
        background-color: ${PRIMARY_800};
      }
    `}

  ${({ selected2 }) =>
    selected2 &&
    css`
      border-color: ${GREEN_200};
      background-color: ${GREEN_200};

      :hover {
        border-color: ${GREEN_200};
        background-color: ${GREEN_200};
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
  selected2,
  disabled,
  children,
  width,
  margin,
  padding,
}) => (
  <Wrapper
    selected={selected}
    selected2={selected2}
    onClick={onClick}
    disabled={disabled}
    width={width}
    margin={margin}
    padding={padding}
  >
    {children}
  </Wrapper>
);

export default Chip;
