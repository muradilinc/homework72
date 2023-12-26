import {Link, Outlet, useParams} from 'react-router-dom';
import {NEW_PIZZA} from '../../constants/routes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectPizzasLoading} from '../../store/dishes/PizzaSlice';
import {useEffect} from 'react';
import {getPizzas} from '../../store/dishes/PizzaThunk';
import Spinner from '../../components/Spinner/Spinner';
import PizzaView from '../../components/PizzaView/PizzaView';

const PizzaDishesPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const pizzasLoading = useAppSelector(selectPizzasLoading);

  useEffect(() => {
    dispatch(getPizzas());
  }, [dispatch]);


  if (id) {
    return <Outlet/>;
  }

  if (pizzasLoading) {
    return <Spinner/>;
  }

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
      <PizzaView/>
    </div>
  );
};

export default PizzaDishesPage;