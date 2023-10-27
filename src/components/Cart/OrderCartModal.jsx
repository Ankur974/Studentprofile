import React, { useState } from "react";
import styled from "styled-components";
import { H2, Body2, Body1 } from "../common/ui/Headings";
import CartModal from "./CartCustomModal";
import FlexBox from "../common/ui/FlexBox";
import {
  ACCENT_300,
  ACCENT_600,
  PRIMARY_800,
  PRIMARY_900,
} from "../common/ui/colors";
import { Button } from "../common/ui/Buttons";
import { QuantityButton } from "../common/QuantityButton";

const Wrapper = styled(FlexBox)`
  padding: 2rem 1.5rem;
  row-gap: 1rem;
`;

const ItemsContainer = styled(FlexBox)`
  row-gap: 0.2rem;
  border-top: 1px solid ${ACCENT_300};
  border-bottom: 1px dashed ${ACCENT_300};
  padding: 1rem 0 0.5rem 0;
`;

const SingleItemContainer = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
`;

const PriceIndicator = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const HelperBox = styled(FlexBox)`
  inline-size: 80%;
`;

const OrderCart = () => {
  const [cartdata, setCartData] = useState([
    { id: 1, title: "Shoulder length haircut", price: 500, quantity: 1 },
    { id: 2, title: "Shoulder length haircut", price: 600, quantity: 1 },
    { id: 3, title: "Nail cutting", price: 300, quantity: 1 },
  ]);

  const handleIncrease = productId => {
    setCartData(prevCartData =>
      prevCartData.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = productId => {
    setCartData(prevCartData =>
      prevCartData.map(item =>
        item.id === productId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalAmount = cartdata.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartModal>
      <Wrapper column>
        <FlexBox column>
          <H2 color={PRIMARY_800} bold>
            My Cart
          </H2>
          <Body2 bold>Total Time: 1 hours 15 min</Body2>
          <Body2 color={ACCENT_600}>Gigi's</Body2>
        </FlexBox>
        <ItemsContainer column>
          {cartdata.map(item =>
            item.quantity ? (
              <SingleItemContainer key={item.id}>
                <FlexBox column>
                  <Body2>{item.title}</Body2>
                  <Body2 bold>{item.quantity * item.price}</Body2>
                </FlexBox>
                <QuantityButton
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                  item={item}
                ></QuantityButton>
              </SingleItemContainer>
            ) : null
          )}
        </ItemsContainer>
        <FlexBox column rowGap="0.5rem">
          <PriceIndicator row>
            <Body1 bold>Total Amount</Body1>
            <Body1 bold>₹{totalAmount}</Body1>
          </PriceIndicator>
          <HelperBox>
            <Body2 color={ACCENT_600} lineHeight="1">
              Please pay the amount to the Salon to book your appointment.
            </Body2>
          </HelperBox>
        </FlexBox>
        <FlexBox justify="center">
          <Button rowGap="1rem" color={PRIMARY_900}>
            Book Appointment
          </Button>
        </FlexBox>
      </Wrapper>
    </CartModal>
  );
};

export default OrderCart;
