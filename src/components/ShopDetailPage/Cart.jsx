import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import CartDesktop from "./CartDesktop";
import PromotionalOfferContainer from "./PromotionalOfferContainer";
import PromiseContainer from "./PromiseContainer";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 8rem;
  z-index: 1;
  row-gap: 1rem;
  overflow-y: auto;
  margin-bottom: 5rem;
`;

const Cart = ({ shopData }) => {
  return (
    <Wrapper>
      <CartDesktop />
      <PromotionalOfferContainer shopData = {shopData} />
      <PromiseContainer />
    </Wrapper>
  );
};

export default Cart;
