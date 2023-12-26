import React, {useState} from 'react';
import {Pizza} from '../../types';
import {useAppDispatch} from '../../redux/hooks';
import {createPizza} from '../../store/dishes/PizzaThunk';
import {placeholderImage} from '../../constants/image';

const NewPizzaPage = () => {
  const dispatch = useAppDispatch();
  const [pizza, setPizza] = useState<Pizza>({
    name: '',
    image: '',
    price: 0,
  });

  const changePizza = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setPizza((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onCreatePizza = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createPizza(pizza));
    setPizza(() => ({
      name: '',
      image: '',
      price: 0,
    }));
  };

  return (
    <form onSubmit={onCreatePizza}>
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Pizza:</label>
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
        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Pizza:</label>
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
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price Pizza:</label>
        <input
          type="text"
          id="price"
          name="price"
          required
          value={pizza.price}
          onChange={changePizza}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
      <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">create</button>
    </form>
  );
};

export default NewPizzaPage;