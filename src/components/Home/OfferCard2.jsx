import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { Body2, H2 } from "../common/ui/Headings";
import { ACCENT_0 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  border-radius: 1rem;
  min-width: 13rem;
  max-height:13rem;
  justify-content: space-between;
  background: ${props => props.color};
`;

const ButtonFlex = styled(FlexBox)`
  background-color: ${ACCENT_0};
  color: ${props => props.textColor};
  font-weight: bold;
  text-transform: uppercase;
  padding: 1rem;
  width: fit-content;
  border-radius: 0.5rem;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  position: absolute;
  bottom: 0.5rem;
`;

const UpperBox = styled(FlexBox)`
  align-self: flex-end;
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  background-color: ${ACCENT_0};
  opacity: 0.6;
  border-radius: 0 0 0.5rem 0.5rem;
`;

const ImgBox = styled(FlexBox)`
  margin: 0 1.5rem 1.5rem 0;
  row-gap: 1.5rem;
`;

const ContentBox = styled(FlexBox)`
  margin: 1.5rem 0 1.5rem 1.5rem;
  row-gap: 0.5rem;
  position: relative;
`;

const OfferCard2 = ({ data }) => {
  return (
    <Wrapper key={data?.id} color={data?.color}>
      <ContentBox column>
        {data?.title && (
          <H2 bold color={ACCENT_0}>
            {data?.title}
          </H2>
        )}
        {data?.desc && <Body2 color={ACCENT_0}>{data?.desc}</Body2>}
        {data?.onButtonClick && (
          <ButtonFlex onClick={data?.onButtonClick} textColor={data?.textColor}>
            {data?.buttonText || "View Details"}
          </ButtonFlex>
        )}
      </ContentBox>
      <ImgBox column margin="0 1.5rem 1.5rem 0">
        {data?.imglogo && (
          <UpperBox>
            <img
              src={data?.imglogo}
              alt="picture"
              width={data?.imgLogoWidth || "50px"}
              height={data?.imgLogoHeight || "50px"}
            />
          </UpperBox>
        )}
        {data?.mainimg && (
          <img
            src={data?.mainimg}
            alt="picture"
            width={data?.mainImgWidth || "100px"}
            height={data?.mainImgHeight || "100px"}
          />
        )}
      </ImgBox>
    </Wrapper>
  );
};

export default OfferCard2;
