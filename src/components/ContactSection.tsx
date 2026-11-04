import React, { useEffect, useRef, useState } from 'react';
import { copyEmailText, playChime } from '../utils/sound';

interface ContactSectionProps {
  onOpenCv: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCv, onShowToast }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const [throwsCount, setThrowsCount] = useState(0);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [outcome, setOutcome] = useState<{ visible: boolean; hit: boolean }>({
    visible: false,
    hit: true,
  });

  const actionsRef = useRef<{
    resetPlane: () => void;
    autoThrow: () => void;
  }>({
    resetPlane: () => {},
    autoThrow: () => {},
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let w = 1000;
    let h = 700;
    let isContactVisible = false;
    let rafId = 0;

    const sling = { x: 180, y: 460 };
    const plane = {
      x: 180,
      y: 460,
      vx: 0,
      vy: 0,
      ang: -0.25,
      state: 'idle' as 'idle' | 'flying' | 'landed' | 'missed',
    };
    const mbox = { x: 820, y: 380, w: 86, h: 62 };
    let dragging = false;
    const trail: { x: number; y: number }[] = [];
    const confetti: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      life: number;
    }[] = [];
    const fireflies: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      scale: number;
      phase: number;
    }[] = [];

    // Pre-render glowing firefly sprite to offscreen canvas once
    const ffSprite = document.createElement('canvas');
    ffSprite.width = 28;
    ffSprite.height = 28;
    const ffCtx = ffSprite.getContext('2d');
    if (ffCtx) {
      const ffGrad = ffCtx.createRadialGradient(14, 14, 1, 14, 14, 13);
      ffGrad.addColorStop(0, 'rgba(236, 252, 203, 1)');
      ffGrad.addColorStop(0.35, 'rgba(190, 242, 100, 0.72)');
      ffGrad.addColorStop(1, 'rgba(190, 242, 100, 0)');
      ffCtx.fillStyle = ffGrad;
      ffCtx.beginPath();
      ffCtx.arc(14, 14, 13, 0, Math.PI * 2);
      ffCtx.fill();
    }

    for (let i = 0; i < 34; i++) {
      fireflies.push({
        x: Math.random() * 1500,
        y: 200 + Math.random() * 500,
        vx: (Math.random() - 0.5) * 0.48,
        vy: (Math.random() - 0.5) * 0.36,
        scale: 0.55 + Math.random() * 0.68,
        phase: Math.random() * Math.PI * 2,
      });
    }

    function spawnMailboxConfetti(cx: number, cy: number) {
      confetti.length = 0;
      const colors = ['#A7F3D0', '#FDE047', '#4ADE80', '#FFFFFF', '#FBBF24'];
      for (let i = 0; i < 44; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 1.8 + Math.random() * 4.6;
        confetti.push({
          x: cx,
          y: cy,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 2.0,
          color: colors[i % colors.length],
          size: 3 + Math.random() * 3.6,
          life: 1,
        });
      }
    }

    function resize() {
      if (!canvas || !canvas.parentElement || !ctx) return;
      const r = canvas.parentElement.getBoundingClientRect();
      w = Math.max(300, r.width);
      h = Math.max(480, r.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = w < 640;
      sling.x = isMobile ? Math.max(72, w * 0.2) : Math.max(115, w * 0.16);
      sling.y = isMobile ? h * 0.69 : h * 0.69;
      mbox.x = isMobile ? w - Math.max(110, w * 0.28) : w - Math.max(150, w * 0.2);
      mbox.y = isMobile ? h * 0.56 : h * 0.55;

      if (plane.state === 'idle') {
        plane.x = sling.x;
        plane.y = sling.y;
      }
    }

    function resetPlane() {
      plane.state = 'idle';
      plane.x = sling.x;
      plane.y = sling.y;
      plane.vx = 0;
      plane.vy = 0;
      plane.ang = -0.22;
      trail.length = 0;
      setActiveStep(1);
      setOutcome((prev) => ({ ...prev, visible: false }));
    }

    function showOutcome(hit: boolean) {
      setOutcome({ visible: true, hit });
      if (hit) {
        spawnMailboxConfetti(mbox.x + 42, mbox.y + 24);
        playChime(523.25, 0.35);
        setTimeout(() => playChime(659.25, 0.45), 110);
        setTimeout(() => playChime(783.99, 0.6), 220);
        copyEmailText();
      } else {
        playChime(293.66, 0.35);
      }
    }

    function launchPlane(vx: number, vy: number) {
      plane.state = 'flying';
      plane.vx = vx;
      plane.vy = vy;
      setThrowsCount((c) => c + 1);
      setActiveStep(3);
      playChime(440.0, 0.25);
    }

    actionsRef.current.resetPlane = resetPlane;
    actionsRef.current.autoThrow = () => {
      resetPlane();
      const tx = mbox.x + mbox.w * 0.42;
      const ty = mbox.y + 24;
      const frames = 45;
      const g = 0.25;
      launchPlane((tx - sling.x) / frames, (ty - sling.y - 0.5 * g * frames * frames) / frames);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (plane.state !== 'idle') resetPlane();
      const r = canvas.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      if (Math.hypot(px - plane.x, py - plane.y) < 92) {
        dragging = true;
        setActiveStep(2);
        canvas.setPointerCapture(e.pointerId);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const r = canvas.getBoundingClientRect();
      const dx = e.clientX - r.left - sling.x;
      const dy = e.clientY - r.top - sling.y;
      const dist = Math.min(98, Math.hypot(dx, dy));
      const ang = Math.atan2(dy, dx);
      plane.x = sling.x + Math.cos(ang) * dist;
      plane.y = sling.y + Math.sin(ang) * dist;
      plane.ang = Math.atan2(sling.y - plane.y, sling.x - plane.x);
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      const dx = sling.x - plane.x;
      const dy = sling.y - plane.y;
      if (Math.hypot(dx, dy) > 12) {
        launchPlane(dx * 0.22, dy * 0.22);
      } else {
        resetPlane();
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);

    function drawFireflies(t: number) {
      if (!ctx) return;
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        if (plane.state === 'flying') {
          const dist = Math.hypot(f.x - plane.x, f.y - plane.y);
          if (dist < 88) {
            f.vx += plane.vx * 0.014;
            f.vy += (Math.random() - 0.5) * 0.32;
          }
        }
        f.vx *= 0.992;
        f.vy *= 0.992;
        if (Math.abs(f.vx) < 0.14) f.vx += (Math.random() - 0.5) * 0.06;
        if (Math.abs(f.vy) < 0.14) f.vy += (Math.random() - 0.5) * 0.06;

        f.x += f.vx + Math.sin(t + f.phase) * 0.22;
        f.y += f.vy + Math.cos(t * 0.9 + f.phase) * 0.18;
        if (f.x < 0) f.x = w;
        if (f.x > w) f.x = 0;
        if (f.y < h * 0.22) f.vy = Math.abs(f.vy);
        if (f.y > h - 20) f.vy = -Math.abs(f.vy);

        ctx.globalAlpha = 0.3 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2.2 + f.phase));
        const sz = 24 * f.scale;
        ctx.drawImage(ffSprite, f.x - sz * 0.5, f.y - sz * 0.5, sz, sz);
      }
      ctx.globalAlpha = 1;
    }

    function drawYSlingshot() {
      if (!ctx) return;
      ctx.save();
      ctx.strokeStyle = '#854D0E';
      ctx.lineWidth = 10.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(sling.x, sling.y + 92);
      ctx.lineTo(sling.x, sling.y + 16);
      ctx.moveTo(sling.x, sling.y + 16);
      ctx.lineTo(sling.x - 22, sling.y - 16);
      ctx.moveTo(sling.x, sling.y + 16);
      ctx.lineTo(sling.x + 22, sling.y - 16);
      ctx.stroke();

      if (plane.state === 'idle') {
        ctx.strokeStyle = '#BEF264';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(sling.x - 20, sling.y - 14);
        ctx.lineTo(plane.x, plane.y);
        ctx.lineTo(sling.x + 20, sling.y - 14);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawMailbox(t: number) {
      if (!ctx) return;
      const mx = mbox.x;
      const my = mbox.y;
      ctx.save();
      const pulse = 80 + Math.sin(t * 3) * 5;
      const grad = ctx.createRadialGradient(mx + 42, my + 30, 8, mx + 42, my + 30, pulse);
      grad.addColorStop(0, 'rgba(134, 239, 172, 0.42)');
      grad.addColorStop(1, 'rgba(134, 239, 172, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mx + 42, my + 30, pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(220, 252, 231, 0.48)';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([5, 5]);
      ctx.lineDashOffset = -t * 14;
      ctx.beginPath();
      ctx.arc(mx + 42, my + 26, 58, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(220, 252, 231, 0.22)';
      ctx.beginPath();
      ctx.arc(mx + 42, my + 26, 75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#5C3A21';
      ctx.fillRect(mx + 35, my + 50, 12, 88);

      ctx.fillStyle = '#1E5631';
      ctx.strokeStyle = '#A7F3D0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(mx, my, mbox.w, 52, [21, 21, 6, 6]);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(mx + mbox.w - 6, my + 42, 8.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#EF4444';
      ctx.fillRect(mx + 54, my - 16, 3.5, 20);
      ctx.fillRect(mx + 57.5, my - 16, 13, 8);

      ctx.fillStyle = '#1E7E3A';
      ctx.beginPath();
      ctx.roundRect(mx + 4, my - 47, 76, 24, 12);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 10.5px Plus Jakarta Sans, sans-serif';
      ctx.fillText('My mailbox', mx + 13, my - 31);
      ctx.restore();
    }

    function drawGoldenPaperPlane(x: number, y: number, ang: number) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.lineTo(-15, -12);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-15, 12);
      ctx.closePath();
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();
      ctx.strokeStyle = '#14532D';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    }

    function animate(now: number) {
      if (isContactVisible && ctx) {
        const t = now * 0.001;
        ctx.clearRect(0, 0, w, h);

        drawFireflies(t);

        ctx.save();
        ctx.strokeStyle = 'rgba(220, 252, 231, 0.44)';
        ctx.lineWidth = 1.9;
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = -t * 22;
        ctx.beginPath();
        ctx.moveTo(sling.x, sling.y - 10);
        ctx.quadraticCurveTo(
          (sling.x + mbox.x) / 2,
          Math.min(sling.y, mbox.y) - 145,
          mbox.x + 35,
          mbox.y + 18
        );
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        if (dragging) {
          const vx = (sling.x - plane.x) * 0.22;
          const vy = (sling.y - plane.y) * 0.22;
          ctx.fillStyle = '#BEF264';
          for (let s = 3; s < 42; s += 3) {
            const tx = plane.x + vx * s;
            const ty = plane.y + vy * s + 0.5 * 0.25 * s * s;
            ctx.beginPath();
            ctx.arc(tx, ty, 2.7, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        drawYSlingshot();
        drawMailbox(t);

        if (plane.state === 'flying') {
          trail.push({ x: plane.x, y: plane.y });
          if (trail.length > 30) trail.shift();

          plane.x += plane.vx;
          plane.y += plane.vy;
          plane.vy += 0.25;
          plane.ang = Math.atan2(plane.vy, plane.vx);

          if (
            plane.x >= mbox.x - 14 &&
            plane.x <= mbox.x + mbox.w + 14 &&
            plane.y >= mbox.y - 18 &&
            plane.y <= mbox.y + 60
          ) {
            plane.state = 'landed';
            showOutcome(true);
          } else if (plane.y > h - 10 || plane.x > w + 40 || plane.x < -40) {
            plane.state = 'missed';
            showOutcome(false);
          }
        }

        if (trail.length > 1) {
          ctx.strokeStyle = 'rgba(190, 242, 100, 0.72)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          trail.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
          ctx.stroke();
        }

        if (plane.state !== 'landed') {
          const idleBob = plane.state === 'idle' && !dragging ? Math.sin(t * 3.2) * 3.2 : 0;
          drawGoldenPaperPlane(plane.x, plane.y + idleBob, plane.ang);
        }

        for (let i = confetti.length - 1; i >= 0; i--) {
          const c = confetti[i];
          c.x += c.vx;
          c.y += c.vy;
          c.vy += 0.08;
          c.life -= 0.016;
          if (c.life <= 0) {
            confetti.splice(i, 1);
            continue;
          }
          ctx.globalAlpha = Math.max(0, c.life);
          ctx.fillStyle = c.color;
          ctx.fillRect(c.x, c.y, c.size, c.size);
        }
        ctx.globalAlpha = 1;

        if (plane.state === 'idle' && !dragging) {
          const pillBob = Math.sin(t * 3.2) * 2.8;
          ctx.fillStyle = 'rgba(13, 35, 26, 0.9)';
          ctx.beginPath();
          ctx.roundRect(sling.x - 43, sling.y - 68 + pillBob, 88, 25, 12.5);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '600 10.5px Plus Jakarta Sans, sans-serif';
          ctx.fillText('Drag me back', sling.x - 33, sling.y - 52 + pillBob);
        }
      }
      rafId = requestAnimationFrame(animate);
    }

    let obs: IntersectionObserver | null = null;
    if (contactRef.current && 'IntersectionObserver' in window) {
      obs = new IntersectionObserver(
        (entries) => {
          isContactVisible = entries[0].isIntersecting;
        },
        { threshold: 0.01 }
      );
      obs.observe(contactRef.current);
    } else {
      isContactVisible = true;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (obs) obs.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const handleCopyEmail = () => {
    copyEmailText();
    onShowToast('Copied dzakiudin07@gmail.com to clipboard!');
  };

  const stepClass = (n: 1 | 2 | 3) =>
    activeStep === n
      ? 'px-3.5 py-1.5 rounded-full bg-white text-stone-900 font-bold flex items-center gap-1.5 shadow transition-all scale-105'
      : 'px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 transition-all';

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative h-screen min-h-[100dvh] max-h-screen w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8 text-white select-none"
    >
      {/* Studio Ghibli Twilight Emerald Meadow + Glowing Fireflies + Crescent Moon Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="assets/mlm.png"
          alt="Studio Ghibli Starry Twilight over Green Wildflower Meadow"
          className="w-full h-full object-cover object-center select-none scale-[1.02]"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071A1E]/45 via-transparent to-[#071D15]/80 pointer-events-none"></div>
      </div>

      {/* Top Left Content: "Send me a paper plane." + 3 Numbered Pills + Throws Badge on Right */}
      <div className="section-shell relative z-20 flex flex-row items-start justify-between gap-4 pointer-events-none">
        <div className="space-y-3 sm:space-y-3.5 max-w-xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 backdrop-blur-md border border-emerald-300/25 text-[10px] sm:text-[0.6875rem] font-mono-code text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-lime-300 animate-pulse"></span>
            <span>FULL-SCREEN TWILIGHT MEADOW · SUMENEP, ID</span>
          </div>
          <h2 className="font-display-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-[1.05]">
            Send me a <br className="hidden sm:inline" />
            paper plane.
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md">
            Write to me at{' '}
            <a
              href="mailto:dzakiudin07@gmail.com"
              className="underline font-bold text-emerald-200 hover:text-white"
            >
              dzakiudin07@gmail.com
            </a>
            . Or pull the plane back across the firefly meadow and land it in the mailbox.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1 text-xs">
            <span id="plane-step-1" className={stepClass(1)}>
              <span
                className={`w-4 h-4 rounded-full text-[10px] sm:text-[0.625rem] flex items-center justify-center font-bold ${
                  activeStep === 1 ? 'bg-[#1E7E3A] text-white' : 'bg-white/25 text-white'
                }`}
              >
                1
              </span>
              <span>Pull back</span>
            </span>
            <span id="plane-step-2" className={stepClass(2)}>
              <span
                className={`w-4 h-4 rounded-full text-[10px] sm:text-[0.625rem] flex items-center justify-center font-bold ${
                  activeStep === 2 ? 'bg-[#1E7E3A] text-white' : 'bg-white/25 text-white'
                }`}
              >
                2
              </span>
              <span>Aim at the mailbox</span>
            </span>
            <span id="plane-step-3" className={stepClass(3)}>
              <span
                className={`w-4 h-4 rounded-full text-[10px] sm:text-[0.625rem] flex items-center justify-center font-bold ${
                  activeStep === 3 ? 'bg-[#1E7E3A] text-white' : 'bg-white/25 text-white'
                }`}
              >
                3
              </span>
              <span>Let go</span>
            </span>
            <button
              id="btn-auto-throw-night"
              type="button"
              onClick={() => actionsRef.current.autoThrow()}
              className="px-4 py-1.5 rounded-full bg-[#1E7E3A] hover:bg-[#16652d] text-white font-semibold cursor-pointer shadow transition-transform hover:scale-105 border border-emerald-300/30"
            >
              Auto-throw ✈️
            </button>
          </div>
        </div>

        {/* Top Right: Throws Counter Pill */}
        <div className="pointer-events-auto shrink-0">
          <span className="px-4 py-1.5 rounded-full bg-white/92 backdrop-blur-md text-xs font-bold text-[#122418] shadow-lg">
            Throws <strong id="night-throws-count" className="text-[#1E7E3A]">{throwsCount}</strong>
          </span>
        </div>
      </div>

      {/* Full-Section Interactive Slingshot, Fireflies & Mailbox Canvas */}
      <canvas
        id="night-plane-canvas"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      ></canvas>

      {/* Centered "Delivered across the meadow." Modal Card */}
      <div
        id="delivered-stars-card"
        className={`${
          outcome.visible ? 'block' : 'hidden'
        } relative z-30 max-w-md w-[90%] mx-auto my-auto p-6 sm:p-8 rounded-3xl bg-[#F6FBF3] text-[#122418] shadow-2xl border border-emerald-500/30 text-center space-y-4`}
      >
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1E7E3A] flex items-center justify-center mx-auto text-lg font-bold">
          ✈️
        </div>
        <h3 id="delivered-card-title" className="font-display-serif text-2xl sm:text-3xl font-extrabold text-[#122418]">
          {outcome.hit ? 'Delivered across the meadow.' : 'Drifted into the tall grass.'}
        </h3>
        <p id="delivered-card-sub" className="text-xs sm:text-sm text-[#324B3A]">
          {outcome.hit ? (
            <>
              Write to me at <strong>dzakiudin07@gmail.com</strong>
            </>
          ) : (
            <>
              Missed the postbox, but you can write to me at <strong>dzakiudin07@gmail.com</strong>
            </>
          )}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <a
            href="mailto:dzakiudin07@gmail.com"
            className="px-5 py-2.5 rounded-full bg-[#1E7E3A] hover:bg-[#16652d] text-white text-xs font-bold shadow"
          >
            Write to me
          </a>
          <button
            id="btn-throw-another-night"
            type="button"
            onClick={() => actionsRef.current.resetPlane()}
            className="px-5 py-2.5 rounded-full bg-[#DFEFE0] hover:bg-[#cde5cf] text-[#122418] text-xs font-bold cursor-pointer"
          >
            Throw another
          </button>
        </div>
      </div>

      {/* Bottom Centered Pill Bar */}
      <div className="section-shell relative z-20 text-center space-y-2 pointer-events-none">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#0D231A]/90 backdrop-blur-md border border-emerald-300/20 shadow-xl pointer-events-auto max-w-full">
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#122418] text-xs font-bold flex items-center gap-1.5">
            <span className="text-[#1E7E3A]">✉️</span>
            <span className="truncate">dzakiudin07@gmail.com</span>
          </span>
          <button
            id="btn-night-copy"
            type="button"
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-full text-xs text-white/90 hover:bg-white/10 cursor-pointer font-semibold"
          >
            Copy
          </button>
          <a
            href="https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-xs text-white/90 hover:bg-white/10 font-semibold"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Dzakiudin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-xs text-white/90 hover:bg-white/10 font-semibold"
          >
            GitHub
          </a>
          <button
            id="btn-night-cv"
            type="button"
            onClick={onOpenCv}
            className="px-3 py-1.5 rounded-full text-xs text-white/90 hover:bg-white/10 cursor-pointer font-semibold"
          >
            CV
          </button>
        </div>

        <div className="text-[11px] sm:text-[0.6875rem] text-white/80 pointer-events-auto">
          Ahmad Dzakiudin, full-stack developer &amp; AI system builder. Studio Ghibli meadow edition, 2026.
          <button
            id="btn-night-psst"
            type="button"
            onClick={onOpenCv}
            className="underline hover:text-emerald-200 cursor-pointer ml-1"
          >
            Psst, type hire.
          </button>
        </div>
      </div>
    </section>
  );
};
