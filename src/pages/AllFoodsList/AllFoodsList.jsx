import './AllFoodsList.css';
import BackNav from '../../components/BackNav/BackNav';
import TopMenu from '../../components/TopMenu/TopMenu';
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faCartShopping,
  faFilter,
  faNairaSign,
  faSearch,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const AllFoodsList = () => {
  const { food_list, loader, bissyJoy, tastyMunch, arena, krafty, iyaAfusat } =
    useContext(StoreContext);
  const kitchens = [
    { image: iyaAfusat },
    { image: arena },
    { image: bissyJoy },
    { image: krafty },
    { image: tastyMunch },
  ];
  // useState
  const [dropdown, setDropdown] = useState(false);
  const [dropdownList, setDropdownList] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [maxprice, setMaxprice] = useState(5000);
  const [filterList, setFilterList] = useState([
    {
      id: uuidv4(),
      title: 'kitchen',
      filters: ['arena', 'krafty', 'tasty munch'],
      type: 'select',
    },
    {
      id: uuidv4(),
      title: 'category',
      filters: ['Soup', 'Rolls', 'Snacks, Non-vegetarian'],
      type: 'select',
    },
    {
      id: uuidv4(),
      title: 'price',
      filters: [],
      type: 'range',
    },
  ]);
  return (
    <>
      <BackNav
        goto={'homepage'}
        other={'cart'}
      />
      <div className="all_food_list">
        <div className="all_food_list_header">
          <div className="all_food_list_header-right">
            <div className="all_food_list_header_overlay">
              <p>Featuring</p>
              <div className="all_food_list_header_overlay-categories">
                {kitchens.map((kitchen, index) => (
                  <div
                    key={index}
                    className="all_food_list_header_overlay-category">
                    <img src={kitchen.image} />
                  </div>
                ))}
              </div>
            </div>
            <div className="all_food_list_header-right-images">
              <img
                alt="header-img"
                src="/all-food-list-header.png"
              />
            </div>
          </div>
          <div className="all_food_list_header-left">
            <p className="all_food_list_header-left_title">
              Every <span>meal</span>, every <span>flavor</span> - dive into the{' '}
              <span>full menu</span> selection now.
            </p>
            <p className="all_food_list_header-left_sub-title">
              Hungry and unsure what to eat? Let us help you. Explore all
              available options so you never miss out on your next favorite
              dish.
            </p>
            <div className="all_food_list_header-left_btn">
              <a href="/order">
                <button>
                  <FontAwesomeIcon icon={faBagShopping} /> Order Now
                </button>
              </a>
              <a href="/cart">
                <button>
                  <FontAwesomeIcon icon={faCartShopping} />
                  Cart
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="all_food_list_filter_search_filter-list">
          <div className="all_food_list_filter_search">
            <div className="all_food_list_search">
              <input
                type="text"
                placeholder="Search a food by name here"
              />
              <div className="icon">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
            <div className="all_food_list_filter">
              <div
                onClick={() => setDropdown(!dropdown)}
                className="all_food_list_filter-select">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="icon"
                />
                <p>Attribute Filter</p>
              </div>
              <div
                className={
                  dropdown === false ? 'hide' : 'all_food_list_filter-option'
                }>
                <span>Kitchen</span>
                <span>Category</span>
                <span>Price</span>
                <span>Reputation</span>
                <span>Kitchen Location</span>
              </div>
            </div>
          </div>
          <div className="all_food_list_filter-list">
            {filterList.map((filter) => (
              <div
                className="filter_list "
                key={filter.id}>
                <div
                  onClick={() => {
                    setDropdownList(!dropdownList);
                    setActiveId(filter.id);
                  }}
                  className="filter_list-title">
                  <FontAwesomeIcon
                    className={
                      dropdownList + activeId === `true${filter.id}`
                        ? 'icon-change'
                        : ''
                    }
                    icon={faSort}
                  />
                  <p>{filter.title}</p>
                </div>
                <div
                  className={
                    dropdownList + activeId === `true${filter.id}`
                      ? 'filter_list-option'
                      : 'hide'
                  }>
                  {filter.type === 'select' ? (
                    filter.filters.map((list, ind) => (
                      <span key={ind}>{list}</span>
                    ))
                  ) : (
                    <div className="range-price">
                      <p>
                        <FontAwesomeIcon icon={faNairaSign} />
                        {0} - <FontAwesomeIcon icon={faNairaSign} />
                        {maxprice}
                      </p>
                      <div className="slider-container">
                        <input
                          type="range"
                          min={0}
                          max={5000}
                          step={500}
                          value={maxprice}
                          onChange={(e) => setMaxprice(e.target.value)}
                        />
                      </div>
                      <div className="range-btn">
                        <button
                          onClick={() => console.log('Range:' + maxprice)}>
                          Clear
                        </button>
                        <button
                          onClick={() => console.log('Range:' + maxprice)}>
                          Filter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
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
            {food_list !== undefined &&
              food_list.map((allFoods, index) => {
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
