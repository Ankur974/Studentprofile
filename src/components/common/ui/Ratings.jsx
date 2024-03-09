import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const CustomRatingBarStyle = styled.div`
//   display: flex;
// `;

// const StarImageStyle = styled.img`
//   width: 25px;
//   height: 20px;
//   object-fit: cover;
//   padding-right: 0.4rem;
// `;

// const StarContainer = styled.div`
//   cursor: pointer;
//   opacity: ${props => (props.selected ? 1 : 0.5)};
// `;

// const Rating = () => {
//   const [defaultRating, setDefaultRating] = useState(5);

//   const maxRating = [1, 2, 3, 4, 5];

//   const starImageFilled =
//     "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";

//   const starImageCorner =
//     "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";

//   const handleRatingClick = item => {
//     setDefaultRating(item);
//   };

const Rating = ({ onChange, required, rating }) => {
  const [defaultRating, setDefaultRating] = useState(rating || 0);

  const maxRating = [1, 2, 3, 4, 5];

  const starImageFilled =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";

  const starImageCorner =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";

  const handleRatingClick = item => {
    setDefaultRating(item);
    if (onChange) {
      onChange(item);
    }
  };

  useEffect(() => {
    setDefaultRating(rating || 0);
  }, [rating]);

  return (
    <div style={{ display: "flex" }}>
      {maxRating.map(item => (
        <div key={item} onClick={() => handleRatingClick(item)}>
          <img
            src={item <= defaultRating ? starImageFilled : starImageCorner}
            style={{ width: 25, height: 25, margin: 2 }}
            alt={`star-${item}`}
          />
        </div>
      ))}
      {required && !defaultRating && <span style={{ color: "red" }}>*</span>}
    </div>
  );
};

export default Rating;
