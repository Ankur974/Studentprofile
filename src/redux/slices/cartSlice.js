import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItemsInCart: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      state.cartItems.push(newItem);
      state.totalItemsInCart++; 
    },
    deleteItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      state.totalItemsInCart--;
    },
  },
});

export const { addItemToCart, deleteItemFromCart, sendTotalItemOfCart } =
  cartSlice.actions;

export default cartSlice.reducer;
