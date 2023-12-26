import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectPizzas} from '../../store/pizzas/PizzaSlice';
import {deletePizza, getPizzas} from '../../store/pizzas/PizzaThunk';
import PizzaMemoed from './Pizza';
import {selectPizza} from '../../store/orders/OrderSlice';
import {PizzaList} from '../../types';

const PizzaView = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPizzas);

  const onDelete = async (id: string) => {
    await dispatch(deletePizza(id));
    await dispatch(getPizzas());
  };

  const onSelectPizza = (pizza: PizzaList)=> {
    dispatch(selectPizza(pizza));
  };

  return (
    <div className="flex gap-y-3 flex-col my-3">
      {
        pizzas.map((pizza) =>
          <PizzaMemoed
            key={pizza.id}
            pizza={pizza}
            onSelect={() => onSelectPizza(pizza)}
            onDelete={() => onDelete(pizza.id)}
          />
        )
      }
    </div>
  );
};

export default PizzaView;