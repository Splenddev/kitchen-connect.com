import './Restaurants.css';

import BackNav from '../../components/BackNav/BackNav';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import TopMenu from '../../components/TopMenu/TopMenu';
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
                  <TopMenu
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    kitchen={item.kitchen.kitchen_name}
                    kitchenImage={item.k_image}
                    description={item.description}
                    foodInfo={item.foodInformation}
                  />
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};
/* <div
                className="skeleton"
                key={index}>
                <Skeleton
                  height={150}
                  // width={200}
                />
                
                <Skeleton
                  className="test-loader"
                  height={40}
                  // width="5%"
                  style={{ width: '100%' }}
                />
                <Skeleton
                  className="test-loader"
                  // circle
                  // style={{ minWidth: '50px' }}
                  style={{
                    border: '1px solid red',
                    // flexBasis: '75%',
                    width: '100%',
                  }}
                  height={40}
                />

                <Skeleton
                  circle
                  height={40}
                  width={40}
                />
              </div> */
export default Restaurants;
