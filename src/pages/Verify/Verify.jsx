import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './VerifyExtras.css';
import './Verify.css';
import {
  faAddressBook,
  faCheckCircle,
  faClock,
  faCopy,
  faEnvelope,
  faEyeSlash,
  faMoneyBill,
  faNairaSign,
  faPhone,
  faTruckLoading,
  faUserPlus,
  faUserTie,
  faWallet,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Rating from './Rating/Rating';

const Verify = () => {
  const { url, token } = useContext(StoreContext);
  const urlParams = new URLSearchParams(window.location.search);
  const [order, setOrder] = useState({
    address: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'abc@gmail.com',
      area: '*******',
      phone: '0*** *** ****',
      street: '*******,*******,******',
    },
    amount: 0,
    items: [
      {
        image: '/image.png',
        name: 'Food 1',
        price: '0',
        quantity: 0,
        _id: 1,
      },
      {
        image: '/image.png',
        name: 'Food 2',
        price: '0',
        quantity: 0,
        _id: 2,
      },
    ],
    payment: {
      paymentMethod: '-----',
      status: 'pending',
      transactionId: 'ORDER-****',
    },
  });
  const navigate = useNavigate();
  const orderId = urlParams.get('orderId');
  let reference = urlParams.get('reference');
  const paymentReference = urlParams.get('paymentReference');
  const [isVerified, setIsVerified] = useState(false);
  const [displayName, setDisplayName] = useState(true);
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [copied, setCopied] = useState(false);
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const blockBack = () => {
      if (!isVerified) {
        setModal(true);
        window.history.pushState(null, '', window.location.href);
      }
    };
    window.addEventListener('popstate', blockBack);
    return () => {
      window.removeEventListener('popstate', blockBack);
    };
  }, [isVerified]);

  const verifyPayment = async () => {
    setLoading(true);
    if (!paymentReference) {
      if (!orderId || !reference) {
        toast.error(`Missing details! Check your network connection.`);
        return;
      }
    } else {
      if (!orderId || !paymentReference) {
        toast.error(`Missing details! Check your network connection.`);
        return;
      }
    }
    let req_url = `${url}/api/order/verify-payments/paystack`;
    if (paymentReference) {
      req_url = `${url}/api/order/verify-payments/monnify`;
      reference = paymentReference;
    }
    try {
      if (order.payment.status === 'paid')
        return toast.info('Payment has been verified already');
      const response = await axios.post(req_url, { orderId, reference });
      setOrder(response.data.order);
      if (response.data.status === 'paid') {
        // window.location.href = '/orders';
      } else if (response.data.status === 'failed') {
        toast.error(response.data.message || 'Payment not completed.');
        // alert('Payment cancelled! ');
        navigate('/cart');
        console.log('failed');
      } else {
        toast.error(response.data.message);
        alert('Payment pending! Go to orders and requery payment!');
        // navigate('/orders');
        console.log('pending');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred!');
      } else {
        toast.error(
          `Network Issue! Check your network connection. ${error.message}`
        );
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  const reviewHandler = async () => {
    if (!comment && rating === 0)
      return toast.warn('Kindly rate and share your feedback to proceed.');
    if (!comment) return toast.warn('Write a comment to proceed.');
    if (rating === 0) return toast.warn('You did not rate.');
    setBtnLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/review/add`,
        {
          rating: rating,
          comment: comment,
          nameDisplay: displayName,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred!');
      } else {
        toast.error('Network Issue! Check your network connection.');
      }
    } finally {
      setBtnLoading(false);
    }
  };
  const copy = async (t_ref) => {
    try {
      await navigator.clipboard.writeText(t_ref);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('failed to copy t_ref', error);
    }
  };
  const leave = () => {
    setIsVerified(true);
    setModal(false);
    setTimeout(() => {
      window.location.href = '/orders';
    }, 50);
  };
  return (
    <div className="verify">
      {modal && (
        <div className="verify-modal">
          <p>Are you sure you want to leave this site?</p>
          <button
            className="stay"
            onClick={() => setModal(false)}>
            Cancel
          </button>
          <button
            className="leave"
            onClick={leave}>
            Yes
          </button>
        </div>
      )}
      <div className="verify-progresses">
        <div
          style={{
            color: 'var(--main-color)',
          }}
          className="verify-progress">
          <FontAwesomeIcon icon={faTruckLoading} />
          <p>Checkout</p>
        </div>
        <hr />
        <div
          style={{
            color: `${
              order.payment.status === 'pending' ||
              order.payment.status === 'paid'
                ? 'var(--pend)'
                : '#d9d9d9'
            }`,
          }}
          className="verify-progress">
          <FontAwesomeIcon icon={faClock} />
          <p>Verification</p>
        </div>
        <hr
          style={{
            background: `${
              order.payment.status === 'paid' ||
              order.payment.status === 'failed'
                ? 'var(--paid)'
                : '#d9d9d9'
            }`,
          }}
        />
        <div
          style={{
            color: `${
              order.payment.status === 'paid' ||
              order.payment.status === 'failed'
                ? 'var(--paid)'
                : '#d9d9d9'
            }`,
          }}
          className="verify-progress">
          <FontAwesomeIcon icon={faCheckCircle} />
          <p>Status</p>
        </div>
      </div>
      <div className="verify-receipt">
        <div className="verify-receipt-top">
          <div className="verify-receipt-top-paid">
            {loading || order.payment.status === 'pending' ? (
              <>
                <svg
                  viewBox="0 0 50 50"
                  className="spinner-verify">
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                  />
                </svg>
                <p style={{ fontSize: '18px', fontWeight: 600 }}>
                  Processing your payment...
                </p>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '15px',
                    lineHeight: '20px',
                  }}>
                  Hang tight! Your payment for ORDER-
                  <span className="highlight">
                    {reference || paymentReference || '*****'}
                  </span>{' '}
                  is currently being processed. We&apos;re almost there - please
                  don&apos;t refresh or close this page.
                </p>
              </>
            ) : order.payment.status === 'failed' ? (
              <>
                <FontAwesomeIcon
                  icon={faWarning}
                  className="icon"
                  style={{ color: 'var(--main-color)' }}
                />
                <p style={{ fontSize: '18px', fontWeight: 600 }}>
                  Payment Failed
                </p>
                <p style={{ textAlign: 'center', fontSize: '15px' }}>
                  We could not process your payment.
                </p>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="icon"
                />
                <p style={{ fontSize: '18px', fontWeight: 600 }}>
                  Thank you{' '}
                  <span className="highlight">{order.address.fName}</span>
                </p>
                <p style={{ textAlign: 'center', fontSize: '15px' }}>
                  Your order{' '}
                  <span className="highlight">
                    {reference || paymentReference || '*****'}
                  </span>{' '}
                  is verified successfully and will be delivered soon.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="verify-receipt-bottom">
          <div className="verify-receipt-bottom-left flex">
            <div className="verify-receipt-bottom-left-top flex">
              {order.payment.status === 'paid' && (
                <>
                  <p>Your Order is confirmed</p>
                  <p>
                    Thank you! We have received your order and we are getting it
                    ready. A confirmation has been sent to your email. To track
                    order delivery status, go to <b>Profile</b> &gt;{' '}
                    <b>Orders</b>
                  </p>
                </>
              )}
              {order.payment.status === 'pending' && (
                <>
                  <p>Payment Pending</p>
                  <p>
                    Your payment is being processed. This may take a few moments
                    depending on your payment method. Please don&#39;t refresh
                    or close this page. If it remains pending for more than 10
                    minutes, kindly check your order history for requery or
                    contact support
                  </p>
                </>
              )}
              {order.payment.status === 'failed' && (
                <>
                  <p>Your payment was not successful</p>
                  <p>
                    Payment verification failed. This could be bacause you
                    either cancelled or abandoned payment or wrong details.
                    Please check you card or payment details and try again. If
                    the issue persists, contact your bank or reach out to our{' '}
                    <span
                      style={{
                        color: 'var(--main-color)',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}>
                      Support Team
                    </span>
                    .
                  </p>
                </>
              )}
            </div>
            <div className="flex verify-receipt-bottom-left-bottom">
              <p>Customer Details</p>
              <div className="verify-receipt-bottom-left-bottom-customer-details">
                <div className="flex verify-receipt-bottom-left-bottom-customer-details-left">
                  <div className="flex verify-receipt-bottom-left-bottom-customer-details-left-email">
                    <p>
                      <FontAwesomeIcon icon={faEnvelope} />
                      Email
                    </p>
                    <p>{order.address.email}</p>
                  </div>
                  <div className="flex verify-receipt-bottom-left-bottom-customer-details-left-email">
                    <p id="clamp-text">
                      <FontAwesomeIcon icon={faAddressBook} />
                      Address
                    </p>
                    <p className="address capitalize">
                      {order.address.street.split(',').map((prt, idx) => (
                        <span key={idx}>{prt.trim()}</span>
                      ))}
                      {order.address.area}
                    </p>
                  </div>
                </div>
                <div className="flex verify-receipt-bottom-left-bottom-customer-details-right">
                  <div className="flex verify-receipt-bottom-left-bottom-customer-details-right-phone">
                    <p>
                      <FontAwesomeIcon icon={faPhone} />
                      Phone
                    </p>
                    <p>{order.address.phone}</p>
                  </div>
                  <div className="flex verify-receipt-bottom-left-bottom-customer-details-right-name">
                    <p>
                      <FontAwesomeIcon icon={faUserTie} />
                      Full Name
                    </p>
                    <p>
                      {order.address.firstName + ' ' + order.address.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="verify-receipt-bottom-right">
            <p
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              Order Receipt <button>Print receipt</button>
            </p>
            <div className="verify-receipt-bottom-right-order-top">
              {order.items.map((item) => (
                <div
                  className="verify-receipt-bottom-right-order-top-item"
                  key={item._id}>
                  <div className="verify-receipt-bottom-right-order-image">
                    <img src={`${url}/images/${item.image}`} />
                    <div className="dot flex-center">
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--main-color)', fontWeight: 'bold' }}>
                    {item.name}
                  </p>
                  <p className="price">
                    <FontAwesomeIcon icon={faNairaSign} />
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
            <hr />
            <div className="verify-receipt-bottom-right-order-mid">
              <span>
                <h4>Trx Id</h4>
                <p
                  style={{ position: 'relative' }}
                  className="values">
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="icon"
                    onClick={() =>
                      copy(reference || paymentReference || '*****')
                    }
                  />
                  {reference || paymentReference || '*****'}
                  {copied && (
                    <span className="copied flex">
                      Copied <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                  )}
                </p>
              </span>
              <span>
                <h4>Payment Method</h4>
                <p className="values">
                  <FontAwesomeIcon icon={faWallet} />
                  {order.payment.paymentMethod}
                </p>
              </span>
              <span>
                <h4>Payment Status</h4>
                <p className="values">
                  {order.payment.status === 'paid' && (
                    <FontAwesomeIcon icon={faCheckCircle} />
                  )}
                  {order.payment.status === 'pending' && (
                    <FontAwesomeIcon icon={faClock} />
                  )}
                  {order.payment.status === 'failed' && (
                    <FontAwesomeIcon icon={faWarning} />
                  )}
                  {order.payment.status}
                </p>
              </span>
              <span>
                <h4>Subtotal</h4>
                <p className="values">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <p>
                    <FontAwesomeIcon icon={faNairaSign} />
                    {order.amount}
                  </p>
                </p>
              </span>
            </div>
            <hr />
            <div className="verify-receipt-bottom-right-order-bottom">
              <span>
                <h3>Total</h3>
                <h3>
                  <FontAwesomeIcon icon={faNairaSign} />
                  {order.amount}
                </h3>
              </span>
            </div>
          </div>
        </div>
        <div className="verify-review-container">
          <h2
            className="leave_a_review"
            style={{
              textAlign: 'center',
              fontWeight: 700,
            }}>
            Leave a Review
          </h2>
          <p
            style={{
              textAlign: 'center',
              fontWeight: 600,
              marginBottom: '20px',
            }}>
            Tell us what you think. Your feedback matters.
          </p>
          <div className="verify-review">
            <hr className="line-hr" />
            <div className="verify-review-btn">
              <div className="verify-review-text-area">
                <p style={{ textAlign: 'center' }}>
                  Please rate the usability and overall experience of this
                  website?
                </p>
                <Rating setRating={setRating} />
                <p style={{ textAlign: 'center' }}>
                  Kindly share your thoughts and suggestions about this website.
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="display-option-container">
                <div
                  className={`display-option ${displayName ? 'active' : ''}`}
                  onClick={() => setDisplayName(true)}>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="icon"
                  />
                  <p>Display with your Name</p>
                </div>
                <div
                  className={`display-option ${displayName ? '' : 'active'}`}
                  onClick={() => setDisplayName(false)}>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faEyeSlash}
                  />
                  <p>Display Anonymously</p>
                </div>
              </div>
              <div className="btn-options">
                <button onClick={() => (window.location.href = '/order')}>
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    reviewHandler();
                    console.log(rating);
                  }}>
                  {btnloading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
