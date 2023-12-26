import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createPizza, getPizzas} from './PizzaThunk';
import {Pizza} from '../../types';
import {RootState} from '../../redux/store';

interface PizzaState {
  pizzas: Pizza[];
  createPizza: boolean;
  getPizzaLoading: boolean;
}

const initialState: PizzaState = {
  pizzas: [],
  createPizza: false,
  getPizzaLoading: false,
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
    builder.addCase(getPizzas.pending, (state) => {
      state.getPizzaLoading = true;
    });
    builder.addCase(getPizzas.fulfilled, (state, {payload: pizzas}: PayloadAction<Pizza[]>) => {
      state.getPizzaLoading = false;
      state.pizzas = pizzas;
    });
    builder.addCase(getPizzas.rejected, (state) => {
      state.getPizzaLoading = false;
    });
  }
});

export const pizzaReducer = pizzaSlice.reducer;

export const selectPiazzas = (state: RootState) => state.pizza.pizzas;