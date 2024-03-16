import React from "react";
import styled, { css } from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Caption } from "@common/ui/Headings";
import { BABERBACKGROUND, ACCENT_0 } from "@common/ui/colors";
import { H3 } from "@common/ui/Headings";

const Heading = styled(H3)`
  color: ${BABERBACKGROUND};
  font-weight: 900;
  font-size: 1.125rem;
  text-transform: capitalize;

  ${({ isDark }) =>
    isDark &&
    css`
      color: ${ACCENT_0};
    `}
`;

const SubHeading = styled(Caption)`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  line-height: normal;

  ${({ isDark }) =>
    isDark &&
    css`
      color: ${ACCENT_0};
    `}
`;

export const Header = ({ title, subTitle, isDark }) => (
  <FlexBox justify="center" align="center" rowGap="0.25rem" column>
    <Heading isDark={isDark}>{title}</Heading>
    <SubHeading isDark={isDark}>{subTitle}</SubHeading>
  </FlexBox>
);
