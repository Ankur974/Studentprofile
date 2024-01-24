import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import CartDesktop from "./CartDesktop";
import PromotionalOfferContainer from "./PromotionalOfferContainer";
import PromiseContainer from "./PromiseContainer";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  overflow-x: scroll;
  width: 100%;
  position: sticky;
  top: 4rem;
  background-color: white;
  z-index: 1;
  row-gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  overflow-y: auto;
`;

const Cart = () => {
  return (
    <Wrapper>
      <CartDesktop />
      <PromotionalOfferContainer/>
      <PromiseContainer/>
    </Wrapper>
  );
};

export default Cart;
