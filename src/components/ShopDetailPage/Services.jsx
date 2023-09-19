import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Body2 } from "../common/ui/Headings";
import FlexBox from "../common/ui/FlexBox";
import { ServiceCard } from "./ServiceCard";
import { PRIMARY_800 } from "../common/ui/colors";
import { useQueryParam, StringParam } from "use-query-params";

const Wrapper = styled(FlexBox)`
  width: 100%;
`;

const Categories = styled(FlexBox)`
  column-gap: 1rem;
  overflow-x: scroll;
  width: 100%;
  max-width: 50rem;
  margin: auto;

  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const CategoryTile = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    width: ${props => (props.active ? "80px" : "100px")};
    height: ${props => (props.active ? "80px" : "100px")};
  }
`;

const CategoryBanner = styled(FlexBox)`
  background-color: #eeebf1;
  padding: 1rem;
  justify-content: space-around;

  img {
    max-width: 100%;
  }
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

const Services = () => {
  const [clicked, setClicked] = useState(false);
  const [activeCategory, setActiveCategory] = useQueryParam(
    "active",
    StringParam
  );

  const categories = [
    {
      slug: "haircut",
      id: 1,
      pathdark: "/assets/dark-catogories-avatar.svg",
      active: true,
      bannerimg: "/assets/haircut.svg",
      bannerdesc: "Get a glowing skin!",
      offerDesc: "Earn 5 care coins on each appointment",
      label: "Haircut",
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
      slug: "facial",
      id: 2,
      pathdark: "/assets/dark-catogories-avatar.svg",
      active: false,
      label: "Facial",
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
      slug: "others",
      id: 3,
      pathdark: "/assets/dark-catogories-avatar.svg",
      active: false,
      bannerimg: "/assets/others.svg",
      bannerdesc: "Get a glowing skin!",
      offerDesc: "Earn 5 care coins on each appointment",
      label: "Others",
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

  useEffect(() => {
    if (activeCategory) {
      const elem = document.getElementById(activeCategory);
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <Wrapper rowGap="10px" column>
      <Categories>
        {categories.map(item => (
          <CategoryTile
            key={item.id}
            active={item.slug === activeCategory}
            onClick={() => setActiveCategory(item.slug)}
          >
            <img
              src={item.active ? item.pathdark : item.pathlight}
              alt={item.label}
            />
            <Body2>{item.label}</Body2>
          </CategoryTile>
        ))}
      </Categories>
      <ServicesWrapper column>
        {categories?.map(category => (
          <div key={category?.slug} id={category?.slug}>
            <CategoryBanner>
              <img src={category?.bannerimg} alt={category?.bannerdesc} />
              <FlexBox column align="center">
                <Body2>{category?.bannerdesc}</Body2>
                <OfferBox>
                  <Body2>{category?.offerDesc}</Body2>
                </OfferBox>
              </FlexBox>
            </CategoryBanner>
            {category?.services?.map(item => (
              <ServiceCard key={item.id} clicked={clicked} item={item} />
            ))}
          </div>
        ))}
      </ServicesWrapper>
    </Wrapper>
  );
};

export default Services;
