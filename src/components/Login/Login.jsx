import { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import BackNav from '../BackNav/BackNav';
import { useNavigate } from 'react-router-dom';
import '../CheckBox/CheckBox.css';
import Loader from '../Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  // useState
  const {
    url,
    setToken,
    currentState,
    setCurrentState,
    rightCard,
    setRightCard,
    userData,
    setUserData,
    setUserInfo,
  } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleRepeatPasswordVisibility = () => {
    setIsVisibleRepeat(!isVisibleRepeat);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name && currentState === 'Sign Up') {
      newErrors.name = 'Name is required';
    }
    if (!userData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!userData.password) {
      newErrors.password = 'Password is required';
    } else if (userData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateForm();
    setUserData((data) => ({ ...data, [name]: value }));
    if (name === 'repeat-password') {
      setRepeatPassword(value);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://server-b0f1.onrender.com/api/user/login`,
        userData
      );
      if (response.data.success) {
        setLoading(false);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        setUserInfo(response.data.user);
        setToken(response.data.token);
        setUserData({
          email: '',
          password: '',
        });
        toast.success(response.data.message);
        navigate('/');
      } else {
        setLoading(false);
        toast.info('Check your network connection and try again.');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred!');
      } else {
        toast.error(
          `Network Issue! Check your network connection. ${error.message}`
        );
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      toast.info(
        `${errors.email ? errors.email + '.' : ''} ${
          errors.password ? errors.password + '.' : ''
        } ${errors.name ? errors.name + '.' : ''} `
      );
      setLoading(false);
      return;
    }
    if (userData.password !== repeatPassword) {
      console.log('yes');
      setLoading(false);
      toast.error('Password does not match.');
      return;
    }
    try {
      const response = await axios.post(`${url}/api/user/register`, userData);
      if (response.data.success) {
        setUserData({
          name: '',
          email: '',
          password: '',
        });
        setCurrentState('Login');
        toast.success(response.data.message);
      } else {
        toast.error(
          response.data.message || 'An Error occured while signing you up'
        );
      }
    } catch (error) {
      console.error('Signup error', error);
      if (error.response) {
        toast.error(
          error.response.data.message ||
            'The Email is registered already. Please try logging in.'
        );
      } else {
        toast.error(`Network Issue! Check your network connection.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackNav
        setRightCard={setRightCard}
        setData={setUserData}
      />
      <div className="login-popup">
        <div className={`form-container ${rightCard ? 'right-card' : ''}`}>
          <div className="form-container-left">
            <form
              onSubmit={currentState === 'Login' ? login : signup}
              className="login-signup-container">
              {currentState === 'Login' ? (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h2>Welcome Back User!</h2>{' '}
                  <FontAwesomeIcon
                    className={`${rightCard ? 'icon' : 'hide'}`}
                    onClick={() => setRightCard(false)}
                    icon={faClose}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="login-signup-title">
                <h2>
                  {currentState === 'Login'
                    ? 'Log In to your account'
                    : 'Create a new account'}
                </h2>
                {currentState !== 'Login' && (
                  <FontAwesomeIcon
                    className={`${rightCard ? 'icon' : 'hide'}`}
                    onClick={() => setRightCard(false)}
                    icon={faClose}
                  />
                )}
              </div>
              <div className="login-signup-inputs">
                {currentState === 'Login' ? (
                  <></>
                ) : (
                  <div className="input">
                    <label htmlFor="name">
                      <p>Full Name</p>
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={onChangeHandler}
                      id="name"
                      value={userData.name}
                      required
                      placeholder="Your Full Name eg. John Doe"
                    />
                  </div>
                )}
                <div className="input">
                  <label htmlFor="email">
                    <p>Email Address</p>
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    name="email"
                    onChange={onChangeHandler}
                    required
                    id="email"
                    placeholder="Your email address eg. abc123@gmail.com"
                  />
                </div>
                <div className="input">
                  <label htmlFor="password">
                    <p>Password</p>
                  </label>
                  <div>
                    <input
                      className="password"
                      type={isVisible ? 'text' : 'password'}
                      value={userData.password}
                      name="password"
                      onChange={onChangeHandler}
                      required
                      id="password"
                      placeholder="Password"
                    />
                    <span
                      className="visibility"
                      onClick={togglePasswordVisibility}>
                      {isVisible ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </span>
                  </div>
                </div>
                {currentState === 'Login' ? (
                  <></>
                ) : (
                  <div className="input">
                    <label htmlFor="repeat-password">
                      <p>Repeat Password</p>
                    </label>
                    <div>
                      <input
                        className="password"
                        type={isVisibleRepeat ? 'text' : 'password'}
                        value={repeatPassword}
                        name="repeat-password"
                        onChange={onChangeHandler}
                        required
                        id="repeat-password"
                        placeholder="Repeat Password"
                      />
                      <span
                        className="visibility"
                        onClick={toggleRepeatPasswordVisibility}>
                        {isVisibleRepeat ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <button className={`${loading ? 'loading-state' : ''}`}>
                {currentState === 'Sign Up' ? 'Create Account' : 'Sign In'}
                <div className="btn-loader-container">
                  {loading && (
                    <Loader
                      color_primary={'black'}
                      color_secondary={'white'}
                      width={'25px'}
                      height={'25px'}
                      borderWidth={'2px'}
                      boxShadow={'-2px 2px 3px #808080'}
                      containerBorderRadius={'50%'}
                    />
                  )}{' '}
                </div>
              </button>
              {currentState === 'Sign Up' && (
                <div className="login-signup-condition">
                  <div className="checkbox-wrapper">
                    <input
                      name="checkbox"
                      id="_checkbox-26"
                      type="checkbox"
                      required
                    />
                    <label
                      className="checkbox"
                      htmlFor="_checkbox-26">
                      <div className="tick_mark"></div>
                    </label>
                  </div>
                  <label htmlFor="_checkbox-26">
                    <p>
                      By continuing, I agree to the{' '}
                      <span>Terms of Use & Privacy Policy</span>
                    </p>
                  </label>
                </div>
              )}

              {currentState === 'Login' ? (
                <p>
                  Create a new account?{' '}
                  <span
                    onClick={() => {
                      setCurrentState('Sign Up');
                      setUserData({
                        name: '',
                        email: '',
                        password: '',
                      });
                      setLoading(false);
                    }}>
                    Click here.
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <span
                    onClick={() => {
                      setCurrentState('Login');
                      setLoading(false);
                      setUserData({
                        name: '',
                        email: '',
                        password: '',
                      });
                    }}>
                    Login here.
                  </span>
                </p>
              )}
            </form>
          </div>{' '}
          <div className="form-container-right">
            <div className="register-welcome">
              <h2>Welcome to</h2>
              <div className="img_container_company">
                <div className="image">
                  <img src={assets.logo} />
                </div>
                <p>Kitchen Connect</p>
              </div>
              <div className="kitchen-description">
                <b>Kitchen Connect</b> is a seamless food ordering web app that
                connects students and staff at KWASU with multiple kitchen
                restaurants. Users can browse menus, place orders and make
                secure payments via Flutterwave. With a user-friendly interface
                and reliable service, <b>Kitchen Connect</b> makes ordering food
                faster and more convenient
              </div>
              <div className="new_existing_user">
                <span>
                  New User?{' '}
                  <b
                    onClick={() => {
                      setCurrentState('Sign Up');
                      setRightCard(true);
                      setUserData({
                        name: '',
                        email: '',
                        password: '',
                      });
                    }}>
                    Click here
                  </b>
                </span>
                <hr />
                <span>
                  Existing User?{' '}
                  <b
                    onClick={() => {
                      setCurrentState('Login');
                      setRightCard(true);
                      setUserData({
                        name: '',
                        email: '',
                        password: '',
                      });
                    }}>
                    Click here
                  </b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
