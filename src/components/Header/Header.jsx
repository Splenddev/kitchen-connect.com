import './Header.css';
import { useState, useEffect } from 'react';
// import header_img from '../../assets/header_2.jpg';
const Header = () => {
  // const [text, setText] = useState('...see more');
  const [textDisplay, setTextDisplay] = useState(true);
  // const [display, setDisplay] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const handle = (e) => {
      setTextDisplay(e.matches);
    };

    media.addEventListener('change', handle);
    return () => {
      media.removeEventListener('change', handle);
    };
  }, [textDisplay]);
  return (
    <div
      onClick={() => console.log()}
      className="header"
      id="header">
      <div className="header-contents">
        <h2>Craving Delicious? We&apos;ve Got You Covered!</h2>
        <p>
          Explore a world of flavors from the best kitchens in KWASU. Choose,
          click, and enjoy! Your next favorite meal is waiting to be delivered
          fresh and fast from our partnered kitchens. Order your favorite meals,
          snacks, and drinks, and have them delivered hot and fresh! Easy to
          order. Your next meal is just a click away!
        </p>
      </div>
    </div>
  );
};

export default Header;
