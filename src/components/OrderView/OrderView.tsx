import Pizza from '../PizzaView/Pizza';
import {useAppSelector} from '../../redux/hooks';
import {selectOrders} from '../../store/orders/OrderSlice';

const OrderView = () => {
  const orders = useAppSelector(selectOrders);

  return (
    <div className="overflow-auto flex flex-col gap-y-3 my-3">
      {
        orders.map(order => (
          <Pizza key={order.id} pizza={order.order} amount={order.amount}/>
        ))
      }
    </div>
  );
};

export default OrderView;