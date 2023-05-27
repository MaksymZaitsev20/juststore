import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../app/api";
import { productsClient } from "../app/clients";

export const experimentApi = createApi({
  reducerPath: "experimentApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Product", "Products"],
  endpoints: (builder) => ({
    getProductById: builder.query<IProduct, number>({
      queryFn: async (id: number) => ({
        data: await productsClient.getProduct(id),
      }),
      providesTags: ["Product"],
    }),
    getAllProducts: builder.query<IProduct[], void>({
      queryFn: async () => ({
        data: await productsClient.getAllProducts(),
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<void, IProduct>({
      queryFn: async (product: IProduct, api) => ({
        data: await productsClient.createProduct(product),
      }),
      invalidatesTags: ["Products", "Product"],
    }),
    updateProduct: builder.mutation<void, IProduct>({
      queryFn: async (product: IProduct, api) => ({
        data: await productsClient.updateProduct(product),
      }),
      invalidatesTags: ["Products", "Product"],
    }),
    deleteProductById: builder.mutation<void, number>({
      queryFn: async (id: number, api) => ({
        data: await productsClient.deleteProduct(id),
      }),
      invalidatesTags: ["Products", "Product"],
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductByIdMutation,
} = experimentApi;

export default experimentApi;
