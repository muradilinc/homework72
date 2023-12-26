import {createSlice} from '@reduxjs/toolkit';
import {createPizza} from './PizzaThunk';
import {Pizza} from '../../types';

interface PizzaState {
  pizzas: Pizza[];
  createPizza: boolean;
}

const initialState: PizzaState = {
  pizzas: [],
  createPizza: false,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPizza.pending, (state) => {
      state.createPizza = true;
    });
    builder.addCase(createPizza.fulfilled, (state) => {
      state.createPizza = false;
    });
    builder.addCase(createPizza.rejected, (state) => {
      state.createPizza = false;
    });
  }
});