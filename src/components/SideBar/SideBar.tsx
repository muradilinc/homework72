import React from 'react';
import {useAppSelector} from '../../redux/hooks';
import {selectTotalPrice} from '../../store/orders/OrderSlice';
import {useNavigate} from 'react-router-dom';
import {CHECKOUT_ORDER} from '../../constants/routes';
import OrderView from '../OrderView/OrderView';

interface Props {
  show: boolean;
  onClose: React.MouseEventHandler;
}

const SideBar: React.FC<Props> = ({show, onClose}) => {
  const navigate = useNavigate();
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <div className={`fixed bg-black/20 inset-0 ${show ? 'block' : 'hidden'}`} onClick={onClose}>
      <div
        className="bg-blue-300 absolute top-0 right-0 h-screen w-[45%] p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <h5 className="text-base font-semibold text-white uppercase dark:text-gray-400">Orders</h5>
        <button
          onClick={onClose}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <OrderView/>
        <div className="absolute bottom-[25px] border-gray-500 border-t-2 flex w-[95%] py-3 justify-between">
          <p className="text-white font-bold text-2xl">Order total: {totalPrice}<span className="uppercase">kgs</span></p>
          <button
            onClick={() => navigate(CHECKOUT_ORDER)}
            className="capitalize focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;