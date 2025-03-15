/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Wellness.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Wellness = ({ benefits, risks }) => {
  const [wellnessMenu, setWellnessMenu] = useState('');
  return (
    <div className="wellness-body">
      <div className="wellness-menu-wrapper">
        <div className="benefits-and-icon wellness-menu">
          <div
            className={`dialogue-box-container ${
              wellnessMenu === 'benefits' ? '' : 'hiden'
            }`}>
            <div className="dialogue-box">
              benefits tells you which type of food this is. Whether it is
              vegetarian or non-vegetarian, desert,staple and more
            </div>
          </div>
          <span
            className="flex-sb sub-menu-wrap"
            onClick={() =>
              wellnessMenu === 'benefits'
                ? setWellnessMenu('')
                : setWellnessMenu('benefits')
            }>
            Benefits{' '}
            <FontAwesomeIcon
              className={`icon ${wellnessMenu === 'benefits' ? 'show' : ''}`}
              icon={faAngleDown}
            />
          </span>
          <ul
            className={`sub-menu ${wellnessMenu === 'benefits' ? 'show' : ''}`}>
            <div>
              {!benefits ? (
                <></>
              ) : (
                benefits.map((item, index) => <li key={index}>{item}</li>)
              )}
            </div>
          </ul>
        </div>
        <div className="risks-and-icon wellness-menu">
          <div
            className={`dialogue-box-container ${
              wellnessMenu === 'risks' ? '' : 'hiden'
            }`}>
            <div className="dialogue-box">
              Check out the risks used in your dishes. Know what goes into your
              meal before you order!
            </div>
          </div>
          <span
            className="flex-sb sub-menu-wrap"
            onClick={() =>
              wellnessMenu === 'risks'
                ? setWellnessMenu('')
                : setWellnessMenu('risks')
            }>
            Risks
            <FontAwesomeIcon
              className={`icon ${wellnessMenu === 'risks' ? 'show' : ''}`}
              icon={faAngleDown}
            />
          </span>
          <ul className={`sub-menu ${wellnessMenu === 'risks' ? 'show' : ''}`}>
            <div>
              {!risks ? (
                <></>
              ) : (
                risks.map((item, index) => <li key={index}>{item}</li>)
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wellness;
