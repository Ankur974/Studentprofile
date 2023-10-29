import { useRouter } from "next/router";
import { useRef } from "react";
import { FiChevronRight, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BooleanParam, useQueryParams } from "use-query-params";

import { Body2, H3 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_300,
  ACCENT_700,
  ACCENT_800,
  PRIMARY_800,
  WHITE,
} from "@common/ui/colors";
import useOutsideAlert from "@hooks/useOutsideAlert";
import { moreActions, profileOptions } from "./allOptions";

const Wrapper = styled(FlexBox)`
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 99;
  background: ${WHITE};
  animation: fade-in 0.3s ease-in;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateX(-1.5rem);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ProviderImage = styled.img`
  min-width: 3.5rem;
  max-width: 3.5rem;
  cursor: pointer;
  min-height: 3.5rem;
  max-height: 3.5rem;
  overflow: hidden;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid ${ACCENT_800};
`;

const CloseIcon = styled.div`
  padding: 2rem;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${ACCENT_300};
`;

const Arrow = styled(FlexBox)`
  height: fit-content;
  width: fit-content;
  padding: 0.5rem;
  align-items: center;
`;

const MenuOptions = styled(FlexBox)`
  div:last-child {
    border-bottom: none;
  }
`;

const OptionItem = styled(FlexBox)`
  border-bottom: 1px solid ${ACCENT_300};
`;

const MobileMenu = ({ toggleMobileMenu }) => {
  const user = useSelector(state => state.auth?.user);
  const containerRef = useRef(null);
  const router = useRouter();

  useOutsideAlert(containerRef, toggleMobileMenu, "mobile-menu");

  // eslint-disable-next-line no-unused-vars
  const [_, setQueryParams] = useQueryParams({
    showEmergencySosModal: BooleanParam,
  });

  const handleClick = (label, link) => {
    if (link) {
      router.push(link);
    } else {
      if (label === "Emergency SOS") {
        setQueryParams(
          {
            showEmergencySosModal: 1,
          },
          "replaceIn"
        );
      }
    }
  };

  return (
    <Wrapper column ref={containerRef}>
      <FlexBox justify="space-between">
        <FlexBox column rowGap="1rem" padding="1.5rem">
          <ProviderImage
            alt="User Image"
            draggable="false"
            src={"https:" + user?.image}
            onClick={toggleMobileMenu}
          />
          <H3 bold>Hi, Varsha</H3>
          <Body2 color={ACCENT_700}>Started on 18 Jun 2020</Body2>
        </FlexBox>
        <CloseIcon>
          <FiX
            onClick={toggleMobileMenu}
            size="1rem"
            cursor="pointer"
            className="close-icon"
            strokeWidth={3}
            color={ACCENT_800}
          />
        </CloseIcon>
      </FlexBox>
      <Divider />
      <MenuOptions column>
        {profileOptions.map(({ label, link }, index) => (
          <OptionItem
            padding="1rem 1.5rem"
            align="center"
            justify="space-between"
            key={index}
            onClick={() => handleClick(label, link)}
          >
            <Body2 bold>{label}</Body2>
            <Arrow>
              <FiChevronRight
                size="1rem"
                cursor="pointer"
                className="close-icon"
                strokeWidth={3}
                color={ACCENT_800}
              />
            </Arrow>
          </OptionItem>
        ))}
        {moreActions.map(({ label, link }, index) => (
          <OptionItem
            padding="1rem 1.5rem"
            align="center"
            justify="space-between"
            key={index}
            onClick={() => handleClick(label, link)}
          >
            <Body2 color={index === 0 ? PRIMARY_800 : ACCENT_800} bold>
              {label}
            </Body2>
            <Arrow>
              <FiChevronRight
                size="1rem"
                cursor="pointer"
                className="close-icon"
                strokeWidth={3}
                color={ACCENT_800}
              />
            </Arrow>
          </OptionItem>
        ))}
      </MenuOptions>
    </Wrapper>
  );
};

export default MobileMenu;
