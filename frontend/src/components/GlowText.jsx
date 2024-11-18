import React from 'react';

const GlowText = ({ children, className = "", color = "pink" }) => {
  const colorMap = {
    pink: "text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]",
    cyan: "text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]",
    purple: "text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]"
  };

  return (
    <span className={`${colorMap[color]} ${className}`}>
      {children}
    </span>
  );
};

export default GlowText;
