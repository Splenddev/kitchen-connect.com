import { useContext, useEffect, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesPacking } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  const { url, token } = useContext(StoreContext);
  // useState
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      <div className="orders-data-container">
        {data.map((item, index) => {
          return (
            <div
              className="orders-data"
              key={index}>
              <FontAwesomeIcon icon={faBoxesPacking} />
              <p>
                {item.items.map((food, indexFood) => {
                  return (
                    <div
                      className="order-data-item"
                      key={indexFood}>
                      <p>{food.name}</p>
                      <p>{food.quantity}</p>
                    </div>
                  );
                })}
              </p>
              <p>{item.date}</p>
              <p>{item.amount}</p>
              <p>Items: {item.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{item.payment.status}</b>
              </p>
              <button>Track Orders</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
