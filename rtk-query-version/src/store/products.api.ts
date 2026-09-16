import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IErrorResponse, IProduct, IProductInput, IProductResponse, IProductUpdate } from '../types/product';

export const productsApi = createApi({
   reducerPath: 'productsApi',
   tagTypes: ['Products'],
   baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
   endpoints: build => ({
      getProducts: build.query<IProduct[], void>({
         query: () => 'products',
         transformResponse: (response: IProductResponse) => response.products,
         transformErrorResponse: (response: IErrorResponse) => ({
            status: response.status,
            message: response.data.message || 'Произошла ошибка при загрузке продуктов',
         }),
         providesTags: ['Products'],
         keepUnusedDataFor: 600,
      }),

      addProduct: build.mutation<IProduct, IProductInput>({
         query: newProduct => ({
            url: `products/add`,
            method: 'POST',
            body: newProduct,
         }),
         transformErrorResponse: (response: IErrorResponse) => ({
            status: response.status,
            message: response.data.message || 'Произошла ошибка при загрузке продуктов',
         }),
         invalidatesTags: ['Products'],
      }),

      updateProduct: build.mutation<IProduct, IProductUpdate>({
         query: ({ id, product }) => ({
            url: `products/${id}`,
            method: 'PUT',
            body: product,
         }),
         transformErrorResponse: (response: IErrorResponse) => ({
            status: response.status,
            message: response.data.message || 'Произошла ошибка при загрузке продуктов',
         }),
         invalidatesTags: ['Products'],
      }),

      deleteProduct: build.mutation<void, number>({
         query: id => ({
            url: `products/${id}`,
            method: 'DELETE',
         }),
         transformErrorResponse: (response: IErrorResponse) => ({
            status: response.status,
            message: response.data.message || 'Произошла ошибка при загрузке продуктов',
         }),
         invalidatesTags: ['Products'],
      }),
   }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } =
   productsApi;
