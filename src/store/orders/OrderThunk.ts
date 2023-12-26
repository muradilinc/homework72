import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import {ApiOrders, NewOrder, Pizza, ResponseOrders} from '../../types';

export const createOrder = createAsyncThunk<void, NewOrder>(
  'order/create',
  async (order) => {
    await axiosApi.post('/pizza-orders.json', order);
  },
);

export const getOrders = createAsyncThunk<ResponseOrders[]>(
  'order/getAll',
  async () => {
    const responseOrder = await axiosApi.get<ApiOrders | null>('/pizza-orders.json');
    const orders = responseOrder.data;

    if (!orders) {
      return [];
    }

    const orderPromises = Object.entries(orders).map(async ([id, item]) => {
      const pizzaIds = Object.entries(item.orders);

      const pizzaDetails = await Promise.all(
        pizzaIds.map(async ([pizzaId, amount]) => {
          const pizzaResponse = await axiosApi.get<Pizza | null>(`/pizza/${pizzaId}.json`);
          if (!pizzaResponse.data) {
            throw new Error('not found!');
          }

          return {
            id: pizzaId,
            pizzaDetail: pizzaResponse.data,
            amount,
          };
        })
      );

      return {
        id,
        person: item.person,
        pizzas: pizzaDetails,
      };
    });

    return await Promise.all(orderPromises);
  },
);

export const deletePersonOrders =createAsyncThunk<void, string>(
  'order/delete',
  async (id) => {
    await axiosApi.delete(`/pizza-orders/${id}.json`);
  },
);