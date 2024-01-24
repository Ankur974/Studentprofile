import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import CartDesktop from "./CartDesktop";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items:center;
`;

const Cart = () => {
  return (
    <Wrapper>
      <CartDesktop />
    </Wrapper>
  );
};

export default Cart;
