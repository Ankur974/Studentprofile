import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Body2 } from "@common/ui/Headings";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Resposive";
import Card from "./Card";
import OfferCard2 from "./OfferCard2";
import { ACCENT_0 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 1.5rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 0;
  }
`;

const ScrollableList = styled.div`
  width: 100%;
  position: relative;
`;

const CardWrapper = styled.div`
  width: 24rem;
`;
const AddImage = styled.div`
  background-color: black;
  position: absolute;
  bottom: 5%;
  right: 2%;
  z-index: 5;
  padding: 0.5rem;
  border-radius: 1rem;
  cursor: pointer;
`;
const handleClick = () => {
  alert("you have clicked");
};
const offerCard2data = [
  {
    id: 1,
    color:
      "linear-gradient(320deg, rgba(209,0,0,0.6090805951286764) 0%, rgba(253,45,57,0.9508172898065477) 100%);",
    title: "GET 40% OFF",
    desc: "Lorem ipsum, dolor sit amet consectetur.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
  {
    id: 2,
    color:
      "linear-gradient(120deg, rgba(255,0,0,0.6) 0%, rgba(255,102,102,0.9) 100%);",
    title: "20% OFF Haircut",
    desc: "Revamp your look with a 20% discount on haircuts.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
  {
    id: 3,
    color:
      "linear-gradient(45deg, rgba(0,102,204,0.6) 0%, rgba(51,153,255,0.9) 100%);",
    title: "Manicure & Pedicure Combo",
    desc: "Treat yourself to a relaxing manicure and pedicure combo at a special price.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
  {
    id: 4,
    color:
      "linear-gradient(160deg, rgba(255,153,0,0.6) 0%, rgba(255,204,102,0.9) 100%);",
    title: "Massage Therapy",
    desc: "Relieve stress with a rejuvenating massage session and save 25%.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
  {
    id: 6,
    color:
      "linear-gradient(240deg, rgba(255,0,255,0.6) 0%, rgba(255,102,255,0.9) 100%);",
    title: "Nail Art Workshop",
    desc: "Learn the art of nail design in our workshop with a 10% discount.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
  {
    id: 7,
    color:
      "linear-gradient(30deg, rgba(0,153,153,0.6) 0%, rgba(0,204,204,0.9) 100%);",
    title: "Hair Coloring Special",
    desc: "Transform your hair color with our special offer and save 30%.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
  {
    id: 8,
    color:
      "linear-gradient(200deg, rgba(255,102,0,0.6) 0%, rgba(255,153,102,0.9) 100%);",
    title: "Aromatherapy Spa",
    desc: "Indulge in relaxation with our aromatherapy spa session and get 20% off.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
  {
    id: 9,
    color:
      "linear-gradient(60deg, rgba(153,0,153,0.6) 0%, rgba(204,51,204,0.9) 100%);",
    title: "Bridal Makeup Package",
    desc: "Get ready for your special day with our bridal makeup package and save 15%.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
  {
    id: 10,
    color:
      "linear-gradient(260deg, rgba(102,0,204,0.6) 0%, rgba(153,51,255,0.9) 100%);",
    title: "Hair Extensions",
    desc: "Add volume and length to your hair with hair extensions at 25% off.",
    imglogo: "/assets/images/coin.svg",
    mainimg: "/assets/images/coin.svg",
  },
];

const Home = () => {
  return (
    <Wrapper>
      <FlexBox>
        <Card
          title="Hot Selling Salon 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          imageUrl="/assets/images/banner-new.svg"
          redirectUrl="/shop-listing"
        />
        <Card
          title="Hot Selling Salon 2"
          description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
          imageUrl="/assets/images/banner-new.svg"
          redirectUrl="/shop-listing"
        />
      </FlexBox>

      <ScrollableList>
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={3}
          navigation
        >
          {offerCard2data?.map(data => (
            <SwiperSlide key={data?.id}>
              <CardWrapper>
                <OfferCard2 data={data} />
              </CardWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
        <AddImage onClick={handleClick}>
          <Body2 color={ACCENT_0}>Click to add image</Body2>
        </AddImage>
      </ScrollableList>
    </Wrapper>
  );
};

export default Home;
