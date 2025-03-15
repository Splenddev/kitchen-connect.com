import { useContext, useEffect, useRef, useState } from 'react';
import './ProfileUpdate.css';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleUp,
  faEdit,
  faHandPointUp,
  faPen,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const ProfileUpdate = () => {
  //context
  const { subText } = useContext(StoreContext);

  //state
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputState, setInputState] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
  });
  const [dummyUserNames, setDummyUserNames] = useState([]);
  const [figures, setfigures] = useState(0);
  //refs
  const inputRef = useRef(null);

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
    setInputState(false);
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

  const userNameGenerator = (e) => {
    const name = e.target.name;
    if (figures >= 25) {
      toast.error('Limit reached! You can only generate 5 usernames.');
      setIsVisible(false);
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
      setInputState(true);

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
  const userNameValidator = () => {
    if (!profileData.userName) {
      toast.error('Check the input fields. They are empty');
      setLoading(false);
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const dbUserName = profileData.userName;
      if (dummyUserNames.includes(dbUserName)) {
        return toast.error(
          `The input: ${profileData.userName} already exists in the database`
        );
      } else toast.success('The Userame is available');
      setLoading(false);
    }, 2000);
  };

  const sumbitData = (e) => {
    e.preventDefault();
    if (
      !profileData.firstName ||
      !profileData.lastName ||
      !profileData.userName
    ) {
      alert('Error!');
      return;
    }
    const userResponse = confirm('Are you sure about this data?');
    userResponse;
    if (userResponse) {
      setDummyUserNames((prev) => [...prev, profileData.userName]);
      toast.success('Data submitted successfully.');
      setProfileData({
        firstName: '',
        lastName: '',
        userName: '',
      });
    } else {
      toast.info('Data not submitted.');
    }
  };

  return (
    <div className="account-update">
      <div className="account-update-header flex-center-sb">
        <p className="sub-text">Edit {subText}</p>
        <button className="sub-text">Save & Update</button>
      </div>
      <hr />
      <form onSubmit={sumbitData}>
        <div className="profile-update">
          <div className="profile-update-image-upload">
            <div className="profile-image">
              <label htmlFor="profile-img">
                <div className="profile-img-container">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                    />
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
                  // setImage(e.target.files[0]);
                }}
                hidden
                required
              />
            </div>
            <button
              className={image ? '' : 'profile-set'}
              onClick={() => {
                setImage(null);
              }}>
              <p>Clear Image</p>
            </button>
          </div>
          <div className="details-update">
            <div className="name-update flex-fld-column">
              <p>Name</p>
              <div className="inputs">
                <div className="firstName layout">
                  <label htmlFor="firstName">
                    <p>First Name</p>
                  </label>
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
                      onChange={onChangeHandler}
                      value={profileData.firstName}
                      required
                    />{' '}
                  </div>
                </div>
                <div className="lastName layout">
                  <label htmlFor="lastName">
                    <p>Last Name</p>
                  </label>
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
                      required
                    />
                  </div>
                </div>
                <div className="userName">
                  <div className=" layout">
                    <label htmlFor="lastName">
                      <p>User Name</p>
                    </label>
                    <div className="loader-wrap">
                      <input
                        ref={inputRef}
                        name="userName"
                        value={profileData.userName}
                        onChange={onChangeHandler}
                        type="text"
                        id="userName"
                        disabled={inputState}
                        required
                      />
                      <div
                        className={`angleDown ${loading && 'adjust'} ${
                          isVisible && 'rotate'
                        }`}
                        onClick={() =>
                          isVisible ? setIsVisible(false) : setIsVisible(true)
                        }>
                        <FontAwesomeIcon icon={faAngleUp} />
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
                    <div></div>
                    {isVisible ? (
                      <div>
                        <input
                          type="button"
                          className={`useFirstName-btn ${
                            loading ? 'blurry' : ''
                          }`}
                          name="useFirstName"
                          onClick={userNameGenerator}
                          value="Use First Name"
                        />
                        <input
                          type="button"
                          className={`useLastName-btn ${
                            loading ? 'blurry' : ''
                          }`}
                          name="useLastName"
                          onClick={userNameGenerator}
                          value="Use Last Name"
                        />
                        <input
                          type="button"
                          className={`autoGen-btn ${loading ? 'blurry' : ''}`}
                          name="autoGen"
                          onClick={userNameGenerator}
                          value="Auto Gen"
                        />
                        <label
                          className="edit-username-btn"
                          htmlFor="edit-btn">
                          {<FontAwesomeIcon icon={faEdit} />}
                        </label>
                        <input
                          type="button"
                          id="edit-btn"
                          onClick={() => {
                            inputRef.current.focus();
                            setInputState(false);
                          }}
                          style={{ display: 'none' }}
                          value="edit"
                        />
                        <input
                          type="button"
                          onClick={userNameValidator}
                          value="Check Username"
                        />
                      </div>
                    ) : (
                      <p>
                        For more username creation option, click on the angle{' '}
                        <FontAwesomeIcon
                          icon={faHandPointUp}
                          className="icon-point"
                        />
                      </p>
                    )}
                  </div>
                  <div className="submit">
                    <button type="submit">Submit Data</button>
                  </div>
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
