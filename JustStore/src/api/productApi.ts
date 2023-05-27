import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../app/api";
import { productClient } from "../app/clients";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Product", "Products"],
  endpoints: (builder) => ({
    getProductById: builder.query<Product, number>({
      queryFn: async (id: number) => ({
        data: await productClient.getProduct(id),
      }),
      providesTags: ["Product"],
    }),
    getAllProducts: builder.query<Product[], void>({
      queryFn: async () => ({
        data: await productClient.getAllProducts(),
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<number, Product>({
      queryFn: async (product: Product, api) => ({
        data: await productClient.createProduct(product),
      }),
      invalidatesTags: ["Products", "Product"],
    }),
    updateProduct: builder.mutation<void, Product>({
      queryFn: async (product: Product, api) => ({
        data: await productClient.updateProduct(product.id, product),
      }),
      invalidatesTags: ["Products", "Product"],
    }),
    deleteProductById: builder.mutation<void, number>({
      queryFn: async (id: number, api) => ({
        data: await productClient.deleteProduct(id),
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
} = productApi;

export default productApi;
