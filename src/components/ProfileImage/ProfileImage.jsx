import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './ProfileImage.css';

const ProfileImage = () => {
  const { url, userInfo, color } = useContext(StoreContext);
  const fullName = userInfo.name;
  const defaultName = 'John Doe';
  const displayName = fullName
    ? fullName
        .split(' ')
        .map((word) => word.charAt(0))
        .join(' ')
    : defaultName
        .split(' ')
        .map((word) => word.charAt(0))
        .join(' ');
  return (
    <div className="profile-image-container">
      {userInfo.profileImage ? (
        <img
          src={`${url}/images/${userInfo.profileImage}`}
          alt="profile image"
        />
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
  );
};

export default ProfileImage;
