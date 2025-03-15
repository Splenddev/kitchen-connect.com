// /* eslint-disable react/prop-types */
import './NavBar.css';
import { assets } from '../../assets/assets/frontend_assets/assets.js';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faCartShopping,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

const NavBar = () => {
  // const [login, setLogin] = useState('');
  const {
    getTotalCartAmount,
    getTotalCartQuantity,
    token,
    setToken,
    setRightCard,
    setUserData,
  } = useContext(StoreContext);
  // useState
  const [userState, setUserState] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };
  return (
    <div
      className="main-nav"
      id="navbar">
      <div className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img
              className="logo"
              src={assets.logo_BW}
            />
          </Link>
          <p>
            <span>Kitchen</span>
            <span>Connect.com</span>
          </p>
        </div>
        <div className="navbar-sub-locations">
          <div className="basket-container">
            <p>
              <Link to="/cart">
                {getTotalCartAmount() != 0 ? (
                  <span className="dot">{getTotalCartQuantity()}</span>
                ) : (
                  <></>
                )}
                <FontAwesomeIcon
                  className="icon"
                  icon={faCartShopping}
                />
              </Link>
            </p>
          </div>
          {token === '' ? (
            <div className="user-icon">
              <button
                onClick={() => {
                  navigate('/user');
                  setRightCard(true);
                  setUserData({ name: '', email: '', password: '' });
                }}>
                Sign In
              </button>
            </div>
          ) : (
            <div className="navbar-profile">
              <div
                className="kelly"
                onClick={() =>
                  userState ? setUserState(false) : setUserState(true)
                }>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <ul
                className={` nav-profile-dropdown ${userState ? 'show' : ''}`}>
                <div>
                  <li>
                    <FontAwesomeIcon icon={faBagShopping} />
                    <h>Orders</h>
                  </li>
                  <li onClick={logout}>
                    <FontAwesomeIcon icon={faSignOut} />
                    <h>Logout</h>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default NavBar;
