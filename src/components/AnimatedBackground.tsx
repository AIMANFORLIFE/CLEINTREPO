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
    rotationSpeed: number;
    rotationAngle: number;
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

    // Initialize enhanced orbs with more dynamic properties
    const colors = [
      'rgba(139, 92, 246, 0.15)', // Purple
      'rgba(59, 130, 246, 0.15)', // Blue
      'rgba(168, 85, 247, 0.15)', // Violet
      'rgba(99, 102, 241, 0.15)', // Indigo
      'rgba(236, 72, 153, 0.12)', // Pink
      'rgba(34, 197, 94, 0.12)'   // Green
    ];

    for (let i = 0; i < 6; i++) {
      orbsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 250 + 150,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        color: colors[i % colors.length],
        opacity: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.002,
        rotationAngle: 0
      });
    }

    let animationFrame = 0;

    const animate = () => {
      animationFrame++;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create enhanced gradient background with more depth
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.7, canvas.width
      );
      gradient.addColorStop(0, 'hsl(270, 70%, 65%)');
      gradient.addColorStop(0.3, 'hsl(240, 80%, 60%)');
      gradient.addColorStop(0.6, 'hsl(280, 75%, 70%)');
      gradient.addColorStop(1, 'hsl(260, 65%, 55%)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate enhanced orbs
      orbsRef.current.forEach((orb, index) => {
        orb.x += orb.dx;
        orb.y += orb.dy;
        orb.rotationAngle += orb.rotationSpeed;

        // Enhanced bouncing with rotation
        if (orb.x < -orb.radius * 0.5 || orb.x > canvas.width + orb.radius * 0.5) {
          orb.dx *= -1;
          orb.rotationSpeed *= -1;
          orb.x = Math.max(-orb.radius * 0.5, Math.min(canvas.width + orb.radius * 0.5, orb.x));
        }
        if (orb.y < -orb.radius * 0.5 || orb.y > canvas.height + orb.radius * 0.5) {
          orb.dy *= -1;
          orb.rotationSpeed *= -1;
          orb.y = Math.max(-orb.radius * 0.5, Math.min(canvas.height + orb.radius * 0.5, orb.y));
        }

        orb.pulsePhase += orb.pulseSpeed;
        const pulseScale = 1 + Math.sin(orb.pulsePhase) * 0.15;
        const currentRadius = orb.radius * pulseScale;

        // Enhanced gradient with rotation effect
        const orbGradient = ctx.createRadialGradient(
          orb.x + Math.cos(orb.rotationAngle) * 20, 
          orb.y + Math.sin(orb.rotationAngle) * 20, 
          0, 
          orb.x, 
          orb.y, 
          currentRadius
        );
        
        const centerOpacity = orb.opacity * (1 + Math.sin(orb.pulsePhase) * 0.3);
        const midOpacity = centerOpacity * 0.6;
        const edgeOpacity = centerOpacity * 0.1;
        
        orbGradient.addColorStop(0, orb.color.replace(/[\d.]+\)$/, `${centerOpacity})`));
        orbGradient.addColorStop(0.4, orb.color.replace(/[\d.]+\)$/, `${midOpacity})`));
        orbGradient.addColorStop(0.8, orb.color.replace(/[\d.]+\)$/, `${edgeOpacity})`));
        orbGradient.addColorStop(1, orb.color.replace(/[\d.]+\)$/, '0)'));

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle inner glow
        if (animationFrame % 3 === 0) {
          const innerGradient = ctx.createRadialGradient(
            orb.x, orb.y, 0,
            orb.x, orb.y, currentRadius * 0.3
          );
          innerGradient.addColorStop(0, orb.color.replace(/[\d.]+\)$/, `${centerOpacity * 0.5})`));
          innerGradient.addColorStop(1, orb.color.replace(/[\d.]+\)$/, '0)'));
          
          ctx.fillStyle = innerGradient;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, currentRadius * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Add floating particles
      if (animationFrame % 60 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

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
        background: 'linear-gradient(135deg, hsl(270, 70%, 65%) 0%, hsl(240, 80%, 60%) 30%, hsl(280, 75%, 70%) 70%, hsl(260, 65%, 55%) 100%)' 
      }}
    />
  );
};

export default AnimatedBackground;