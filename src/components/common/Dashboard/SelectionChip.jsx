import styled, { css } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import {
  DAVYS_GREY_100,
  DAVYS_GREY_200,
  DAVYS_GREY_800,
  DAVYS_GREY_400,
  DARK_MOSS_GREEN_200,
  DARK_MOSS_GREEN_800,
  DARK_MOSS_GREEN_900,
} from "@common/ui/colors";
import { H4 } from "./Headings";

const Container = styled(FlexBox)`
  gap: ${({ gap }) => gap};
  justify-content: center;
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : "0.5rem 1rem")};
  color: ${DAVYS_GREY_800};
  background-color: ${DAVYS_GREY_100};
  border: 1px solid ${DAVYS_GREY_400};
  border-radius: 0.5rem;
  cursor: pointer;
  flex-direction: ${({ iconPosition }) =>
    iconPosition === "right" ? "row-reverse" : "row"};

  ${H4} {
    color: inherit;
  }

  ${({ selected, lightBg }) =>
    selected &&
    css`
      background-color: ${lightBg ? DARK_MOSS_GREEN_200 : DARK_MOSS_GREEN_800};
      color: ${lightBg ? DARK_MOSS_GREEN_900 : DAVYS_GREY_100};
      border-color: ${lightBg ? DARK_MOSS_GREEN_200 : DARK_MOSS_GREEN_800};
    `}

  ${({ selected }) =>
    !selected &&
    css`
      :hover {
        background-color: ${DAVYS_GREY_200};
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
      <H4 bold>{children}</H4>
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
      <H4 bold>{children}</H4>
    </Container>
  );
};
