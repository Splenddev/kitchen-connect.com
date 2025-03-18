import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import './UserDetails.css';

const UserDetails = () => {
  const { userInfo } = useContext(StoreContext);

  return (
    <div className="user-details">
      <p>
        Welcome <b>{userInfo.name}</b>
      </p>
    </div>
  );
};
export default UserDetails;
