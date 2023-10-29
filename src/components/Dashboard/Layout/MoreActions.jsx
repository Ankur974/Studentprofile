import { useRouter } from "next/router";
import { useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";
import { BooleanParam, useQueryParams } from "use-query-params";

import DropdownWrapper from "@common/Dashboard/DropdownWrapper";
import { Body2 } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";
import { DAVYS_GREY_200, DAVYS_GREY_800, PRIMARY_800 } from "@common/ui/colors";
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
    color: var(--accent-500);
    transition: color 250ms ease-in-out;
  }

  :hover {
    background-color: ${DAVYS_GREY_200};

    svg {
      color: ${DAVYS_GREY_800};
    }
  }
`;

const MoreActions = ({ toggleDropdown = () => {} }) => {
  const router = useRouter();
  const containerRef = useRef(null);

  useOutsideAlert(containerRef, toggleDropdown, "header-actions");

  // eslint-disable-next-line no-unused-vars
  const [_, setQueryParams] = useQueryParams({
    showEmergencySosModal: BooleanParam,
    showPreferencesModal: BooleanParam,
  });

  const handleClick = (id, link) => {
    if (link) {
      router.push(link);
    } else {
      if (id === "emergency-sos") {
        setQueryParams(
          {
            showEmergencySosModal: 1,
          },
          "replaceIn"
        );
      }
      if (id === "preferences-permissions")
        setQueryParams({ showPreferencesModal: 1 });
    }
  };

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownWrapper>
        <FlexBox column>
          {moreActions?.map(({ id, label, link }, index) => (
            <DropdownOption key={index} onClick={() => handleClick(id, link)}>
              <Body2 bold color={index === 0 ? PRIMARY_800 : DAVYS_GREY_800}>
                {label}
              </Body2>
              <FiChevronRight size="1.5rem" color={DAVYS_GREY_800} />
            </DropdownOption>
          ))}
        </FlexBox>
      </DropdownWrapper>
    </DropdownContainer>
  );
};

export default MoreActions;
