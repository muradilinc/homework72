import Layout from '../../components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import {CHECKOUT_ORDER, PIZZAS_PAGE, EDIT_PIZZA, HOME_PAGE, NEW_PIZZA, ORDERS_PAGE} from '../../constants/routes';
import HomePage from '../HomePage/HomePage';
import NewPizzaPage from '../NewPizzaPage/NewPizzaPage';
import PizzaDishesPage from '../PizzaDishesPage/PizzaDishesPage';
import CheckoutPage from '../Checkout/CheckoutPage';
import Form from '../../components/Form/Form';
import NotPage from '../NotPage/NotPage';
import OrdersPage from '../OrdersPage/OrdersPage';

const App = () => {
  return (
    <>
     <Layout>
        <Routes>
          <Route path={HOME_PAGE} element={<HomePage/>}/>
          <Route path={PIZZAS_PAGE} element={<PizzaDishesPage/>}>
            <Route path={`${PIZZAS_PAGE}/${EDIT_PIZZA}/:id`} element={<NewPizzaPage/>}/>
          </Route>
          <Route path={NEW_PIZZA} element={<NewPizzaPage/>}/>
          <Route path={CHECKOUT_ORDER} element={<CheckoutPage/>}>
            <Route path="continue" element={<Form/>}/>
          </Route>
          <Route path={ORDERS_PAGE} element={<OrdersPage/>}/>
          <Route path="*" element={<NotPage/>}/>
        </Routes>
     </Layout>
    </>
  );
};

export default App;