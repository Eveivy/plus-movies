import React from 'react'; 

const RadialProgressBar = ({ percentage, rad, strokeW }) => {
  const strokeWidth = strokeW;  
  const radius = rad;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="radial-progress" height={radius * 2} width={radius * 2}>
      <circle
        className="radial-progress-background"
        stroke="#f0088d45"
        strokeWidth={strokeWidth}
        fill="#0f143"
        r={normalizedRadius}
        cx={radius ? radius : 0}
        cy={radius ? radius : 0}
      />
      <circle
        className="radial-progress-bar"
        stroke={percentage < 70 ? "#dc3545" :"#ff0088d4"}
        strokeWidth={strokeWidth}
        fill="transparent"
        r={normalizedRadius}
        cx={radius ? radius : 0}
        cy={radius ? radius : 0}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset ? offset : 0,
        }}
      />
      <text
        x="50%"
        y="50%"
        className="radial-progress-text"
        textAnchor="middle"
        dy=".3em"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default RadialProgressBar;
