import styled from "styled-components";
import { Body2 } from "../ui/Headings";
import {
  ACCENT_400,
  PRIMARY_800,
  SECONDARY_400,
  SECONDARY_500,
} from "../ui/colors";

const Dot = styled.div`
  display: flex;
  justify-content: space-around !important;
  width: 18rem;
  margin: ${props => props.margin && "auto"};
`;

const DotContainer = styled.div`
  max-width: 6rem;
  display: flex;
  align-items: center;
  column-gap: 2px;
`;

const StatusIndicator = styled.div`
  background-color: ${props => props.color};
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.2rem;
  border-radius: 50%;
  border: none;
`;

export const availabileDatesStatus = [
  { color: ACCENT_400, text: "unavailable" },
  { color: SECONDARY_500, text: "available" },
  { color: PRIMARY_800, text: "few left" },
];

const StatusIndicators = ({ margin }) => {
  return (
    <Dot margin={margin}>
      {availabileDatesStatus.map(status => (
        <DotContainer key={status.text}>
          <StatusIndicator color={status.color} />
          <Body2
            fontSize="0.8rem"
            color={SECONDARY_400}
            textTransform="capitalize"
          >
            {status.text}
          </Body2>
        </DotContainer>
      ))}
    </Dot>
  );
};

export default StatusIndicators;
