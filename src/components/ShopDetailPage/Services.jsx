import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useQueryParam, StringParam } from "use-query-params";

import { Body2 } from "../common/ui/Headings";
import FlexBox from "../common/ui/FlexBox";
import ServiceCard from "./ServiceCard";
import { PRIMARY_800 } from "../common/ui/colors";
import CategoryBanner from "./CategoryBanner";
import { categories } from "../../metadata/Categories";

const Wrapper = styled(FlexBox)`
  width: 100%;
`;

const Categories = styled(FlexBox)`
  padding: 1rem;
  column-gap: 1rem;
  overflow-x: scroll;
  width: 100%;
  max-width: 50rem;
  margin: auto;
  position: sticky;
  top: 3rem;
  background-color: white;
  z-index: 1;
`;

const CategoryTile = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    max-width: 6.5rem;
    aspect-ratio: 1;
    border-radius: 3rem;
    transition: all 300ms ease-in-out;

    ${({ active }) =>
      active &&
      css`
        max-width: 7rem;
        border: 1px solid ${PRIMARY_800};
      `}
  }
`;

const ServicesWrapper = styled(FlexBox)`
  width: 100%;
  max-width: 50rem;
  margin: auto;
  gap: 1rem;
`;

const Services = () => {
  const [activeCategory, setActiveCategory] = useQueryParam(
    "active",
    StringParam
  );

  useEffect(() => {
    if (activeCategory) {
      const elem = document.getElementById(activeCategory);
      
      elem?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }, [activeCategory]);

  return (
    <Wrapper rowGap="0.875rem" column columnGap="3rem">
      <Categories>
        {categories.map(item => (
          <CategoryTile
            key={item.id}
            active={item.slug === activeCategory}
            onClick={() => setActiveCategory(item.slug)}
          >
            <img src={item.pathdark} alt={item.label} />
            <Body2>{item.label}</Body2>
          </CategoryTile>
        ))}
      </Categories>
      <ServicesWrapper column>
        {categories?.map(category => (

          <div key={category?.slug} id={category?.slug} >
            {/* <div /> */}
          <CategoryBanner categoryConfig={category} />
            {category?.services?.map((item, index) => (
              <ServiceCard
                key={item?.id}
                item={item}
                lastItem={category?.services?.length === index + 1}
              />
            ))}
          </div>
        ))}
      </ServicesWrapper>
    </Wrapper>
  );
};

export default Services;
