import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {deletePersonOrders, getOrders} from '../../store/orders/OrderThunk';
import {selectResponseOrders} from '../../store/orders/OrderSlice';
import {DELIVER_PRICE} from '../../constants/prices';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectResponseOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    await dispatch(deletePersonOrders(id));
    await dispatch(getOrders());
  };

  return (
    <div className="flex flex-col gap-y-3">
      {
        orders.map((order, index) => (
          <div key={order.id} className="grid grid-cols-3 border border-black p-3">
            <div key={index}>
              {
                order.pizzas.map(param => <p key={param.pizzaDetail.id}>x{param.amount} {param.pizzaDetail.name}</p>)
              }
              <p>Delivery</p>
            </div>
            <div key={index + 40} className="grid place-content-center">
              {
                order.pizzas.map((param, index) => <p key={index} >{param.pizzaDetail.price} <span>kgs</span></p>)
              }
              <p>{DELIVER_PRICE} <span>kgs</span></p>
            </div>
            <div className="grid place-content-center">
              <p>Order total</p>
              <p>
                {
                  order.pizzas.reduce((sum, pizza) => {
                    return sum + pizza.amount * pizza.pizzaDetail.price;
                  }, DELIVER_PRICE)
                } <span>kgs</span>
              </p>
              <button onClick={() => onDelete(order.id)} className="underline">Complete order</button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default OrdersPage;