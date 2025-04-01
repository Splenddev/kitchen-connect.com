/* eslint-disable react/prop-types */
import { useState } from 'react';
import './CartCheckbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const CartCheckbox = ({ id }) => {
  const [clicked, setClicked] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [added, setAdded] = useState(false);
  const [cartText, setCartText] = useState('Added to cart');
  const [cartSubText, setCartSubText] = useState('Add to cart');

  //context
  const { addToCart, removeFromCart } = useContext(StoreContext);

  // Function to handle the click and start animation
  const handleCartClick = () => {
    setClicked(true);
    if (added) {
      setCartText('Removed from cart');
      removeFromCart(id);
    } else {
      addToCart(id);
      setCartText('Added to cart');
    }
  };

  // Function to remove the clicked class after animation ends
  const handleAnimationEnd = () => {
    setOpacity(true);
    if (cartSubText === 'Add to cart') {
      setAdded(true);
      setCartSubText('Remove from cart');
    } else {
      setAdded(false);
      setCartSubText('Add to cart');
    }
    setTimeout(() => {
      setOpacity(false);
    }, 1000);
    setClicked(false); // Remove the clicked class after animation completes
  };

  return (
    <button
      type="button"
      className={`cart-button ${clicked ? 'clicked' : ''}`}
      onClick={handleCartClick}
      onAnimationEnd={handleAnimationEnd} // Listen for the end of the animation
    >
      <span
        className={`add-to-cart ${clicked ? 'opacity-0' : ''} ${
          opacity ? 'opacity-0' : ''
        }`}>
        {cartSubText}
      </span>
      <span
        className={`added-to-cart ${clicked ? 'opacity-1' : ''} ${
          opacity ? 'opacity-1' : ''
        }`}>
        {cartText}
      </span>
      {/* <span className={`${clicked ? 'hide' : 'cart-text'}`}>
        {clicked !== true && cartText}
      </span> */}
      <FontAwesomeIcon
        className="fa fa-shopping-cart"
        icon={faShoppingCart}
      />
      <FontAwesomeIcon
        className="fa fa-box"
        icon={faBox}
      />
    </button>
  );
};

export default CartCheckbox;
