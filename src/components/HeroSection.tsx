import React, { useEffect, useRef } from 'react';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroStageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 1200;
    let h = 800;
    let isHeroVisible = true;
    let rafId = 0;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);

    const pollen: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < 28; i++) {
      pollen.push({
        x: Math.random() * 1400,
        y: Math.random() * 800,
        vx: 0.35 + Math.random() * 0.5,
        vy: -0.12 + (Math.random() - 0.5) * 0.25,
        r: 1.4 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const butterflies = [
      { x: 240, y: 260, vx: 0.65, vy: -0.16, color: '#FEF08A', phase: 0, scale: 0.9 },
      { x: 960, y: 210, vx: -0.55, vy: 0.15, color: '#FFFFFF', phase: 2.1, scale: 0.82 },
      { x: 420, y: 510, vx: 0.72, vy: -0.22, color: '#FDE68A', phase: 4.2, scale: 1.0 },
    ];

    function resize() {
      if (!canvas || !canvas.parentElement || !ctx) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      w = Math.max(320, rect.width);
      h = Math.max(480, rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawButterfly(b: (typeof butterflies)[number], t: number) {
      if (!ctx) return;
      const flap = Math.sin(t * 9.2 + b.phase);
      const wingY = 9 * Math.abs(flap) + 2;
      ctx.save();
      ctx.translate(b.x, b.y + Math.sin(t * 2.4 + b.phase) * 8);
      ctx.rotate(Math.atan2(b.vy, b.vx) * 0.25);
      ctx.scale(b.scale, b.scale);

      ctx.fillStyle = b.color;
      ctx.strokeStyle = 'rgba(18, 36, 24, 0.52)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.ellipse(-4, -wingY * 0.55, 7, wingY, -0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(4, -wingY * 0.45, 5.5, wingY * 0.85, 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    function tick(now: number) {
      if (isHeroVisible && ctx) {
        const t = now * 0.001;
        ctx.clearRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(255, 253, 240, 0.68)';
        ctx.beginPath();
        for (let i = 0; i < pollen.length; i++) {
          const p = pollen[i];
          p.x += p.vx + Math.sin(t + p.phase) * 0.22;
          p.y += p.vy + Math.cos(t * 0.8 + p.phase) * 0.18;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
          ctx.moveTo(p.x + p.r, p.y);
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        }
        ctx.fill();

        for (let i = 0; i < butterflies.length; i++) {
          const b = butterflies[i];
          b.x += b.vx;
          b.y += b.vy + Math.sin(t * 1.6 + b.phase) * 0.35;
          if (b.x > w + 40) b.x = -30;
          if (b.x < -40) b.x = w + 30;
          if (b.y < 80) b.vy = Math.abs(b.vy);
          if (b.y > h - 100) b.vy = -Math.abs(b.vy);
          drawButterfly(b, t);
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    let obs: IntersectionObserver | null = null;
    if (heroStageRef.current && 'IntersectionObserver' in window) {
      obs = new IntersectionObserver(
        (entries) => {
          isHeroVisible = entries[0].isIntersecting;
        },
        { threshold: 0.01 }
      );
      obs.observe(heroStageRef.current);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (obs) obs.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero-stage" ref={heroStageRef} className="relative h-[235vh]">
      <div className="sticky-section-pad sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-between pt-24 sm:pt-24 pb-7 sm:pb-8 px-4 sm:px-8">
        {/* Zooming Ghibli Green Meadow Desk Background Layer */}
        <div
          id="hero-zoom-scene"
          className="absolute inset-0 w-full h-full gpu-layer"
          style={{ transformOrigin: '50% 58%' }}
        >
          <div id="hero-parallax-layer" className="relative w-full h-full gpu-layer scale-[1.05]">
            <img
              src="assets/bg.png"
              alt="Studio Ghibli Green Meadow Desk Illustration"
              className="w-full h-full object-cover object-[50%_62%] select-none"
              decoding="async"
            />
            {/* Soft top sky mist so headline is ultra-legible while keeping the desk & meadow clear below */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/10 to-emerald-950/25 pointer-events-none"></div>

            {/* Live 60fps Studio Ghibli Breeze, Flapping Butterflies & Pollen Canvas */}
            <canvas
              id="hero-meadow-canvas"
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            ></canvas>

            {/* Animated Studio Ghibli Wind Currents SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block"
              viewBox="0 0 1440 810"
              fill="none"
            >
              <path
                className="ghibli-wind-path"
                d="M 100,240 C 340,185 520,275 780,210"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                className="ghibli-wind-path"
                style={{ animationDelay: '2.2s' }}
                d="M 760,170 C 980,130 1140,215 1360,155"
                stroke="rgba(255,255,255,0.68)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                className="ghibli-wind-path"
                style={{ animationDelay: '4.1s' }}
                d="M 60,610 C 290,555 470,635 700,575"
                stroke="rgba(220,252,231,0.55)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            {/* Floating SVG Dandelion Seeds & Gliding Paper Plane Emblem */}
            <svg
              className="dandelion-seed absolute left-[16%] top-[24%] w-7 h-7 text-white/90 hidden sm:block"
              viewBox="0 0 32 32"
              fill="none"
            >
              <line x1="16" y1="28" x2="16" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="16" y1="12" x2="9" y2="6" stroke="currentColor" strokeWidth="1.2" />
              <line x1="16" y1="12" x2="16" y2="4" stroke="currentColor" strokeWidth="1.2" />
              <line x1="16" y1="12" x2="23" y2="6" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="9" cy="6" r="1.5" fill="currentColor" />
              <circle cx="16" cy="4" r="1.5" fill="currentColor" />
              <circle cx="23" cy="6" r="1.5" fill="currentColor" />
            </svg>
            <svg
              className="dandelion-seed absolute right-[17%] top-[20%] w-8 h-8 text-amber-200 drop-shadow hidden sm:block"
              style={{ animationDelay: '1.4s' }}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path d="M16 16 C9 6, 2 10, 8 18 C4 22, 10 27, 16 19 Z" fill="#FDE68A" stroke="#122418" strokeWidth="1.2" />
              <path d="M16 16 C23 6, 30 10, 24 18 C28 22, 22 27, 16 19 Z" fill="#FDE68A" stroke="#122418" strokeWidth="1.2" />
            </svg>
            <svg
              className="dandelion-seed absolute left-[28%] top-[39%] w-12 h-12 text-[#122418]/75 hidden sm:block"
              style={{ animationDelay: '0.7s' }}
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M6 22L42 10L28 38L21 26L6 22Z"
                fill="rgba(255,253,245,0.88)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M42 10L21 26" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </div>
        </div>

        {/* Centered Editorial Headline & Bio with generous vertical spacing in the upper sky region */}
        <div
          id="hero-title-block"
          className="relative z-20 max-w-3xl mx-auto text-center space-y-3 sm:space-y-3.5 pt-1 sm:pt-2 pointer-events-none gpu-fade"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/88 backdrop-blur-md border border-emerald-900/10 text-[10.5px] sm:text-[0.6875rem] font-mono-code text-emerald-900 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>SUMENEP, EAST JAVA · UNIBA MADURA CS · 20+ SHIPPED REPOS</span>
          </div>
          <h1
            className="font-display-serif text-2xl sm:text-4xl md:text-[3.35rem] font-extrabold tracking-tight leading-[1.08] text-[#102216]"
            style={{
              textShadow: '0 2px 24px rgba(255,255,255,0.95), 0 1px 3px rgba(255,255,255,0.9)',
            }}
          >
            I engineer AI systems people can steer, <br className="hidden sm:inline" />
            at production scale.
          </h1>
          <p
            className="text-xs sm:text-[0.95rem] md:text-base leading-relaxed text-[#1B3323] max-w-2xl mx-auto font-medium px-2"
            style={{ textShadow: '0 1px 14px rgba(255,255,255,0.95)' }}
          >
            Full-stack developer with{' '}
            <strong className="font-bold text-[#102216] underline decoration-[#1E7E3A] decoration-2 underline-offset-2">
              20+ shipped repositories
            </strong>
            . Studying Computer Science at <strong className="font-bold text-[#102216]">UNIBA Madura</strong>,
            prototyping in code, and building{' '}
            <strong className="font-bold text-[#102216]">Google Gemini Pro</strong> &amp;{' '}
            <strong className="font-bold text-[#102216]">PostgreSQL</strong> platforms.
          </p>
        </div>

        {/* Bottom Translucent Botanical Pill */}
        <div id="hero-bottom-pill" className="relative z-20 gpu-fade">
          <div className="px-5 py-2.5 rounded-full bg-[#12281A]/82 backdrop-blur-md text-white text-xs flex items-center gap-3 shadow-xl border border-emerald-200/30">
            <span className="inline-flex items-center gap-2 opacity-95">
              <svg className="w-3.5 h-3.5 text-emerald-300" viewBox="0 0 16 16" fill="none">
                <rect x="3.5" y="1.5" width="9" height="13" rx="4.5" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="8" cy="5.2" r="1" fill="currentColor" />
              </svg>
              <span>Scroll into the laptop</span>
            </span>
            <a href="#work" className="text-[#A7F3D0] hover:text-white transition-colors font-semibold">
              or jump to the work →
            </a>
          </div>
        </div>

        {/* Sunlit Meadow Mist Flash Overlay when zooming through the laptop screen into Selected Work */}
        <div
          id="laptop-white-flash"
          className="absolute inset-0 bg-[#EEF6E8] pointer-events-none opacity-0 z-30 gpu-fade"
        ></div>
      </div>
    </section>
  );
};
