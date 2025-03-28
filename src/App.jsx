import './App.css';
import Footer from './components/Footer/Footer.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import UserProfile from './components/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faGear } from '@fortawesome/free-solid-svg-icons';
import {
  faHome,
  faQuestionCircle,
  faSpoon,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { StoreContext } from './context/StoreContext.jsx';
import SidePopup from './components/SidePopup/SidePopup.jsx';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import TokenExpired from './components/TokenExpired/TokenExpired.jsx';
const App = () => {
  const [menu, setMenu] = useState('home');

  const {
    alerted,
    isOpen,
    openPopup,
    checked,
    closePopup,
    reloadData,
    setShowLogin,
    tokenExpired,
    isOpenProfile,
  } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const home = '/';
  // console.log(location.pathname);

  return (
    <>
      <SidePopup />
      {isOpenProfile && <UserProfile />}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      {location.pathname === '/' ||
        (location.pathname === '/all_food_list' && (
          <div
            className={`side-popup-opener ${isOpen ? 'left' : ''}`}
            onClick={() => {
              if (!checked && !isOpen) {
                alert('Please Select A Food To View Details');
              } else {
                !isOpen ? openPopup() : closePopup();
              }
            }}>
            <FontAwesomeIcon
              className={`icon ${!isOpen ? '' : 'forward'}`}
              icon={faBackward}
            />
          </div>
        ))}
      {location.pathname === home && (
        <div className="app-navbar">
          <NavBar setShowLogin={setShowLogin} />
        </div>
      )}
      {location.pathname === home && (
        <ul
          className="navbar-locations"
          style={{ position: 'sticky', top: 0, right: 0, zIndex: 10 }}>
          <a href="#navbar">
            <li
              className={menu === 'home' ? 'active' : ''}
              onClick={() => {
                setMenu('home');
              }}>
              <FontAwesomeIcon
                className="icon"
                icon={faHome}
              />
              <span>
                Home
                <div></div>
              </span>
            </li>
          </a>
          <hr />
          <a href="#top-menu-cards">
            <li
              onClick={() => {
                setMenu('Foods');
              }}
              className={menu === 'Foods' ? 'active' : ''}>
              <FontAwesomeIcon
                className="icon"
                icon={faSpoon}
              />
              <span>
                Foods
                <div></div>
              </span>
            </li>
          </a>
          <hr />
          <a href="#restaurants">
            <li
              className={menu === 'restaurants' ? 'active' : ''}
              onClick={() => {
                setMenu('restaurants');
              }}>
              <FontAwesomeIcon
                className="icon"
                icon={faStore}
              />
              <span>
                Restaurants
                <div></div>
              </span>
            </li>
          </a>
          <hr />
          <li
            onClick={() => {
              setMenu('About Us');
            }}
            className={menu === 'About Us' ? 'active' : ''}>
            <a href="#footer">
              <FontAwesomeIcon
                className="icon"
                icon={faQuestionCircle}
              />
              <span>
                About Us
                <div></div>
              </span>
            </a>
          </li>
          <hr />
          <li
            onClick={() => {
              setMenu('Settings');
              navigate('/settings');
              reloadData(0);
            }}
            className={menu === 'Settings' ? 'active' : ''}>
            <FontAwesomeIcon
              className="icon"
              icon={faGear}
            />
            <span>
              Settings
              <div></div>
            </span>
          </li>
        </ul>
      )}
      {alerted ? (
        <></>
      ) : (
        location.pathname !== '/user' && (
          <div className="go-up">
            <button
              onClick={() => {
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                setMenu('home');
              }}>
              <FontAwesomeIcon
                className="up-icon"
                icon={faArrowAltCircleUp}
              />
            </button>
          </div>
        )
      )}
      <div
        className="app"
        style={{
          margin: `${
            location.pathname === '/settings' || location.pathname === '/user'
              ? 'unset'
              : 'auto'
          }`,
          width: `${
            location.pathname === '/settings' || location.pathname === '/user'
              ? 'unset'
              : '85%'
          }`,
        }}
        id="home">
        {tokenExpired && <TokenExpired />}
        <div
          className={isOpen ? 'side-popup-container-wrap' : 'hide'}
          onClick={() => {
            closePopup();
          }}></div>

        <Outlet />
      </div>
      {location.pathname === '/settings' || location.pathname === '/user' ? (
        <></>
      ) : (
        <Footer />
      )}
    </>
  );
};

export default App;
