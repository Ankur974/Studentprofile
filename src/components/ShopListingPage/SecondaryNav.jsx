import React from "react";
import FlexBox from "../common/ui/FlexBox";
import { Body1 } from "../common/ui/Headings";
import { ACCENT_800, PRIMARY_400, PRIMARY_800 } from "../common/ui/colors";
import styled from "styled-components";
import { device } from "../common/ui/Resposive";

const NavContainer = styled(FlexBox)`
  padding: 1rem;
  width: 100%;
  background-color: ${PRIMARY_400};
`;

const ButtonsWrapper = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
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
  transition: all 0.25s ease-in-out;

  &:hover {
    color: ${PRIMARY_800};
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
                alert("subnavbar clicked");
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
