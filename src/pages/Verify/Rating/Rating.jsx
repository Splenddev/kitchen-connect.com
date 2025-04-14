/* eslint-disable react/prop-types */
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import './Ratings.css';

const Rating = ({ setRating }) => {
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  const starHandler = (star) => {
    if (star === 1) {
      setStar1(!star1);
      if (star2 || star3 || star4 || star5) {
        setStar2(false);
        setStar3(false);
        setStar4(false);
        setStar5(false);
        setStar1(true);
      }
    }
    if (star === 2) {
      setStar2(!star2);
      if (!star1) {
        setStar1(true);
      }
      if (star3 || star4 || star5) {
        setStar2(true);
        setStar3(false);
        setStar4(false);
        setStar5(false);
      }
    }
    if (star === 3) {
      setStar3(!star3);
      if (!star1 || !star2) {
        setStar1(true);
        setStar2(true);
      }
      if (star4 || star5) {
        setStar3(true);
        setStar4(false);
        setStar5(false);
      }
    }
    if (star === 4) {
      setStar4(!star4);
      if (!star1 || !star2 || !star3) {
        setStar1(true);
        setStar2(true);
        setStar3(true);
      }
      if (star5) {
        setStar4(true);
        setStar5(false);
      }
    }
    if (star === 5) {
      setStar5(!star5);
      if (!star1 || !star2 || !star3 || !star4) {
        setStar1(true);
        setStar2(true);
        setStar3(true);
        setStar4(true);
      }
    }
    setRating(star);
  };
  useEffect(() => {
    if (!star1 && !star2 && !star3 && !star4 && !star5) {
      setRating(0);
    }
  });
  return (
    <div>
      <div className="verify-review-star">
        <FontAwesomeIcon
          className={`icon ${star1 && 'active'}`}
          icon={faStar}
          onClick={() => starHandler(1)}
        />
        <FontAwesomeIcon
          className={`icon ${star2 && 'active'}`}
          icon={faStar}
          onClick={() => starHandler(2)}
        />
        <FontAwesomeIcon
          className={`icon ${star3 && 'active'}`}
          icon={faStar}
          onClick={() => starHandler(3)}
        />
        <FontAwesomeIcon
          className={`icon ${star4 && 'active'}`}
          icon={faStar}
          onClick={() => starHandler(4)}
        />
        <FontAwesomeIcon
          className={`icon ${star5 && 'active'}`}
          icon={faStar}
          onClick={() => starHandler(5)}
        />
      </div>
    </div>
  );
};

export default Rating;
