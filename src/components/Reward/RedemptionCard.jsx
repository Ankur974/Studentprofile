import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { Body2, H3 } from "../common/ui/Headings";
import { ACCENT_100, ACCENT_500, PRIMARY_900 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  background-color: ${ACCENT_100};
  padding: 1rem;
  row-gap: 1rem;
`;

const RedeemButton = styled(FlexBox)`
  width: 100%;
  background-color: ${({ valid }) => (valid ? PRIMARY_900 : ACCENT_500)};
  color: ${ACCENT_100};
  cursor: ${({ valid }) => (valid ? "pointer" : "not-allowed")};
  padding: 1rem;
  justify-content: center;
  border-radius: 1rem;
  font-weight: bold;
`;
const H3styled = styled(H3)`
  color: ${({ valid }) => (valid ? "black" : `${ACCENT_500}`)};
`;

const Body2styled = styled(Body2)`
  color: ${({ valid }) => (valid ? "black" : `${ACCENT_500}`)};
`;

export const RedemptionCard = ({ data }) => {
  if (!data) return null;

  const { valid, imgsrc, title, content } = data;

  const handleRedeem = () => {
    if (valid) {
      alert("Redemption successful!");
    }
  };

  return (
    <Wrapper>
      {imgsrc && <img src={imgsrc} alt="BOLD" width="140px" height="80px" />}
      {title && (
        <H3styled valid={valid} bold>
          {title}
        </H3styled>
      )}
      {content && <Body2styled>{content}</Body2styled>}
      {valid !== undefined && (
        <RedeemButton valid={valid} onClick={handleRedeem}>
          Redeem Now
        </RedeemButton>
      )}
    </Wrapper>
  );
};
