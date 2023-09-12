import styled, { css } from "styled-components";
import { IoMdArrowRoundForward } from "react-icons/io";
import {
  PRIMARY_800,
  ACCENT_100,
  PRIMARY_900,
  ACCENT_500,
  ERROR_RED_500,
  ERROR_RED_600,
  MOSS_GREEN_800,
  MOSS_GREEN_900,
  white,
  MOSS_GREEN_400,
  MOSS_GREEN_500,
  ACCENT_400,
  BRICK_TERRACOTA_400,
  BRICK_TERRACOTA_500,
  ERROR_RED_400,
} from "./colors";
import FlexBox from "./FlexBox";

const InnerWrapper = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  flex-direction: ${({ iconPosition }) =>
    iconPosition === "right" ? "row-reverse" : "row"};
  gap: ${({ columnGap }) => columnGap || "0.25rem"};
`;

export const Button = styled.button`
  box-sizing: border-box;
  display: ${({ block }) => (block ? "block" : "inline")};
  background-color: ${({ color }) => color || PRIMARY_800};
  padding: ${({ padding }) => padding || "0.5rem 1.5rem"};
  color: ${ACCENT_100};
  line-height: 1.5rem;
  min-width: ${({ width }) => !width && "7rem"};
  width: ${({ width }) => (width ? width : "fit-content")};
  font-family: "Quicksand";
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 2.5rem;
  border: 1px solid ${({ color }) => color || PRIMARY_800};
  overflow: hidden;
  letter-spacing: 0.07rem;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
    border-color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
  }

  /* Danger Button */
  ${({ danger }) =>
    danger &&
    css`
      border: 1px solid ${ERROR_RED_500};
      background-color: ${ERROR_RED_500};
      color: ${({ color }) => color || white};

      &:hover {
        background-color: ${ERROR_RED_600};
        border-color: ${ERROR_RED_600};
        color: ${({ hoverColor }) => hoverColor || white};
      }
    `}

  /* Secondary Button */
  ${({ secondary }) =>
    secondary &&
    css`
      border: 1px solid ${MOSS_GREEN_800};
      background-color: ${MOSS_GREEN_800};
      color: ${({ color }) => color || white};

      &:hover {
        background-color: ${MOSS_GREEN_900};
        color: ${({ hoverColor }) => hoverColor || white};
        border-color: ${MOSS_GREEN_800};
      }
    `}

  /* Outline Button */
  ${({ outline, secondary }) =>
    outline &&
    !secondary &&
    css`
      background-color: transparent;
      color: ${({ color }) => color || PRIMARY_800};
      border-color: ${BRICK_TERRACOTA_400};

      &:hover {
        background-color: transparent;
        color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
        border-color: ${BRICK_TERRACOTA_500};
      }
    `}

  /* Outline Secondary Button */
  ${({ outline, secondary }) =>
    outline &&
    secondary &&
    css`
      border: 1px solid ${MOSS_GREEN_400};
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || MOSS_GREEN_800};

      &:hover {
        background-color: ${ACCENT_100};
        color: ${({ hoverColor }) => hoverColor || MOSS_GREEN_900};
        border-color: ${MOSS_GREEN_500};
      }
    `}

  /* Outline Tertiary Button */
  ${({ outline, tertiary }) =>
    outline &&
    tertiary &&
    css`
      background-color: transparent;
      color: ${({ color }) => color || MOSS_GREEN_800};
      border: 1px solid ${ACCENT_400};

      &:hover {
        background-color: transparent;
        color: ${({ hoverColor }) => hoverColor || MOSS_GREEN_900};
        border-color: ${ACCENT_500};
      }
    `}

      /* Outline Danger Button */
      ${({ outline, danger }) =>
    outline &&
    danger &&
    css`
      border: 1px solid ${ACCENT_400};
      background-color: transparent;
      color: ${({ color }) => color || ERROR_RED_500};

      &:hover {
        background-color: transparent;
        color: ${({ hoverColor }) => hoverColor || ERROR_RED_600};
        border-color: ${ACCENT_400};
      }
    `}

  /* Disabled Button */
  ${({ disabled, outline }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 40%;
      background-color: ${outline ? "transparent" : ACCENT_500};
      border: 1px solid ${ACCENT_500};
      color: ${outline ? ACCENT_500 : ACCENT_100};

      &:hover {
        background-color: ${outline ? "transparent" : ACCENT_500};
        border-color: ${outline ? ACCENT_500 : "transparent"};
        color: ${outline ? ACCENT_500 : ACCENT_100};
      }
    `}

  /* Text CTA Button */
  ${({ textCta, secondary }) =>
    textCta &&
    !secondary &&
    css`
      color: ${({ color }) => color || PRIMARY_800};
      border: none;
      padding: 0.5rem 0rem;
      min-width: unset;
      background: transparent;
      text-decoration: ${({ textDecoration }) => textDecoration};

      &:hover {
        background-color: transparent;
        color: ${({ color }) => color || PRIMARY_900};
      }
    `}

  /* Secondary Text CTA Button */
  ${({ textCta, secondary }) =>
    textCta &&
    secondary &&
    css`
      color: ${({ color }) => color || MOSS_GREEN_800};
      border: none;
      padding: 0.5rem 0rem;
      min-width: unset;
      background: transparent;
      text-decoration: ${({ textDecoration }) => textDecoration};

      &:hover {
        background-color: transparent;
        color: ${({ color }) => color || MOSS_GREEN_900};
      }
    `}
`;

/**
 * CTA with an icon on the either side of text.
 * Default icon is `IoMdArrowRoundForward` (Right arrow).
 * @example
 * ```
 * <IconButton color="red" iconPosition = "right" outline Icon={SomeIcon}>CLICK ME</IconButton>
 * ```
 */
export const IconButton = ({
  children,
  iconPosition = "left",
  spacing = 0,
  Icon = IoMdArrowRoundForward,
  strokeWidth = 2,
  ...props
}) => (
  <Button {...props}>
    <InnerWrapper iconPosition={iconPosition} columnGap={spacing}>
      <Icon size="1rem" strokeWidth={strokeWidth} />
      {children}
    </InnerWrapper>
  </Button>
);

/**
 * CTA without background color and border.
 * An icon on the right side of cta text is shown on hover.
 * Default icon is `IoMdArrowRoundForward` (Right arrow).
 *  * @example
 * ```
 * <TextButton color="red" iconPosition = "right" Icon={SomeIcon}>CLICK ME</TextButton>
 * ```
 */
export const TextButton = ({
  children,
  Icon = IoMdArrowRoundForward,
  iconPosition = "left",
  ...props
}) => {
  return (
    <Button textCta {...props}>
      <InnerWrapper iconPosition={iconPosition}>
        <Icon size="1rem" strokeWidth={2} />
        {children}
      </InnerWrapper>
    </Button>
  );
};
