import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectPizzas} from '../../store/dishes/PizzaSlice';
import {deletePizza, getPizzas} from '../../store/dishes/PizzaThunk';
import PizzaMemoed from './Pizza';

const PizzaView = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPizzas);

  const onDelete = async (id: string) => {
    await dispatch(deletePizza(id));
    await dispatch(getPizzas());
  };

  return (
    <div className="flex gap-y-3 flex-col my-3">
      {
        pizzas.map((pizza) =>
          <PizzaMemoed key={pizza.id} pizza={pizza} onDelete={() => onDelete(pizza.id)}/>
        )
      }
    </div>
  );
};

export default PizzaView;