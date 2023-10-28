import { useState } from "react";
import Bugsnag from "@bugsnag/js";
import styled, { css } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FlexBox } from "@common/FlexBox";
import { H3 } from "@common/Headings";
import {
  SECONDARY_700,
  ACCENT_300,
  ACCENT_700,
  ACCENT_800,
  DAVYS_GRAY_400,
} from "@constants/colors";

const NavArrow = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid ${DAVYS_GRAY_400};
`;

const Header = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;

  svg {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    border: none;
    border-radius: 0.75rem;

    svg {
      padding: 2px;
      display: block;
      border-radius: 50%;
      color: ${ACCENT_700};
      box-sizing: content-box;
      background-color: ${ACCENT_300};
    }
  }
`;

const Dots = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  background-color: ${ACCENT_800};
  border-radius: 2rem;

  ${({ isActive }) =>
    isActive &&
    css`
      width: 1rem;
    `}
`;

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid ${DAVYS_GRAY_400};
  flex: 1;
`;

const Slider = ({ list = [], title, children, setActiveIndex, icon }) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleForward = () => {
    try {
      if (activeItem === list?.length - 1) {
        setActiveItem(0);
        setActiveIndex(0);
      } else {
        setActiveItem(prev => prev + 1);
        setActiveIndex(prev => prev + 1);
      }
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  const handleBackward = () => {
    try {
      if (activeItem === 0) {
        setActiveItem(list?.length - 1);
        setActiveIndex(list?.length - 1);
      } else {
        setActiveItem(prev => prev - 1);
        setActiveIndex(prev => prev - 1);
      }
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  if (!list?.length) return null;

  return (
    <FlexBox column rowGap="1rem">
      {!!list?.length && (
        <FlexBox justify="space-between" align="center" columnGap="0.5rem">
          <Header>
            <FlexBox align="center" columnGap="0.75rem">
              <img alt="FAQs" draggable={false} src={icon} />
              <H3 bold>{title}</H3>
            </FlexBox>
          </Header>
          <Divider />
          {list?.length > 1 && (
            <FlexBox align="center" columnGap="0.5rem">
              <NavArrow onClick={handleBackward}>
                <FaChevronLeft size="0.75rem" color={SECONDARY_700} />
              </NavArrow>
              {list?.map((val, index) => (
                <Dots key={index} isActive={index === activeItem} />
              ))}
              <NavArrow onClick={handleForward}>
                <FaChevronRight size="0.75rem" color={SECONDARY_700} />
              </NavArrow>
            </FlexBox>
          )}
        </FlexBox>
      )}
      {children}
    </FlexBox>
  );
};

export default Slider;
