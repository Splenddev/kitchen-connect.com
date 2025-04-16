/* eslint-disable react/prop-types */
import './TopMenu.css';
import '../CheckBox/CheckBox.css';
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
// import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faLeaf,
  faNairaSign,
} from '@fortawesome/free-solid-svg-icons';
// import TypingEffect from '../TypingEffect/TypingEffect';
import CartCheckbox from '../CartCheckbox/CartCheckbox';

const TopMenu = ({
  name,
  image,
  kitchen,
  description,
  id,
  price,
  kitchenImage,
  foodInfo,
  category,
  textHighlight,
  reviews,
}) => {
  const {
    viewDetailsHandler,
    setFoodView,
    url,
    k_imageHandler,
    addToFavorite,
    removeFromFavorite,
  } = useContext(StoreContext);
  // useState

  const [isFavorite, setIsFavorite] = useState(false);
  const setColor = (category) => {
    if (
      category === 'Rolls' ||
      (category === 'Snacks, Non-vegetarian' && category !== undefined)
    ) {
      return '#05940c';
    }
    if (category === 'Sandwich' && category !== undefined) {
      return '#c9a60d';
    }
    if (category === 'Cake' && category !== undefined) {
      return '#aa0779';
    }
    if (category === 'Deserts' && category !== undefined) {
      return '#e7803d';
    }
    if (category === 'Soup') {
      return '#a9a9a9';
    }
  };
  const favoriteHandler = () => {
    if (isFavorite) {
      setIsFavorite(false);
      removeFromFavorite(id);
    } else {
      addToFavorite(id);
      setIsFavorite(true);
    }
  };
  return (
    <div className="top-menu-cards ">
      <div className="image-container">
        <div className="blured-bg ">
          <img
            src={url + '/images/' + image}
            alt="food image"
          />
        </div>
        <img
          className="main-img"
          src={url + '/images/' + image}
          alt="food image"
        />
      </div>
      <div className="top-menu-card">
        <div className="food-other-contents">
          <div className="ratings--name">
            <p>
              <h2 dangerouslySetInnerHTML={{ __html: textHighlight(name) }} />
            </p>
            <div
              onClick={favoriteHandler}
              className={`top-menu-favorite flex-center ${
                isFavorite ? 'is-fav' : ''
              }`}>
              <FontAwesomeIcon
                className="icon"
                icon={faHeart}
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="top-menu-categories flex-sb">
            <div
              style={{ background: setColor(category) }}
              className="top-menu-category flex-sb">
              <FontAwesomeIcon
                className="icon"
                icon={faLeaf}
              />{' '}
              {category ? category : 'None'}
            </div>
            <button
              onClick={() => {
                k_imageHandler(kitchen);
                setFoodView({
                  name,
                  kitchen_name: kitchen.kitchen_name,
                  description,
                  id,
                  price,
                  image,
                  kitchenImage,
                  foodInfo,
                  category,
                  ingredients: foodInfo.category.ingredients,
                  allergens: foodInfo.category.allergens,
                  benefits: foodInfo.healthImpacts.benefits,
                  risks: foodInfo.healthImpacts.risks,
                  extras: foodInfo.extras,
                  calories: foodInfo.nutrients.calories,
                  others: foodInfo.nutrients.others,
                  reviews,
                });
                viewDetailsHandler();
              }}>
              View Details
            </button>
          </div>
          <hr className="hr" />
          <p
            className={`description ${
              description.split(' ').length > 25 ? 'blur' : ''
            }`}>
            {description ? (
              description.split(' ').length > 25 ? (
                <div className="info-text-wrap">
                  {description.split(' ').slice(0, 25).join(' ')}
                  ...{' '}
                  <span className="info-text">more in food detail page</span>
                </div>
              ) : (
                description
              )
            ) : (
              'No description available'
            )}
          </p>
        </div>
      </div>
      <div className="top-menu-card-bottom">
        <hr className="hr" />
        <div className="add-to-cart_price">
          <p className="price">
            <FontAwesomeIcon icon={faNairaSign} />
            {price}
          </p>
          <CartCheckbox id={id} />
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
