import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { SECONDARY_500, RATEBACKGROUND, ACCENT_0,PRIMARY_900 } from "@common/ui/colors";
import { Body2, H2, H5 } from "@common/ui/Headings";
import { TiTick } from "react-icons/ti";

const SelectStylistWrapper = styled(FlexBox)`
  border: 1px solid ${SECONDARY_500};
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 30rem;
  padding:0.5rem;
`;

const StylistCardsWrapper = styled(FlexBox)`
  flex-direction: row;
`;

const IndividualStylistCard = styled(FlexBox)`
  position: relative;
  cursor: pointer;
  padding: 0rem 0.5rem;
`;

const StylistCardContainer = styled(FlexBox)`
  border: 1px solid ${SECONDARY_500};
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  border-radius: 0.5rem;
  transition: border-color 0.3s;
  border: ${(props) => (props.isSelected ? `2px solid ${PRIMARY_900}` : `2px solid ${SECONDARY_500}`)};
`;

const ImageFlex = styled.div`
  position: relative;
  width: 50%;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    z-index: 1;
  }

  &:after {
    content: ${(props) => (props.isSelected ? "''" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.6); // Adjust the alpha value as needed
    z-index: 2;
    pointer-events: none;
  }
`;

const TickIcon = styled(TiTick)`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px; // Adjust the size as needed
  height: 20px; // Adjust the size as needed
  color: ${PRIMARY_900}; // Adjust the color as needed
`;

const PopularityBox = styled(FlexBox)`
  border-radius: 0.25rem;
  width: fit-content;
  padding: 0 0.5rem;
  align-items: center;
  justify-content: center;
  background-color: ${RATEBACKGROUND};
  opacity: 0.9;
`;

const ActionWrapper = styled(FlexBox)`
  position: relative;
  top: 0.8rem;
  padding:0.5rem;
  width: 100%;
  justify-content: center;
`;

const StyledStarRating = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  background-color: ${RATEBACKGROUND};
  padding: 0 0.5rem;
  column-gap: 0.4rem;
`;

const dummyData = [
  {
    id: 1,
    name: "Jessica",
    title: "Cooper",
    imageSrc: "/assets/images/girls-image.jpg",
    rating: "4.5",
  },
  {
    id: 2,
    name: "Jessica",
    title: "Cooper",
    imageSrc: "/assets/images/girls-image.jpg",
    rating: "4.5",
  },
  {
    id: 3,
    name: "Jessica",
    title: "Cooper",
    imageSrc: "/assets/images/girls-image.jpg",
    rating: "4.5",
  },
];

const SelectStylist = () => {
  const [selectedStylistId, setSelectedStylistId] = useState(null);

  const handleStylistClick = (stylistId) => {
    setSelectedStylistId(stylistId);
  };

  return (
    <SelectStylistWrapper>
      <H2>Select Stylist</H2>

      <StylistCardsWrapper>
        {dummyData.map((stylist) => (
          <IndividualStylistCard
            key={stylist.id}
            column
            onClick={() => handleStylistClick(stylist.id)}
          >
            <StylistCardContainer isSelected={selectedStylistId === stylist.id}>
              <ImageFlex>
                <img src={stylist.imageSrc} alt="stylist-image" />
                {selectedStylistId === stylist.id && <TickIcon />}
              </ImageFlex>
              <Body2 bold>{stylist.name}</Body2>
              <Body2>{stylist.title}</Body2>

              <ActionWrapper>
                {stylist.popularity && (
                  <PopularityBox>
                    <H5 color={ACCENT_0}>{stylist.popularity}</H5>
                  </PopularityBox>
                )}
                {stylist.rating && (
                  <StyledStarRating>
                    <img src="/assets/images/star.svg" alt="star" />
                    <Body2 color={ACCENT_0}>{stylist.rating}</Body2>
                  </StyledStarRating>
                )}
              </ActionWrapper>
            </StylistCardContainer>
          </IndividualStylistCard>
        ))}
      </StylistCardsWrapper>
    </SelectStylistWrapper>
  );
};

export default SelectStylist;