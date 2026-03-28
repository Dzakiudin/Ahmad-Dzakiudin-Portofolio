import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Multi-layer parallax background — Awwwards cinematic depth.
 * Each orb moves at a different speed with very high scrub for
 * silky, never-janky trailing movement. The orbs also have
 * subtle scale shifts to reinforce the "camera dolly" effect.
 */
export default function BackgroundElements() {
  const gridRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orb 1 — deep background, very slow drift
      gsap.to(orb1Ref.current, {
        y: 400,
        x: -80,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 5,       // extremely slow trailing
        },
      });

      // Orb 2 — mid-background, counter-drift
      gsap.to(orb2Ref.current, {
        y: -350,
        x: 120,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 4,
        },
      });

      // Orb 3 — mid layer, diagonal drift
      gsap.to(orb3Ref.current, {
        y: 200,
        x: -60,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 3.5,
        },
      });

      // Tech grid — barely perceptible drift (camera feel)
      gsap.to(gridRef.current, {
        backgroundPositionY: '80px',
        backgroundPositionX: '-20px',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 6,        // ultra-smooth
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Tech Grid Background */}
      <div
        ref={gridRef}
        className="fixed inset-0 tech-grid-bg pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Glow Orbs — each at a different z-depth */}
      <div
        ref={orb1Ref}
        className="glow-orb"
        style={{
          width: '700px',
          height: '700px',
          backgroundColor: 'var(--color-primary-container)',
          top: '-150px',
          right: '-150px',
        }}
      />
      <div
        ref={orb2Ref}
        className="glow-orb"
        style={{
          width: '550px',
          height: '550px',
          backgroundColor: 'var(--color-secondary-container)',
          bottom: '-120px',
          left: '-120px',
        }}
      />
      <div
        ref={orb3Ref}
        className="glow-orb"
        style={{
          width: '450px',
          height: '450px',
          backgroundColor: 'var(--color-tertiary-container)',
          top: '40%',
          left: '20%',
          opacity: 0.18,
        }}
      />
    </>
  );
}
