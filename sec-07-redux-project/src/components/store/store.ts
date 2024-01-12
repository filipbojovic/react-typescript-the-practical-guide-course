import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart-slice.ts";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// with ReturnType (introduced in typeScript) we get the return value of a function
// here getState is a function and we want to extract the return type of that function
export type RootState = ReturnType<typeof store.getState>;

// it describes which kind of data will be envoled with dispatching
export type AppDispatch = typeof store.dispatch;
