import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const orbs: Array<{
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    // Create fewer, larger orbs for minimalist feel
    for (let i = 0; i < 4; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: i % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        opacity: Math.random() * 0.3 + 0.1,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let animationFrame = 0;

    const animate = () => {
      animationFrame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create subtle animated gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const time = animationFrame * 0.005;
      
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.9 + Math.sin(time) * 0.05})`);
      gradient.addColorStop(0.5, `rgba(99, 102, 241, ${0.8 + Math.cos(time * 1.2) * 0.05})`);
      gradient.addColorStop(1, `rgba(59, 130, 246, ${0.9 + Math.sin(time * 0.8) * 0.05})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate orbs
      orbs.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;

        if (orb.x < -orb.radius * 0.5 || orb.x > canvas.width + orb.radius * 0.5) {
          orb.dx *= -1;
          orb.x = Math.max(-orb.radius * 0.5, Math.min(canvas.width + orb.radius * 0.5, orb.x));
        }
        if (orb.y < -orb.radius * 0.5 || orb.y > canvas.height + orb.radius * 0.5) {
          orb.dy *= -1;
          orb.y = Math.max(-orb.radius * 0.5, Math.min(canvas.height + orb.radius * 0.5, orb.y));
        }

        orb.pulsePhase += orb.pulseSpeed;
        const pulseScale = 1 + Math.sin(orb.pulsePhase) * 0.1;
        const currentRadius = orb.radius * pulseScale;

        const orbGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
        const centerOpacity = orb.opacity * (0.8 + Math.sin(orb.pulsePhase) * 0.2);
        
        orbGradient.addColorStop(0, orb.color.replace(/[\d.]+\)$/g, `${centerOpacity})`));
        orbGradient.addColorStop(0.6, orb.color.replace(/[\d.]+\)$/g, `${centerOpacity * 0.4})`));
        orbGradient.addColorStop(1, orb.color.replace(/[\d.]+\)$/g, '0)'));

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)' }}
    />
  );
};

export default AnimatedBackground;