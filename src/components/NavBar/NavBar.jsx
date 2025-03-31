// /* eslint-disable react/prop-types */
import './NavBar.css';
import { assets } from '../../assets/assets/frontend_assets/assets.js';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { toast } from 'react-toastify';

const NavBar = () => {
  // const [] = useState(false);
  const {
    getTotalCartAmount,
    getTotalCartQuantity,
    token,
    setRightCard,
    setUserData,
    setIsOpenProfile,
    userInfo,
    url,
  } = useContext(StoreContext);
  // const [userState, setUserState] = useState(false);
  const navigate = useNavigate();
  const generateChars = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return console.log(result);
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
            <span onClick={generateChars}>Kitchen</span>
            <span>Connect.com</span>
          </p>
        </div>
        <div className="navbar-sub-locations">
          <div className="basket-container">
            <p
              onClick={() => {
                getTotalCartAmount() != 0
                  ? navigate('/cart')
                  : toast.error('The cart is empty.');
              }}>
              {getTotalCartAmount() != 0 ? (
                <span className="dot">{getTotalCartQuantity()}</span>
              ) : (
                <></>
              )}
              <FontAwesomeIcon
                className="icon"
                icon={faCartShopping}
              />
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
            <div
              onClick={() => {
                setIsOpenProfile(true);
              }}
              className="navbar-profile">
              {userInfo.profileImage ? (
                <img src={`${url}/images/${userInfo.profileImage}`} />
              ) : (
                <div className="kelly">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default NavBar;
