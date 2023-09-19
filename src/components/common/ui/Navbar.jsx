import React from "react";
import FlexBox from "./FlexBox";
import { H2, H3 } from "./Headings";
import { PRIMARY_400 } from "./colors";
import styled from "styled-components";

const NavContainer = styled(FlexBox)`
  background-color: ${PRIMARY_400};
  justify-content: space-evenly;
  ${'' /* height:6rem; */}
  padding: 0.4rem 8rem;
  align-items: center;
  margin: auto;
  overflow-x: scroll;
  width:100% 
`;

const Navbar = ({ navitem }) => {
  return (
    <NavContainer>
      {navitem.map(item => (
        <FlexBox width="fit-content">
          <H3
            cursor="pointer"
            onClick={() => {
              alert("subnavbar clicked");
            }}
          >
            {item.title}
          </H3>
        </FlexBox>
      ))}
    </NavContainer>
  );
};

export default Navbar;
