import React, { useRef, useState } from "react";
import styled from "styled-components";

import Dropdown from "@common/ui/Dropdown";
import Input from "@common/ui/Input";
import { Body2 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import TextArea from "@common/ui/TextArea";

const cancellationReasons = [
  "--Not Selected--",
  "I am not feeling well",
  "I have another commitment",
  "I forgot about the session",
  "I am not in the right headspace",
  "I don't have privacy",
  "I am facing connectivity issues",
  "It's something else",
];

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
`;

const ReasonSelector = ({
  cancellationReasonText,
  setCancellationReasonText,
  reasonValue,
  setReasonValue,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  const options = reasons =>
    reasons.map(o => ({ value: o.toLowerCase(), label: o }));

  return (
    <>
      <FlexBox column rowGap="0.5rem" width="100%">
        <Body2 bold>Reason for changes*</Body2>
        <SelectWrapper ref={dropdownRef} onClick={toggleDropdown}>
          <Input value={reasonValue?.value} />
          {showDropdown && (
            <Dropdown
              isSingleSelect
              applyOption={value => setReasonValue(value)}
              options={options(cancellationReasons)}
              closeDropdown={toggleDropdown}
              parentRef={dropdownRef}
              isOpen={showDropdown}
              setIsOpen={toggleDropdown}
              selectedOption={reasonValue}
              size="large"
              width="100%"
              top="3.5rem"
              maxHeight="17rem"
            />
          )}
        </SelectWrapper>
      </FlexBox>
      <TextArea
        placeholder="Help us understand (optional)"
        value={cancellationReasonText}
        onChange={e => setCancellationReasonText(e.target.value)}
      />
    </>
  );
};

export default ReasonSelector;
