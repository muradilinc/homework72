import React, {useEffect, useState} from 'react';
import {Pizza} from '../../types';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {createPizza, getOnePizza, getPizzas, updatePizza} from '../../store/dishes/PizzaThunk';
import {placeholderImage} from '../../constants/image';
import {useNavigate, useParams} from 'react-router-dom';
import {selectCreateLoading, selectPizza, selectPizzaLoading, selectUpdateLoading} from '../../store/dishes/PizzaSlice';
import {DISHES_PAGE} from '../../constants/routes';
import {ButtonSpinner} from '../../components/Spinner/ButtonSpinner';
import Spinner from '../../components/Spinner/Spinner';

const NewPizzaPage = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const prevPizza = useAppSelector(selectPizza);
  const prevPizzaLoading = useAppSelector(selectPizzaLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);
  const createLoading = useAppSelector(selectCreateLoading);
  const [pizza, setPizza] = useState<Pizza>({
    name: '',
    image: '',
    price: 0,
  });

  useEffect(() => {
    dispatch(getOnePizza(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id && prevPizza) {
      setPizza(prevPizza);
    }
  }, [id, prevPizza]);

  const changePizza = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setPizza((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onCreatePizza = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      await dispatch(updatePizza({id, pizza}));
      await dispatch(getPizzas());
      navigate(DISHES_PAGE);
    } else {
      await dispatch(createPizza(pizza));
    }
    setPizza(() => ({
      name: '',
      image: '',
      price: 0,
    }));
  };

  if (id && prevPizzaLoading) {
    return  <Spinner/>;
  }

  return (
    <form onSubmit={onCreatePizza}>
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name
          Pizza:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={pizza.name}
          onChange={changePizza}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
      <div className="mb-6">
        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image
          Pizza:</label>
        <input
          type="text"
          id="image"
          name="image"
          required
          value={pizza.image}
          onChange={changePizza}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
      <div className="mb-6">
        <img
          className="w-[300px] h-[300px]"
          src={pizza.image ? pizza.image : placeholderImage}
          alt="pizza"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price
          Pizza:</label>
        <input
          type="text"
          id="price"
          name="price"
          required
          value={pizza.price}
          onChange={changePizza}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
      {
        createLoading || updateLoading ?
          <ButtonSpinner color="green"/>
          :
          <button
            type="submit"
            className="capitalize focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {id ? 'change' : 'create'}
          </button>
      }
      <button
        type="button"
        disabled={createLoading || updateLoading}
        onClick={() => navigate(DISHES_PAGE)}
        className="capitalize py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        back to page
      </button>
    </form>
  );
};

export default NewPizzaPage;