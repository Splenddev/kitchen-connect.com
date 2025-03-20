// import { BrowserRouter } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart.jsx';
import Points from './pages/Points/Points.jsx';
import Orders from './pages/Orders/Orders.jsx';
import StoreContextProvider from './context/StoreContext.jsx';
import Restaurants from './pages/Restaurants/Restaurants.jsx';
import React from 'react';
import AllFoodsList from './pages/AllFoodsList/AllFoodsList.jsx';
import Settings from './pages/Settings/Settings.jsx';
import VerifyPayment from './pages/VerifyPayment/VerifyPayment.jsx';
import Login from './components/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/points',
        element: <Points />,
      },
      {
        path: '/restaurants',
        element: <Restaurants />,
      },
      {
        path: '/all_food_list',
        element: <AllFoodsList />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/verify-payment',
        element: <VerifyPayment />,
      },
      {
        path: '/user',
        element: <Login />,
      },
      {
        path: '/order',
        element: <Orders />,
      },
    ],
  },
]);
// import App from '../AppTest/AppTest.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  </React.StrictMode>
);
