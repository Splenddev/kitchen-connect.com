import restaurants from '../../assets/assets/frontend_assets/restaurants';
import IconicRestaurants from '../IconicRestaurants/IconicRestaurants';
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import './KitchenMenu.css';
import TopMenu from '../TopMenu/TopMenu';
import { useContext } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Filter from '../Filter/Filter';
import Skeletons from '../Skeletons/Skeletons';

const KitchenMenu = () => {
  const {
    food_list,
    setQuery,
    query,
    filterKitchen,
    loading,
    scrollToTop,
    noFood,
  } = useContext(StoreContext);
  // const [food_length, setFood_length] = useState('');
  const navigate = useNavigate();
  const allFoodsInListHandler = () => {
    scrollToTop();
    navigate('/all_food_list');
  };

  function searchHandler(e) {
    setQuery(e.target.value);
  }
  const highlightText = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(
      regex,
      (match) => `<span class='highlight'>${match}</span>`
    );
  };
  return (
    <div className="explore-kitchen">
      <Title
        item="top-menu-cards"
        title="Top Foods for you"
        subTitle="Choose from varieties of foods from kitchens all over the campus."
      />

      <div className="search-icon">
        <div className="search-input">
          <input
            type="text"
            value={query}
            onChange={searchHandler}
            placeholder={`Search meals from${
              filterKitchen.toLowerCase() === 'all' ||
              filterKitchen.toLowerCase() === 'filter kitchen'
                ? ' all'
                : ' ' + filterKitchen
            } kitchen`}
          />
          <p>
            <FontAwesomeIcon
              className="icon"
              icon={faSearch}
            />
          </p>
        </div>
        <Filter />
      </div>
      {loading ? (
        <Skeletons />
      ) : (
        <div className="restaurants_cards menu-card">
          {food_list
            .filter((item) => {
              return item.customerChoice === 'Top Food';
            })
            .filter((item) => {
              if (filterKitchen === 'All') {
                return item;
              } else
                return (
                  item.kitchen.kitchen_name.toLowerCase() ===
                  filterKitchen.toLowerCase()
                );
            })
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
                  textHighlight={highlightText}
                />
              );
            })}
        </div>
      )}
      {noFood && <p className="no-food">There are no food with this name!</p>}
      {loading ? (
        <></>
      ) : (
        <div
          className="see-more"
          onClick={allFoodsInListHandler}>
          <p>See All Foods</p>{' '}
          <FontAwesomeIcon
            className="icon"
            icon={faArrowRightLong}
          />
        </div>
      )}
      <Title
        item="restaurants"
        title="ICONIC Restaurants"
        subTitle="Locally made legendary foods delivered to your door."
      />
      <div className="restaurants_cards">
        {restaurants.map((item, index) => {
          return (
            <IconicRestaurants
              key={index}
              index={index}
              image={item.image}
              name={item.name}
              location={item.location}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KitchenMenu;
