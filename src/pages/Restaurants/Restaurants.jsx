import './Restaurants.css';

import BackNav from '../../components/BackNav/BackNav';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Skeletons from '../../components/Skeletons/Skeletons';

const Restaurants = () => {
  const { restaurantsView, food_list, loading } = useContext(StoreContext);

  return (
    <>
      <BackNav goto={'homepage'} />
      <div className="restaurants-contents">
        {loading ? (
          <Skeletons />
        ) : (
          <div className="restaurants_cards menu-card">
            {food_list
              .filter((item) => item.kitchen.kitchen_name === restaurantsView)
              .map((item) => {
                return (
                  <div key={item._id}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                    <p>{item.category}</p>
                    <p>{item.reviews}</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};
export default Restaurants;
