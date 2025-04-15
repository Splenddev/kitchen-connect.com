/* eslint-disable react/prop-types */
// import { assets } from '../../assets/assets/frontend_assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconicRestaurants.css';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

const IconicRestaurants = ({ name, location }) => {
  const navigate = useNavigate();
  const {
    setRestaurantsView,
    scrollToTop,
    bissyJoy,
    tastyMunch,
    arena,
    krafty,
    iyaAfusat,
  } = useContext(StoreContext);
  const restaurantsHandler = () => {
    setRestaurantsView(name);
    scrollToTop();
    navigate('/restaurants');
  };
  return (
    <div
      className="iconic_restaurant"
      onClick={restaurantsHandler}>
      <div className="image_container">
        {name === 'Arena' && (
          <img
            src={arena}
            alt="kitchen image"
          />
        )}
        {name === 'Bissy Joy' && (
          <img
            src={bissyJoy}
            alt="kitchen image"
          />
        )}
        {name === 'Krafty' && (
          <img
            src={krafty}
            alt="kitchen image"
          />
        )}
        {name === 'Iya Afusat' && (
          <img
            src={iyaAfusat}
            alt="kitchen image"
          />
        )}
        {name === 'Tasty Munch' && (
          <img
            src={tastyMunch}
            alt="kitchen image"
          />
        )}
      </div>
      <div className="other-contemts">
        <h2>{name}</h2>
        <div className="working-hours-days">
          <p>Working Days: Monday - Sunday</p>
          <p>Opening Time: 9:00am - 8:00pm</p>
        </div>
        <div className="location">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default IconicRestaurants;
