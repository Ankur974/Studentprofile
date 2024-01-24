import React from "react";
import OrderCart from "@components/Cart/OrderCartModal";
import HomePageLayout from "../../layout/client/HomePageLayout";


const Cart = () => {
  return (
    <HomePageLayout>
      <OrderCart />
    </HomePageLayout>
  );
 
};

export default Cart;
