/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CategoryNavBody.css';
import { faAngleDown, faNairaSign } from '@fortawesome/free-solid-svg-icons';
import {
  // useContext,
  useState,
} from 'react';
// import { StoreContext } from '../../context/StoreContext';

const CategoryNavBody = ({
  // foodDetailInformation,
  name,
  price,
  // foodInfo,
  allergens,
  category,
  ingredients,
}) => {
  // useState
  const [optionMenu, setOptionMenu] = useState('');

  // const {food_list}=useContext(StoreContext)
  // const info = foodDetailInformation[0];
  return (
    <div className="category-nav-body">
      <div className="food-name-and-price">
        <h2 className="food-name">{name}</h2>
        <p className="flex-sb-fld-column food-price">
          <span>
            <FontAwesomeIcon icon={faNairaSign} /> {price}
          </span>
          <span className="per-plate">Per Plate</span>
        </p>
      </div>
      <div className="option-menu-wrapper">
        <div className="category-and-icon option-menu">
          <div
            className={`dialogue-box-container ${
              optionMenu === 'category' ? '' : 'hiden'
            }`}>
            <div className="dialogue-box">
              Category tells you which type of food this is. Whether it is
              vegetarian or non-vegetarian, desert,staple and more
            </div>
          </div>
          <span
            className="flex-sb sub-menu-wrap"
            onClick={() =>
              optionMenu === 'category'
                ? setOptionMenu('')
                : setOptionMenu('category')
            }>
            Category{' '}
            <FontAwesomeIcon
              className={`icon ${optionMenu === 'category' ? 'show' : ''}`}
              icon={faAngleDown}
            />
          </span>
          <ul className={`sub-menu ${optionMenu === 'category' ? 'show' : ''}`}>
            <div>
              <li>{category}</li>
            </div>
          </ul>
        </div>
        <div className="ingredients-and-icon option-menu">
          <div
            className={`dialogue-box-container ${
              optionMenu === 'ingredients' ? '' : 'hiden'
            }`}>
            <div className="dialogue-box">
              Check out the ingredients used in your dishes. Know what goes into
              your meal before you order!
            </div>
          </div>
          <span
            className="flex-sb sub-menu-wrap"
            onClick={() =>
              optionMenu === 'ingredients'
                ? setOptionMenu('')
                : setOptionMenu('ingredients')
            }>
            Ingredients
            <FontAwesomeIcon
              className={`icon ${optionMenu === 'ingredients' ? 'show' : ''}`}
              icon={faAngleDown}
            />
          </span>
          <ul
            className={`sub-menu ${
              optionMenu === 'ingredients' ? 'show' : ''
            }`}>
            <div>
              {!ingredients ? (
                <p>nothing</p>
              ) : (
                ingredients.map((item, index) => <li key={index}>{item}</li>)
              )}
            </div>
          </ul>
        </div>
        <div className="allergens-and-icon option-menu">
          <div
            className={`dialogue-box-container ${
              optionMenu === 'allergens' ? '' : 'hiden'
            }`}>
            <div className="dialogue-box">
              Stay safe while you eat! Review allergens in each dish to ensure
              it meets your dietary needs.
            </div>
          </div>
          <span
            className="flex-sb sub-menu-wrap"
            onClick={() =>
              optionMenu === 'allergens'
                ? setOptionMenu('')
                : setOptionMenu('allergens')
            }>
            Allergens
            <FontAwesomeIcon
              className={`icon ${optionMenu === 'allergens' ? 'show' : ''}`}
              icon={faAngleDown}
            />
          </span>
          <ul
            className={`sub-menu ${optionMenu === 'allergens' ? 'show' : ''}`}>
            <div>
              {allergens ? (
                allergens.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <></>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavBody;
