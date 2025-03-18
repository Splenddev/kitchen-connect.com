import { useEffect, useState } from 'react';
import './TypingEffect.css';
import Loader from '../Loader/Loader';

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  // const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Adding...';
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < fullText.length) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 200);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  useEffect(() => {
    setText(fullText.substring(0, index + 1));
  }, [index, fullText]);

  // useEffect(() => {
  //   const cursorInterval = setInterval(() => {
  //     setShowCursor((prev) => !prev);
  //   }, 500);

  //   return () => {
  //     clearTimeout(cursorInterval);
  //   };
  // }, []);

  return (
    <div className="typing-effect-container">
      <div className="typing-effect">
        <Loader
          color_primary={'#e72525'}
          color_secondary={'white'}
          width={'55px'}
          height={'55px'}
          borderWidth={'5px'}
        />
        <span className="typing-effect-text">
          {text}
          <span className="cursor">|</span>
          {/* {showCursor && '|'} */}
        </span>
      </div>
    </div>
  );
};

export default TypingEffect;
