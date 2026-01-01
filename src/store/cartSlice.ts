import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Pizza } from "../data/menu-items";
import type { RootState } from "./store";
import { formatPrice } from "../utils/price-utils";
import { persistReducer } from "redux-persist";
import  storage  from "redux-persist/lib/storage";

export type CartItem = Pizza & {
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find(
        (existingPizza) => existingPizza.id === action.payload.id
      );

      if (matchingPizza) {
        matchingPizza.quantity++;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find(
        (existingPizza) => existingPizza.id === action.payload.id
      );

      matchingPizza!.quantity--;

      if (matchingPizza!.quantity === 0) {
        state.items = state.items.filter(
          (item) => item.id !== matchingPizza!.id
        );
      }
    },

    deleteItem: (state, action: PayloadAction<Pizza>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addItem, removeItem, deleteItem } = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export const selectItemQuantity = (item: Pizza) => {
  return (state: RootState) => {
    const matchingCartItem = state.cart.items.find(
      (existingCartItem) => existingCartItem.id === item.id
    );

    return matchingCartItem?.quantity || 0;
  };
};

export const selectPizzaCount = (state: RootState) => {
  return state.cart.items.reduce((acc, nextItem) => acc + nextItem.quantity, 0);
};

export const selectPizzaPrice = (state: RootState) => {
  const total = state.cart.items.reduce(
    (acc, nextItem) => acc + nextItem.quantity * nextItem.price,
    0
  );
  return formatPrice(total);
};

export default persistReducer({
    key: 'cart',
    storage
}, cartReducer);
