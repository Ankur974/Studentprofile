import React, { useState } from "react";
import styled from "styled-components";
import { isEqual } from "lodash";
import dynamic from "next/dynamic";

import FlexBox from "@common/ui/FlexBox";
import Filter from "@common/ui/Filter";
import Chip from "@common/ui/Chips";
import { filterMeta } from "@metadata/ListingPage";
import { PRIMARY_800 } from "@common/ui/colors";
import { device } from "@common/ui/Responsive";

const AdvancedFilter = dynamic(() => import("./AdvancedFilter"), {
  ssr: false,
});

const ActiveDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${PRIMARY_800};
  border-radius: 2rem;
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
`;

const FilterWrapper = styled(FlexBox)`
  column-gap: 0.25rem;
  align-items: center;
  overflow-x: auto;
  @media ${device.laptop} {
    column-gap: 1rem;
  }
`;

export function Filters({
  advancedFilterSelection,
  setAdvancedFilterSelection,
  getInitialState,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const toggleModal = () => setShowFilter(!showFilter);

  const handleRadioChange = (option, section) => {
    setAdvancedFilterSelection(prevFilterSelection => ({
      ...prevFilterSelection,
      [section]: prevFilterSelection[section] === option ? "" : option,
    }));
  };

  const handleCheckboxChange = (option, section) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const updatedOptions = [...advancedFilterSelection?.[section]];
    const index = updatedOptions.indexOf(option);

    if (index !== -1) {
      updatedOptions.splice(index, 1);
    } else {
      updatedOptions.push(option);
    }

    const data = {
      ...advancedFilterSelection,
    };
    data[section] = updatedOptions;
    setAdvancedFilterSelection(data);
  };

  const handleChipClick = (slug, filterSlug, type) => {
    if (type === "radio") {
      handleRadioChange(slug, filterSlug);
    } else {
      handleCheckboxChange(slug, filterSlug);
    }
  };

  const initialState = getInitialState(filterMeta);

  return (
    <FlexBox align="center" columnGap="0.5rem">
      {showFilter && (
        <AdvancedFilter
          advancedFilterSelection={advancedFilterSelection}
          setAdvancedFilterSelection={setAdvancedFilterSelection}
          initialState={getInitialState(filterMeta)}
          togglePopup={toggleModal}
        />
      )}
      <FlexBox position="relative">
        {!isEqual(advancedFilterSelection, initialState) && <ActiveDot />}
        <Filter onClick={toggleModal} />
      </FlexBox>
      <FilterWrapper>
        {filterMeta?.map(({ slug: filterSlug, type, options }) => {
          return options?.map(({ label, slug, isPopular }) => {
            if (!isPopular) return null;

            const isSelected =
              type === "radio"
                ? advancedFilterSelection?.[filterSlug] === slug
                : advancedFilterSelection?.[filterSlug]?.includes(slug);

            return (
              <Chip
                key={slug}
                selected={isSelected}
                onClick={() => handleChipClick(slug, filterSlug, type)}
              >
                {label}
              </Chip>
            );
          });
        })}
      </FilterWrapper>
    </FlexBox>
  );
}
