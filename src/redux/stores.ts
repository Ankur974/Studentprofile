import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authInfoslice from "./slices/dummy";
import cartSlice from "./slices/auth";

const rootReducer = combineReducers({
  authInfo: authInfoslice,
  cart: cartSlice,
});

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});
