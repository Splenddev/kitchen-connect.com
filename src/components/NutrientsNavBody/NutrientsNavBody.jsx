/* eslint-disable react/prop-types */
import './NutrientsNavBody.css';

const NutrientsNavBody = ({ foodDetailInformation }) => {
  const info = foodDetailInformation[0];
  return (
    <div className="nutrients-nav-body">
      <h2>Nutritional Informations</h2>
      <div className="calories">
        <b>Total Calories</b>
        <div>
          <p>{info.nutrients.calories}</p>
        </div>
      </div>
      <div className="nutrients-nav-body-container">
        <div
          style={{
            width: `${(info.nutrients.carbohydrates / 3.8) * 100}%`,
          }}
          className="progress"></div>
        <p>Carbohydrates</p>
        <div>
          <p>{info.nutrients.carbohydrates}</p>
        </div>
      </div>
      <div className="nutrients-nav-body-container">
        <div
          style={{
            width: `${(info.nutrients.fats / 3.8) * 100}%`,
          }}
          className="progress"></div>
        <p>Fats</p>
        <div>
          <p>{info.nutrients.fats}</p>
        </div>
      </div>
      <div className="nutrients-nav-body-container">
        <div
          style={{
            width: `${(0.1 / 3.8) * 100}%`,
          }}
          className="progress"></div>
        <p>Vitamins & Minerals</p>
        <div>
          <p>{info.nutrients.vitaminsAndMinerals}</p>
        </div>
      </div>
      <div className="nutrients-nav-body-container">
        <div
          style={{
            width: `${(info.nutrients.proteins / 3.8) * 100}%`,
          }}
          className="progress"></div>
        <p>Proteins</p>
        <div>
          <p>{info.nutrients.proteins}</p>
        </div>
      </div>
    </div>
  );
};

export default NutrientsNavBody;
