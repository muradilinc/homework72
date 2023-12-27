import {Link, useLocation} from 'react-router-dom';
import {PIZZAS_PAGE, HOME_PAGE, ORDERS_PAGE} from '../../constants/routes';
import {checkAdmin} from '../../utils/checkAdmin';

const Header = () => {
  const location = useLocation();

  const isAdmin = checkAdmin(location.pathname);

  return (
    <div className="bg-blue-500 py-6 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl"><Link to={HOME_PAGE}>Turtle Pizza</Link></h1>
        </div>
        {
          isAdmin ?
            <div>
              <ul className="flex gap-x-3">
                <li><Link to={PIZZAS_PAGE}>Dishes</Link></li>
                <li><Link to={ORDERS_PAGE}>Orders</Link></li>
              </ul>
            </div>
            :
            null
        }
      </div>
    </div>
  );
};

export default Header;