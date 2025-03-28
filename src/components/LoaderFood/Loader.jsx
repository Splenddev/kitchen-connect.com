import './Loader.css';
import burger from '../../assets/chicken-removebg-preview.png'; // Replace with any food image

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="steam">
        <div className="steam-line"></div>
        <div className="steam-line"></div>
        <div className="steam-line"></div>
      </div>
      <img
        src={burger}
        alt="Loading Food"
        className="loading-food"
      />
      <p className="loading-text">Preparing your meal...</p>
    </div>
  );
};

export default Loading;
