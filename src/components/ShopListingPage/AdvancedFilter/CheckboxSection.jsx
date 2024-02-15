import styled, { css } from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import CheckBox from "@common/ui/CheckBox";
import { Body2 } from "@common/ui/Headings";
import { ACCENT_200 } from "@common/ui/colors";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const OptionWrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      background-color: ${ACCENT_200};
    `}
`;

export const CheckboxSection = ({ options, selectedOptions, onChange }) => (
  <Container column>
    <FlexBox column>
      {options.map(option => (
        <OptionWrapper
          key={option?.slug}
          align="center"
          columnGap="0.5rem"
          active={selectedOptions?.includes(option?.slug)}
          onClick={() => onChange(option?.slug)}
        >
          <CheckBox check={selectedOptions?.includes(option?.slug)} />
          <Body2>{option?.label}</Body2>
        </OptionWrapper>
      ))}
    </FlexBox>
  </Container>
);
