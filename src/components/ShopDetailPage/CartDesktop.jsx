import React from "react";
import { MdDeleteForever } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { H2, Body2, Body1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_300,
  ACCENT_600,
  PRIMARY_800,
  PRIMARY_900,
  SECONDARY_200,
} from "@common/ui/colors";
import { Button } from "@common/ui/Buttons";
import NullStateCart from "./NullStateCart";
import { deleteItemFromCart } from "@redux/slices/cartSlice";

const Wrapper = styled(FlexBox)`
  padding: 1.5rem;
  row-gap: 1rem;
  border: 1px solid ${SECONDARY_200};
  transition: opacity 0.3s ease-in-out;
  border-radius: 0.5rem;
  min-height: 5rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const ItemsContainer = styled(FlexBox)`
  row-gap: 0.2rem;
  border-top: 1px solid ${ACCENT_300};
  border-bottom: 1px dashed ${ACCENT_300};
  padding: 1rem 0 0.5rem 0;
  max-height:15rem;
  overflow:auto;
`;

const SingleItemContainer = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  opacity: ${({ removed }) => (removed ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;
`;

const HelperBox = styled(FlexBox)`
  inline-size: 80%;
`;

const NullContainer = styled(FlexBox)`
  transition: opacity 0.3s ease-in-out;
`;

const CartDesktop = () => {
  const cartdata = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleDelete = productId => {
    dispatch(deleteItemFromCart(productId));
  };

  const totalAmount = cartdata.reduce((total, item) => total + item.price, 0);

  const totalItem = cartdata.length;

  if (!totalItem) {
    return (
      <NullContainer>
        <NullStateCart totalItem={totalItem} />
      </NullContainer>
    );
  }

  return (
    <Wrapper column>
        <FlexBox column>
          <H2 color={PRIMARY_800} bold>
            My Cart
          </H2>
          <Body2 bold>Total Time: 1 hours 15 min</Body2>
          <Body2 color={ACCENT_600}>Gigis</Body2>
        </FlexBox>

        <ItemsContainer column>
          {cartdata.map(item => (
            <SingleItemContainer key={item.id}>
              <FlexBox column>
                <Body2>{item.name}</Body2>
                <Body2 bold>{item.price}</Body2>
              </FlexBox>
              <MdDeleteForever
                color="red"
                size="1.5rem"
                cursor="pointer"
                onClick={() => handleDelete(item.id)}
              />
            </SingleItemContainer>
          ))}
        </ItemsContainer>
        <FlexBox column rowGap="0.5rem">
          <FlexBox row>
            <Body1 bold>Total Amount</Body1>
            <Body1 bold>₹ {totalAmount}</Body1>
          </FlexBox>
          <HelperBox>
            <Body2 color={ACCENT_600} lineHeight="1">
              Please pay the amount to the Salon to book your appointment.
            </Body2>
          </HelperBox>
        </FlexBox>
        <FlexBox justify="center" margin="1rem 0 0 ">
          <Button rowGap="1rem" color={PRIMARY_900}>
            Book Appointment
          </Button>
        </FlexBox>
    </Wrapper>
  );
};

export default CartDesktop;
