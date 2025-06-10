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
    hue: number;
    saturation: number;
    lightness: number;
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

    // Initialize orbs with varied colors
    const colors = [
      { hue: 270, saturation: 70, lightness: 65 }, // Purple
      { hue: 240, saturation: 80, lightness: 60 }, // Blue
      { hue: 280, saturation: 75, lightness: 70 }, // Violet
      { hue: 250, saturation: 85, lightness: 55 }, // Deep Blue
      { hue: 290, saturation: 65, lightness: 75 }, // Light Purple
    ];

    // Create fewer, optimized orbs
    for (let i = 0; i < 3; i++) {
      const colorData = colors[i % colors.length];
      orbsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 250 + 150,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: `hsla(${colorData.hue}, ${colorData.saturation}%, ${colorData.lightness}%, 0.1)`,
        opacity: Math.random() * 0.2 + 0.05,
        pulseSpeed: Math.random() * 0.008 + 0.003,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: colorData.hue,
        saturation: colorData.saturation,
        lightness: colorData.lightness
      });
    }

    let animationFrame = 0;
    let lastTime = 0;
    const targetFPS = 30; // Reduced FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime;
      animationFrame++;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create dynamic gradient background with color variations
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const time = animationFrame * 0.003;
      
      // Vary the colors slightly over time
      const hue1 = 270 + Math.sin(time) * 10;
      const hue2 = 240 + Math.cos(time * 1.2) * 15;
      const hue3 = 280 + Math.sin(time * 0.8) * 12;
      
      gradient.addColorStop(0, `hsla(${hue1}, 70%, 65%, ${0.9 + Math.sin(time) * 0.05})`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 80%, 60%, ${0.8 + Math.cos(time * 1.2) * 0.05})`);
      gradient.addColorStop(1, `hsla(${hue3}, 75%, 70%, ${0.9 + Math.sin(time * 0.8) * 0.05})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate orbs with color variations
      orbsRef.current.forEach((orb, index) => {
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
        const pulseScale = 1 + Math.sin(orb.pulsePhase) * 0.08;
        const currentRadius = orb.radius * pulseScale;

        // Vary orb colors over time
        const timeOffset = index * 2;
        const hueShift = Math.sin(time + timeOffset) * 20;
        const currentHue = orb.hue + hueShift;
        const currentSaturation = orb.saturation + Math.cos(time + timeOffset) * 10;
        const currentLightness = orb.lightness + Math.sin(time * 0.5 + timeOffset) * 5;

        const orbGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
        const centerOpacity = orb.opacity * (0.8 + Math.sin(orb.pulsePhase) * 0.15);
        
        orbGradient.addColorStop(0, `hsla(${currentHue}, ${currentSaturation}%, ${currentLightness}%, ${centerOpacity})`);
        orbGradient.addColorStop(0.6, `hsla(${currentHue}, ${currentSaturation}%, ${currentLightness}%, ${centerOpacity * 0.3})`);
        orbGradient.addColorStop(1, `hsla(${currentHue}, ${currentSaturation}%, ${currentLightness}%, 0)`);

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

export default React.memo(AnimatedBackground);