import { useContext, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faBoxesPacking,
  faCheckCircle,
  faClock,
  faNairaSign,
} from '@fortawesome/free-solid-svg-icons';
import BackNav from '../../components/BackNav/BackNav.jsx';
// import { toast } from 'react-toastify';
import OrdersSkeleton from '../../components/OrdersSkeleton/OrdersSkeleton.jsx';

const Orders = () => {
  const {
    url,
    orderData,
    page,
    setPage,
    count,
    loadingOrders,
    setcount,
    totalPage,
  } = useContext(StoreContext);

  // useState

  const [menu, setMenu] = useState('all');

  const handlePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  // const all = orderData;
  const paid = orderData.filter((paid) => {
    return paid.payment.status === 'paid';
  });
  const pend = orderData.filter((paid) => {
    return paid.payment.status === 'pending';
  });
  const fail = orderData.filter((paid) => {
    return paid.payment.status === 'failed';
  });
  const showMore = (id) => {
    setcount((prev) => ({ ...prev, [id]: 4 }));
  };
  const showNext = (id, orderData) => {
    setcount((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] + 4, orderData.length),
    }));
  };
  const showPrev = (id, orderData) => {
    setcount((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] - 4, orderData.length),
    }));
  };
  const showLess = (id) => {
    setcount((prev) => ({ ...prev, [id]: 1 }));
  };
  return (
    <>
      <BackNav />
      <div className="orders-container">
        <h2>My Orders</h2>
        <div className="orders-content">
          <div className="orders-data-navbar">
            <ul>
              <li
                className={`${menu === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setMenu('all');
                  setPage(1);
                }}>
                All <span>{orderData.length}</span>
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
                Paid <span>{paid.length}</span>
              </li>
              <li
                className={`${menu === 'fail' ? 'active' : ''}`}
                onClick={() => setMenu('fail')}>
                Failed <span>{fail.length}</span>
              </li>
            </ul>
          </div>
          <div className="orders-data-list">
            {loadingOrders ? (
              <OrdersSkeleton />
            ) : (
              orderData
                .filter((orders) => {
                  if (menu === 'all') {
                    return orders;
                  } else return orders.payment.status === menu;
                })
                .map((item, index) => {
                  const date = new Date(item.date);
                  const optionDate = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  };
                  const optionTime = {
                    hour: '2-digit',
                    minute: '2-digit',
                  };
                  return (
                    <div
                      key={index}
                      className={`orders-data  ${
                        item.payment.status === 'paid' && 'paid'
                      } ${item.payment.status === 'pending' && 'pend'}`}>
                      <div className="orders-data-top">
                        <div className="order-data-id">
                          <p>Order ID</p>
                          <b>#{item.payment.transactionId}</b>
                        </div>
                        <div className="order-data-date-status">
                          <p>
                            Order Date:{' '}
                            <b>{date.toLocaleString('en-US', optionDate)}</b>
                          </p>
                          <p>
                            Order Time:{' '}
                            <b>{date.toLocaleString('en-US', optionTime)}</b>
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
                      <div className="order-data-food-items">
                        {item.items
                          .slice(0, count[item._id])
                          .map((food, index) => (
                            <div
                              key={index}
                              className="order-data-food-item">
                              <div className="order-data-food-item-name-quantity">
                                <p>{food.name}</p>
                                <div className="order-data-food-item-quantity flex">
                                  <p>Qty: {food.quantity}x</p>
                                  <p>
                                    Price:{' '}
                                    <FontAwesomeIcon icon={faNairaSign} />
                                    {food.price}
                                  </p>
                                </div>
                              </div>
                              <div className="img-cont">
                                <img
                                  src={`${url}/images/${food.image}`}
                                  alt="food image"
                                />
                              </div>
                            </div>
                          ))}
                        <div className="order-data-food-item-btn">
                          {count[item._id] < item.items.length && (
                            <>
                              {count[item._id] === 1 && (
                                <button onClick={() => showMore(item._id)}>
                                  show more
                                </button>
                              )}
                              {count[item._id] >= 4 &&
                                count[item._id] < item.items.length && (
                                  <button
                                    onClick={() => {
                                      showNext(item._id, item.items);
                                      console.log();
                                    }}>
                                    show next
                                  </button>
                                )}
                            </>
                          )}
                          {count[item._id] > 1 && (
                            <button onClick={() => showLess(item._id)}>
                              show less
                            </button>
                          )}
                          {count[item._id] > 4 && (
                            <button
                              onClick={() => showPrev(item._id, item.items)}>
                              show Prev
                            </button>
                          )}
                        </div>
                      </div>
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
