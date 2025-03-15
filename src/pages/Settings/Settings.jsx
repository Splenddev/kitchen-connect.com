import SettingsNavbar from '../../components/SettingsNavbar/SettingsNavbar';
import SettingsBody from '../../components/SettingsBody/SettingsBody';
import './Settings.css';

const Settings = () => {
  return (
    // <BackNav />

    <div className="settings-container">
      <div className="settings">
        <div className="settings-top">
          <SettingsNavbar />
        </div>
        <div className="settings-bottom">
          <SettingsBody />
        </div>
      </div>
    </div>
  );
};

export default Settings;
