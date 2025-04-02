import { useContext, useEffect, useState } from 'react';
import './ProfileUpdate.css';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoltLightning,
  faInfoCircle,
  faPen,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import InfoModal from '../InfoModal/InfoModal';

const ProfileUpdate = () => {
  //context
  const {
    subText,
    url,
    token,
    setUserInfo,
    customerName,
    setCustomerName,
    userInfo,
  } = useContext(StoreContext);

  //state
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isEnabled, setisEnabled] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: customerName.fName,
    lastName: customerName.lName,
    userName: userInfo && userInfo.username,
  });
  const [figures, setfigures] = useState(0);

  //constants variables
  const info = {
    title: 'How the username generator work',
    contentsDescription: {
      title: 'Purpose',
      titleDes: 'This tool helps you generate unique and creative usernames.',
    },

    contents: [
      {
        title: 'Use First & Last Name buttons',
        info: 'Click these buttons to add random numbers to your first name and last name respectively.',
      },
      {
        title: 'Auto Gen button',
        info: 'Click this button to generate completely unique usernames.',
      },
    ],
    button: 'Close',
  };

  // useEffect
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
    setPreview(null);
  }, [image]);

  //functions
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (e.target.name === 'firstName') {
      if (e.target.value.length > 0) {
        setError('');
      } else setError('firstName');
    }
    if (e.target.name === 'lastName') {
      if (e.target.value.length > 0) {
        setError('');
      } else setError('lastName');
    }
    // setError('');
    setProfileData((prev) => ({ ...prev, [name]: value }));
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
  const sidebarVariants2 = {
    hidden: { y: '100%', opacity: 0, rotateX: -20 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.6, ease: 'easeInOut', delay: 0.05 },
    },
    exit: {
      y: '120%',
      opacity: 0,
      rotateX: -30,
      transition: { duration: 0.4, ease: 'easeInOut', delay: 0.05 },
    },
  };
  const sidebarVariants3 = {
    hidden: { y: '100%', opacity: 0, rotateX: -20 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.6, ease: 'easeInOut', delay: 0.1 },
    },
    exit: {
      y: '120%',
      opacity: 0,
      rotateX: -30,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };
  const userNameGenerator = (e) => {
    const name = e.target.name;
    if (figures >= 25) {
      toast.error('Limit reached! You can only generate 5 usernames.');
      return;
    }

    setLoading(true);

    if (name === 'useFirstName') {
      if (profileData.firstName.length === 0) {
        toast.error('Firstname field is required. Please provide a name.');
        setLoading(false);
        setError('firstName');
        return;
      }
      if (profileData.firstName.length < 3) {
        toast.error(
          'Opps! Your name is too short. It must be at least 3 characters long.'
        );
        setLoading(false);
        setError('firstNameLength');
        return;
      }
    }
    if (name === 'useLastName') {
      if (profileData.lastName.length === 0) {
        toast.error('Lastname field is required. Please provide a name.');
        setLoading(false);
        setError('lastName');
        return;
      }
      if (profileData.lastName.length < 3) {
        toast.error(
          'Opps! Your name is too short. It must be at least 3 characters long'
        );
        setLoading(false);
        setError('lastNameLength');
        return;
      }
    }
    setError('w');

    setTimeout(() => {
      setfigures((prev) => prev + 1);

      let newUserName = '';
      let numPrev = Math.floor(Math.random() * 100);
      let fomattedCount = String(numPrev).padStart(3, '0');
      if (name === 'autoGen') {
        if (!profileData.firstName || !profileData.lastName) {
          const option = ['KC-USER', 'KC-CUSTOMER'];
          const index = Math.floor(Math.random() * option.length);
          newUserName += option[index] + fomattedCount;
          setProfileData((prev) => ({ ...prev, userName: newUserName }));
        } else {
          const option = [profileData.firstName, profileData.lastName];
          const index = Math.floor(Math.random() * option.length);
          newUserName += option[index] + fomattedCount;
          setProfileData((prev) => ({ ...prev, userName: newUserName }));
        }
      } else {
        if (name === 'useFirstName') {
          newUserName = profileData.firstName;
        }
        if (name === 'useLastName') {
          newUserName = profileData.lastName;
        }
        let figures = Math.floor(Math.random() * 9).toString();
        figures += Math.floor(Math.random() * 999);
        newUserName += figures;
        setProfileData((prev) => ({ ...prev, userName: newUserName }));
      }
      setLoading(false);
    }, 2000);
  };
  const sumbitData = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    if (
      !profileData.firstName &&
      !profileData.lastName &&
      !profileData.userName
    ) {
      alert('Error!');
      return;
    }
    const userResponse = confirm('Are you sure about this data?');
    userResponse;
    if (userResponse) {
      const name = profileData.firstName + ' ' + profileData.lastName;
      const username = profileData.userName;
      const data = { name, username };
      try {
        let response = await axios.put(`${url}/api/user/update/profile`, data, {
          headers: {
            token,
          },
        });
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem('userInfo', JSON.stringify(response.data.user));
          localStorage.setItem(
            'customerName',
            JSON.stringify(response.data.name)
          );
          setUserInfo(response.data.user);
          setCustomerName(response.data.name);
        } else {
          toast.error(response.data.message);
          return console.error('update failed');
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || 'An error occurred!');
        } else {
          toast.error(`Network Issue! Check your network connection.`);
        }
        console.error('internal error ' + error.message);
      } finally {
        setLoadingSubmit(false);
      }
      setisEnabled(true);
    } else {
      toast.info('Data not submitted.');
    }
  };
  const profilePicHandler = async () => {
    if (!image) {
      toast.error('Please choose an image to continue');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    try {
      let response = await axios.put(
        `${url}/api/user/update/profile/image`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data', token },
        }
      );
      if (response.data.success) {
        toast.success(
          response.data.message || 'Profile image updated successfully.'
        );
        const user = response.data.user;
        const userDatabaseData = {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          paymentOption: user.paymentOption,
          profileImage: user.profileImage,
          phoneNumber: user.phoneNumber,
        };
        localStorage.setItem('userInfo', JSON.stringify(userDatabaseData));
        setUserInfo(userDatabaseData);
        console.log(userDatabaseData);
        setImage(null);
      } else {
        toast.error(response.data.message || error);
        return console.error('update failed');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return console.error('internal error ' + error.message);
    }
  };
  return (
    <div className="account-update">
      <div className="account-update-header flex-center-sb">
        <p className="sub-text">Edit {subText}</p>
      </div>
      <hr />
      <div className="profile-update-image-upload">
        <div className="profile-image">
          <label htmlFor="profile-img">
            <div className="profile-img-container">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                />
              ) : userInfo.profileImage ? (
                <img src={`${url}/images/${userInfo.profileImage}`} />
              ) : (
                <FontAwesomeIcon
                  className="icon"
                  icon={faUserAlt}
                />
              )}
            </div>
            <div className="edit-icon-container">
              <FontAwesomeIcon
                className="icon"
                icon={faPen}
              />
            </div>
          </label>
          <input
            type="file"
            name="image"
            id="profile-img"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const max = 1 * 1024 * 1024;
              if (!file) return;
              if (file.size > max) {
                toast.error('File too big.');
                return;
              }
              setImage(file);
            }}
            hidden
            required
          />
        </div>
        <div className="profile-btn flex">
          <button
            className={image ? '' : 'profile-set'}
            onClick={() => {
              setImage(null);
            }}>
            <p>Clear Image</p>
          </button>
          <button
            className={image ? 'update-img' : 'hide'}
            onClick={profilePicHandler}>
            <p>Set Profile Picture</p>
          </button>
        </div>
      </div>
      <form onSubmit={sumbitData}>
        <div className="profile-update">
          <div className="details-update">
            <div className="name-update flex-fld-column">
              <div
                id="name-update"
                className="flex-center-sb">
                <p>Name</p>
                <div
                  className="icon-container-text flex-center"
                  onClick={() => {
                    setisEnabled((prev) => (prev === false ? true : false));
                    setSubmitBtn(true);
                    // if (isEnabled === true) {
                    //   setProfileData({
                    //     firstName: '',
                    //     lastName: '',
                    //     userName: '',
                    //   });
                    // }
                  }}>
                  <p>Edit</p>
                  <FontAwesomeIcon
                    icon={faPen}
                    id="fName"
                    className="icon edit"
                  />
                </div>
              </div>
              <hr />
              <div className="inputs">
                <div className="firstName layout">
                  <div className="label">
                    <label htmlFor="firstName">
                      <p>First Name</p>
                    </label>
                  </div>
                  <div
                    className={`wrapper ${
                      error === 'firstName' || error === 'firstNameLength'
                        ? 'blink'
                        : ''
                    }`}>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      disabled={profileData.firstName && isEnabled}
                      onChange={onChangeHandler}
                      value={profileData.firstName}
                      required
                    />{' '}
                  </div>
                </div>
                <div className="lastName layout">
                  <div className="label">
                    <label htmlFor="lastName">
                      <p>Last Name</p>
                    </label>
                  </div>
                  <div
                    className={`wrapper ${
                      error === 'lastName' || error === 'lastNameLength'
                        ? 'blink'
                        : ''
                    }`}>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      onChange={onChangeHandler}
                      value={profileData.lastName}
                      disabled={profileData.lastName && isEnabled}
                      required
                    />
                  </div>
                </div>
                <div className="userName">
                  <div className="layout">
                    <div className="label">
                      <InfoModal
                        modalContents={info}
                        clickHandler={setShowInfo}
                        stateHandler={showInfo}
                      />
                      <label htmlFor="lastName">
                        <p>User Name</p>
                      </label>
                      <div
                        onClick={() => setShowInfo(!showInfo)}
                        className="info_icon_container">
                        <FontAwesomeIcon
                          className={`info_icon icon ${
                            showInfo ? 'active' : ''
                          }`}
                          icon={faInfoCircle}
                        />
                      </div>
                    </div>
                    <div className="loader-wrap">
                      <input
                        // ref={inputRef}
                        name="userName"
                        value={profileData.userName}
                        onChange={onChangeHandler}
                        type="text"
                        id="userName"
                        disabled={profileData.userName && isEnabled}
                        required
                      />
                      <div
                        onClick={() => setIsVisible(!isVisible)}
                        className="bolt">
                        <FontAwesomeIcon icon={faBoltLightning} />
                      </div>
                      {loading && (
                        <div className="isLoading">
                          <Loader
                            width={'20px'}
                            height={'20px'}
                            borderWidth={'3px'}
                            color_primary={'red'}
                            color_secondary={'#eee2'}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="userName-btn layout">
                    <AnimatePresence>
                      {isVisible && (
                        <div>
                          <motion.input
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            type="button"
                            className={`useFirstName-btn ${
                              loading ? 'blurry' : ''
                            }`}
                            name="useFirstName"
                            onClick={userNameGenerator}
                            value="Use First Name"
                          />
                          <motion.input
                            variants={sidebarVariants2}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            type="button"
                            className={`useLastName-btn ${
                              loading ? 'blurry' : ''
                            }`}
                            name="useLastName"
                            onClick={userNameGenerator}
                            value="Use Last Name"
                          />
                          <motion.input
                            variants={sidebarVariants3}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            type="button"
                            className={`autoGen-btn ${loading ? 'blurry' : ''}`}
                            name="autoGen"
                            onClick={userNameGenerator}
                            value="Auto Gen"
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                  {submitBtn && (
                    <div className="submit">
                      <button type="submit">Submit Data</button>
                      {loadingSubmit && (
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
