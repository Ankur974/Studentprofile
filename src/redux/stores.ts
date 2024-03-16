import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import cartSlice from "./slices/cartSlice";
import authslice from "./slices/auth";

const persistConfig = {
  key: "pamperant",
  storage,
  //   whitelist: ["disclaimer", "package", "appConfig"],
};

const rootReducer = combineReducers({
  auth: authslice,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
