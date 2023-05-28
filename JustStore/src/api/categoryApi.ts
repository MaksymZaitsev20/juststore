import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoryClient } from "../app/clients";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Category", "Categories"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<string[], void>({
      queryFn: async () => ({
        data: await categoryClient.getAllCategories(),
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;

export default categoryApi;
