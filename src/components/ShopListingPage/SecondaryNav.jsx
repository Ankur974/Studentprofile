import React from "react";
import { useQueryParam, StringParams } from "use-query-params";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Body1 } from "@common/ui/Headings";
import { ACCENT_800, PRIMARY_400 } from "@common/ui/colors";
import { device } from "@common/ui/Responsive";

const NavContainer = styled(FlexBox)`
  padding: 1rem;
  width: 100%;
  background-color: ${PRIMARY_400};
`;

const ButtonsWrapper = styled(FlexBox)`
  width: 100%;
  max-width: 73rem;
  padding: 0 2rem;
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
`;

const Navbar = ({ navItem }) => {
  const [, setCategory] = useQueryParam("cat", StringParams);
  return (
    <NavContainer>
      <ButtonsWrapper>
        {navItem.map(item => (
          <FlexBox key={item?.slug}>
            <NavItem
              whiteSpace="nowrap"
              cursor="pointer"
              onClick={() => {
                setCategory(item?.slug);
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
