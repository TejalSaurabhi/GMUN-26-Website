import React, { useRef, useEffect, useState } from 'react';

const ScrollVelocity = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const [velocity, setVelocity] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      
      const timeDelta = currentTime - lastTime;
      const scrollDelta = currentScrollY - lastScrollY;
      
      if (timeDelta > 0) {
        const newVelocity = Math.abs(scrollDelta / timeDelta) * 100;
        setVelocity(newVelocity);
        
        // Decay velocity
        setTimeout(() => {
          setVelocity(prev => prev * 0.9);
        }, 50);
      }
      
      setLastScrollY(currentScrollY);
      setLastTime(currentTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, lastTime]);

  const skewAmount = Math.min(velocity * 0.5, 20);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-block',
        transform: `skewY(${skewAmount}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollVelocity;
