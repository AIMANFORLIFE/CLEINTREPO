import React, { useEffect, useRef, useCallback } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const orbsRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
    color: string;
    opacity: number;
    pulseSpeed: number;
    pulsePhase: number;
  }>>([]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize orbs with refined colors (no green)
    const colors = [
      'rgba(139, 92, 246, 0.12)', // Purple
      'rgba(59, 130, 246, 0.12)', // Blue
      'rgba(168, 85, 247, 0.12)', // Violet
      'rgba(99, 102, 241, 0.12)', // Indigo
      'rgba(236, 72, 153, 0.10)', // Pink
      'rgba(147, 51, 234, 0.10)'  // Deep Purple
    ];

    for (let i = 0; i < 5; i++) {
      orbsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 120,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: colors[i % colors.length],
        opacity: Math.random() * 0.3 + 0.1,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let animationFrame = 0;

    const animate = () => {
      animationFrame++;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Refined gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.7, canvas.width
      );
      gradient.addColorStop(0, 'hsl(270, 65%, 60%)');
      gradient.addColorStop(0.4, 'hsl(240, 70%, 55%)');
      gradient.addColorStop(0.7, 'hsl(280, 65%, 65%)');
      gradient.addColorStop(1, 'hsl(260, 60%, 50%)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate orbs with subtle movement
      orbsRef.current.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;

        // Gentle bouncing
        if (orb.x < -orb.radius * 0.3 || orb.x > canvas.width + orb.radius * 0.3) {
          orb.dx *= -1;
          orb.x = Math.max(-orb.radius * 0.3, Math.min(canvas.width + orb.radius * 0.3, orb.x));
        }
        if (orb.y < -orb.radius * 0.3 || orb.y > canvas.height + orb.radius * 0.3) {
          orb.dy *= -1;
          orb.y = Math.max(-orb.radius * 0.3, Math.min(canvas.height + orb.radius * 0.3, orb.y));
        }

        orb.pulsePhase += orb.pulseSpeed;
        const pulseScale = 1 + Math.sin(orb.pulsePhase) * 0.1;
        const currentRadius = orb.radius * pulseScale;

        // Refined gradient
        const orbGradient = ctx.createRadialGradient(
          orb.x, orb.y, 0, 
          orb.x, orb.y, currentRadius
        );
        
        const centerOpacity = orb.opacity * (1 + Math.sin(orb.pulsePhase) * 0.2);
        const midOpacity = centerOpacity * 0.5;
        const edgeOpacity = centerOpacity * 0.1;
        
        orbGradient.addColorStop(0, orb.color.replace(/[\d.]+\)$/, `${centerOpacity})`));
        orbGradient.addColorStop(0.5, orb.color.replace(/[\d.]+\)$/, `${midOpacity})`));
        orbGradient.addColorStop(1, orb.color.replace(/[\d.]+\)$/, '0)'));

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ 
        background: 'linear-gradient(135deg, hsl(270, 65%, 60%) 0%, hsl(240, 70%, 55%) 40%, hsl(280, 65%, 65%) 70%, hsl(260, 60%, 50%) 100%)' 
      }}
    />
  );
};

export default AnimatedBackground;