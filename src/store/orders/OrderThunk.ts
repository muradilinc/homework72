import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import {NewOrder} from '../../types';

export const createOrder = createAsyncThunk<void, NewOrder>(
  'order/create',
  async (order) => {
    await axiosApi.post('/pizza-orders.json', order);
  },
);