import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface ICounterState {
   value: number;
}

const initialState: ICounterState = {
   value: 0,
};

export const counterSlice = createSlice({
   name: 'counter',
   initialState,
   reducers: {
      increment: state => {
         state.value += 1;
      },
      decrement: state => {
         state.value -= 1;
      },
      defaultValue: state => {
         state.value = initialState.value;
      },
      incrementByNumber: (state, action) => {
         state.value += action.payload;
      },
      decrementByNumber: (state, action) => {
         state.value -= action.payload;
      },
   },
});

const { reducer: counterReducer, actions } = counterSlice;
export const { decrement, increment, decrementByNumber, incrementByNumber, defaultValue } = actions;
export const getCount = (state: RootState) => state.counter.value;

export default counterReducer;
