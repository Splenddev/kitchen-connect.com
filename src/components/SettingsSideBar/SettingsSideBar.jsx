import './SettingsSideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBookJournalWhills,
  faCashRegister,
  faLock,
  faMobileScreen,
  faSignOut,
  faStore,
  faUserEdit,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
// import { assets } from '../../assets/assets/frontend_assets/assets';
const SettingsSidebar = () => {
  const {
    setting,
    setSetting,
    setSettingDisplay,
    reloadData,
    setText,
    color,
    userInfo,
    url,
  } = useContext(StoreContext);
  const fullName =
    // 'Felix Nwode';
    userInfo.name;
  const displayName = fullName
    .split(' ')
    .map((word) => word.charAt(0))
    .join(' ');
  return (
    <div className="settings-sidebar">
      <ul className="settings-option-wrapper">
        <li
          className={`settings-option ${setting === 'profile' ? 'active' : ''}`}
          onClick={() => {
            setSettingDisplay('set1');
            reloadData(0);
            setSetting('profile');
            setText('account');
          }}>
          <FontAwesomeIcon
            color={`${color[0]}`}
            icon={faUserEdit}
          />{' '}
          <span>Account</span>
        </li>
        <li
          className={`settings-option ${
            setting === 'appPreference' ? 'active' : ''
          }`}
          onClick={() => {
            setSettingDisplay('set1');
            reloadData(1);
            setSetting('appPreference');
            setText('app Preference');
          }}>
          <FontAwesomeIcon
            color={`${color[1]}`}
            icon={faMobileScreen}
          />{' '}
          <span>App Preferences</span>
        </li>
        <li
          className={`settings-option ${
            setting === 'orderAndDeliverySettings' ? 'active' : ''
          }`}
          onClick={() => {
            setSettingDisplay('set1');
            reloadData(2);
            setSetting('orderAndDeliverySettings');
            setText('order And Delivery');
          }}>
          <FontAwesomeIcon
            color={`${color[2]}`}
            icon={faBookJournalWhills}
          />{' '}
          <span>Order & Delivery</span>
        </li>
        <li
          className={`settings-option ${
            setting === 'securityAndPrivacy' ? 'active' : ''
          }`}
          onClick={() => {
            setSettingDisplay('set1');
            reloadData(3);
            setSetting('securityAndPrivacy');
            setText('security and privacy');
          }}>
          <FontAwesomeIcon
            color={`${color[3]}`}
            icon={faLock}
          />{' '}
          <span>Security</span>
        </li>
        <li
          className={`settings-option ${
            setting === 'notifications' ? 'active' : ''
          }`}
          onClick={() => {
            setSettingDisplay('set1');
            reloadData(4);
            setSetting('notifications');
            setText('notifications');
          }}>
          <FontAwesomeIcon
            color={`${color[1]}`}
            icon={faBell}
          />{' '}
          <span>Notifications</span>
        </li>
        <li
          className={`settings-option ${
            setting === 'restaurantsPreference' ? 'active' : ''
          }`}
          onClick={() => {
            setSettingDisplay('set1');
            reloadData(5);
            setSetting('restaurantsPreference');
            setText('restaurants preference');
          }}>
          <FontAwesomeIcon
            color={`${color[4]}`}
            icon={faStore}
          />{' '}
          <span>Restaurants</span>
        </li>
        <li
          className={`settings-option ${
            setting === 'subscriptions' ? 'active' : ''
          }`}
          onClick={() => {
            setSettingDisplay('set1');
            reloadData(6);
            setSetting('subscriptions');
            setText('subscriptions');
          }}>
          <FontAwesomeIcon
            color={`${color[3]}`}
            icon={faCashRegister}
          />{' '}
          <span>Subscription</span>
        </li>
        <li
          className={`settings-option ${setting === 'support' ? 'active' : ''}`}
          onClick={() => {
            setSettingDisplay('set1');
            reloadData(7);
            setSetting('support');
            setText('support');
          }}>
          <FontAwesomeIcon
            color={`${color[0]}`}
            icon={faUserGroup}
          />{' '}
          <span>Support</span>
        </li>
      </ul>
      <div className="settings-sidebar-signout">
        <div className="user-detail-image flex-center">
          {userInfo.profileImage ? (
            <img src={`${url}/images/${userInfo.profileImage}`} />
          ) : (
            <div
              style={{
                backgroundColor: `${
                  color[Math.floor(Math.random() * color.length)]
                }`,
              }}
              className="display-name">
              {displayName}
            </div>
          )}
        </div>
        <div className="user-signout">
          <FontAwesomeIcon
            className="icon"
            icon={faSignOut}
          />
          <p>Sign Out Account</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
