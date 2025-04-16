/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import './CircularProgress.css';
const CircularProgress = ({ value, label }) => {
  const circleRef = useRef(null);
  const radius = 35;
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
        width="80"
        height="80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="7"
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="40"
          cy="40"
          r={radius}
          stroke="#22c55e"
          strokeWidth="7"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform="rotate(-90 40 40)"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="label">
        <span className="percent">{value}%</span>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default CircularProgress;
