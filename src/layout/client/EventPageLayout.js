import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
// import { IoIosArrowBack } from "react-icons/io";

const Logo = styled.img`
  width: 100%;
  cursor: pointer;

`;

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
`;

const EventPageLayout = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Logo
          isStatic
          height={36}
          draggable={false}
          src="/assets/images/pamprazzi-logo.svg"
          alt="pamprazzi Logo"
        />
        {children}
      </Wrapper>
    </>
  );
};

export default EventPageLayout;
