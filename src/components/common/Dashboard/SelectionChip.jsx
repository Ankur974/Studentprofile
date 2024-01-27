import styled, { css } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_800,
  ACCENT_400,
  PRIMARY_200,
  PRIMARY_800,
  PRIMARY_900,
} from "@common/ui/colors";
import { Body2 } from "./Headings";

const Container = styled(FlexBox)`
  gap: ${({ gap }) => gap};
  justify-content: center;
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : "0.5rem 1rem")};
  color: ${ACCENT_800};
  background-color: ${ACCENT_100};
  border: 1px solid ${ACCENT_400};
  border-radius: 0.5rem;
  cursor: pointer;
  flex-direction: ${({ iconPosition }) =>
    iconPosition === "right" ? "row-reverse" : "row"};

  ${Body2} {
    color: inherit;
  }

  ${({ selected, lightBg }) =>
    selected &&
    css`
      background-color: ${lightBg ? PRIMARY_200 : PRIMARY_800};
      color: ${lightBg ? PRIMARY_900 : ACCENT_100};
      border-color: ${lightBg ? PRIMARY_200 : PRIMARY_800};
    `}

  ${({ selected }) =>
    !selected &&
    css`
      :hover {
        background-color: ${ACCENT_200};
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

export const FilterChip = ({
  onClick,
  children = null,
  selected = false,
  disabled = false,
  lightBg = false,
  padding = null,
}) => {
  return (
    <Container
      onClick={disabled ? null : onClick}
      selected={selected}
      lightBg={lightBg}
      disabled={disabled}
      padding={padding}
    >
      <Body2 bold>{children}</Body2>
    </Container>
  );
};

export const IconChip = ({
  onClick,
  children = null,
  selected = false,
  disabled = false,
  lightBg = false,
  Icon = null,
  gap = "0.5rem",
  iconPosition = "left",
  iconSize = "1.25rem",
  strokeWidth = 2,
}) => {
  return (
    <Container
      onClick={disabled ? null : onClick}
      selected={selected}
      disabled={disabled}
      lightBg={lightBg}
      gap={gap}
      iconPosition={iconPosition}
    >
      {Icon && <Icon size={iconSize} strokeWidth={strokeWidth} />}
      <Body2 bold>{children}</Body2>
    </Container>
  );
};
