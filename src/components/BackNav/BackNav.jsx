/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './BackNav.css';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeftLong,
  faCartShopping,
  faClose,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const BackNav = ({
  goto,
  other,
  sup,
  noCompanyName,
  setData,
  setRightCard,
}) => {
  const location = useLocation();
  const { getTotalCartAmount, getTotalCartQuantity, scrollToTop, closePopup } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className={`back-nav ${location.pathname === '/' ? '' : sup}`}>
      {goto !== 'home' ? (
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className="icon"
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => {
            closePopup();
            navigate('/');
            setData({
              name: '',
              email: '',
              password: '',
            });

            setRightCard(false);
          }}
          className="icons"
          icon={faHome}
        />
      )}
      {!noCompanyName ? <h2>KitchenConnect.com</h2> : <></>}
      {other === 'cart' || location.pathname === '/' ? (
        <p
          onClick={() => {
            if (getTotalCartQuantity() === 0)
              return alert(`Can't proceed. Cart is empty!`);
            navigate('/cart');
            closePopup();
            scrollToTop();
          }}>
          <FontAwesomeIcon
            className="icon"
            icon={faCartShopping}
          />
          {getTotalCartAmount() != 0 ? (
            <span className="dot">{getTotalCartQuantity()}</span>
          ) : (
            <></>
          )}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BackNav;
