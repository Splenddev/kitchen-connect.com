/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import './CircularProgress.css';
const CircularProgress = ({ value, label }) => {
  const circleRef = useRef(null);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const offset = circumference - (value / 100) * circumference;
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = offset;
    }
  }, [value, circumference]);

  return (
    <div className="composition">
      <svg
        width="100"
        height="100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="10"
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r={radius}
          stroke={`${value <= 75 ? '#22c55e' : '#e72525'}`}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="label">
        <span className="percent">{value}%</span>
        <p>
          {label === 'Carbohydrates' || label === 'Carbohydrate'
            ? 'Carbs'
            : label}
        </p>
      </div>
    </div>
  );
};

export default CircularProgress;
