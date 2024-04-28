import { useState } from "react";
import styled, { css } from "styled-components";
import { FiX } from "react-icons/fi";
import { isEqual } from "lodash";

import Modal from "@common/ui/Modal";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_400,
  ACCENT_800,
  PRIMARY_800,
  SECONDARY_100,
  SECONDARY_800,
} from "@common/ui/colors";
import { Button } from "@common/ui/Buttons";
import { Body2, H3 } from "@common/ui/Headings";
import { RadioSection } from "./RadioSection";
import { CheckboxSection } from "./CheckboxSection";
import { filterMeta } from "@metadata/ListingPage";
import { device } from "../../common/ui/Responsive";

const Wrapper = styled(FlexBox)`
  height: 100%;
`;

const Left = styled(FlexBox)`
  width: 100%;
  max-width: 8.5rem;
  border-right: 1px solid ${ACCENT_400};

  @media ${device.laptop} {
    max-width: 12rem;
  }
`;

const CardWrapper = styled(FlexBox)`
  padding: 1rem 1.5rem;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;

  ${({ active }) =>
    active &&
    css`
      background-color: ${SECONDARY_100};
    `}
`;

const Body = styled(FlexBox)`
  border-block: 1px solid ${ACCENT_400};
  flex: 1;
`;

const Right = styled(FlexBox)`
  width: 100%;
`;

const IconWrapper = styled(FlexBox)`
  height: 1.5rem;
  width: 1.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ActiveDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${PRIMARY_800};
  border-radius: 2rem;
`;

const renderSection = (
  section,
  filterSelection,
  handleRadioChange,
  handleCheckboxChange
) => {
  const SectionComponent =
    section.type === "checkbox" ? CheckboxSection : RadioSection;

  return (
    <SectionComponent
      options={section.options}
      title={section.title}
      selectedOption={filterSelection[section.slug]}
      selectedOptions={filterSelection[section.slug]}
      onChange={
        section.type === "checkbox"
          ? option => handleCheckboxChange(option, section.slug)
          : option => handleRadioChange(option, section.slug)
      }
    />
  );
};

const AdvancedFilter = ({
  advancedFilterSelection,
  setAdvancedFilterSelection,
  initialState,
  togglePopup,
}) => {
  const [filterSelection, setFilterSelection] = useState(
    advancedFilterSelection
  );
  const [activeSection, setActiveSection] = useState(filterMeta[0].slug);

  const handleRadioChange = (option, section) => {
    setFilterSelection(prevFilterSelection => ({
      ...prevFilterSelection,
      [section]: prevFilterSelection[section] === option ? "" : option,
    }));
  };

  const handleCheckboxChange = (option, section) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const updatedOptions = [...filterSelection?.[section]];
    const index = updatedOptions.indexOf(option);

    if (index !== -1) {
      updatedOptions.splice(index, 1);
    } else {
      updatedOptions.push(option);
    }

    const data = {
      ...filterSelection,
    };
    data[section] = updatedOptions;
    setFilterSelection(data);
  };

  const handleClearAll = () => {
    setFilterSelection(initialState);
    setAdvancedFilterSelection(initialState);
  };

  return (
    <Modal M1 borderRadius="1rem" togglePopup={togglePopup}>
      <Wrapper column>
        <FlexBox padding="1rem 1.5rem" align="center" justify="space-between">
          <H3 bold>Filters</H3>
          <IconWrapper>
            <FiX strokeWidth={2} onClick={togglePopup} />
          </IconWrapper>
        </FlexBox>
        <Body>
          <Left column>
            {filterMeta.map(section => (
              <CardWrapper
                key={section?.slug}
                active={activeSection === section.slug}
                onClick={() => setActiveSection(section.slug)}
              >
                <Body2
                  color={
                    activeSection === section.slug ? SECONDARY_800 : ACCENT_800
                  }
                >
                  {section.title}
                </Body2>
                {((section?.type === "checkbox" &&
                  filterSelection?.[section?.slug]?.length !== 0) ||
                  (section?.type === "radio" &&
                    !!filterSelection?.[section?.slug])) && <ActiveDot />}
              </CardWrapper>
            ))}
          </Left>
          <Right>
            {renderSection(
              filterMeta.find(s => s.slug === activeSection),
              filterSelection,
              handleRadioChange,
              handleCheckboxChange
            )}
          </Right>
        </Body>
        <FlexBox padding="1rem 1.5rem" align="center" justify="space-between">
          <Button
            primary
            outline
            onClick={handleClearAll}
            disabled={isEqual(filterSelection, initialState)}
          >
            CLEAR ALL
          </Button>
          <Button
            onClick={() => {
              setAdvancedFilterSelection(filterSelection);
              togglePopup();
            }}
          >
            APPLY FILTER
          </Button>
        </FlexBox>
      </Wrapper>
    </Modal>
  );
};

export default AdvancedFilter;
