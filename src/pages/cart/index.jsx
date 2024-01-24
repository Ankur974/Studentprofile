import React from "react";
// import OrderCart from "@components/Cart/OrderCartModal";
import PromotionalOfferContainer from "../../components/Cart/PromotionalOfferContainer";
import PromiseContainer from "../../components/Cart/PromiseContainer";
import SelectStylist from "../../components/Booking/SelectStylist";

const Cart = () => {
  return(
  <> 
  <PromotionalOfferContainer />
  <PromiseContainer/>
  <SelectStylist/>
</>
);
};

export default Cart;
