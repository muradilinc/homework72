import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order, PizzaList, ResponseOrders} from '../../types';
import {RootState} from '../../redux/store';
import {createOrder, deletePersonOrders, getOrders} from './OrderThunk';

interface OrderState {
  orders: Order[];
  responseOrders: ResponseOrders[];
  totalPrice: number;
  createOrderLoading: boolean;
  getAllOrdersLoading: boolean;
  deleteOrderLoading: boolean;
}

const initialState: OrderState = {
  orders: [],
  responseOrders: [],
  totalPrice: 0,
  createOrderLoading: false,
  getAllOrdersLoading: false,
  deleteOrderLoading: false,
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
    builder.addCase(getOrders.pending, (state) => {
      state.getAllOrdersLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, {payload: orders}: PayloadAction<ResponseOrders[]>) => {
      state.getAllOrdersLoading = false;
      state.responseOrders = orders;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.getAllOrdersLoading = false;
    });
    builder.addCase(deletePersonOrders.pending, (state) => {
      state.deleteOrderLoading = true;
    });
    builder.addCase(deletePersonOrders.fulfilled, (state) => {
      state.deleteOrderLoading = false;
    });
    builder.addCase(deletePersonOrders.rejected, (state) => {
      state.deleteOrderLoading = false;
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
export const selectResponseOrders = (state: RootState) => state.order.responseOrders;
export const selectGetOrdersLoading = (state: RootState) => state.order.getAllOrdersLoading;
export const selectDeletePersonOrder = (state: RootState) => state.order.deleteOrderLoading;