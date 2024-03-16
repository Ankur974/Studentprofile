import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PiShoppingCartThin } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi";

import FlexBox from "@common/ui/FlexBox";
import styled from "styled-components";
import { PRIMARY_900, ACCENT_0, CART_NUMBER } from "@common/ui/colors";
import CartModal from "./CartCustomModal";
import CartDesktop from "../ShopDetailPage/CartDesktop";

const Wrapper = styled(FlexBox)`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 1;
`;

const IconContainer = styled(FlexBox)`
  background-color: ${PRIMARY_900};
  width: fit-content;
  padding: 1rem;
  color: ${ACCENT_0};
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: background-color 0.5s ease-in-out;
`;

const ItemsCounterBox = styled(FlexBox)`
  position: absolute;
  top: -10%;
  right: -10%;
  background-color: ${CART_NUMBER};
  padding: 10%;
  border-radius: 50%;
  cursor: auto;
  font-size: small;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
`;

const Close = styled(FlexBox)`
  z-index: 1;
`;
const FloatingCart = () => {
  const totalItems = useSelector(state => state?.cart?.cartItems?.length);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartIconClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!totalItems) return null;
  return (
    <Wrapper>
      {isModalOpen && (
        <IconContainer>
          <Close onClick={handleCartIconClick}>
            <TfiClose />
          </Close>
          <CartModal>
            <CartDesktop />
          </CartModal>
        </IconContainer>
      )}
      {!isModalOpen && (
        <IconContainer>
          <PiShoppingCartThin onClick={handleCartIconClick} />
          <ItemsCounterBox>{totalItems}</ItemsCounterBox>
        </IconContainer>
      )}
    </Wrapper>
  );
};

export default FloatingCart;
