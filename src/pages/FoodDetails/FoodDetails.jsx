import './FoodDetails.css';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCheck,
  faClose,
  faHandPointer,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../../context/StoreContext';
import NutrientsNavBody from '../../components/NutrientsNavBody/NutrientsNavBody';
import CategoryNavBody from '../../components/CategoryNavBody/CategoryNavBody';
import { useLocation, useNavigate } from 'react-router-dom';
import Wellness from '../../components/Wellness/Wellness';
import Extras from '../../components/Extras/Extras';

const FoodDetails = () => {
  // useState
  const [foodDetailsRightStateHandler, setFoodDetailsRightStateHandler] =
    useState('essential');
  const [foodDetailsNavbar, setFoodDetailsNavbar] = useState('Information');
  const {
    addToCart,
    removeFromCart,
    icon,
    foodView,
    setIcon,
    selectState,
    kitchenImage,
    removeAllFromCart,
    url,
    cartItems,
    setSelectState,
    closePopup,
    scrollToTop,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const quantity = cartItems === undefined ? 0 : cartItems[foodView.id];
  useEffect(() => {
    if (quantity === 0) {
      setSelectState(`Select Me!${foodView.id}`);
      setIcon(false);
    }
    if (quantity >= 1) {
      setSelectState(`Selected${foodView.id}`);
      setIcon(true);
    }
  }, [foodView.id, quantity, setIcon, setSelectState]);
  return (
    <>
      <div
        className={`close-icon flex ${
          location.pathname === '/' ? 'in-home' : ''
        }`}>
        <div
          className="close-icon-container flex"
          onClick={closePopup}>
          <FontAwesomeIcon
            icon={faClose}
            className="icon"
          />{' '}
          <p>Close</p>
        </div>
      </div>

      <div className="food-details-main-container">
        <div className="food-details-top_name_desc mt-30 flex fld g-10">
          <p className="food-details-food_name">{foodView.name}</p>
          <p className="food-details-food_description">
            {foodView.description}
          </p>
        </div>
        <div
          className={`food-details-container  ${
            location.pathname === '/' ? 'in-home' : ''
          }`}>
          <div className="food-details-left">
            <div className="food-details-header">
              <img
                src={url + '/images/' + foodView.image}
                alt="header image"
              />
            </div>
          </div>

          <div className="food-details-right">
            <div className="food-details-right-nav">
              <div
                className={`nav-box first ${
                  foodDetailsRightStateHandler === 'essential'
                    ? 'essential'
                    : ''
                }`}
                onClick={() => setFoodDetailsRightStateHandler('essential')}>
                Essentials
              </div>
              <div
                className={`nav-box ${
                  foodDetailsRightStateHandler === 'nutrients'
                    ? 'nutrients'
                    : ''
                }`}
                onClick={() => setFoodDetailsRightStateHandler('nutrients')}>
                Nutrients
              </div>
              <div
                className={`nav-box ${
                  foodDetailsRightStateHandler === 'wellness' ? 'wellness' : ''
                }`}
                onClick={() => setFoodDetailsRightStateHandler('wellness')}>
                Wellness
              </div>
              <div
                className={`nav-box last ${
                  foodDetailsRightStateHandler === 'extras' ? 'extras' : ''
                }`}
                onClick={() => setFoodDetailsRightStateHandler('extras')}>
                Extras
              </div>
            </div>
            <div className="food-details-right-body">
              {foodDetailsRightStateHandler === 'nutrients' && (
                <NutrientsNavBody
                  reviews={foodView.reviews}
                  foodInfo={foodView.foodInfo}
                />
              )}
              {foodDetailsRightStateHandler === 'essential' && (
                <CategoryNavBody
                  name={foodView.name}
                  category={foodView.category}
                  price={foodView.price}
                  ingredients={foodView ? foodView.ingredients : ''}
                  allergens={foodView ? foodView.allergens : ''}
                />
              )}
              {foodDetailsRightStateHandler === 'wellness' && (
                <Wellness
                  benefits={foodView.benefits}
                  risks={foodView.risks}
                />
              )}
              {foodDetailsRightStateHandler === 'extras' && (
                <Extras extras={foodView ? foodView.extras : []} />
              )}
            </div>
            <div className="increase-quantity">
              <p
                onClick={() => {
                  if (quantity > 0) {
                    removeFromCart(foodView.id);
                  }
                }}>
                <FontAwesomeIcon icon={faMinus} />
              </p>
              <p>{quantity}</p>
              <p
                onClick={() => {
                  addToCart(foodView.id);
                }}>
                <FontAwesomeIcon icon={faPlus} />
              </p>
            </div>
            <div className="food-details-right-bottom ">
              <div
                className={`left ${
                  location.pathname === '/cart' && 'in-cart'
                } flex-sb flex-center`}
                onClick={() => {
                  closePopup();
                  scrollToTop();
                  if (location.pathname === '/cart') {
                    return;
                  }
                  navigate('/cart');
                }}>
                {location.pathname !== '/cart' ? 'To ' : 'In '}
                Cart
                <FontAwesomeIcon
                  className="icon"
                  icon={faCartShopping}
                />
              </div>
              <div className="right">
                <button
                  onClick={() => {
                    if (selectState === `Select Me!${foodView.id}` && !icon) {
                      setIcon(true);
                      setSelectState(`Selected${foodView.id}`);
                      addToCart(foodView.id);
                    } else {
                      setIcon(false);
                      removeAllFromCart(foodView.id);
                      setSelectState(`Select Me!${foodView.id}`);
                    }
                  }}
                  className={`select-food ${
                    selectState === `Selected${foodView.id}`
                      ? 'selected'
                      : 'not-selected'
                  }`}>
                  {selectState === `Selected${foodView.id}`
                    ? 'Selected'
                    : 'Select Me!'}
                  {icon ? (
                    <FontAwesomeIcon
                      className="icon"
                      icon={faCheck}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="icon pointer"
                      icon={faHandPointer}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="food-details-bottom_navbar mt-10">
        <ul className="flex j-sb g-5">
          <li
            className={foodDetailsNavbar === 'Reviews' ? 'active' : ''}
            onClick={(e) => setFoodDetailsNavbar(e.target.innerHTML)}>
            Reviews
          </li>
          <li
            className={foodDetailsNavbar === 'Report' ? 'active' : ''}
            onClick={(e) => setFoodDetailsNavbar(e.target.innerHTML)}>
            Report
          </li>
          <li
            className={foodDetailsNavbar === 'Information' ? 'active' : ''}
            onClick={(e) => setFoodDetailsNavbar(e.target.innerHTML)}>
            Information
          </li>
        </ul>
      </div>
    </>
  );
};

export default FoodDetails;
