import React, { useEffect, useState, useCallback } from 'react';

const CursorTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Throttle mouse move events for better performance
    let ticking = false;
    
    const throttledUpdatePosition = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updatePosition(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('mousemove', throttledUpdatePosition, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', throttledUpdatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [updatePosition, handleMouseLeave]);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x - 10,
        top: position.y - 10,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }}
    >
      <div className="w-4 h-4 bg-white/60 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"></div>
    </div>
  );
};

export default React.memo(CursorTracker);