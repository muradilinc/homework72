import {configureStore} from '@reduxjs/toolkit';
import {pizzaReducer} from '../store/dishes/PizzaSlice';
import {orderReducer} from '../store/orders/OrderSlice';

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;