/* eslint-disable react/prop-types */
import './NutrientsNavBody.css';
import CircularProgress from './CircularProgress.jsx';

const NutrientsNavBody = ({ reviews, foodInfo }) => {
  return (
    <div className="nutrients">
      <h2>Nutritional Informations</h2>
      <div
        className="flex-center nutrients-circle-progress"
        onClick={() => {
          console.log(reviews);
          console.log(foodInfo);
        }}>
        <p>Calories: {foodInfo.nutrients.calories} kcal</p>
        <CircularProgress
          value={
            !foodInfo.nutrients ? 0 : foodInfo.nutrients.others[0].carbohydrates
          }
          label={'Carbs'}
        />
        <CircularProgress
          value={!foodInfo.nutrients ? 0 : foodInfo.nutrients.others[0].protein}
          label={'Prots'}
        />
        <CircularProgress
          value={!foodInfo.nutrients ? 0 : foodInfo.nutrients.others[0].fats}
          label={'Fats'}
        />
      </div>
      <div className="nutrients-composition ">
        <h2>Composition</h2>
        <div
          className="flex-center j-sb nutrients-circle-progress"
          onClick={() => {
            console.log(reviews);
            console.log(foodInfo);
          }}>
          <div className="composition-container ">
            <p>{foodInfo.nutrients.calories} kcal</p>
            <span>Calories</span>
          </div>
          <div className="composition-container">
            <p>{foodInfo.nutrients.others[0].carbohydrates}</p>
            <span>Carbohydrates</span>
          </div>
          <div className="composition-container">
            <p>{foodInfo.nutrients.others[0].protein}</p>
            <span>Proteins</span>
          </div>
          <div className="composition-container">
            <p>{foodInfo.nutrients.others[0].fats}</p>
            <span>Fats</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutrientsNavBody;
