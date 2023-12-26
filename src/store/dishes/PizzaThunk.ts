import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiPizza, Pizza} from '../../types';
import axiosApi from '../../http/axiosApi';

export const createPizza = createAsyncThunk<void, Pizza>(
  'pizza/create',
  async (pizza) => {
    await axiosApi.post('/pizza.json', pizza);
  },
);

export const getPizzas = createAsyncThunk<Pizza[]>(
  'pizza/getAll',
  async () => {
    const response = await axiosApi.get<ApiPizza | null>('/pizza.json');
    const pizzas = response.data;

    if (!pizzas) {
      return [];
    }

    return Object.keys(pizzas).map(key => {
      const pizza = pizzas[key];
      return {
        ...pizza,
        id: key,
      };
    });
  },
);