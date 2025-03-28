import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './ProfileImage.css';

const ProfileImage = () => {
  const { url, userInfo, color } = useContext(StoreContext);
  const fullName = userInfo.name;
  const displayName = fullName
    .split(' ')
    .map((word) => word.charAt(0))
    .join(' ');
  return (
    <>
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
    </>
  );
};

export default ProfileImage;
