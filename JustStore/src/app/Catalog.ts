import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../models/Product";
import { api } from "../productsApi";

export interface CatalogState {
  products: IProduct[];
}

const initialState: CatalogState = {
  products: [],
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<IProduct>) => {
      if (!state.products.includes(action.payload)) {
        state.products.push(action.payload);

        const { name, category, price, imageUrl } = action.payload;
        api.createProduct(name, category, price, imageUrl);
      }
    },
    deleteProduct: (state, action: PayloadAction<IProduct>) => {
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
