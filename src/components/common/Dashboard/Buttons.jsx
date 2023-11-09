import styled, { css } from "styled-components";
import { FiPlus } from "react-icons/fi";
import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_400,
  ACCENT_500,
  ERROR,
  PRIMARY_400,
  PRIMARY_500,
  PRIMARY_800,
  PRIMARY_900,
} from "@common/ui/colors";

export const Button = styled.button`
  box-sizing: border-box;
  display: ${({ block }) => (block ? "block" : "inline-block")};
  color: ${({ color }) => color || ACCENT_100};
  background-color: ${({ bgColor }) => bgColor || ERROR};
  width: ${({ width }) => width || "auto"};
  padding: ${({ padding }) => padding || "0.5rem 1.5rem"};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: ${({ borderRadius }) => borderRadius || "2.5rem"};
  border: 1px solid ${({ borderColor }) => borderColor || ERROR};
  cursor: ${({ cursor }) => cursor || "pointer"};

  :hover {
    color: ${({ hoverColor }) => hoverColor || ACCENT_100};
    background-color: ${({ hoverBgColor }) => hoverBgColor || ERROR};
    border-color: ${({ hoverBorderColor }) => hoverBorderColor || ERROR};
  }

  /* Danger Button */
  ${({ danger }) =>
    danger &&
    css`
      background-color: ${ERROR};
      color: ${({ color }) => color || ACCENT_100};
      border-color: ${ERROR};

      :hover {
        background-color: ${ERROR};
        color: ${({ hoverColor }) => hoverColor || ACCENT_100};
        border-color: ${ERROR};
      }
    `}

  /* Secondary Button */
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${PRIMARY_800};
      color: ${({ color }) => color || ACCENT_100};
      border-color: ${PRIMARY_800};

      :hover {
        background-color: ${PRIMARY_900};
        color: ${({ hoverColor }) => hoverColor || ACCENT_100};
        border-color: ${PRIMARY_900};
      }
    `}

  /* Outline Button */
  ${({ outline }) =>
    outline &&
    css`
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || ERROR};
      border-color: ${ERROR};

      :hover {
        background-color: ${ACCENT_100};
        color: ${({ hoverColor }) => hoverColor || ERROR};
        border-color: ${ERROR};
      }
    `}

  /* Outline Secondary Button */
  ${({ outline, secondary }) =>
    outline &&
    secondary &&
    css`
      color: ${({ color }) => color || PRIMARY_800};
      border-color: ${PRIMARY_400};

      :hover {
        color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
        border-color: ${PRIMARY_500};
      }
    `}

  /* Tertiary Button */
  ${({ tertiary }) =>
    tertiary &&
    css`
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || PRIMARY_800};
      border-color: ${({ borderColor }) => borderColor || ACCENT_400};
      border-radius: ${({ borderRadius }) => borderRadius || "2.5rem"};

      :hover {
        background-color: ${ACCENT_200};
        color: ${({ hoverColor }) => hoverColor || PRIMARY_800};
        border-color: ${({ borderColor }) => borderColor || ACCENT_400};
        border-radius: ${({ borderRadius }) => borderRadius || "2.5rem"};
      }
    `}

  /* Outline Danger Button */
  ${({ outline, danger }) =>
    outline &&
    danger &&
    css`
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || ERROR};
      border-color: ${ERROR};

      :hover {
        background-color: ${ACCENT_100};
        color: ${({ hoverColor }) => hoverColor || ERROR};
        border-color: ${ERROR};
      }
    `}

  /* Text CTA Button */
  ${({ textCta }) =>
    textCta &&
    css`
      padding: 0.5rem;
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || ERROR};
      border-color: ${ACCENT_100};
      text-decoration: ${({ textDecoration }) => textDecoration || "unset"};

      :hover {
        background-color: ${ACCENT_100};
        color: ${({ color }) => color || ERROR};
        border-color: ${ACCENT_100};
      }
    `}

  /* Secondary Text CTA Button */
  ${({ textCta, secondary }) =>
    textCta &&
    secondary &&
    css`
      color: ${({ color }) => color || PRIMARY_800};

      :hover {
        color: ${({ color }) => color || PRIMARY_900};
      }
    `}

  /* Disabled Button */
  ${({ disabled, outline, tertiary, textCta }) => {
    // primary, secondary
    let disabledStyles = css`
      background-color: ${ACCENT_500};
      color: ${ACCENT_100};
      border-color: ${ACCENT_500};
    `;

    // outline, tertiary
    if (outline || tertiary)
      disabledStyles = css`
        background-color: ${ACCENT_100};
        color: ${ACCENT_500};
        border-color: ${ACCENT_400};
      `;

    // textCta
    if (textCta)
      disabledStyles = css`
        background-color: ${ACCENT_100};
        color: ${ACCENT_500};
        border-color: ${ACCENT_100};
      `;

    return (
      disabled &&
      css`
        cursor: not-allowed;
        ${disabledStyles}

        :hover {
          ${disabledStyles}
        }
      `
    );
  }}
`;

const IconBtn = styled(Button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ iconPosition }) =>
    iconPosition === "right" ? "row-reverse" : "row"};
  gap: ${({ gap }) => gap};
  ${({ noText }) =>
    noText &&
    css`
      padding: 0.5rem;
    `}
  ${({ showDot }) =>
    showDot &&
    css`
      ::before {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0.5rem;
        right: 0.5rem;
        width: 0.5rem;
        height: 0.5rem;
        background-color: ${ERROR};
        border-radius: 50%;
      }
    `};
`;

/**
 * Icon Button
 *
 * Styling - same props as `Button`
 * @param {boolean} [showDot] - to show red dot indicator
 *
 * for controlling border styles specify borderColor, borderRadius
 * @example - rectangular icon button without border
 * `<IconButton borderRadius="0.5rem" borderColor={ACCENT_100} />`
 *
 * Button Text Props
 * @param {string} [children] - optional button text
 * @param {string} [gap] - column gap between icon and text
 * @param {string} [iconPosition] - left or right
 *
 * Icon Props
 * @param {Icon} Icon - default icon is `FiPlus`
 * @param {string} [iconSize]
 * @param {string} [strokeWidth]
 */

export const IconButton = ({
  onClick,
  children = null,
  showDot = false,
  gap = "0.5rem",
  iconPosition = "left",
  Icon = FiPlus,
  iconSize = "1.25rem",
  strokeWidth = 2,
  ...props
}) => (
  <IconBtn
    onClick={onClick}
    gap={gap}
    iconPosition={iconPosition}
    noText={!children}
    showDot={showDot}
    {...props}
  >
    <Icon size={iconSize} strokeWidth={strokeWidth} />
    {children}
  </IconBtn>
);
