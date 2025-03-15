/* eslint-disable react/prop-types */
import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      style={{ width, height, borderRadius }}
      className="skeleton-info"></div>
  );
};

export default Skeleton;
