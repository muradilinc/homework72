import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createPizza, getOnePizza, getPizzas, updatePizza} from './PizzaThunk';
import {Pizza, PizzaList} from '../../types';
import {RootState} from '../../redux/store';

interface PizzaState {
  pizza: Pizza | null;
  pizzas: PizzaList[];
  createPizzaLoading: boolean;
  getPizzaLoading: boolean;
  getOnePizzaLoading: boolean;
  updatePizzaLoading: boolean;
}

const initialState: PizzaState = {
  pizza: null,
  pizzas: [],
  createPizzaLoading: false,
  getPizzaLoading: false,
  getOnePizzaLoading: false,
  updatePizzaLoading: false,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPizza.pending, (state) => {
      state.createPizzaLoading = true;
    });
    builder.addCase(createPizza.fulfilled, (state) => {
      state.createPizzaLoading = false;
    });
    builder.addCase(createPizza.rejected, (state) => {
      state.createPizzaLoading = false;
    });
    builder.addCase(getPizzas.pending, (state) => {
      state.getPizzaLoading = true;
    });
    builder.addCase(getPizzas.fulfilled, (state, {payload: pizzas}: PayloadAction<PizzaList[]>) => {
      state.getPizzaLoading = false;
      state.pizzas = pizzas;
    });
    builder.addCase(getPizzas.rejected, (state) => {
      state.getPizzaLoading = false;
    });
    builder.addCase(getOnePizza.pending, (state) => {
      state.getOnePizzaLoading = true;
    });
    builder.addCase(getOnePizza.fulfilled, (state, {payload: pizza}: PayloadAction<Pizza>) => {
      state.getOnePizzaLoading = false;
      state.pizza = pizza;
    });
    builder.addCase(getOnePizza.rejected, (state) => {
      state.getOnePizzaLoading = false;
    });
    builder.addCase(updatePizza.pending, (state) => {
      state.updatePizzaLoading = true;
    });
    builder.addCase(updatePizza.fulfilled, (state) => {
      state.updatePizzaLoading = false;
    });
    builder.addCase(updatePizza.rejected, (state) => {
      state.updatePizzaLoading = false;
    });
  }
});

export const pizzaReducer = pizzaSlice.reducer;

export const selectPiazzas = (state: RootState) => state.pizza.pizzas;
export const selectPizza = (state: RootState) => state.pizza.pizza;

export const selectCreateLoading = (state: RootState) => state.pizza.createPizzaLoading;
export const selectPizzasLoading = (state: RootState) => state.pizza.getPizzaLoading;
export const selectPizzaLoading = (state: RootState) => state.pizza.getOnePizzaLoading;
export const selectUpdateLoading = (state: RootState) => state.pizza.updatePizzaLoading;
