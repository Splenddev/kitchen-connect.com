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
import { foodDetailInformation } from '../../assets/assets/frontend_assets/foodDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import Wellness from '../../components/Wellness/Wellness';
import Extras from '../../components/Extras/Extras';

const FoodDetails = () => {
  // useState
  const [foodDetailsRightStateHandler, setFoodDetailsRightStateHandler] =
    useState('essential');
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
  const quantity = cartItems[foodView.id] ? cartItems[foodView.id] : 0;
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

      <div
        className={`food-details-main-container  ${
          location.pathname === '/' ? 'in-home' : ''
        }`}>
        <div className="food-details-left">
          <p className="compliment-tag">
            {foodView.name}
            {/* Good Food Offers A Great Smile And Brings People Together with Lasting
            Joy */}
          </p>
          <p className="sub-tag">{foodView.description}</p>
          <div className="food-details">
            <div className="kitchen-image__food-name">
              <div className="kitchen-image-container">
                <img src={kitchenImage} />
              </div>
              <div className="food-name__ratings__reviews">
                <div className="left">
                  <p className="kitchen">{foodView.kitchen_name}</p>
                  <div className="rating_stats">
                    {(28 + parseInt(foodView.id)) / 10}{' '}
                    <div className="star-container">
                      <div className="meter"></div>
                    </div>
                    <span>(1227 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="food-details-header">
            <img src={url + '/images/' + foodView.image} />
          </div>
        </div>
        <div className="food-details-right">
          <div className="food-details-right-nav">
            <div
              className={`nav-box first ${
                foodDetailsRightStateHandler === 'essential' ? 'essential' : ''
              }`}
              onClick={() => setFoodDetailsRightStateHandler('essential')}>
              Essentials
            </div>
            <div
              className={`nav-box ${
                foodDetailsRightStateHandler === 'nutrients' ? 'nutrients' : ''
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
              Extras & Mods
            </div>
          </div>
          <div className="food-details-right-body">
            {foodDetailsRightStateHandler === 'nutrients' && (
              <NutrientsNavBody foodDetailInformation={foodDetailInformation} />
            )}
            {foodDetailsRightStateHandler === 'essential' && (
              <CategoryNavBody
                name={foodView.name}
                category={foodView.category}
                price={foodView.price}
                foodInfo={foodView ? foodView.foodInfo : ''}
                ingredients={foodView ? foodView.ingredients : ''}
                allergens={foodView ? foodView.allergens : ''}
                foodDetailInformation={foodDetailInformation}
              />
            )}
            {foodDetailsRightStateHandler === 'wellness' && (
              <Wellness
                benefits={foodView.benefits}
                risks={foodView.risks}
              />
            )}
            {foodDetailsRightStateHandler === 'extras' && (
              <Extras
                extras={foodView.extras}
                mods={foodView.mods}
              />
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
    </>
  );
};

export default FoodDetails;
