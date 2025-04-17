import { useContext } from 'react';
import './SidePopup.css';
import 'react-resizable/css/styles.css';
import { StoreContext } from '../../context/StoreContext';
import FoodDetails from '../../pages/FoodDetails/FoodDetails';
import { useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidePopup = () => {
  const { isOpen, foodView } = useContext(StoreContext);
  const location = useLocation();
  return (
    <div
      // style={{ width: `${width}%` }}
      className={`side-popup ${isOpen ? 'open' : ''} ${
        location.pathname === '/' ? 'in-home' : 'not-home'
      }`}>
      <div className="popup-contents">
        {foodView ? <FoodDetails foodView={foodView} /> : <></>}
      </div>
    </div>
  );
};

export default SidePopup;
