/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { settings } from '../pages/Settings/testing';
import bissyJoy from '../assets/assets/frontend_assets/bissyJoy.png';
import tastyMunch from '../assets/assets/frontend_assets/tastyMunch.png';
import arena from '../assets/assets/frontend_assets/arena.png';
import krafty from '../assets/assets/frontend_assets/krafty.png';
import iyaAfusat from '../assets/assets/frontend_assets/iya afusat.png';
// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // useState
  // useState
  const [cartItems, setCartItems] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('account');
  const [icon, setIcon] = useState(false);
  const [selectState, setSelectState] = useState('Select Me!');
  const [checked, setChecked] = useState(false);
  const [foodView, setFoodView] = useState({});
  const [kitchen, setKitchen] = useState('all');
  const [token, setToken] = useState('');
  const [rightCard, setRightCard] = useState(false);
  const color = ['#0ab63d', '#4e15d4', '#f0b921', '#db0b0b', '#db0b84'];
  const [food_list, setFood_list] = useState([]);
  const [optionMenu, setOptionMenu] = useState('');
  const [filterKitchen, setFilterKitchen] = useState('All');
  const [restaurantsView, setRestaurantsView] = useState({});
  const [allFoodsInList, setAllFoodsInList] = useState({});
  const [alerted, setAlerted] = useState(false);
  const [setting, setSetting] = useState('profile');
  const [settingDisplay, setSettingDisplay] = useState('set1');
  const [subText, setSubText] = useState('Profile');
  const [userInfo, setUserInfo] = useState({});
  const [filterIcon, setFilterIcon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [currentState, setCurrentState] = useState('Login');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [query, setQuery] = useState('');
  const url = 'https://server-b0f1.onrender.com';
  //  let alerted = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 100 && !alerted) {
      // alert('Top page');
      setAlerted(false);
    } else if (window.scrollY < 100) {
      setAlerted(true);
    }
  });

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + '/api/cart/add',
        { itemId },
        { headers: { token } }
      );
    }
  };
  const listToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] }));
    }
  };

  function openPopup() {
    setIsOpen(true);
  }
  function closePopup() {
    setIsOpen(false);
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + '/api/cart/remove',
        { itemId },
        { headers: { token } }
      );
    }
  };
  const removeAllFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - prev[itemId],
    }));
    if (token) {
      await axios.post(
        url + '/api/cart/remove/all',
        { itemId },
        { headers: { token } }
      );
    }
  };
  const setCartToZero = async () => {
    setCartItems({});
    if (token) {
      await axios.put(url + '/api/cart/empty-cart', {}, { headers: { token } });
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const getTotalCartQuantity = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalAmount += cartItems[item];
      }
    }
    return totalAmount;
  };
  function scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  const [kitchenImage, setKitchenImage] = useState('');
  // const kitchenImageCheck = () => {

  // };
  const viewDetailsHandler = () => {
    openPopup();
  };
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url + '/api/food/list');
      if (response.data.data.length > 0) {
        setFood_list(response.data.data);
        setLoading(false);
      } else {
        setLoading(true);
        console.warn('No food data available. Retrying...');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + '/api/cart/get',
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoods();
      if (!token) return;
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  }, [token]);
  useEffect(() => {
    const fetchFoods = async () => {
      if (!query) {
        return;
      }
      setLoading(true);

      try {
        const response = await axios.get(
          url + `/api/food/list/search?search=${query}`
        );
        setFood_list(response.data.data);
      } catch (error) {
        console.log(error);
        console.error('Error fetching food');
      }
      setLoading(false);
    };
    fetchFoods();
  }, [query]);
  function reloadData(index) {
    setSubText(`${settings[index].set1}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }
  const k_imageHandler = (kitchen) => {
    if (kitchen === 'Arena') {
      setKitchenImage(arena);
    } else if (kitchen === 'Bissy Joy') {
      setKitchenImage(bissyJoy);
    } else if (kitchen === 'Krafty') {
      setKitchenImage(krafty);
    } else if (kitchen === 'Tasty Munch') {
      setKitchenImage(tastyMunch);
    } else if (kitchen === 'Iya Afusat') {
      setKitchenImage(iyaAfusat);
    } else {
      setKitchenImage('');
    }
  };

  const contextValue = {
    food_list,
    addToCart,
    listToCart,
    k_imageHandler,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    removeFromCart,
    setCartToZero,
    removeAllFromCart,
    alerted,
    checked,
    setChecked,
    setIsOpen,
    viewDetailsHandler,
    isOpen,
    closePopup,
    optionMenu,
    setOptionMenu,
    openPopup,
    foodView,
    setFoodView,
    restaurantsView,
    setRestaurantsView,
    filterIcon,
    setFilterIcon,
    scrollToTop,
    selectState,
    icon,
    setIcon,
    setSelectState,
    setAllFoodsInList,
    allFoodsInList,
    // prevPage,nextPage,
    subText,
    setSubText,
    getTotalCartQuantity,
    kitchen,
    setKitchen,
    filterKitchen,
    loading,
    setLoading,
    setFilterKitchen,
    url,
    token,
    setToken,
    query,
    setQuery,
    setKitchenImage,
    setting,
    setSetting,
    kitchenImage,
    settingDisplay,
    setSettingDisplay,
    reloadData,
    text,
    color,
    setText,
    bissyJoy,
    tastyMunch,
    arena,
    krafty,
    userInfo,
    setUserInfo,
    iyaAfusat,
    showLogin,
    setShowLogin,
    currentState,
    setCurrentState,
    rightCard,
    setRightCard,
    userData,
    setUserData,
    location,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
