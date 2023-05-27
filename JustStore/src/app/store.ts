import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import basketReducer from "./Basket";
import productApi from "../api/productApi";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
