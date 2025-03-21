import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faMinusCircle,
  faNairaSign,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import BackNav from '../../components/BackNav/BackNav';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    getTotalCartAmount,
    viewDetailsHandler,
    setFoodView,
    getTotalCartQuantity,
    setCartToZero,
    url,
    // token,
  } = useContext(StoreContext);
  const token = localStorage.getItem('token');
  let navigate = useNavigate();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    area: '',
    street: '',
    phone: '',
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const foodInCart = food_list;
  const proceedHandler = async (e) => {
    e.preventDefault();
    if (getTotalCartAmount() === 0) {
      return;
    }
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] }; // Create a new object
        orderItems.push(itemInfo);
      }
    });

    // food_list.map((item) => {
    //   if (cartItems[item._id] > 0) {
    //     let itemInfo = item;
    //     itemInfo['quantity'] = cartItems[item._id];
    //     orderItems.push(itemInfo);
    //   }
    // });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    try {
      let response = await axios.post(url + '/api/order/create', orderData, {
        headers: {
          token,
          // 'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success('Order placed successfully! Redirecting...');
        window.location.href = response.data.paymentUrl;
      } else {
        return console.error('order placement failed');
      }
    } catch (error) {
      toast.error('An error occurred while placing the order.');
      return console.error('internal error ' + error.message);
    }
  };

  return (
    <>
      <BackNav goto={'back'} />

      <div className="cart-options">
        <button
          className={getTotalCartAmount() === 0 ? 'no-product' : ''}
          onClick={setCartToZero}>
          Remove All
        </button>
        <div
          className={
            getTotalCartAmount() === 0 ? 'no-product' : 'total-cart-quantity'
          }>
          Total Food: <div>{getTotalCartQuantity()}</div>
        </div>
        <button onClick={() => navigate(-1)}>Add more</button>
      </div>
      {getTotalCartAmount() === 0 ? (
        <p className="no-food-to-display">
          There is no food here. Please select food from the{' '}
          <NavLink to={'/'}>homepage</NavLink>
        </p>
      ) : (
        <div className="cart-foods">
          {foodInCart.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div
                  className="cart-items-wrapper"
                  key={index}>
                  <div className="cross flex-center">
                    <FontAwesomeIcon
                      onClick={() => {
                        removeAllFromCart(item._id);
                      }}
                      icon={faClose}
                    />
                  </div>
                  <div className="cart-items-wrapper-top">
                    From <b>{item.kitchen.kitchen_name} </b>Kitchen
                  </div>
                  <hr />
                  <div className="cart-items-wrapper-bottom">
                    <div className="cart-items-left">
                      <img src={url + '/images/' + item.image} />
                    </div>
                    <div className="cart-items-right">
                      <div className="cart-items-right-top">
                        <p>{item.name}</p>
                      </div>
                      <div className="cart-items-right-middle">
                        <button
                          className="btn"
                          onClick={() => {
                            setFoodView({
                              name: item.name,
                              kitchen_name: item.kitchen.kitchen_name,
                              category: item.category,
                              description: item.description,
                              id: item._id,
                              kitchenImage: item.k_image,
                              image: item.image,
                              price: item.price * 100,
                              foodInfo: item.foodInformation,
                              ingredients:
                                item.foodInformation.category.ingredients,
                              allergens:
                                item.foodInformation.category.allergens,
                              benefits:
                                item.foodInformation.healthImpacts.benefits,
                              risks: item.foodInformation.healthImpacts.risks,
                              extras: item.foodInformation.extrasAndMods.extras,
                              mods: item.foodInformation.extrasAndMods.mods,
                              calories: item.foodInformation.nutrients.calories,
                              others: item.foodInformation.nutrients.others,
                            });
                            viewDetailsHandler();
                          }}>
                          Details
                        </button>
                        <div className="quantity-container">
                          <span>Qty:</span>
                          <div className="quantity">
                            <FontAwesomeIcon
                              className="icons"
                              icon={faMinusCircle}
                              onClick={() => {
                                removeFromCart(item._id);
                              }}
                            />
                            <p>{cartItems[item._id]}</p>
                            <FontAwesomeIcon
                              onClick={() => {
                                addToCart(item._id);
                              }}
                              className="icons"
                              icon={faPlusCircle}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="cart-items-right-bottom">
                        <div className="total">
                          <p>
                            <span>Price:</span>{' '}
                            <FontAwesomeIcon icon={faNairaSign} />{' '}
                            {item.price * 100}
                          </p>
                          <p>
                            <span>Total: </span>
                            <FontAwesomeIcon icon={faNairaSign} />{' '}
                            {item.price * cartItems[item._id] * 100}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}

      <form
        onSubmit={proceedHandler}
        className="cart">
        <div className="customer-details">
          <p>First Name</p>
          <input
            name="firstName"
            onChange={onChangeHandler}
            required
            value={data.firstName}
            type="text"
          />
          <p>Last Name</p>
          <input
            name="lastName"
            onChange={onChangeHandler}
            required
            value={data.lastName}
            type="text"
          />
          <p>Email</p>
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            required
            value={data.email}
          />
          <p>Phone</p>
          <input
            name="phone"
            onChange={onChangeHandler}
            required
            value={data.phone}
            type="text"
          />
          <p>What is your Delivery Area?</p>
          <div className="address-select">
            <select
              name="area"
              onChange={onChangeHandler}
              required
              value={data.area}>
              <option
                disabled
                selected
                value="Select Area">
                Select Area
              </option>
              <option value="Inside Campus">Inside Campus</option>
              <option value="Millionaire Hostel Side">
                Millionaire Hostel Side
              </option>
              <option value="Safari Westend">Safari Westend</option>
              <option value="Winners Church Side">Winners Church Side</option>
              <option value="Yidi Road Side ">Yidi Road Side </option>
              <option value="Market Side">Market Side</option>
              <option value="School Road">School Road</option>
              <option value="Elemere">Elemere</option>
              <option value="Inside Safari">Inside Safari</option>
              <option value="Pando Lion">Pando Lion</option>
              <option value="Amina Castle">Amina Castle</option>
              <option value="Westend 1">Westend 1</option>
              <option value="Westend 2">Westend 2</option>
            </select>
          </div>
          <p>What is your delivery address?</p>
          <textarea
            name="street"
            onChange={onChangeHandler}
            required
            value={data.street}></textarea>
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Food Transaction Total</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total Amount</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button className={getTotalCartAmount() === 0 ? 'no-product' : ''}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Cart;
