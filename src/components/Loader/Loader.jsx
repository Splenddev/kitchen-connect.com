/* eslint-disable react/prop-types */
import './Loader.css';

const Loader = ({
  color_primary,
  color_secondary,
  width,
  height,
  borderWidth,
  boxShadow,
  containerBorderRadius,
}) => {
  return (
    <div
      style={{
        boxShadow: `${boxShadow}`,
        borderRadius: `${containerBorderRadius}`,
      }}
      className="loader-container">
      <div
        style={{
          width: `${width}`,
          height: `${height}`,
          border: `${borderWidth} solid ${color_secondary}`,
          borderTop: `solid ${color_primary}`,
        }}
        className="loader"></div>
    </div>
  );
};

export default Loader;
