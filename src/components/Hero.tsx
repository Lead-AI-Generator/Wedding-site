'use client';

import { useEffect, useRef, useState } from 'react';

const WEDDING_DATE = new Date('2026-12-03T12:00:00');

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const a = 0.3 + 0.5 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${a * 0.7})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars-canvas" aria-hidden />;
}

export default function Hero() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const scrollDown = () => {
    document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="home">
      <StarField />

      <div className="hero-content">
        <span className="section-label" style={{ marginBottom: '1.5rem' }}>
          Together at Last
        </span>

        <div className="hero-names">Jatin</div>
        <span className="hero-ampersand">&amp;</span>
        <div className="hero-names">Anushi</div>

        <div className="gold-border-line" />

        <p className="hero-date">December 3, 2026 &nbsp;·&nbsp; Ahmedabad, India</p>

        <div className="countdown-wrap">
          <div className="countdown-unit">
            <span className="countdown-number">{pad(time.days)}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-unit">
            <span className="countdown-number">{pad(time.hours)}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-unit">
            <span className="countdown-number">{pad(time.minutes)}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-unit">
            <span className="countdown-number">{pad(time.seconds)}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
      </div>

      <button className="scroll-chevron" onClick={scrollDown} aria-label="Scroll down">
        &#8964;
      </button>
    </section>
  );
}
