import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useNavigate} from 'react-router-dom';
import {ApiOrder, NewOrder, Person} from '../../types';
import {clearOrder, selectCreateOrderLoading, selectOrders} from '../../store/orders/OrderSlice';
import {createOrder} from '../../store/orders/OrderThunk';
import {HOME_PAGE} from '../../constants/routes';
import {ButtonSpinner} from '../Spinner/ButtonSpinner';

const Form = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orders = useAppSelector(selectOrders);
  const createLoading = useAppSelector(selectCreateOrderLoading);
  const [customer, setCustomer] = useState<Person>({
    name: '',
    address: '',
    phone: '',
  });

  const customerChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setCustomer(prevState => ({
      ...prevState,
      [name]:value
    }));
  }, []);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newOrders: ApiOrder[] = orders.map(order => {
      const id = order.id;
      return {
        [id]: order.amount,
      };
    });

    const order: NewOrder = {
      person: customer,
      orders: newOrders.reduce((orderId, orders) => {
        return {...orderId, ...orders};
      }, {})
    };

    await dispatch(createOrder(order));
    dispatch(clearOrder());
    navigate(HOME_PAGE);
  };

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <div className="form-group">
        <label htmlFor="name">Client name</label>
        <input
          value={customer.name}
          onChange={customerChanged}
          id="name" type="text" name="name"
          required
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          value={customer.address}
          onChange={customerChanged}
          id="address" type="text" name="address"
          required
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="phone">Phone</label>
        <input
          value={customer.phone}
          onChange={customerChanged}
          id="phone" type="text" name="phone"
          required
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {
        createLoading ?
          <ButtonSpinner color="green"/>
          :
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Place order
          </button>
      }
    </form>
  );
};

export default Form;