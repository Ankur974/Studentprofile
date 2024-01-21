import React from "react";
// import OrderCart from "@components/Cart/OrderCartModal";
import HomePageLayout from "../../layout/client/HomePageLayout";
import CartDesktop from "@/components/Cart/CartDesktop";

const Cart = () => {
  return (
    <HomePageLayout>
      {/* <OrderCart /> */}
      <CartDesktop/>
    </HomePageLayout>
  );
 
};

export default Cart;
