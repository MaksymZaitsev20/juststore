import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../productsApi";
import { IProduct } from "../api/api";

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

        const { name, price, description, category, imageUrl } = action.payload;
        api.createProduct(name, price, description, category, imageUrl);
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
