import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_500, PRIMARY_800, SECONDARY_800 } from "@common/ui/colors";
import { H5 } from "@common/ui/Headings";

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
  { color: SECONDARY_800, label: "Available" },
  { color: PRIMARY_800, label: "Few left" },
  { color: ACCENT_500, label: "Unavailable" },
];

const StatusIndicators = () => {
  return (
    <Wrapper>
      {indicators?.map(({ color, label }) => (
        <FlexBox key={label} align="center" columnGap="0.5rem">
          <ColorIndicator color={color} />
          <H5>{label}</H5>
        </FlexBox>
      ))}
    </Wrapper>
  );
};

export default StatusIndicators;
