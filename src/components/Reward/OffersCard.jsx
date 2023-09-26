import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { Body2, H3 } from "../common/ui/Headings";
import { PRIMARY_900 } from "../common/ui/colors";
import { BsArrowRightShort } from "react-icons/bs";

const Wrapper = styled(FlexBox)`
  border-radius: 1rem;
  flex-direction: column;
  background-color: ${props => props.backgroundColor || PRIMARY_900};
`;

const DetailsWrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 1rem;
`;

const CoinsRewardBox = styled(FlexBox)`
  background-color: ${PRIMARY_900};
  border-radius: 0.75rem 0;
  padding: 0.5rem 1rem;
  align-items: center;
  column-gap: 0.5rem;
  color: white;
  justify-content: flex-end;
  align-items: center;
  cursor:pointer;
`;

export const OffersCard = ({ data }) => {
  const { imgsrc, title, content, coins, backgroundColor } = data || {};

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <DetailsWrapper>
        {imgsrc && (
          <img src={imgsrc} alt="picture" width="50px" height="50px" />
        )}
        {title && <H3 bold>{title}</H3>}
        {content && <Body2>{content}</Body2>}
      </DetailsWrapper>
      {!!coins && (
        <FlexBox justify="end">
          <CoinsRewardBox row>
            <img src="/assets/coin.svg" alt="coin" width="27rem" />
            {coins}
            <BsArrowRightShort color="white" size="1.5rem" onClick={() => alert("offer applied")}/>
          </CoinsRewardBox>
        </FlexBox>
      )}
    </Wrapper>
  );
};
