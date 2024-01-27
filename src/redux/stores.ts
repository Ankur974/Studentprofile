import { configureStore } from "@reduxjs/toolkit";
import authInfoslice from "./slices/dummy";

export const store = configureStore({
  devTools: true,
  reducer: {
    authInfo: authInfoslice,
  },
});
