import React, { useEffect, useRef } from 'react';

export default function RomanticAmbience({ mood = 'romantic' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles array (hearts and sparkle stars)
    const particleCount = Math.min(32, Math.floor(width / 35));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.4 + 0.2,
      pulse: Math.random() * Math.PI,
      type: Math.random() > 0.4 ? 'heart' : 'sparkle',
    }));

    function drawHeart(c, x, y, size, opacity, rot) {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.scale(size / 30, size / 30);
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-15, -15, -25, 5, 0, 25);
      c.bezierCurveTo(25, 5, 15, -15, 0, 0);
      c.fillStyle = `rgba(244, 63, 94, ${opacity})`;
      c.shadowColor = 'rgba(255, 105, 180, 0.5)';
      c.shadowBlur = 10;
      c.fill();
      c.restore();
    }

    function drawSparkle(c, x, y, size, opacity) {
      c.save();
      c.translate(x, y);
      c.beginPath();
      c.fillStyle = `rgba(251, 191, 36, ${opacity})`;
      c.shadowColor = 'rgba(251, 191, 36, 0.7)';
      c.shadowBlur = 8;
      for (let i = 0; i < 4; i++) {
        c.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        c.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3)
        );
      }
      c.closePath();
      c.fill();
      c.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.pulse += 0.03;

        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.15;
        const safeOpacity = Math.max(0.08, Math.min(0.65, currentOpacity));

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, safeOpacity, p.rotation);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size * 0.6, safeOpacity);
        }

        // Wrap around borders
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mood]);

  return (
    <>
      {/* Soft Romantic Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-400/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-pink-400/20 blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-amber-300/15 blur-3xl"></div>
      </div>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
    </>
  );
}

