import React from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Caption } from "@common/ui/Headings";
import { BABERBACKGROUND } from "@common/ui/colors";
import { H3 } from "@common/ui/Headings";

const Heading = styled(H3)`
  color: ${BABERBACKGROUND};
  font-weight: 900;
  font-size: 1.125rem;
  text-transform: capitalize;
`;

const SubHeading = styled(Caption)`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  line-height: normal;
`;

export const Header = ({ title, subTitle }) => (
  <FlexBox justify="center" align="center" rowGap="0.25rem" column>
    <Heading>{title}</Heading>
    <SubHeading>{subTitle}</SubHeading>
  </FlexBox>
);
