import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { Body2, H2 } from "../common/ui/Headings";
import { ACCENT_0 } from "../common/ui/colors";



const Wrapper = styled(FlexBox)`
  width: fit-content;
  border-radius: 1rem;
  min-width: 13rem;
  justify-content: space-between;
  background: ${(props) => props.color};
`;

const ButtonFlex = styled(FlexBox)`
  background-color: ${ACCENT_0};
  color: ${(props) => props.color};
  font-weight: bold;
  text-transform: uppercase;
  padding: 1rem;
  width: fit-content;
  border-radius: 0.5rem;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  position:absolute;
  bottom:0.5rem;
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
  row-gap: 1rem;
  position:relative;
`;

export const OfferCard2Card = ({ offerCard2data }) => {
  return (
    <>
      {offerCard2data.map(item => (
        <Wrapper key={item.id} color={item.color}>
          <ContentBox column>
            {item.title && (
              <H2 bold color={ACCENT_0}>
                {item.title}
              </H2>
            )}
            {item.desc && <Body2 color={ACCENT_0}>{item.desc}</Body2>}
            <ButtonFlex onClick={() => alert("chai") }color={item.color}>view details</ButtonFlex>
          </ContentBox>
          <ImgBox column margin="0 1.5rem 1.5rem 0">
            {item.imglogo && (
              <UpperBox>
                <img
                  src={item.imglogo}
                  alt="picture"
                  width="50px"
                  height="50px"
                />
              </UpperBox>
            )}
            {item.mainimg && (
              <img
                src={item.mainimg}
                alt="picture"
                width="100px"
                height="100px"
              />
            )}
          </ImgBox>
        </Wrapper>
      ))}
    </>
  );
};