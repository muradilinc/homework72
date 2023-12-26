import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiPizza, Pizza, PizzaList, PizzaUpdate} from '../../types';
import axiosApi from '../../http/axiosApi';

export const createPizza = createAsyncThunk<void, Pizza>(
  'pizza/create',
  async (pizza) => {
    await axiosApi.post('/pizza.json', pizza);
  },
);

export const getPizzas = createAsyncThunk<PizzaList[]>(
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

export const getOnePizza = createAsyncThunk<Pizza, string>(
  'pizza/getOne',
  async (id) => {
    const response = await axiosApi.get<Pizza | null>(`/pizza/${id}.json`);
    const pizza = response.data;

    if (!pizza) {
      throw new Error('not found!');
    }

    return pizza;
  },
);

export const updatePizza = createAsyncThunk<void, PizzaUpdate>(
  'pizza/update',
  async ({id, pizza}) => {
    await axiosApi.put(`/pizza/${id}.json`, pizza);
  },
);

export const deletePizza = createAsyncThunk<void, string>(
  'pizza/delete',
  async (id) => {
    await axiosApi.delete(`/pizza/${id}.json`);
  },
);