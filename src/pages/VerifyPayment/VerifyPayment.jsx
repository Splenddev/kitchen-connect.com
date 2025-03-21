/* eslint-disable react-hooks/exhaustive-deps */
import { data, useNavigate } from 'react-router-dom';
import './VerifyPayment.css';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const VerifyPayment = () => {
  const { url } = useContext(StoreContext);
  const urlParams = new URLSearchParams(window.location.search);
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const transactionId = urlParams.get('transaction_id');
  const orderId = urlParams.get('orderId');
  const verifyPayment = async () => {
    console.log(orderId);
    console.log(transactionId);

    try {
      const response = await axios.post(`${url}/api/order/verify-payments`, {
        orderId,
        transactionId,
      });
      if (response.data.success) {
        alert('Payment verified successfully! Your order has been placed');
        navigate('/orders');
      } else {
        alert('Payment verification failed! Please try again!');
        navigate('/cart');
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occured! Please try again!', error.message);
      navigate('/');
    }
  };
  useEffect(() => {
    if (transactionId && orderId) {
      console.log(orderId, transactionId);

      verifyPayment();
    }
  }, []);
  return <h2>Verifying payment...</h2>;
};

export default VerifyPayment;
