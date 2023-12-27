import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {deletePersonOrders, getOrders} from '../../store/orders/OrderThunk';
import {selectDeletePersonOrder, selectGetOrdersLoading, selectResponseOrders} from '../../store/orders/OrderSlice';
import {DELIVER_PRICE} from '../../constants/prices';
import Spinner from '../../components/Spinner/Spinner';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectResponseOrders);
  const getAllOrdersLoading = useAppSelector(selectGetOrdersLoading);
  const deleteOrderLoading = useAppSelector(selectDeletePersonOrder);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    await dispatch(deletePersonOrders(id));
    await dispatch(getOrders());
  };

  if (getAllOrdersLoading) {
    return <Spinner/>;
  }

  return (
    <div className="flex flex-col gap-y-3">
      {
        orders.map((order) => (
          <div key={order.id} className="grid grid-cols-3 gap-y-3 border border-black p-3">
            <div>
              {
                order.pizzas.map(param =>
                  <p key={param.id}>x{param.amount} {param.pizzaDetail.name}</p>
                )
              }
              <p>Delivery</p>
            </div>
            <div className="grid place-content-center">
              {
                order.pizzas.map((param) =>
                  <p key={param.id} >{param.pizzaDetail.price} <span>kgs</span></p>
                )
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
              <button
                disabled={deleteOrderLoading}
                onClick={() => onDelete(order.id)}
                className="underline"
              >
                Complete order
              </button>
            </div>
            <div className="border-t-2 pt-2 col-span-3">
              <p>Name: {order.person.name}</p>
              <p>Address: {order.person.address}</p>
              <p>Phone: {order.person.phone}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default OrdersPage;