import './UserProfile.css';
import { assets } from '../../assets/assets/frontend_assets/assets';
import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faAngleDown,
  faBell,
  faBowlFood,
  faCartShopping,
  faGear,
  faSignOut,
  faUserShield,
  faClose,
  faUpRightFromSquare,
  faBagShopping,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
const UserProfile = () => {
  const navigate = useNavigate();
  const {
    userInfo,
    allOrders,
    setIsOpenProfile,
    logout,
    isOpenProfile,
    foodEaten,
    loadFoodEaten,
    getTotalCartQuantity,
  } = useContext(StoreContext);
  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0, rotateY: -20 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
    exit: {
      x: '120%',
      opacity: 0,
      rotateY: -30,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };
  return (
    <div className="user-profile">
      <AnimatePresence>
        {isOpenProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpenProfile(false)}
            className="user-profile-overlay"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className="user-profile-contents"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          <div className="user-profile-top">
            <div className="user-profile-image-email ">
              <img
                src={assets.profile_image}
                alt="profile image"
              />
              <div>
                <p className="name">
                  {userInfo.name}{' '}
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="icon"
                  />
                </p>
                <p className="email">{userInfo.email}</p>
              </div>
              <FontAwesomeIcon
                onClick={() => setIsOpenProfile(false)}
                className="icon"
                icon={faClose}
              />
            </div>
            <hr />
            <div
              className="user-profile-list-container"
              onClick={() => {
                setIsOpenProfile(false);
              }}>
              <div className="user-profile-list-elements layout">
                <FontAwesomeIcon
                  className="icon"
                  icon={faCartShopping}
                />
                <div className="flex-sb">
                  <p>Cart</p>
                  <p>{getTotalCartQuantity() ? getTotalCartQuantity() : 0}</p>
                </div>
              </div>
              <div
                onClick={() => {
                  navigate('/orders');
                  setIsOpenProfile(false);
                }}
                className="user-profile-list-elements layout">
                <FontAwesomeIcon
                  className="icon"
                  icon={faBagShopping}
                />
                <div className="flex-sb">
                  <p>Orders</p>
                  <p>{allOrders}</p>
                </div>
              </div>
              <div className="user-profile-list-elements layout">
                <FontAwesomeIcon
                  className="icon bell"
                  icon={faBell}
                />
                <div className="flex-sb">
                  <p>Notifications</p>
                  <p>0</p>
                </div>
              </div>
              <div className="user-profile-list-elements layout">
                <FontAwesomeIcon
                  className="icon bell"
                  icon={faBowlFood}
                />
                <div className="flex-sb">
                  <p>Foods eaten</p>
                  <div className="flex">
                    <p>{foodEaten ? foodEaten : 0}</p>
                    {loadFoodEaten && (
                      <Loader
                        width={'20px'}
                        height={'20px'}
                        borderWidth={'3px'}
                        color_primary={'red'}
                        color_secondary={'#eee2'}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="user-profile-list-elements layout">
                <FontAwesomeIcon
                  className="icon bell"
                  icon={faWallet}
                />
                <p>Rewards</p>
              </div>
              <div className="user-profile-list-elements layout">
                <FontAwesomeIcon
                  className="icon bell"
                  icon={faUserShield}
                />
                <p>Security</p>
              </div>
              <div className="user-profile-list-elements layout">
                <FontAwesomeIcon
                  className="icon"
                  icon={faGear}
                />
                <div className="flex-sb">
                  <p>Settings</p>
                  <FontAwesomeIcon icon={faAngleDown} />
                </div>
              </div>
            </div>
          </div>
          <div className="user-profile-bottom">
            <p>KitchenConnect.com</p>
            <hr />
            <div className="flex">
              <button
                className="flex"
                onClick={logout}>
                <p>Logout</p>
                <FontAwesomeIcon icon={faSignOut} />
              </button>
              <button className="flex">
                <p>Contact Us</p>
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </button>
            </div>
            <hr />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default UserProfile;
