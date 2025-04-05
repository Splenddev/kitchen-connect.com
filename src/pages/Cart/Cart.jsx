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
    area: 'Select Area',
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
      amount: parseInt(getTotalCartAmount() + 2),
      email: data.email,
    };
    try {
      let response = await axios.post(
        url + '/api/order/create/paystack',
        orderData,
        {
          headers: {
            token,
            // 'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
          },
        }
      );
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
        <div className="total-cart-quantity">
          Total Food: <div>{getTotalCartQuantity()}</div>
        </div>
        <button onClick={() => navigate(-1)}>Add more</button>
      </div>
      <div className="cart-body">
        {getTotalCartAmount() === 0 ? (
          <p className="no-food-to-display">
            There are no food selected. Please select foods from the{' '}
            <NavLink to={'/'}>Home page</NavLink> or from{' '}
            <NavLink to={'/all_food_list'}>All Food Page</NavLink>
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
                                extras:
                                  item.foodInformation.extrasAndMods.extras,
                                mods: item.foodInformation.extrasAndMods.mods,
                                calories:
                                  item.foodInformation.nutrients.calories,
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
                              {item.price}
                            </p>
                            <p>
                              <span>Total: </span>
                              <FontAwesomeIcon icon={faNairaSign} />{' '}
                              {item.price * cartItems[item._id]}
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
      </div>

      <form
        onSubmit={proceedHandler}
        className="cart">
        <div className="title-block">
          <p>Customer Details</p>
          <input
            value={'Use My Data'}
            type="button"
            onClick={() => {
              setData({
                firstName: 'John',
                lastName: 'Doe',
                email: 'abc@gmail.com',
                area: 'Safari Westend',
                street: 'street 1',
                phone: '0123456789',
              });
            }}
          />
        </div>
        <div className="customer-details">
          <div className="customer-details-inputs">
            <input
              placeholder="First name"
              name="firstName"
              onChange={onChangeHandler}
              required
              value={data.firstName}
              type="text"
            />
            <input
              placeholder="Last name"
              name="lastName"
              onChange={onChangeHandler}
              required
              value={data.lastName}
              type="text"
            />
            <input
              placeholder="Email address"
              type="email"
              name="email"
              onChange={onChangeHandler}
              required
              value={data.email}
            />
            <input
              placeholder="Phone number"
              name="phone"
              onChange={onChangeHandler}
              required
              value={data.phone}
              type="text"
            />
          </div>
          <hr />
          <div className="customer-details-textarea">
            <p>What is your Delivery Area?</p>
            <div className="address-select">
              <select
                name="area"
                onChange={onChangeHandler}
                required
                value={data.area}>
                <option value="">Select an option</option>
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
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Food Transaction Total</p>
                <p>
                  {' '}
                  <FontAwesomeIcon icon={faNairaSign} />
                  {getTotalCartAmount()}
                </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>
                  <FontAwesomeIcon icon={faNairaSign} />
                  {getTotalCartAmount() === 0
                    ? 0
                    : (16 / 100) * getTotalCartAmount()}
                </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total Amount</b>
                <b>
                  <FontAwesomeIcon icon={faNairaSign} />
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + (16 / 100) * getTotalCartAmount()}
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
