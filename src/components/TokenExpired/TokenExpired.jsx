import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TokenExpired.css';
import { faClose, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const TokenExpired = () => {
  const { setTokenExpired, setRightCard } = useContext(StoreContext);
  const navigate = useNavigate();
  const closeModal = () => {
    setTokenExpired(false);
  };
  return (
    <div className="token-expired-container">
      <div className="token-expired">
        <FontAwesomeIcon
          className="token-expired-warning-modal-btn"
          icon={faWarning}
        />
        <FontAwesomeIcon
          onClick={closeModal}
          className="token-expired-close-modal-btn"
          icon={faClose}
        />
        <p>Token expired! Please Login again</p>
        <div className="token-expired-btn">
          <button
            onClick={() => {
              closeModal();
              navigate('/user');
              setRightCard(true);
            }}>
            Login
          </button>
          <button onClick={closeModal}>Continue browsing</button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpired;
