import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Body2 } from "../../components/common/ui/Headings";
import FlexBox from "../../components/common/ui/FlexBox";
import { ServiceCard } from "./ServiceCard";
import { PRIMARY_800 } from "../../components/common/ui/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
`;

const Catogories = styled(FlexBox)`
  column-gap: 1rem;
  overflow-x: scroll;
  width: 100%;
  max-width: 50rem;
  margin: auto;
`;

const CatogoryBanner = styled(FlexBox)`
  background-color: #eeebf1;
  padding: 1rem;
  justify-content: space-around;
`;

const OfferBox = styled(FlexBox)`
  background-color: ${PRIMARY_800};
  border-radius: 1.25rem;
`;

const ServicesWrapper = styled(FlexBox)`
  width: 100%;
  max-width: 50rem;
  margin: auto;
  gap: 1rem;
`;

const CategoryTile = styled(FlexBox)`
  flex-direction: column;
  align-items: center;

  ${({ active }) =>
    active &&
    css`
      border: 1px solid ${PRIMARY_800};
    `}
`;

const Services = () => {
  const [clicked, setClicked] = useState(false);
  const catogories = [
    {
      id: 1,
      pathdark: "/assets/dark-catogories-avatar.svg",
      active: true,
      bannerimg: "/assets/haircut.svg",
      bannerdesc: "Get a glowing skin!",
      offerDesc: "Earn 5 care coins on each appointment",
      name: "Haircut",
      pathlight: "/assets/dark-catogories.svg",
      services: [
        {
          id: 1,
          label: "Shoulder Length Hair Cut",
          desc: "This is a description that talks about the details of the service.",
          time: 45,
          ratings: 4,
          reviews: 198,
          prize: 500,
        },
        {
          id: 2,
          label: "Layered Haircut",
          desc: "This is a description that talks about the details of the service.",
          time: 45,
          ratings: 4,
          reviews: 198,
          prize: 500,
        },
        {
          id: 3,
          label: "Hair Styling",
          desc: "This is a description that talks about the details of the service.",
          time: 45,
          ratings: 4,
          reviews: 198,
          prize: 500,
        },
      ],
    },
    {
      id: 2,
      pathdark: "/assets/dark-catogories-avatar.svg",
      active: false,
      name: "Facial",
      bannerdesc: "Get glowing skin!",
      offerDesc: "Earn 5 care coins on each appointment",
      bannerimg: "/assets/makeup.svg",
      pathlight: "/assets/light-catogories-avatar.svg",
      services: [
        {
          id: 1,
          label: "Basic Facial",
          desc: "This is a description that talks about the details of the service.",
          time: 60,
          ratings: 4.5,
          reviews: 220,
          prize: 800,
        },
      ],
    },
    {
      id: 3,
      pathdark: "/assets/dark-catogories-avatar.svg",
      active: false,
      bannerimg: "/assets/others.svg",
      bannerdesc: "Get a glowing skin!",
      offerDesc: "Earn 5 care coins on each appointment",
      name: "Others",
      pathlight: "/assets/light-catogories-avatar.svg",
      services: [
        {
          id: 1,
          label: "Manicure",
          desc: "This is a description that talks about the details of the service.",
          time: 30,
          ratings: 4.2,
          reviews: 150,
          prize: 400,
        },
      ],
    },
  ];

  return (
    <Wrapper rowGap="10px" column>
      <Catogories>
        {catogories.map(item => (
          <CategoryTile key={item.id}>
            {item.active ? (
              <img src={item.pathdark} width="80px" height="80px" />
            ) : (
              <img src={item.pathlight} width="100px" height="100px" />
            )}
            <Body2>{item.label}</Body2>
          </CategoryTile>
        ))}
      </Catogories>
      <ServicesWrapper column>
        {catogories?.map(category => {
          return (
            <>
              <CatogoryBanner>
                <img src={category?.bannerimg} />
                <FlexBox column align="center">
                  <Body2>{category?.bannerdesc}</Body2>
                  <OfferBox>
                    <Body2>{category?.offerDesc}</Body2>
                  </OfferBox>
                </FlexBox>
              </CatogoryBanner>
              {category?.services?.map(item => (
                <ServiceCard key={item.id} clicked={clicked} item={item} />
              ))}
            </>
          );
        })}
      </ServicesWrapper>
    </Wrapper>
  );
};
export default Services;
