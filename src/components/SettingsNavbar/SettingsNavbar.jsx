import { useContext } from 'react';
import { assets } from '../../assets/assets/frontend_assets/assets';
import { settings } from '../../pages/Settings/testing';
import './SettingsNavbar.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const SettingsNavbar = () => {
  const {
    setting,
    setSubText,
    // subText,
    setSetting,
    setSettingDisplay,
    loading,
    settingDisplay,
  } = useContext(StoreContext);
  // useState
  const navigate = useNavigate();

  return (
    <div className="settings-navbar">
      <div
        className="company-logo"
        onClick={() => {
          navigate(-1);
          setSetting('profile');
        }}>
        <div className="image ">
          <img
            src={assets.logo}
            className="logo"
          />
        </div>
        <p>Kitchen Connect</p>
      </div>

      <div className={`settings-sub-option-wrapper ${loading ? 'load' : ''}`}>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          settings
            .filter((item) => item.name === setting)
            .map((item, index) => (
              <ul key={index}>
                <li
                  className={`settings-sub-option ${
                    settingDisplay === 'set1' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setSettingDisplay('set1');
                    setSubText(item.set1);
                  }}>
                  {item.set1}
                  <div className="active-indicator"></div>
                </li>
                <li
                  className={`settings-sub-option ${
                    settingDisplay === 'set2' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setSettingDisplay('set2');
                    setSubText(item.set2);
                  }}>
                  {item.set2}
                  <div className="active-indicator"></div>
                </li>
                <li
                  className={`settings-sub-option ${
                    settingDisplay === 'set3' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setSettingDisplay('set3');
                    setSubText(item.set3);
                  }}>
                  {item.set3}
                  <div className="active-indicator"></div>
                </li>
                <li
                  className={`settings-sub-option ${
                    settingDisplay === 'set4' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setSettingDisplay('set4');
                    setSubText(item.set4);
                  }}>
                  {item.set4}
                  <div className="active-indicator"></div>
                </li>
                <li
                  className={`settings-sub-option ${
                    settingDisplay === 'set5' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setSettingDisplay('set5');
                    setSubText(item.set5);
                  }}>
                  {item.set5}
                  <div className="active-indicator"></div>
                </li>
              </ul>
            ))
        )}
      </div>
    </div>
  );
};

export default SettingsNavbar;
