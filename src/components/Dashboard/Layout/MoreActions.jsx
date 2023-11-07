import { useRouter } from "next/router";
import { useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

import DropdownWrapper from "@common/Dashboard/DropdownWrapper";
import { Body2 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_200,
  ACCENT_500,
  ACCENT_800,
  PRIMARY_800,
} from "@common/ui/colors";
import useOutsideAlert from "@hooks/useOutsideAlert";
import { moreActions } from "./allOptions";

const DropdownContainer = styled(FlexBox)`
  right: 1rem;
  top: 4.5rem;
  width: 22.5rem;
  position: absolute;
`;

const DropdownOption = styled(FlexBox)`
  padding: 1rem;
  cursor: pointer;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  transition: background-color 250ms ease-in-out;

  svg {
    color: ${ACCENT_500};
    transition: color 250ms ease-in-out;
  }

  :hover {
    background-color: ${ACCENT_200};
    svg {
      color: ${ACCENT_800};
    }
  }
`;

const MoreActions = ({ toggleDropdown = () => {} }) => {
  const router = useRouter();
  const containerRef = useRef(null);

  useOutsideAlert(containerRef, toggleDropdown, "header-actions");

  const handleClick = (id, link) => {
    if (!link) return;
    router.push(link);
  };

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownWrapper>
        <FlexBox column>
          {moreActions?.map(({ id, label, link }, index) => (
            <DropdownOption key={index} onClick={() => handleClick(id, link)}>
              <Body2 bold color={index === 0 ? PRIMARY_800 : ACCENT_800}>
                {label}
              </Body2>
              <FiChevronRight size="1.5rem" color={ACCENT_800} />
            </DropdownOption>
          ))}
        </FlexBox>
      </DropdownWrapper>
    </DropdownContainer>
  );
};

export default MoreActions;
