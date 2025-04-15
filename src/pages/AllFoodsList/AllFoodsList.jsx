import './AllFoodsList.css';
import BackNav from '../../components/BackNav/BackNav';
import TopMenu from '../../components/TopMenu/TopMenu';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faCartShopping,
  faCircle,
  faClose,
  faFilter,
  faNairaSign,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllFoodsList = () => {
  const {
    loading,
    bissyJoy,
    tastyMunch,
    arena,
    krafty,
    iyaAfusat,
    url,
    setLoading,
    foods,
    setFoods,
    food_list,
  } = useContext(StoreContext);
  const kitchens = [
    { image: iyaAfusat },
    { image: arena },
    { image: bissyJoy },
    { image: krafty },
    { image: tastyMunch },
  ];
  // useState
  const [dropdown, setDropdown] = useState(false);
  const [text, setText] = useState(false);
  const [dropdownList, setDropdownList] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [maxprice, setMaxprice] = useState(0);
  const [price, setPrice] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [filterData, setFilterData] = useState({
    kitchen: '',
    category: '',
    price,
    reput: '',
    location,
  });
  const addFilter = (title, type) => {
    const update = filterList.filter((pre) => pre.title === title);
    let filters;
    if (title === 'kitchen') {
      filters = ['Arena', 'Krafty', 'Tasty Munch', 'Iya Afusat', 'Bissy Joy'];
      setFilterData((prev) => ({ ...prev, kitchen: filters[0] }));
    }
    if (title === 'category') {
      filters = ['Soup', 'Rolls', 'Snacks, Non-vegetarian'];
      setFilterData((prev) => ({ ...prev, category: filters[0] }));
    }
    if (title === 'reput') {
      filters = ['Top food', 'Newest', 'Recommends'];
      setFilterData((prev) => ({ ...prev, reput: filters[0] }));
    }
    if (title === 'location') {
      filters = ['Tarmac', 'School road'];
      setLocation(filters[0]);
    }
    if (title === 'price') filters = [];
    if (!update || update.length === 0) {
      setFilterList((prev) => [
        ...prev,
        {
          id: uuidv4(),
          title,
          filters,
          type,
        },
      ]);
    }
    setDropdown(false);
  };
  const filterSetHandler = (filter, title) => {
    console.log(filter);
    console.log(title);
    if (title === 'kitchen') {
      setFilterData((prev) => ({ ...prev, kitchen: filter }));
    }
    if (title === 'category') {
      setFilterData((prev) => ({ ...prev, category: filter }));
    }
    if (title === 'price') {
      setPrice(filter);
    }
    if (title === 'reput') {
      setFilterData((prev) => ({ ...prev, reput: filter }));
    }
    if (title === 'location') {
      setLocation(filter);
    }
  };
  const closeFilterHandler = (title, id) => {
    console.log(title);
    setFilterList((prev) => prev.filter((del) => del.id !== id));
    if (title === 'kitchen') {
      setFilterData((prev) => ({ ...prev, kitchen: '' }));
    }
    console.log(filterData.kitchen);
    if (title === 'category') {
      setFilterData((prev) => ({ ...prev, category: '' }));
    }
    if (title === 'price') {
      setFilterData((prev) => ({ ...prev, price: '' }));
    }
    if (title === 'reput') {
      setFilterData((prev) => ({ ...prev, reput: '' }));
    }
    if (title === 'location') {
      setFilterData((prev) => ({ ...prev, location: '' }));
    }
  };
  const filterHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/food/filter`, {
        filterData,
        search,
      });
      if (response.data.success) {
        setFoods(response.data.data);
        toast.success(response.data.message);
        setText(true);
      } else if (!response.data.success) {
        setFoods(food_list);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!search && search === '' && !filterData) return;
    filterHandler();
  }, [search, filterData]);
  const highlightText = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(
      regex,
      (match) => `<span class='highlight'>${match}</span>`
    );
  };
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
                    <img
                      src={kitchen.image}
                      alt="kitchen image"
                    />
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
                onChange={(e) => setSearch(e.target.value)}
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
                <p>Filter Option</p>
              </div>
              <div
                className={
                  dropdown === false ? 'hide' : 'all_food_list_filter-option'
                }>
                <span onClick={() => addFilter('kitchen', 'select')}>
                  Kitchen
                </span>
                <span onClick={() => addFilter('category', 'select')}>
                  Category
                </span>
                <span onClick={() => addFilter('price', 'range')}>Price</span>
                <span onClick={() => addFilter('reput', 'select')}>
                  Customer Choice
                </span>
                <span onClick={() => addFilter('location', 'select')}>
                  Location
                </span>
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
                  <p>{filter.title}</p>

                  <FontAwesomeIcon
                    className="icon"
                    icon={faClose}
                    onClick={() => closeFilterHandler(filter.title, filter.id)}
                  />
                </div>
                <div
                  className={
                    dropdownList + activeId === `true${filter.id}`
                      ? 'filter_list-option'
                      : 'hide'
                  }>
                  {filter.type === 'select' ? (
                    filter.filters.map((list, ind) => (
                      <span
                        onClick={(e) => {
                          filterSetHandler(e.target.innerHTML, filter.title);
                          setDropdownList(false);
                          console.log(e.target.innerHTML);
                        }}
                        key={ind}>
                        {list}
                      </span>
                    ))
                  ) : (
                    <div className="range-price">
                      <p>
                        <FontAwesomeIcon icon={faNairaSign} />
                        {maxprice}
                      </p>
                      <div className="slider-container">
                        <input
                          type="range"
                          min={0}
                          max={5000}
                          step={500}
                          value={maxprice}
                          onChange={(e) => {
                            setMaxprice(e.target.value);
                            setPrice(e.target.value);
                            filterSetHandler(e.target.value, filter.title);
                          }}
                        />
                      </div>
                      <div className="range-btn">
                        <button onClick={() => setMaxprice(0)}>Clear</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="filter-search-btn-wrap">
            {/* {filterList.length > 0 && ( */}
            <button
              className={`filter-search-btn ${loading && 'opacity'}`}
              disabled={loading}
              onClick={filterHandler}>
              {loading ? 'Filtering...' : 'Filter'}
            </button>
            {/* )} */}
            {loading && (
              <svg
                viewBox="0 0 50 50"
                className="spinner-btn">
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                />
              </svg>
            )}
          </div>
          {text && search && (
            <>
              <p className="highlight">Showing results for {search}</p>
              <p className="filtered-option">
                <FontAwesomeIcon
                  className="circle"
                  icon={faCircle}
                />
              </p>
            </>
          )}
        </div>
        {loading ? (
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
            {foods !== undefined &&
              foods.map((allFoods, index) => {
                return (
                  <TopMenu
                    key={index}
                    id={allFoods._id}
                    image={allFoods.image}
                    name={allFoods.name}
                    textHighlight={highlightText}
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
