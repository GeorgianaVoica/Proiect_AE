import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import globalSlice from "./slices/globalSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    global: globalSlice,
  },
});

export default store;
