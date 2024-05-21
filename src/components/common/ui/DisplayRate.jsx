import React from "react";
import styled from "styled-components";

const CustomRatingBarStyle = styled.div`
  display: flex;
`;

const StarImageStyle = styled.img`
  width: 1.25rem;
  height: 1rem;
  object-fit: cover;
  padding-right: 0.4rem;
`;

const StarContainer = styled.div`
  cursor: pointer;
  opacity: ${props => (props.selected ? 1 : 0.5)};
`;

const Rating = ({ rate }) => {
  const maxRating = [1, 2, 3, 4, 5];
  const starImageFilled = "/assets/images/StarIcon.svg";
  const starImageCorner = "/assets/images/blankstar.svg";

  const CustomRatingBar = () => {
    return (
      <CustomRatingBarStyle>
        {maxRating.map(item => (
          <StarContainer key={item} selected={item <= rate}>
            <StarImageStyle
              src={item <= rate ? starImageFilled : starImageCorner}
            />
          </StarContainer>
        ))}
      </CustomRatingBarStyle>
    );
  };

  return <CustomRatingBar />;
};

export default Rating;
