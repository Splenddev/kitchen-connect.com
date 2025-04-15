import { useContext, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import {
  faAngleLeft,
  faAngleRight,
  faCheckCircle,
  faCircle,
  faClock,
  faClose,
  faDownload,
  faEnvelopeOpen,
  faHourglassHalf,
  faNairaSign,
  faInfoCircle,
  faRefresh,
  faTruck,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import BackNav from '../../components/BackNav/BackNav.jsx';
import OrdersSkeleton from '../../components/OrdersSkeleton/OrdersSkeleton.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader.jsx';
import { ReactComponent as OrderPlaced } from '../../assets/SVG/add_shopping_cart.svg';
import { ReactComponent as DeliveryTruck } from '../../assets/SVG/del-truck.svg';
import { ReactComponent as OrderProccessed } from '../../assets/SVG/order-processed.svg';
import { ReactComponent as Package } from '../../assets/SVG/package.svg';
import { ReactComponent as ConfirmOrder } from '../../assets/SVG/confirm-order.svg';
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
  const [send, setSend] = useState(false);
  const [loadId, setLoadId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loadStatusPayment, setLoadStatusPayment] = useState('');
  const [loadStatusOrder, setLoadStatusOrder] = useState('');
  const [completedOrder, setCompletedOrder] = useState(false);
  const [trackOrderVisible, setTrackOrderVisible] = useState(false);

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
  const generateReceipt = async (id, email, send) => {
    try {
      const res = await axios.post(`${url}/api/receipt/generate`, {
        orderId: id,
        userEmail: 'felixnwode25@gmail.com',
        send,
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const downloadReceipt = async (orderId) => {
    try {
      const res = await axios.get(`${url}/api/receipt/download/${orderId}`, {
        responseType: 'blob', // important for PDFs
      });
      console.log('download receipt for order' + orderId);

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `receipt_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err.message);
    }
  };
  const trackOrderHandler = async (id) => {
    try {
      const response = await axios.get(`${url}/api/order/track/${id}`);
      setLoadStatusOrder(response.data.status);
      setReload(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.message);
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
  const sidebarVariants = {
    hidden: { y: '100%', opacity: 0, rotateX: -20 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
    exit: {
      y: '120%',
      opacity: 0,
      rotateX: -30,
      transition: { duration: 0.4, ease: 'easeInOut', delay: 0.1 },
    },
  };
  return (
    <>
      <BackNav />
      <div className="orders-container">
        <h2>My Orders</h2>
        <AnimatePresence>
          {trackOrderVisible && (
            <div className="orders-track-container">
              <motion.div
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="orders-track">
                <div className="orders-track-top">
                  <p>Track Order</p>
                  <p onClick={() => setTrackOrderVisible(false)}>
                    <FontAwesomeIcon
                      className="icon"
                      icon={faClose}
                    />
                  </p>
                </div>
                <div className="orders-track-middle">
                  <div className="orders-track-middle-item">
                    <p>Est. Time</p>
                    <p>30 min</p>
                  </div>
                  <div className="orders-track-middle-item">
                    <p>Order Ref.</p>
                    <p>{loadId}</p>
                  </div>
                  <div className="orders-track-middle-item">
                    <p>Payment Status</p>
                    <p>{loadStatusPayment} </p>
                  </div>
                  <div className="orders-track-middle-item">
                    <p>Order Status</p>
                    <span className="order-status-text">
                      {loadStatusOrder}
                      {loadStatusOrder === 'Food Processing' && (
                        <FontAwesomeIcon
                          icon={faHourglassHalf}
                          className="icon processing"
                        />
                      )}
                      {loadStatusOrder === 'Out For Delivery' && (
                        <FontAwesomeIcon
                          icon={faTruck}
                          className="icon out-for-delivery"
                        />
                      )}
                      {loadStatusOrder === 'Delivered' && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="icon"
                        />
                      )}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="orders-track-contents">
                  <div
                    className="orders-track-content"
                    style={{
                      color:
                        loadStatusPayment !== 'paid'
                          ? 'var(--pend)'
                          : 'var(--good) ',
                    }}>
                    <div className="icon-container">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="icon"
                        style={{
                          color:
                            loadStatusPayment !== 'paid'
                              ? 'var(--pend)'
                              : 'var(--good) ',
                        }}
                      />
                      <hr
                        style={{
                          background:
                            loadStatusPayment !== 'paid'
                              ? 'var(--pend)'
                              : 'var(--good) ',
                        }}
                      />
                    </div>
                    <div className="order-track-status">
                      <OrderPlaced
                        className="svg placed-order"
                        style={{
                          fill:
                            loadStatusPayment !== 'paid'
                              ? 'var(--pend)'
                              : 'var(--good) ',
                        }}
                      />
                      <div className="orders-track-content-text">
                        <h3>Order Received</h3>
                        <p>
                          We have received your order and will begin processing
                          it right away. You&apos;ll be updated throughout the
                          journey.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="orders-track-content"
                    style={{
                      color:
                        loadStatusPayment === 'paid' ? 'var(--good)' : 'grey',
                    }}>
                    <div className="icon-container">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="icon"
                      />
                      <hr
                        style={{
                          background:
                            loadStatusPayment === 'paid'
                              ? 'var(--good) '
                              : 'grey',
                        }}
                      />
                    </div>
                    <div className="order-track-status">
                      <ConfirmOrder
                        style={{
                          fill:
                            loadStatusPayment === 'paid'
                              ? 'var(--good) '
                              : 'grey',
                        }}
                        className=" svg confirm-order"
                      />
                      <div className="orders-track-content-text">
                        <h3>Payment Confirmed</h3>
                        <p>
                          Your payment for this order has been confirmed order.
                          We are now processing your request.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="orders-track-content"
                    style={{
                      color:
                        loadStatusPayment === 'paid' && loadStatusOrder
                          ? loadStatusOrder !== 'Out For Delivery'
                            ? 'var(--pend) '
                            : 'var(--good) '
                          : 'grey',
                    }}>
                    <div className="icon-container">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="icon"
                      />
                      <hr
                        style={{
                          background:
                            loadStatusPayment === 'paid' && loadStatusOrder
                              ? loadStatusOrder !== 'Out For Delivery'
                                ? 'var(--pend) '
                                : 'var(--good) '
                              : 'grey',
                        }}
                      />
                    </div>
                    <div className="order-track-status">
                      <OrderProccessed
                        style={{
                          fill:
                            loadStatusPayment === 'paid' && loadStatusOrder
                              ? loadStatusOrder !== 'Out For Delivery'
                                ? 'var(--pend) '
                                : 'var(--good) '
                              : 'grey',
                        }}
                        className="svg order-placed"
                      />
                      <div className="orders-track-content-text">
                        <h3>Order Processing</h3>
                        <p>
                          We are getting your order items ready for dispatch.
                          Thank you for your patience.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="orders-track-content "
                    style={{
                      color:
                        (loadStatusPayment === 'paid' &&
                          loadStatusOrder === 'Out For Delivery') ||
                        loadStatusOrder === 'Delivered'
                          ? loadStatusOrder !== 'Delivered'
                            ? 'var(--pend) '
                            : 'var(--good) '
                          : 'grey',
                    }}>
                    <div className="icon-container">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="icon"
                      />
                      <hr
                        style={{
                          background:
                            (loadStatusPayment === 'paid' &&
                              loadStatusOrder === 'Out For Delivery') ||
                            loadStatusOrder === 'Delivered'
                              ? loadStatusOrder !== 'Delivered'
                                ? 'var(--pend) '
                                : 'var(--good) '
                              : 'grey',
                        }}
                      />
                    </div>
                    <div className="order-track-status">
                      <DeliveryTruck
                        style={{
                          fill:
                            (loadStatusPayment === 'paid' &&
                              loadStatusOrder === 'Out For Delivery') ||
                            loadStatusOrder === 'Delivered'
                              ? loadStatusOrder !== 'Delivered'
                                ? 'var(--pend) '
                                : 'var(--good) '
                              : 'grey',
                        }}
                        className="truck svg"
                      />
                      <div className="orders-track-content-text">
                        <h3>Out For Delivery</h3>
                        <p>
                          Your order is currently on its way. Please stay at
                          alert for delivery at your specified address.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="orders-track-content"
                    style={{
                      color:
                        loadStatusPayment === 'paid' &&
                        loadStatusOrder === 'Delivered'
                          ? 'var(--good) '
                          : 'grey',
                    }}>
                    <div className="icon-container">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="icon"
                      />
                    </div>
                    <div className="order-track-status">
                      <Package
                        className="package svg"
                        style={{
                          fill:
                            loadStatusPayment === 'paid' &&
                            loadStatusOrder === 'Delivered'
                              ? 'var(--good) '
                              : 'grey',
                        }}
                      />
                      <div className="orders-track-content-text">
                        <h3>Delivered</h3>
                        <p>
                          Your order has been delivered. Kindly click on the
                          &#34;Confirm Delivery&#34; button to validate and
                          complete the process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="orders-track-bottom">
                  <button
                    className={`confirm-delivery ${
                      loadStatusOrder !== 'Delivered' && 'hidden'
                    }`}
                    onClick={() => {
                      if (loadStatusOrder !== 'Delivered')
                        return toast.error(
                          'You can not confirm this order. It has not been delivered.'
                        );
                      setCompletedOrder(true);
                    }}>
                    Confirm Delivery
                  </button>
                  <button onClick={() => trackOrderHandler(orderId)}>
                    Track Order Status
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
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
                    second: '2-digit',
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
                          <p>Order Ref</p>
                          <b>#{item.payment.transactionId}</b>
                        </div>
                        <div className="order-data-date-status">
                          <p style={{ textAlign: 'left' }}>Date</p>
                          <b>
                            {date.toLocaleString('en-US', optionDate)},{' '}
                            {date.toLocaleString('en-US', optionTime)}
                          </b>
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
                        <p>
                          Total Amount + Delivery Fee:{' '}
                          <span
                            style={{
                              color: 'var(--main-color)',
                              fontWeight: '600',
                            }}>
                            <FontAwesomeIcon icon={faNairaSign} />
                            {item.amount}
                          </span>
                        </p>
                        <p>
                          Item length:{' '}
                          <span
                            style={{
                              color: 'var(--main-color)',
                              fontWeight: '600',
                            }}>
                            {item.items.length}
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
                            onClick={() => {
                              setTrackOrderVisible(true);
                              setLoadId(item.payment.transactionId);
                              setLoadStatusPayment(item.payment.status);
                              setLoadStatusOrder(item.status);
                              setOrderId(item._id);
                            }}
                            className="order-track">
                            Open Order Status Log
                          </button>
                          <button
                            onClick={() => generateReceipt(item._id)}
                            className="order-track details">
                            Generate Receipt
                          </button>
                          <div className="order-receipt-btn">
                            <button
                              style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onClick={() => {
                                setSend(true);
                                generateReceipt(
                                  item._id,
                                  item.address.email,
                                  send
                                );
                              }}>
                              <FontAwesomeIcon icon={faEnvelopeOpen} />
                              Email Reciept
                            </button>
                            <button
                              style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onClick={() => downloadReceipt(item._id)}>
                              <FontAwesomeIcon icon={faDownload} />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="completed-order">
                        <b className="flex-center g-10">
                          Completed Order
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </b>
                        <FontAwesomeIcon
                          icon={faCircle}
                          style={{
                            color: `${
                              completedOrder ? 'var(--paid)  ' : 'grey'
                            }`,
                          }}
                        />
                        <p>
                          If your order has been delivered, click on
                          &#34;Confirm Delivery&#34; in Track Order to update
                          completed order status.
                        </p>
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
