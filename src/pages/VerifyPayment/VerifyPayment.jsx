import { useSearchParams } from 'react-router-dom';
import './VerifyPayment.css';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const VerifyPayment = () => {
  const { url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transaction_id');
  // const success = searchParams.get('transaction_id');
  const orderId = searchParams.get('order_id');
  useEffect(() => {
    if (transactionId && orderId) {
      verifyPayment(orderId, transactionId);
    }
  }, [transactionId, orderId]);
  const verifyPayment = async () => {
    try {
      const response = await axios.get(
        url +
          `/api/order/verify-payments?orderId=${orderId}&transactionId=${transactionId}`
      );
      if (response.data.status === 'success') {
        alert('payment verified! Your order has been placed');
      } else {
        alert('payment unverified! Please try again!');
        window.location.href = '/cart';
      }
    } catch (error) {
      console.error('Error!', error);
      alert('An error occured! Please try again!');
    }
  };
  return <h2>Verifying payment...</h2>;
};

export default VerifyPayment;
