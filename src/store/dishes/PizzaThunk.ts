import {createAsyncThunk} from '@reduxjs/toolkit';
import {Pizza} from '../../types';
import axiosApi from '../../http/axiosApi';

export const createPizza = createAsyncThunk<void, Pizza>(
  'pizza/create',
  async (pizza) => {
    await axiosApi.post('/pizza.json', pizza);
  },
);