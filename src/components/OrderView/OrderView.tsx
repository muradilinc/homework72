import Pizza from '../PizzaView/Pizza';
import {useAppSelector} from '../../redux/hooks';
import {selectOrders} from '../../store/orders/OrderSlice';

const OrderView = () => {
  const orders = useAppSelector(selectOrders);
  const isCheckout = location.pathname.includes('checkout');

  return (
    <div className={`flex flex-col gap-y-3 my-3 ${isCheckout  ? '' : 'h-[80vh] overflow-y-scroll'}`}>
      {
        orders.map(order => (
          <Pizza key={order.id} pizza={order.order} amount={order.amount}/>
        ))
      }
    </div>
  );
};

export default OrderView;