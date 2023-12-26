import React from 'react';
import {DISHES_PAGE, EDIT_PIZZA} from '../../constants/routes';
import {PizzaList} from '../../types';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectDeletePizzaLoading} from '../../store/dishes/PizzaSlice';
import {deleteOrder} from '../../store/orders/OrderSlice';

interface Props {
  pizza: PizzaList;
  amount?: number;
  onSelect?: React.MouseEventHandler;
  onDelete?: React.MouseEventHandler;
}

const PizzaMemoed: React.FC<Props> = React.memo(function Pizza({pizza, amount, onSelect, onDelete}) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const deleteLoading = useAppSelector(selectDeletePizzaLoading);

  const isAdmin = location.pathname.includes('admin');
  const isCheckout = !location.pathname.includes('checkout');

  return (
    <div
      onClick={onSelect}
      className={`grid grid-cols-${isAdmin || amount ? '4' : '3'} items-center bg-white justify-between ${isCheckout ? 'border border-black' : ''} p-2`}
    >
      {
        isCheckout ?
          <div className="col-span-1 flex justify-start">
            <img className="w-[50%] h-[150px]" src={pizza.image} alt="pizzaImg"/>
          </div>
          :
          null
      }
      <div className="col-span-1">
        <h3>{pizza.name}</h3>
      </div>
      {
        isCheckout ?
          <div className="col-span-1 grid place-content-center">
            <p>{pizza.price} KGS</p>
          </div>
          :
          <div>x{amount}</div>
      }
      {
        isAdmin ?
          <div className="col-span-1 flex justify-around">
            <button
              disabled={deleteLoading}
              onClick={() => navigate(`${DISHES_PAGE}${EDIT_PIZZA}/${pizza.id}`)}
              className="capitalize underline text-xl"
            >
              edit
            </button>
            <button
              disabled={deleteLoading}
              onClick={onDelete}
              className="capitalize underline text-xl"
            >
              delete
            </button>
          </div>
          :
          amount ?
            <div>
              {
                isCheckout ?
                  <p>x{amount}</p>
                  :
                  <div className="col-span-1 grid place-content-center">
                    <p>{pizza.price} KGS</p>
                  </div>
              }
            </div>
            :
            null
      }
      {
        isCheckout ? null :
          <div className="grid place-content-center">
            <button
              onClick={() => dispatch(deleteOrder(pizza.id))}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              delete
            </button>
          </div>
      }
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.pizza !== nextProps.pizza;
});

export default PizzaMemoed;