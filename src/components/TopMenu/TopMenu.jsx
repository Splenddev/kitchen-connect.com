/* eslint-disable react/prop-types */
import './TopMenu.css';
import '../CheckBox/CheckBox.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';
import TypingEffect from '../TypingEffect/TypingEffect';
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
}) => {
  const {
    viewDetailsHandler,
    setFoodView,
    url,
    // addToCart,
    // removeFromCart,
    // setChecked,
    // setSelectState,
    // selectState,
    k_imageHandler,
    adding,
  } = useContext(StoreContext);

  // const checkboxHandler = (e) => {
  //   setChecked(e.target.checked);
  //   if (e.target.checked) {
  //     setSelectState(`Selected${id}`);
  //     console.log(selectState);
  //     k_imageHandler(kitchen);
  //     setChecked(e.target.checked);
  //     addToCart(id);
  //     setFoodView({
  //       name,
  //       kitchen_name: kitchen.kitchen_name,
  //       description,
  //       id,
  //       price,
  //       kitchenImage,
  //       category,
  //       image,
  //       foodInfo,
  //       ingredients: foodInfo.category.ingredients,
  //       allergens: foodInfo.category.allergens,
  //       benefits: foodInfo.healthImpacts.benefits,
  //       risks: foodInfo.healthImpacts.risks,
  //       extras: foodInfo.extrasAndMods.extras,
  //       mods: foodInfo.extrasAndMods.mods,
  //       calories: foodInfo.nutrients.calories,
  //       others: foodInfo.nutrients.others,
  //     });
  //   } else if (!e.target.checked) {
  //     setChecked(false);
  //     removeFromCart(id);
  //     setFoodView({});
  //     setSelectState(`Select Me!${id}`);
  //   }
  // };
  return (
    <div className={'top-menu-cards ' + adding}>
      {adding === `add${id}` && <TypingEffect />}

      <div className="top-menu-card">
        <div className="image-container">
          <img src={url + '/images/' + image} />
        </div>
        <div className="food-other-contents">
          <div className="ratings--name">
            <h2>{name}</h2>
            <CartCheckbox id={id} />
            {/* <div className="checkbox-wrapper top-menu">
              <input
                id={`_checkbox-26 ${id}`}
                type="checkbox"
                onChange={checkboxHandler}
              />
              <label
                className="checkbox"
                htmlFor={`_checkbox-26 ${id}`}>
                <div className="tick_mark"></div>
              </label>
            </div> */}
          </div>
          <hr className="hr" />
          <p className="description">{description}</p>
        </div>
      </div>
      <div className="top-menu-card-bottom">
        <hr className="hr" />
        <div className="view-details___price">
          <button
            onClick={() => {
              k_imageHandler(kitchen);
              setFoodView({
                name,
                kitchen_name: kitchen.kitchen_name,
                description,
                id,
                price,
                kitchenImage,
                foodInfo,
                category,
                ingredients: foodInfo.category.ingredients,
                allergens: foodInfo.category.allergens,
                benefits: foodInfo.healthImpacts.benefits,
                risks: foodInfo.healthImpacts.risks,
                extras: foodInfo.extrasAndMods.extras,
                mods: foodInfo.extrasAndMods.mods,
                calories: foodInfo.nutrients.calories,
                others: foodInfo.nutrients.others,
                image,
              });
              viewDetailsHandler();
            }}>
            View Details
          </button>
          <p className="price">
            <FontAwesomeIcon icon={faNairaSign} />
            {price * 100}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
