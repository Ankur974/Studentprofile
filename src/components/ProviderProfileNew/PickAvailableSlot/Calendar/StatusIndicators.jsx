import styled from "styled-components";

import { Text } from "@common/Text";
import { FlexBox } from "@common/FlexBox";

import { ACCENT_500, PRIMARY_800, SECONDARY_500 } from "@constants/colors";

const Wrapper = styled(FlexBox)`
  column-gap: 1.5rem;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const ColorIndicator = styled(FlexBox)`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const indicators = [
  { color: ACCENT_500, label: "Unavailable" },
  { color: SECONDARY_500, label: "Available" },
  { color: PRIMARY_800, label: "Few left" },
];

const StatusIndicators = () => {
  return (
    <Wrapper>
      {indicators?.map(({ color, label }) => (
        <FlexBox key={label} align="center" columnGap="0.5rem">
          <ColorIndicator color={color} />
          <Text fontSize="0.75rem">{label}</Text>
        </FlexBox>
      ))}
    </Wrapper>
  );
};

export default StatusIndicators;
