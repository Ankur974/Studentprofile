import styled, { css } from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import Radio from "@common/ui/Radio";
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
  flex-direction: column;
  gap: 1rem;

  ${({ active }) =>
    active &&
    css`
      background-color: ${ACCENT_200};
    `}
`;

export const RadioSection = ({ options, selectedOption, onChange }) => (
  <Container column>
    <FlexBox column>
      {options.map(option => {
        return (
          <OptionWrapper
            key={option?.slug}
            active={selectedOption === option?.slug}
          >
            <FlexBox
              align="center"
              justify="space-between"
              onClick={() => onChange(option?.slug)}
              cursor="pointer"
            >
              <FlexBox align="center" columnGap="0.5rem">
                <Radio active={selectedOption === option?.slug} />
                <Body2>{option?.label}</Body2>
              </FlexBox>
            </FlexBox>
          </OptionWrapper>
        );
      })}
    </FlexBox>
  </Container>
);
