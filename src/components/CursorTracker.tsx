import React, { useEffect, useState } from 'react';

const CursorTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x - 10,
        top: position.y - 10,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-5 h-5 bg-white/80 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"></div>
    </div>
  );
};

export default CursorTracker;