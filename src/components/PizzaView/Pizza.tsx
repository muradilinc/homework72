import React from 'react';
import {DISHES_PAGE, EDIT_PIZZA} from '../../constants/routes';
import {PizzaList} from '../../types';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../redux/hooks';
import {selectDeletePizzaLoading} from '../../store/dishes/PizzaSlice';

interface Props {
  pizza: PizzaList;
  onDelete: React.MouseEventHandler;
}

const PizzaMemoed: React.FC<Props> = React.memo( function Pizza ({pizza, onDelete}) {
  const location = useLocation();
  const navigate = useNavigate();
  const deleteLoading = useAppSelector(selectDeletePizzaLoading);

  const isAdmin = location.pathname.includes('admin');


  return (
    <div className={`grid grid-cols-${isAdmin ? '4' : '3'} items-center bg-white justify-between border border-black p-2`}>
      <div className="col-span-1 flex justify-start">
        <img className="w-[50%] h-[150px]" src={pizza.image} alt="pizzaImg"/>
      </div>
      <div className="col-span-1">
        <h3>{pizza.name}</h3>
      </div>
      <div className="col-span-1 grid place-content-center">
        <p>{pizza.price} KGS</p>
      </div>
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
          null
      }
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.pizza !== nextProps.pizza;
});

export default PizzaMemoed;