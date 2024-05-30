import React from "react";
import Nav from "../Nav";
import SecondContainer from "../SecondContainer";
import HeaderSection from "../HeaderSection";
import CardContainer from "./ServicesCard";
import List from "../List";
import Vision from "../Vision";
import Blog from "../Blog";
import Faq from "../Faq";
import Footer from "../common/Footer";

const Home = () => {
  return (
    <>
      <Nav />
      <SecondContainer />
      <HeaderSection />
      <CardContainer />
      <List />
      <Vision />
      <Blog />
      <Faq />
      <Footer />
    </>
  );
};

export default Home;
