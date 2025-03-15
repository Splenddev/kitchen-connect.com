import './AllFoodsList.css';
import BackNav from '../../components/BackNav/BackNav';
import TopMenu from '../../components/TopMenu/TopMenu';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Skeleton from 'react-loading-skeleton';

const AllFoodsList = () => {
  const { food_list, loader } = useContext(StoreContext);
  return (
    <>
      <BackNav
        goto={'homepage'}
        other={'cart'}
      />
      <div className="all_food_list">
        {loader ? (
          <div className="skeletons">
            {[...Array(8)].map((_, index) => (
              <div
                className="skeleton"
                key={index}>
                <Skeleton
                  height={150}
                  // width={200}
                />
                <Skeleton
                  height={20}
                  width={'80%'}
                />
                <Skeleton
                  height={15}
                  width={'60%'}
                />
                <Skeleton
                  height={15}
                  width={'40%'}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="all-food-wrapper ">
            {food_list.map((allFoods, index) => {
              return (
                <TopMenu
                  key={index}
                  id={allFoods._id}
                  image={allFoods.image}
                  name={allFoods.name}
                  price={allFoods.price}
                  category={allFoods.category}
                  kitchen={allFoods.kitchen.kitchen_name}
                  kitchenImage={allFoods.k_image}
                  description={allFoods.description}
                  foodInfo={allFoods.foodInformation}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AllFoodsList;
