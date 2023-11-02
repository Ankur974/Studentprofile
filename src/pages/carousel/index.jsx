import React from "react";
import Carousel from "../../components/common/Carousel";

const Main = () => {
  const images = [
    "/assets/salon-image1.jpg",
    "/assets/salon-image2.jpg",
    "/assets/salon-image3.jpg",
    "/assets/salon-image4.jpg",
  ];

  return <Carousel images={images} />;
};

export default Main;
