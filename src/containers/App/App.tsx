import Layout from '../../components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import {DISHES_PAGE, EDIT_PIZZA, HOME_PAGE, NEW_PIZZA} from '../../constants/routes';
import HomePage from '../HomePage/HomePage';
import NewPizzaPage from '../NewPizzaPage/NewPizzaPage';
import PizzaDishesPage from '../PizzaDishesPage/PizzaDishesPage';

const App = () => {
  return (
    <>
     <Layout>
        <Routes>
          <Route path={HOME_PAGE} element={<HomePage/>}/>
          <Route path={DISHES_PAGE} element={<PizzaDishesPage/>}>
            <Route path={`${DISHES_PAGE}/${EDIT_PIZZA}/:id`} element={<NewPizzaPage/>}/>
          </Route>
          <Route path={NEW_PIZZA} element={<NewPizzaPage/>}/>
        </Routes>
     </Layout>
    </>
  );
};

export default App;