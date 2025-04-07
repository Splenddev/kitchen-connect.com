/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { settings } from '../pages/Settings/testing';
import bissyJoy from '../assets/assets/frontend_assets/bissyJoy.png';
import tastyMunch from '../assets/assets/frontend_assets/tastyMunch.png';
import arena from '../assets/assets/frontend_assets/arena.png';
import krafty from '../assets/assets/frontend_assets/krafty.png';
import iyaAfusat from '../assets/assets/frontend_assets/iya afusat.png';
import { toast } from 'react-toastify';
// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // useState
  // useState
  const [cartItems, setCartItems] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [text, setText] = useState('account');
  const [noFood, setNoFood] = useState(false);
  const [icon, setIcon] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [tokenState, setTokenState] = useState(null);
  const [selectState, setSelectState] = useState('Select Me!');
  const [checked, setChecked] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    paid: 0,
    pending: 0,
    failed: 0,
  });
  const [tokenExpired, setTokenExpired] = useState(false);
  const [foodView, setFoodView] = useState({});
  const [kitchen, setKitchen] = useState('all');
  const [token, setToken] = useState('');
  const [rightCard, setRightCard] = useState(false);
  const [reload, setReload] = useState(false);
  const color = ['#0ab63d', '#4e15d4', '#f0b921', '#db0b0b', '#db0b84'];
  const [ordermenu, setOrderMenu] = useState('all');
  const [food_list, setFood_list] = useState([]);
  const [optionMenu, setOptionMenu] = useState('');
  const [foodEaten, setFoodEaten] = useState(0);
  const [loadFoodEaten, setLoadFoodEaten] = useState(true);
  const [filterKitchen, setFilterKitchen] = useState('All');
  const [restaurantsView, setRestaurantsView] = useState({});
  const [allFoodsInList, setAllFoodsInList] = useState({});
  const [alerted, setAlerted] = useState(false);
  const [setting, setSetting] = useState('profile');
  const [settingDisplay, setSettingDisplay] = useState('set1');
  const [subText, setSubText] = useState('Profile');
  const [userInfo, setUserInfo] = useState({});
  const [filterIcon, setFilterIcon] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [customerName, setCustomerName] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [currentState, setCurrentState] = useState('Login');
  const [count, setcount] = useState({});
  const [page, setPage] = useState(1);
  const [allOrders, setAllOrders] = useState(0);
  const [kitchenImage, setKitchenImage] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [orderData, setOrderData] = useState([]);
  const [adding, setAdding] = useState('');
  const [query, setQuery] = useState('');
  // const url = 'http://localhost:4000';
  const url = 'https://server-b0f1.onrender.com';
  //  let alerted = false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100 && !alerted) {
        // alert('Top page');
        setAlerted(false);
      } else if (window.scrollY < 100) {
        setAlerted(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [alerted]);
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('customerName');
    setToken('');
    setUserInfo('');
    setCustomerName({});
  };
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      setAdding(`add${itemId}`);
      try {
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          setAdding('');
          setIsAdded(true);
        } else {
          setAdding('');
          toast.info('Check your network connection and try again.');
          return false;
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || 'An error occurred!');
          if (
            error.response.data.message ===
            'Session expired. Please login again!'
          ) {
            setAdding('');
            setTokenExpired(true);
          }
        } else {
          toast.error(`Network Issue! Check your network connection.`);
          setAdding('');
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const listToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] }));
    }
  };
  const addToFavorite = async (foodId) => {
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/favorites/add`,
          { foodId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || 'An error occurred!');
          if (
            error.response.data.message ===
            'Session expired. Please login again!'
          ) {
            setTokenExpired(true);
          }
        } else {
          toast.error(`Network Issue! Check your network connection.`);
        }
        console.error(error);
      }
    }
  };
  const removeFromFavorite = async (foodId) => {
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/favorites/remove/by/foodId`,
          { foodId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || 'An error occurred!');
          if (
            error.response.data.message ===
            'Session expired. Please login again!'
          ) {
            setTokenExpired(true);
          }
        } else {
          toast.error(`Network Issue! Check your network connection.`);
        }
        console.error(error);
      }
    }
  };
  const getFavorites = async (token) => {
    if (token) {
      const response = await axios.post(
        url + '/api/favorites/get',
        {},
        { headers: { token } }
      );
      toast.success(response.data.message);
      setFavorites(response.data.favorites);
    } else {
      setCartItems('');
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
      setAdding(`remove${itemId}`);
      try {
        const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          setAdding('');

          toast.success(`${response.data.message}`);
        } else {
          setAdding('');
          toast.info('Check your network connection and try again.');
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || 'An error occurred!');
          if (
            error.response.data.message ===
            'Session expired. Please login again!'
          ) {
            setAdding('');
            setTokenExpired(true);
          }
        } else {
          toast.error(`Network Issue! Check your network connection.`);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const removeAllFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));

    if (token) {
      setAdding(`remove${itemId}`);
      try {
        const response = await axios.post(
          `${url}/api/cart/remove/all`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          setAdding('');

          toast.success(`${response.data.message}`);
        } else {
          setAdding('');
          toast.info('Check your network connection and try again.');
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || 'An error occurred!');
          if (
            error.response.data.message ===
            'Session expired. Please login again!'
          ) {
            setAdding('');
            setTokenExpired(true);
          }
        } else {
          toast.error(`Network Issue! Check your network connection.`);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const setCartToZero = async () => {
    setCartItems({});

    if (token) {
      setAdding(`empty`);
      try {
        const response = await axios.put(
          `${url}/api/cart/empty-cart`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setAdding('');

          toast.success(`${response.data.message}`);
        } else {
          setAdding('');
          toast.info('Check your network connection and try again.');
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || 'An error occurred!');
          if (
            error.response.data.message ===
            'Session expired. Please login again!'
          ) {
            setAdding('');
            setTokenExpired(true);
          }
        } else {
          toast.error(`Network Issue! Check your network connection.`);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount +=
          itemInfo === undefined ? 0 : itemInfo.price * cartItems[item];
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
  const viewDetailsHandler = () => {
    openPopup();
  };
  const fetchFoods = async () => {
    setLoading(true);

    try {
      const response = await axios.get(url + '/api/food/list');
      if (response.data.success) {
        setFood_list(response.data.data);
        toast.success(response.data.message);
        setLoading(false);
      } else {
        setLoading(true);
        console.error('No food data available. Retrying...');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred!');
      } else {
        toast.error(`Network Issue! Check your network connection.`);
      }
      console.error(error);
    }
  };
  const loadCartData = async (token) => {
    if (token) {
      const response = await axios.post(
        url + '/api/cart/get',
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData);
    } else {
      setCartItems('');
    }
  };
  useEffect(() => {
    const isTokenExpired = (token) => {
      if (!token) return null;
      try {
        const tokenParts = JSON.parse(atob(token.split('.')[1]));
        const exp = tokenParts.exp * 1000;
        console.log('Token expires in: ' + new Date(exp).toLocaleString());
        return Date.now() >= exp;
      } catch (error) {
        console.error('Invalid token', error);
        return true;
      }
    };
    const token = localStorage.getItem('token') || null;
    if (token === null || isTokenExpired(token) === null) {
      setTokenState(null);
      console.log('No token found. User is not logged in.');
    } else if (isTokenExpired(token)) {
      setTokenState(false);
      console.log('token expired');
    } else {
      console.log('token is still valid');
      setTokenState(true);
    }
  }, []);
  useEffect(() => {
    async function loadFood() {
      await fetchFoods();
    }
    loadFood();
  }, []);
  useEffect(() => {
    async function loadData() {
      if (tokenState === null) {
        setTokenExpired(null);
        return;
      } else if (tokenState === false) {
        setTokenExpired(true);
        return;
      }
      setToken(localStorage.getItem('token'));
      setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'));
      setCustomerName(JSON.parse(localStorage.getItem('customerName') || '{}'));
      await loadCartData(localStorage.getItem('token'));
    }
    if (tokenState !== null) {
      loadData();
    }
  }, [tokenState]);
  useEffect(() => {
    const fetchFoods = async () => {
      if (!query) {
        return;
      }
      setLoading(true);

      try {
        const response = await axios.get(
          `${url}/api/food/list/search?search=${query}`
        );
        setFood_list(response.data.data);
        if (food_list.length <= 0 || !food_list) {
          setNoFood(true);
        }
      } catch (error) {
        setNoFood(true);
        console.log(error);
        console.error('Error fetching food');
      }
      setLoading(false);
    };
    fetchFoods();
  }, [query, food_list]);
  const fetchOrders = async () => {
    const limit = 10;
    setLoadingOrders(true);
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${url}/api/order/userorders?page=${page}&limit=${limit}&status=${ordermenu}`,
      {},
      { headers: { token } }
    );
    try {
      if (response.data.success) {
        setOrderData(response.data.data);
        setcount(
          response.data.data.reduce(
            (acc, parent) => ({ ...acc, [parent._id]: 1 }),
            {}
          )
        );
        setTotalPage(response.data.totalPages);
        setStatusCounts(response.data.statusCounts);
        console.log(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred!');
      } else {
        toast.error(`Network Issue! Check your network connection.`);
      }
      console.log('Error', error);
    } finally {
      setLoadingOrders(false);
    }
  };
  useEffect(() => {
    fetchOrders();
    setReload(false);
  }, [ordermenu, page, reload]);
  useEffect(() => {
    setLoadFoodEaten(true);
    if (orderData) {
      setLoadFoodEaten(false);
      orderData.forEach((order) => {
        if (order.payment.status === 'paid') {
          order.items.forEach((item) =>
            setFoodEaten((prev) => (prev += item.quantity))
          );
        }
      });
      setAllOrders(orderData.length);
    }
  }, [orderData]);
  function reloadData(index) {
    setSubText(settings[index].set1);
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
    tokenExpired,
    setTokenExpired,
    logout,
    adding,
    setAdding,
    orderData,
    setOrderData,
    foodEaten,
    allOrders,
    setAllOrders,
    setFoodEaten,
    loadFoodEaten,
    isOpenProfile,
    setIsOpenProfile,
    noFood,
    setNoFood,
    loadingOrders,
    setLoadingOrders,
    count,
    setcount,
    page,
    setPage,
    totalPage,
    setTotalPage,
    customerName,
    setCustomerName,
    tokenState,
    ordermenu,
    setOrderMenu,
    statusCounts,
    setStatusCounts,
    addToFavorite,
    removeFromFavorite,
    getFavorites,
    favorites,
    setFavorites,
    isAdded,
    setIsAdded,
    reload,
    setReload,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
