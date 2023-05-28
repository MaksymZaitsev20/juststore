import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../productsApi";

export interface BasketState {
  products: number[];
}

const initialState: BasketState = {
  products: api.getBasketProducts(),
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<number>) => {
      if (!state.products.includes(action.payload)) {
        state.products.push(action.payload);

        api.addProductToBasket(action.payload);
      }
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product !== action.payload
      );

      api.removeProductFromBasket(action.payload);
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export default basketSlice.reducer;
