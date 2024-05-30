import React from "react";

import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { Display, H5 } from "@common/ui/Headings";

const Navbar = styled(FlexBox)`
  width: 100%;
  height: 90px;
  background-color: fff;
  justify-content: center;
  align-items: center;
`;
const InsideNavbar = styled(FlexBox)`
  width: 85%;
  height: 90px;
  justify-content: space-between;
  align-items: center;
`;
const Image = styled.img`
  width: 80px;
  height: 68px;
`;
const index = () => {
  return (
    <Navbar>
      <InsideNavbar>
        <Image src="assets/nav_logo.png"></Image>
        <FlexBox columnGap="2rem">
          <H5>MakeMyWeb.</H5>
          <H5>Home</H5>
          <H5>Company</H5>
          <H5>Blogs</H5>
        </FlexBox>
      </InsideNavbar>
    </Navbar>
  );
};

export default index;
