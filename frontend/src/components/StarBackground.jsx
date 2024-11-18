import React, { useState, useEffect } from 'react';

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: 2 + Math.random() * 4,
        delay: Math.random() * 8,
        size: 0.5 + Math.random() * 2.5,
        opacity: 0.3 + Math.random() * 0.7,
        type: Math.random() > 0.8 ? 'sparkle' : 'regular'
      }));
    };
    
    setStars(generateStars());

    const interval = setInterval(() => {
      setStars(generateStars());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full opacity-0 
            ${star.type === 'sparkle' ? 'animate-starfall-sparkle' : 'animate-starfall'}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.delay}s`,
            background: star.type === 'sparkle' 
              ? 'linear-gradient(45deg, #fff, #73dafa, #fff)'
              : 'white',
            boxShadow: star.type === 'sparkle'
              ? '0 0 10px #fff, 0 0 20px #73dafa'
              : 'none'
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;