import PizzaView from '../../components/PizzaView/PizzaView';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getPizzas} from '../../store/pizzas/PizzaThunk';
import Spinner from '../../components/Spinner/Spinner';
import {selectPizzasLoading} from '../../store/pizzas/PizzaSlice';
import SideBar from '../../components/SideBar/SideBar';
import {selectOrders} from '../../store/orders/OrderSlice';

const HomePage = () => {
  const [expand, setExpand] = useState(false);
  const dispatch = useAppDispatch();
  const pizzasLoading = useAppSelector(selectPizzasLoading);
  const orders = useAppSelector(selectOrders);

  const totalPizza = orders.reduce((sum, order) => {
    return sum + order.amount;
  }, 0);

  useEffect(() => {
    dispatch(getPizzas());
  }, [dispatch]);

  if (pizzasLoading) {
    return <Spinner/>;
  }

  return (
    <>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setExpand(!expand)}
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cart
          <span
            className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
          >
            {totalPizza}
          </span>
        </button>
      </div>
      <SideBar show={expand} onClose={() => setExpand(!expand)}/>
      <PizzaView/>
    </>
  );
};

export default HomePage;