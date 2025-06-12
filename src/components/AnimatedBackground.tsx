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

    // Initialize orbs
    const colors = [
      'rgba(139, 92, 246, 0.1)', // Purple
      'rgba(59, 130, 246, 0.1)', // Blue
      'rgba(168, 85, 247, 0.1)', // Violet
      'rgba(99, 102, 241, 0.1)'  // Indigo
    ];

    for (let i = 0; i < 4; i++) {
      orbsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
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

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'hsl(270, 70%, 65%)');
      gradient.addColorStop(0.5, 'hsl(240, 80%, 60%)');
      gradient.addColorStop(1, 'hsl(280, 75%, 70%)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate orbs
      orbsRef.current.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;

        // Bounce off edges
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
        const centerOpacity = orb.opacity * (1 + Math.sin(orb.pulsePhase) * 0.2);
        
        orbGradient.addColorStop(0, orb.color.replace('0.1', centerOpacity.toString()));
        orbGradient.addColorStop(0.6, orb.color.replace('0.1', (centerOpacity * 0.3).toString()));
        orbGradient.addColorStop(1, orb.color.replace('0.1', '0'));

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
      style={{ background: 'linear-gradient(135deg, hsl(270, 70%, 65%) 0%, hsl(240, 80%, 60%) 50%, hsl(280, 75%, 70%) 100%)' }}
    />
  );
};

export default AnimatedBackground;