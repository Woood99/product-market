import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import type { IProduct } from '../types/product';
import type { RootState } from './store';

interface IProductsState {
   items: IProduct[];
   isLoading: boolean;
   error: string | null;
   lastFetch: string | null;
}

const initialState: IProductsState = {
   items: [],
   isLoading: true,
   error: null,
   lastFetch: null,
};

export const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      productsRequested: state => {
         state.isLoading = true;
         state.error = null;
      },
      productsReceived: (state, action) => {
         state.items = action.payload;
         state.isLoading = false;
         state.lastFetch = new Date().toISOString();
      },
      productsFailed: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      },
   },
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsFailed, productsReceived, productsRequested } = actions;

export const loadProductsList = () => async (dispatch: Dispatch, getState: () => RootState) => {
   const { lastFetch } = getState().products;

   const isOutDated = lastFetch ? (new Date().getTime() - new Date(lastFetch).getTime()) / 1000 / 60 > 10 : true;

   if (!isOutDated) return;

   dispatch(productsRequested());
   try {
      const res = await fetch('https://dummyjson.com/products');

      if (!res.ok) {
         throw new Error('Не удалось загрузить продукты');
      }

      const data = await res.json();
      dispatch(productsReceived(data.products));
   } catch (error) {
      dispatch(productsFailed(error instanceof Error ? error.message : 'Неизвестная ошибка'));
   }
};

export const getProducts = (state: RootState) => state.products.items;
export const getProductsLoading = (state: RootState) => state.products.isLoading;

export default productsReducer;
