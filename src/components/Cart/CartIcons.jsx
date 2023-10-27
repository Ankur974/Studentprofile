import React, { useState } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi";

import FlexBox from "../common/ui/FlexBox";
import styled from "styled-components";
import { PRIMARY_900, ACCENT_0, CART_NUMBER } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
`;

const IconContainer = styled(FlexBox)`
  background-color: ${PRIMARY_900};
  width: fit-content;
  padding: 1rem;
  color: ${ACCENT_0};
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: background-color 0.5s ease-in-out;
`;

const ItemsCounterBox = styled(FlexBox)`
  position: absolute;
  top: -20%;
  right: -5%;
  background-color: ${CART_NUMBER};
  padding: 10%;
  border-radius: 50%;
  cursor: auto;
`;

const CartIcons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(7);

  const handleCartIconClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Wrapper column>
      {cartItemCount ? (
        <IconContainer onClick={handleCartIconClick}>
          {!isModalOpen && <ItemsCounterBox>{cartItemCount}</ItemsCounterBox>}
          {!isModalOpen ? (
            <PiShoppingCartThin
              size="1.5rem"
              style={{ transition: "opacity 0.5s ease-in-out" }}
            />
          ) : (
            <TfiClose
              size="1.5rem"
              style={{ transition: "opacity 0.5s ease-in-out" }}
            />
          )}
        </IconContainer>
      ) : null}
    </Wrapper>
  );
};

export default CartIcons;
