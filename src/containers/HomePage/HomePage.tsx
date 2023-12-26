import PizzaView from '../../components/PizzaView/PizzaView';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getPizzas} from '../../store/dishes/PizzaThunk';
import Spinner from '../../components/Spinner/Spinner';
import {selectPizzasLoading} from '../../store/dishes/PizzaSlice';
import SideBar from '../../components/SideBar/SideBar';

const HomePage = () => {
  const [expand, setExpand] = useState(false);
  const dispatch = useAppDispatch();
  const pizzasLoading = useAppSelector(selectPizzasLoading);

  useEffect(() => {
    dispatch(getPizzas());
  }, [dispatch]);

  if (pizzasLoading) {
    return <Spinner/>;
  }

  return (
    <>
      <div className="flex justify-end">
        <button type="button" onClick={() => setExpand(!expand)}>Order</button>
      </div>
      <SideBar show={expand} onClose={() => setExpand(!expand)}/>
      <PizzaView/>
    </>
  );
};

export default HomePage;