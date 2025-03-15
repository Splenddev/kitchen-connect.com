import './App.css';
import Footer from './components/Footer/Footer.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faGear } from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faGifts,
  faHome,
  faQuestionCircle,
  faSpoon,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { StoreContext } from './context/StoreContext.jsx';
import SidePopup from './components/SidePopup/SidePopup.jsx';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import Notifications from './pages/Notifications/Notifications.jsx';
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
  } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const home = '/';
  // console.log(location.pathname);

  return (
    <>
      <SidePopup />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <div
        style={{
          background: `${location.pathname === '/settings' ? '#8a8989' : ''}`,
        }}
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
      {location.pathname === home ? (
        <div className="app-navbar">
          <NavBar setShowLogin={setShowLogin} />
        </div>
      ) : (
        <></>
      )}
      {location.pathname === home ? (
        <ul className="navbar-locations">
          <Notifications />
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
              setMenu('Notifications');
            }}
            className={menu === 'Notifications' ? 'active' : 'notifi'}>
            <FontAwesomeIcon
              className="icon"
              icon={faBell}
            />
            <span>
              Notifications
              <div></div>
            </span>
          </li>
          <hr />
          <li
            className={menu === 'gifts' ? 'active' : ''}
            onClick={() => {
              setMenu('gifts');
            }}>
            <FontAwesomeIcon
              className="icon"
              icon={faGifts}
            />
            <span>
              Gifts
              <div></div>
            </span>
          </li>
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
      ) : (
        <></>
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
              : '90%'
          }`,
        }}
        id="home">
        <div
          className={isOpen ? 'side-popup-container-wrap' : 'hide'}
          onClick={() => {
            closePopup();
          }}></div>
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
