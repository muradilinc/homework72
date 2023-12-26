import {Link} from 'react-router-dom';
import {DISHES_PAGE, HOME_PAGE, ORDERS_PAGE} from '../../constants/routes';

const Header = () => {
  return (
    <div className="bg-blue-500 py-6 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl"><Link to={HOME_PAGE}>Turtle Pizza</Link></h1>
        </div>
        <div>
          <ul className="flex gap-x-3">
            <li><Link to={DISHES_PAGE}>Dishes</Link></li>
            <li><Link to={ORDERS_PAGE}>Orders</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;