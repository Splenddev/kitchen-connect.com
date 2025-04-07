/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import './VerifyPayment.css';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyPayment = () => {
  const { url } = useContext(StoreContext);
  const urlParams = new URLSearchParams(window.location.search);
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const transactionId = urlParams.get('trxref');
  const orderId = urlParams.get('orderId');
  let reference = urlParams.get('reference');
  const paymentReference = urlParams.get('paymentReference');
  const verifyPayment = async () => {
    console.log(orderId);
    // console.log(transactionId);
    console.log(reference);
    if (!paymentReference) {
      if (!orderId || !reference) {
        console.log(orderId, reference);
        toast.error(`Missing details! Check your network connection.`);
        return;
      }
    }
    if (!orderId || !paymentReference) {
      console.log(orderId, paymentReference);
      toast.error(`Missing details! Check your network connection.`);
      return;
    }
    let req_url = `${url}/api/order/verify-payments/paystack`;
    if (paymentReference) {
      req_url = `${url}/api/order/verify-payments/monnify`;
      reference = paymentReference;
    }
    try {
      const response = await axios.post(req_url, { orderId, reference });
      if (response.data.status === 'paid') {
        toast.success(response.data.message);
        window.location.href = '/orders';
        console.log('paid');
      } else if (response.data.status === 'failed') {
        toast.error(response.data.message);
        // alert('Payment cancelled! ');
        navigate('/cart');
        console.log('failed');
      } else {
        toast.error(response.data.message);
        alert('Payment pending! Go to orders and requery payment!');
        navigate('/orders');
        console.log('pending');
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occured! Please try again!', error.message);
      // navigate('/');
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  return <h2>Verifying payment...</h2>;
};

export default VerifyPayment;
