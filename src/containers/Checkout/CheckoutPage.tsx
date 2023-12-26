import OrderView from '../../components/OrderView/OrderView';
import {useAppSelector} from '../../redux/hooks';
import {selectOrders, selectTotalPrice} from '../../store/orders/OrderSlice';
import {DELIVER_PRICE} from '../../constants/prices';
import {Link, Navigate, Outlet} from 'react-router-dom';
import {HOME_PAGE} from '../../constants/routes';

const CheckoutPage = () => {
  const orders = useAppSelector(selectOrders);
  const totalPrice = useAppSelector(selectTotalPrice);

  if (orders.length === 0) {
    return <Navigate to={HOME_PAGE}/>;
  }

  return (
    <div className="w-[60%] mx-auto my-5">
      <h4 className="text-2xl">Your order:</h4>
      <>
        <OrderView/>
        <div className="grid grid-cols-1 gap-y-3 w-[620px] p-2">
          <div className="col-span-1 flex justify-between">
            <p>Deliver:</p>
            <p className="uppercase">{DELIVER_PRICE} kgs</p>
          </div>
          <div className="col-span-1 flex justify-between">
            <p>TotalPrice:</p>
            <p className="uppercase">{totalPrice + DELIVER_PRICE} kgs</p>
          </div>
        </div>
      </>
      <div className="flex gap-x-3 mb-5">
        <Link to={HOME_PAGE} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</Link>
        <Link to="continue" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Order</Link>
      </div>
      <Outlet/>
    </div>
  );
};

export default CheckoutPage;