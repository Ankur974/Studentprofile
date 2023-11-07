import styled, { css } from "styled-components";
import { FiPlus } from "react-icons/fi";
import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_400,
  ACCENT_500,
  BRICK_TERRACOTA_400,
  BRICK_TERRACOTA_500,
  BRICK_TERRACOTA_800,
  BRICK_TERRACOTA_900,
  DARK_MOSS_GREEN_400,
  DARK_MOSS_GREEN_500,
  DARK_MOSS_GREEN_800,
  DARK_MOSS_GREEN_900,
  ERROR_RED_400,
  ERROR_RED_500,
  ERROR_RED_600,
} from "@common/ui/colors";

export const Button = styled.button`
  box-sizing: border-box;
  display: ${({ block }) => (block ? "block" : "inline-block")};
  color: ${({ color }) => color || ACCENT_100};
  background-color: ${({ bgColor }) => bgColor || BRICK_TERRACOTA_800};
  width: ${({ width }) => width || "auto"};
  padding: ${({ padding }) => padding || "0.5rem 1.5rem"};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: ${({ borderRadius }) => borderRadius || "2.5rem"};
  border: 1px solid ${({ borderColor }) => borderColor || BRICK_TERRACOTA_800};
  cursor: ${({ cursor }) => cursor || "pointer"};

  :hover {
    color: ${({ hoverColor }) => hoverColor || ACCENT_100};
    background-color: ${({ hoverBgColor }) =>
      hoverBgColor || BRICK_TERRACOTA_900};
    border-color: ${({ hoverBorderColor }) =>
      hoverBorderColor || BRICK_TERRACOTA_900};
  }

  /* Danger Button */
  ${({ danger }) =>
    danger &&
    css`
      background-color: ${ERROR_RED_500};
      color: ${({ color }) => color || ACCENT_100};
      border-color: ${ERROR_RED_500};

      :hover {
        background-color: ${ERROR_RED_600};
        color: ${({ hoverColor }) => hoverColor || ACCENT_100};
        border-color: ${ERROR_RED_600};
      }
    `}

  /* Secondary Button */
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${DARK_MOSS_GREEN_800};
      color: ${({ color }) => color || ACCENT_100};
      border-color: ${DARK_MOSS_GREEN_800};

      :hover {
        background-color: ${DARK_MOSS_GREEN_900};
        color: ${({ hoverColor }) => hoverColor || ACCENT_100};
        border-color: ${DARK_MOSS_GREEN_900};
      }
    `}

  /* Outline Button */
  ${({ outline }) =>
    outline &&
    css`
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || BRICK_TERRACOTA_800};
      border-color: ${BRICK_TERRACOTA_400};

      :hover {
        background-color: ${ACCENT_100};
        color: ${({ hoverColor }) => hoverColor || BRICK_TERRACOTA_900};
        border-color: ${BRICK_TERRACOTA_500};
      }
    `}

  /* Outline Secondary Button */
  ${({ outline, secondary }) =>
    outline &&
    secondary &&
    css`
      color: ${({ color }) => color || DARK_MOSS_GREEN_800};
      border-color: ${DARK_MOSS_GREEN_400};

      :hover {
        color: ${({ hoverColor }) => hoverColor || DARK_MOSS_GREEN_900};
        border-color: ${DARK_MOSS_GREEN_500};
      }
    `}

  /* Tertiary Button */
  ${({ tertiary }) =>
    tertiary &&
    css`
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || DARK_MOSS_GREEN_800};
      border-color: ${({ borderColor }) => borderColor || ACCENT_400};
      border-radius: ${({ borderRadius }) => borderRadius || "2.5rem"};

      :hover {
        background-color: ${ACCENT_200};
        color: ${({ hoverColor }) => hoverColor || DARK_MOSS_GREEN_800};
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
      color: ${({ color }) => color || ERROR_RED_500};
      border-color: ${ERROR_RED_400};

      :hover {
        background-color: ${ACCENT_100};
        color: ${({ hoverColor }) => hoverColor || ERROR_RED_600};
        border-color: ${ERROR_RED_500};
      }
    `}

  /* Text CTA Button */
  ${({ textCta }) =>
    textCta &&
    css`
      padding: 0.5rem;
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || BRICK_TERRACOTA_800};
      border-color: ${ACCENT_100};
      text-decoration: ${({ textDecoration }) => textDecoration || "unset"};

      :hover {
        background-color: ${ACCENT_100};
        color: ${({ color }) => color || BRICK_TERRACOTA_900};
        border-color: ${ACCENT_100};
      }
    `}

  /* Secondary Text CTA Button */
  ${({ textCta, secondary }) =>
    textCta &&
    secondary &&
    css`
      color: ${({ color }) => color || DARK_MOSS_GREEN_800};

      :hover {
        color: ${({ color }) => color || DARK_MOSS_GREEN_900};
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
        background-color: ${ERROR_RED_400};
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
