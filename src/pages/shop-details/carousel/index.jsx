import React from "react";
import Carousel from "../../../components/common/Carousel";

const Main = () => {
  const images = [
    {
      id: 1,
      url: "/assets/salon-image1.jpg",
    },
    {
      id: 2,
      url: "/assets/salon-image2.jpg",
    },
    {
      id: 3,
      url: "/assets/salon-image3.jpg",
    },
    {
      id: 4,
      url: "/assets/salon-image4.jpg",
    },
  ];

  return <Carousel images={images} />;
};

export default Main;
