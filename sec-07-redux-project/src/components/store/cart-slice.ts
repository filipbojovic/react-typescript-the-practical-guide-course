import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // use PayloadAction whenever we are dealing with an action which carries a payload
    addToCart(state, action: PayloadAction<{ id: string; title: string; price: number }>) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        // with redux we are allowed to directly mutate the state, which is not allowed when
        // useReducer hook is being used
        state.items[itemIndex].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      // the whole payload is now an id
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);

      if (state.items[itemIndex].quantity === 1) {
        // remove the item
        state.items.splice(itemIndex, 1);
      } else {
        state.items[itemIndex].quantity--;
      }
    },
  },
});

// these actions won't directly call addtocart and removeFromCart methods, but it will
// tell the redux to do it
export const { addToCart, removeFromCart } = cartSlice.actions;
