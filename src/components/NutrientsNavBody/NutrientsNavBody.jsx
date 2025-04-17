/* eslint-disable react/prop-types */
import './NutrientsNavBody.css';
import CircularProgress from './CircularProgress.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoltLightning,
  faBottleDroplet,
  faFish,
  faLeaf,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';

const NutrientsNavBody = ({ reviews, foodInfo }) => {
  const getTotalGrams = () => {
    let total = 0;
    foodInfo.nutrients.others.forEach((nut) => {
      total += nut.composition;
    });
    return total;
  };
  const total = getTotalGrams();
  const lightCal =
    'Light & Easy! A small bite to keep you going without the heaviness.';
  const moderateCal =
    'Just right—balanced and satisfying without going overboard.';
  const heartyCal = 'Hearty choice! Just be mindful of the portion size.';
  const heavyCal = 'Big on calories—enjoy, but maybe not every day.';
  const loadedCal =
    'Loaded with fuel! Best for when you need the extra energy.';
  return (
    <div className="nutrients">
      <h2>Nutritional Informations</h2>
      <div className="flex-center nutrients-info">
        <div className="circle-rotate flex-center-center ">
          <div className="circle-rotate-contents flex fld ">
            <FontAwesomeIcon
              icon={faBoltLightning}
              className="icon"
            />
            <b>Calories</b>
            <b> {foodInfo.nutrients.calories}kcal</b>
          </div>
          <div className="circle-border p-abs"></div>
        </div>
        <div className="flex j-sb mb-20 nutrients-percentage-container">
          {foodInfo.nutrients.others.map((nutrient, index) => (
            <div
              key={index}
              className="nutrients-percentage">
              <CircularProgress
                value={
                  Math.round((nutrient.composition / total) * 100 * 100) / 100
                }
                label={nutrient.name}
              />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="nutrients-composition ">
        <h2>Composition (grams)</h2>
        <div className="flex-center g-5 nutrients-circle-progress">
          <div className="composition-container flex-center fld mr-10">
            <div style={{ background: 'var(--main-color) ' }}>
              <p>{foodInfo.nutrients.calories} kcal</p>
            </div>
            <span>Calories</span>
          </div>
          {foodInfo.nutrients.others.map((nutrient, index) => (
            <div
              key={index}
              className={`composition-container flex-center fld ${
                nutrient.name === 'Protein' && 'fish'
              } ${
                nutrient.name === 'Carbohydrates' ||
                nutrient.name === 'Carbohydrate'
                  ? 'leaf'
                  : ''
              } ${
                nutrient.name === 'Fats' || nutrient.name === 'Fat'
                  ? 'fats'
                  : ''
              }`}>
              <div className="flex-center g-10">
                {nutrient.name === 'Protein' && (
                  <FontAwesomeIcon icon={faFish} />
                )}
                {nutrient.name === 'Carbohydrates' ||
                nutrient.name === 'Carbohydrate' ? (
                  <FontAwesomeIcon icon={faLeaf} />
                ) : (
                  <></>
                )}
                {nutrient.name === 'Fats' || nutrient.name === 'Fat' ? (
                  <FontAwesomeIcon icon={faBottleDroplet} />
                ) : (
                  <></>
                )}
                <p>{nutrient.composition}g</p>
              </div>
              <span>{nutrient.name}</span>
            </div>
          ))}
        </div>
        <hr className="mb-10 mt-10" />
        <div className="nutrient-warnings">
          <h2>Calories Warnings</h2>
          <div className="nutrient-warning flex g-10 color-main">
            <FontAwesomeIcon icon={faWarning} />
            <p>
              {foodInfo.nutrients.calories <= 200 && lightCal}
              {foodInfo.nutrients.calories > 200 &&
                foodInfo.nutrients.calories <= 400 &&
                moderateCal}
              {foodInfo.nutrients.calories > 400 &&
                foodInfo.nutrients.calories <= 600 &&
                heartyCal}
              {foodInfo.nutrients.calories > 600 &&
                foodInfo.nutrients.calories <= 800 &&
                heavyCal}
              {foodInfo.nutrients.calories > 800 && loadedCal}
            </p>
          </div>
        </div>
        <hr className="mt-10" />
      </div>
    </div>
  );
};

export default NutrientsNavBody;
