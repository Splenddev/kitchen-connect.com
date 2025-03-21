import { useContext, useEffect, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faBoxesPacking,
  faCheckCircle,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
// import Loader from '../../components/Loader/Loader.jsx';
import BackNav from '../../components/BackNav/BackNav.jsx';
import { toast } from 'react-toastify';
import OrdersSkeleton from '../../components/OrdersSkeleton/OrdersSkeleton.jsx';

const Orders = () => {
  const { url, setTokenExpired } = useContext(StoreContext);
  const token = localStorage.getItem('token');

  // useState
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 10;
  const handlePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };
  const fetchOrders = async () => {
    setLoading(true);
    const response = await axios.post(
      `${url}/api/order/userorders?page=${page}&limit=${limit}`,
      {},
      { headers: { token } }
    );
    try {
      if (response.data.success) {
        setData(response.data.data);
        setTotalPage(response.data.totalPages);
        console.log(response.data.data);
      } else {
        toast.info('Check your network connection and try again.');
        console.log('Error');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred!');
        if (
          error.response.data.message === 'Session expired. Please login again!'
        ) {
          setTokenExpired(true);
        }
      } else {
        toast.error(`Network Issue! Check your network connection.`);
      }
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, page]);
  const all = data;
  const paid = all.filter((paid) => {
    return paid.payment.status === 'paid';
  });
  const pend = all.filter((paid) => {
    return paid.payment.status === 'pending';
  });
  const fail = all.filter((paid) => {
    return paid.payment.status === 'failed';
  });
  return (
    <>
      <BackNav />
      <div className="orders-container">
        <h2>My Orders</h2>
        <div className="orders-data-container">
          <div className="orders-data-navbar">
            <ul>
              <li
                className={`${menu === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setMenu('all');
                  setPage(1);
                }}>
                All <span>{all.length}</span>
              </li>
              <li
                className={`${menu === 'pending' ? 'active' : ''}`}
                onClick={() => {
                  setMenu('pending');
                  setPage(1);
                }}>
                Pending <span>{pend.length}</span>
              </li>
              <li
                className={`${menu === 'paid' ? 'active' : ''}`}
                onClick={() => {
                  setMenu('paid');
                  setPage(1);
                }}>
                Successful <span>{paid.length}</span>
              </li>
              <li
                className={`${menu === 'fail' ? 'active' : ''}`}
                onClick={() => setMenu('fail')}>
                Failed <span>{fail.length}</span>
              </li>
            </ul>
          </div>
          <div className="orders-data-list">
            {loading ? (
              <OrdersSkeleton />
            ) : (
              all
                .filter((orders) => {
                  if (menu === 'all') {
                    return orders;
                  } else return orders.payment.status === menu;
                })
                .map((item, index) => {
                  const date = new Date(item.date);
                  const option = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  };
                  return (
                    <div
                      key={index}
                      className="orders-data">
                      <div className="orders-data-top">
                        <div className="order-data-id">
                          <p>Order ID</p>
                          <b>#{item.payment.transactionId}</b>
                        </div>
                        <div className="order-data-date-status">
                          <p>
                            Order Date:{' '}
                            <b>{date.toLocaleString('en-US', option)}</b>
                          </p>
                          <div className="order-data-status-container flex-center">
                            Status:
                            <div
                              className={`order-data-status flex-center ${
                                item.payment.status === 'paid' && 'paid'
                              } ${
                                item.payment.status === 'pending' && 'pend'
                              }`}>
                              {item.payment.status === 'paid' && (
                                <FontAwesomeIcon icon={faCheckCircle} />
                              )}
                              {item.payment.status === 'pending' && (
                                <FontAwesomeIcon icon={faClock} />
                              )}
                              <b> {item.payment.status}</b>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="orders-data-middle">
                        <FontAwesomeIcon icon={faBoxesPacking} />{' '}
                        <button>Track Orders</button>
                      </div>
                      <div>
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
                      </div>
                      <p>{item.amount}</p>
                      <p>Items: {item.items.length}</p>
                    </div>
                  );
                })
            )}
          </div>
        </div>
        <div className="order-data-btn">
          <button onClick={() => handlePage(page - 1)}>
            <FontAwesomeIcon
              className="icon"
              icon={faAngleLeft}
            />{' '}
            Prev
          </button>
          <span>
            Page <b>{page}</b> of <b>{totalPage}</b>
          </span>
          <button onClick={() => handlePage(page + 1)}>
            Next
            <FontAwesomeIcon
              className="icon"
              icon={faAngleRight}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Orders;
