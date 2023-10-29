import styled, { css } from "styled-components";
import { ACCENT_800 } from "@common/ui/colors";

const commonStyles = css`
  font-family: "Quicksand";
  display: ${({ display }) => display || "initial"};
  opacity: ${({ opacity }) => opacity || 1};
  font-weight: ${({ bold }) => (bold ? 700 : 500)};
  color: ${({ color }) => color || ACCENT_800};
  text-align: ${({ textAlign }) => textAlign || "left"};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  white-space: ${({ whiteSpace }) => whiteSpace || "inherit"};
  text-transform: ${({ textTransform }) => textTransform || "none"};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  word-break: ${({ wordBreak }) => wordBreak || "inherit"};
  cursor: ${({ cursor }) => !!cursor && cursor};
  text-underline-offset: ${({ textUnderlineOffset }) =>
    textUnderlineOffset || "none"};
`;

export const Display = styled.h1`
  ${commonStyles}
  font-size: 2rem;
  line-height: ${({ lineHeight }) => lineHeight || "3rem"};
`;

export const H1 = styled.h2`
  ${commonStyles}
  font-size: 1.25rem;
  line-height: ${({ lineHeight }) => lineHeight || "2rem"};
`;

export const H2 = styled.h3`
  ${commonStyles}
  font-size:1.125rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.75rem"};
`;

export const H3 = styled.h4`
  ${commonStyles}
  font-size: 1rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.5rem"};
`;

export const H4 = styled.h5`
  ${commonStyles}
  font-size: .875rem;
  line-height: 1.5rem;
`;

export const H5 = styled.h5`
  ${commonStyles}
  font-size: .75rem;
  line-height: 1.25rem;
`;

export const H6 = styled.h5`
  ${commonStyles}
  font-size:.625rem;
  line-height: 1rem;
`;

export const Body1 = styled.h5`
  ${commonStyles}
  font-size: 1rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.5rem"};
`;

export const Body2 = styled.h5`
  ${commonStyles}
  font-size: 0.875rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.5rem"};
  letter-spacing: ${({ spacing }) => spacing || "unset"};
`;

export const ButtonText = styled.span`
  ${commonStyles}
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  text-underline-offset: 2px;
  cursor: pointer;
`;

export const Support = styled.span`
  ${commonStyles}
  font-size: 0.75rem;
  line-height: ${({ lineHeight }) => lineHeight || "1.25rem"};
  letter-spacing: ${({ spacing }) => spacing || "unset"};
`;

export const Caption = styled.span`
  ${commonStyles}
  font-size: 0.625rem;
  font-weight: 700;
  line-height: ${({ lineHeight }) => lineHeight || "1rem"};
`;
