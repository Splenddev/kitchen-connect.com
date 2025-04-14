import { useContext, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faCheckCircle,
  faClock,
  faHourglassHalf,
  faNairaSign,
  faPrint,
  faRefresh,
  faTruck,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import BackNav from '../../components/BackNav/BackNav.jsx';
// import { toast } from 'react-toastify';
import OrdersSkeleton from '../../components/OrdersSkeleton/OrdersSkeleton.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader.jsx';

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
    ordermenu,
    setOrderMenu,
    statusCounts,
    setReload,
  } = useContext(StoreContext);

  const [load, setLoad] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const requeryHandler = async (orderId, reference, method) => {
    let req_url = `${url}/api/order/requery/paystack`;
    if (method === 'Monnify') {
      req_url = `${url}/api/order/requery/monnify`;
    }
    try {
      setLoad(true);
      const response = await axios.post(req_url, {
        orderId,
        reference,
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message || response.data.status);
        setReload(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || 'error!');
    } finally {
      setLoad(false);
    }
  };
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
              {['all', 'pending', 'paid', 'failed'].map((status) => (
                <li
                  key={status}
                  className={`${ordermenu === status ? 'active' : ''}`}
                  onClick={() => {
                    setOrderMenu(status);
                    setPage(1);
                  }}>
                  {status}
                  <span>{statusCounts[status] || 0}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="orders-data-list">
            {loadingOrders ? (
              <OrdersSkeleton />
            ) : (
              orderData
                .filter((orders) => {
                  if (ordermenu === 'all') {
                    return orders;
                  } else return orders.payment.status === ordermenu;
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
                      className="orders-data"
                      // className={`orders-data  ${
                      //   item.payment.status === 'paid' && 'paid'
                      // } ${item.payment.status === 'pending' && 'pend'} ${
                      //   item.payment.status === 'failed' && 'failed'
                      // }`}>
                    >
                      <div className="orders-data-top">
                        <div className="order-data-id">
                          <p>Tx Ref</p>
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
                              } ${
                                item.payment.status === 'failed' && 'failed'
                              }`}>
                              {item.payment.status === 'paid' && (
                                <p className="status-icon">
                                  <FontAwesomeIcon icon={faCheckCircle} />
                                </p>
                              )}
                              {item.payment.status === 'pending' && (
                                <p className="status-icon">
                                  <FontAwesomeIcon icon={faClock} />
                                  <svg
                                    viewBox="0 0 50 50"
                                    className="spinner">
                                    <circle
                                      cx="25"
                                      cy="25"
                                      r="20"
                                    />
                                  </svg>
                                </p>
                              )}
                              {item.payment.status === 'failed' && (
                                <p className="status-icon">
                                  <FontAwesomeIcon icon={faWarning} />
                                </p>
                              )}
                              <b> {item.payment.status}</b>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="orders-data-middle">
                        <span className="order-status">
                          <span>Order Status:</span>
                          <span className="order-status-text">
                            {item.status}
                          </span>
                          {item.status === 'Food Processing' && (
                            <FontAwesomeIcon
                              icon={faHourglassHalf}
                              className="icon processing"
                            />
                          )}
                          {item.status === 'Out For Delivery' && (
                            <FontAwesomeIcon
                              icon={faTruck}
                              className="icon out-for-delivery"
                            />
                          )}
                          {item.status === 'Delivered' && (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="icon"
                            />
                          )}
                        </span>
                        <p>
                          Payment Method:{' '}
                          <span
                            style={{
                              color: 'var(--main-color)',
                              fontWeight: '600',
                            }}>
                            {item.payment.paymentMethod}
                          </span>
                        </p>
                      </div>
                      <div className="order-list-middle">
                        <div className="order-data-food-items">
                          {item.items
                            .slice(0, count[item._id])
                            .map((food, index) => (
                              <>
                                <div
                                  key={index}
                                  className="order-data-food-item">
                                  <div className="order-data-food-item-name-quantity">
                                    <p>{food.name}</p>
                                    <div className="order-data-food-item-quantity flex">
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
                                    <div className="item-qty flex-center">
                                      {food.quantity}
                                    </div>
                                  </div>
                                </div>
                                <hr style={{ margin: '5px 0' }} />
                              </>
                            ))}
                          <div className="order-data-food-item-btn">
                            {count[item._id] < item.items.length && (
                              <>
                                {count[item._id] === 1 && (
                                  <button onClick={() => showMore(item._id)}>
                                    Show More
                                  </button>
                                )}
                                {count[item._id] >= 4 &&
                                  count[item._id] < item.items.length && (
                                    <button
                                      onClick={() => {
                                        showNext(item._id, item.items);
                                        console.log();
                                      }}>
                                      Show Next
                                    </button>
                                  )}
                              </>
                            )}
                            {count[item._id] > 1 && (
                              <button onClick={() => showLess(item._id)}>
                                Show Less
                              </button>
                            )}
                            {count[item._id] > 4 && (
                              <button
                                onClick={() => showPrev(item._id, item.items)}>
                                Show Prev
                              </button>
                            )}
                            <p>Item length: {item.items.length}</p>
                          </div>
                          {item.payment.status === 'pending' && (
                            <button
                              className="requery-btn"
                              onClick={() =>
                                requeryHandler(
                                  item._id,
                                  item.payment.transactionId,
                                  item.payment.paymentMethod
                                )
                              }>
                              Requery{' '}
                              <FontAwesomeIcon
                                icon={faRefresh}
                                className="icon"
                              />
                              {load && (
                                <div className="isLoadingSubmit">
                                  <Loader
                                    width={'20px'}
                                    height={'20px'}
                                    borderWidth={'3px'}
                                    color_primary={'black'}
                                    color_secondary={'white'}
                                  />
                                </div>
                              )}
                            </button>
                          )}
                          <div
                            className={`order-data-bottom ${
                              item.payment.status === 'paid' && 'paid'
                            } ${item.payment.status === 'pending' && 'pend'} ${
                              item.payment.status === 'failed' && 'failed'
                            }`}>
                            {item.payment.status === 'failed' && (
                              <p>
                                We couldn&apos;t complete your payment. This may
                                be due to a cancellation or an incomplete
                                transaction.
                              </p>
                            )}
                            {item.payment.status === 'pending' && (
                              <p>
                                Your payment is being processed. If this takes
                                more than a few minutes, click the{' '}
                                <span style={{ fontWeight: '600' }}>
                                  Requery
                                </span>{' '}
                                button or contact support.
                              </p>
                            )}
                            {item.payment.status === 'paid' && (
                              <p>
                                Your payment has been received and your order is
                                being processed. Thank you!
                              </p>
                            )}
                          </div>
                        </div>
                        <div
                          className={`order-data-button ${
                            item.payment.status === 'paid' && 'paid'
                          } ${item.payment.status === 'pending' && 'pend'} ${
                            item.payment.status === 'failed' && 'failed'
                          }`}>
                          <button
                            onClick={() => setReload(true)}
                            className="order-track">
                            Track Order Status
                          </button>
                          <button
                            onClick={() => setReload(true)}
                            className="order-track details">
                            View Order Details
                          </button>
                          <div className="order-receipt-btn">
                            <button>View Reciept</button>
                            <button>
                              <FontAwesomeIcon icon={faPrint} />
                              Print
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
        <div className="order-data-btn">
          <button
            onClick={() => {
              setPage((prev) => (prev > 1 ? prev - 1 : 1));
              console.log(page);
            }}
            disabled={page === 1}>
            <FontAwesomeIcon
              className="icon"
              icon={faAngleLeft}
            />{' '}
            Prev
          </button>
          <span>
            Page <b>{page}</b> of <b>{totalPage}</b>
          </span>
          <button
            onClick={() => {
              setPage((prev) => (prev < totalPage ? prev + 1 : prev));
              console.log(page);
            }}
            disabled={page === totalPage}>
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
