import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../productsApi";
import { Product } from "./api";

export interface CatalogState {
  products: Product[];
}

const initialState: CatalogState = {
  products: [],
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      if (!state.products.includes(action.payload)) {
        state.products.push(action.payload);

        api.createProduct(action.payload);
      }
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter(
        (product) => product !== action.payload
      );

      api.deleteProduct(action.payload.id);
    },
  },
  extraReducers: {},
});

export const { createProduct, deleteProduct } = catalogSlice.actions;

export default catalogSlice.reducer;
