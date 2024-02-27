import React from "react";
import FlexBox from "../common/ui/FlexBox";
import { Body1 } from "../common/ui/Headings";
import { ACCENT_800, PRIMARY_400 } from "../common/ui/colors";
import styled from "styled-components";
import { device } from "../common/ui/Resposive";

const NavContainer = styled(FlexBox)`
  padding: 1rem;
  width: 100%;
  background-color: ${PRIMARY_400};
`;

const ButtonsWrapper = styled(FlexBox)`
  width: 100%;
  max-width: 73rem;
  padding:0 2rem;
  margin: auto;
  overflow-x: auto;
  align-items: center;
  gap: 1rem;

  @media ${device.laptop} {
    justify-content: space-between;
  }
`;

const NavItem = styled(Body1)`
  color: ${ACCENT_800};
  // transition: all 0.3s ease-in-out;


  &:hover {
    transform: scale(1.1);
  }
`;

const Navbar = ({ navitem }) => {
  return (
    <NavContainer>
      <ButtonsWrapper>
        {navitem.map(item => (
          <FlexBox key={item?.slug}>
            <NavItem
              whiteSpace="nowrap"
              cursor="pointer"
              onClick={() => {
                null;
              }}
            >
              {item.title}
            </NavItem>
          </FlexBox>
        ))}
      </ButtonsWrapper>
    </NavContainer>
  );
};

export default Navbar;
