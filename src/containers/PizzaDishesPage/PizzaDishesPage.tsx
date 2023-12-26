import {Link} from 'react-router-dom';
import {NEW_PIZZA} from '../../constants/routes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectPiazzas} from '../../store/dishes/PizzaSlice';
import {useEffect} from 'react';
import {getPizzas} from '../../store/dishes/PizzaThunk';

const PizzaDishesPage = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPiazzas);

  useEffect(() => {
    dispatch(getPizzas());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="text-xl">Dishes</h4>
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to={NEW_PIZZA}
        >
          Add new pizza
        </Link>
      </div>
      <div className="flex gap-y-3 flex-col my-3">
        {
          pizzas.map((pizza) => (
            <div className="grid grid-cols-4 items-center justify-between border border-black p-2">
              <div className="col-span-1 flex justify-center">
                <img className="w-[50%] h-[150px]" src={pizza.image} alt="pizzaImg"/>
              </div>
              <div className="col-span-1">
                <h3>{pizza.name}</h3>
              </div>
              <div className="col-span-1 grid place-content-center">
                <p>{pizza.price} KGS</p>
              </div>
              <div className="col-span-1 grid place-content-center">
                <div className="flex gap-x-3">
                  <button className="capitalize underline">edit</button>
                  <button className="capitalize underline">delete</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PizzaDishesPage;