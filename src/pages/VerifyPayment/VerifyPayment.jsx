/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import './VerifyPayment.css';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const VerifyPayment = () => {
  const { url } = useContext(StoreContext);
  const urlParams = new URLSearchParams(window.location.search);
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const transactionId = urlParams.get('transaction_id');
  const orderId = urlParams.get('orderId');
  const tx_ref = urlParams.get('tx_ref');
  const verifyPayment = async () => {
    console.log(orderId);
    console.log(transactionId);
    console.log(tx_ref);

    if (!orderId || !tx_ref) {
      console.log(orderId, transactionId, tx_ref);
      toast.error(`Missing details! Check your network connection.`);
      return;
    }

    try {
      const response = await axios.post(`${url}/api/order/verify-payments`, {
        orderId,
        transactionId,
        tx_ref,
      });
      if (response.data.status === 'success') {
        alert('Payment verified successfully! Your order has been placed');
        navigate('/orders');
        console.log('paid');
      } else if (response.data.status === 'false') {
        alert('Payment cancelled! ');
        navigate('/cart');
        console.log('failed');
      } else {
        alert('Payment pending! Go to orders and requery payment!');
        navigate('/orders');
        console.log('pending');
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occured! Please try again!', error.message);
      navigate('/');
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  return <h2>Verifying payment...</h2>;
};

export default VerifyPayment;
