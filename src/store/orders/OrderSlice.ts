import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order, PizzaList} from '../../types';
import {RootState} from '../../redux/store';
import {createOrder} from './OrderThunk';

interface OrderState {
  orders: Order[];
  totalPrice: number;
  createOrderLoading: boolean;
}

const initialState: OrderState = {
  orders: [],
  totalPrice: 0,
  createOrderLoading: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    selectPizza: (state, {payload: pizza}: PayloadAction<PizzaList>) => {
      const index = state.orders.findIndex(order => order.id === pizza.id);

      if (index !== -1) {
        state.orders[index].amount++;
      } else {
        state.orders.push({
          amount: 1,
          id: pizza.id,
          order: pizza,
        });
      }

      state.totalPrice = state.orders.reduce((sum, order) => {
        return sum + order.amount * order.order.price;
      }, 0);
    },
    deleteOrder: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.orders.findIndex(order => order.id === id);

      if (index !== -1) {
        state.totalPrice = state.totalPrice - state.orders[index].order.price;

        state.orders[index].amount--;
        if (state.orders[index].amount < 1) {
          state.orders = state.orders.filter((order) => order.id !== id);
        }
      } else {
        state.orders = state.orders.filter((order) => order.id !== id);
      }
    },
    clearOrder: (state) => {
      state.orders = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.createOrderLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.createOrderLoading = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.createOrderLoading = false;
    });
  },
});

export const orderReducer = orderSlice.reducer;
export const {
  selectPizza,
  deleteOrder,
  clearOrder,
} = orderSlice.actions;

export const selectOrders = (state: RootState) => state.order.orders;
export const selectTotalPrice = (state: RootState) => state.order.totalPrice;
export const selectCreateOrderLoading = (state: RootState) => state.order.createOrderLoading;