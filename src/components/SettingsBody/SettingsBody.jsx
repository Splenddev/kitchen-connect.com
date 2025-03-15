/* eslint-disable react-hooks/exhaustive-deps */
import './SettingsBody.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';
import SettingsSidebar from '../SettingsSideBar/SettingsSideBar';
import ProfileUpdate from '../ProfileUpdate/ProfileUpdate';

const SettingsBody = () => {
  const { loading, setLoading, text, subText } = useContext(StoreContext);

  // useEffect
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <div className="settings-body">
      <div className="settings-body-left">
        <SettingsSidebar />
      </div>
      <div className="settings-body-right">
        <p className="heading-text">{text} settings</p>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          subText === 'Profile' && <ProfileUpdate />
        )}
      </div>
    </div>
  );
};

export default SettingsBody;
