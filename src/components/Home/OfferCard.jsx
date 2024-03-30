import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import FlexBox from "@common/ui/FlexBox";
import { Body2, H2, H6 } from "@common/ui/Headings";
import { BABERBACKGROUND } from "@common/ui/colors";
import { offerCardData } from "@metadata/OfferCardData";
import { device } from "@common/ui/Responsive";

const Wrapper = styled(FlexBox)`
  border-radius: 1.5rem;
  width: 100%;
  max-width: 28rem;
  padding: 0.5rem;
  justify-content: space-between;
  background: ${props => props.bgColor};
  cursor: pointer;

  @media ${device.laptop} {
    padding: 1rem;
  }
`;

const InnerCard = styled(FlexBox)`
  border-radius: 1.5rem;
  width: 584px;
  background: ${props => props.bgColor};
  transition: all 0.3s ease 0.1s;

  &:hover {
    transform: scale(0.95);
  }
`;

const ValidityContainer = styled.div`
  background-color: ${props => props.color};
  padding: 0.5rem 0;
  text-align: center;
  border-radius: 0 0.5rem 0.5rem 0;
  margin: 0 0 2rem 0;
  max-width: 10rem;
`;

const LeftSection = styled(FlexBox)`
  flex-grow: 1;
`;

const ImgBox = styled(FlexBox)`
  row-gap: 1.5rem;
  align-self: flex-end;
`;

const Image = styled.img`
  object-fit: cover;
  width: 9rem;

  @media ${device.laptop} {
    width: 10rem;
  }
`;

const ContentBox = styled(FlexBox)`
  margin: 1.5rem 0 1.5rem 1.5rem;
  flex-grow: 1;
`;

const Container = styled(FlexBox)`
  overflow-x: auto;
  column-gap: 1.5rem;
  /* flex-direction: column; */

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const Description = styled(FlexBox)`
  flex-grow: 1;
`;

const OfferCard = () => {
  const router = useRouter();
  return (
    <Container>
      {offerCardData?.map(data => {
        const {
          id,
          outerColor,
          innerColor,
          title,
          desc,
          validityCardBgColor,
          image,
        } = data;

        return (
          <Wrapper
            bgColor={outerColor}
            key={id}
            onClick={() => router.push("/shop-listing")}
          >
            <InnerCard bgColor={innerColor}>
              <LeftSection column>
                <ContentBox column>
                  <H2 bold color={BABERBACKGROUND}>
                    {title}
                  </H2>
                  <Description>
                    <Body2 color={BABERBACKGROUND}>{desc}</Body2>
                  </Description>
                </ContentBox>
                <ValidityContainer color={validityCardBgColor}>
                  <Body2 color={BABERBACKGROUND}>Valid till 15th April</Body2>
                </ValidityContainer>
              </LeftSection>
              <FlexBox column padding="0.5rem 1rem 0.5rem 0">
                <ImgBox>
                  <Image src={image} />
                </ImgBox>
                <FlexBox alignSelf="flex-end">
                  <H6>*T&C may apply</H6>
                </FlexBox>
              </FlexBox>
            </InnerCard>
          </Wrapper>
        );
      })}
    </Container>
  );
};

export default OfferCard;
