import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMouseParallax } from '../hooks/useAnimations';

gsap.registerPlugin(ScrollTrigger);

// Heading words with their styling
const HEADING_WORDS = [
  { text: 'Hi,', gradient: false },
  { text: "I'm", gradient: false },
  { text: 'Ahmad', gradient: true },
  { text: 'Dzakiudin', gradient: true },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const buttonsRef = useRef(null);
  const wordRefs = useRef([]);
  const mouseParallaxRef = useMouseParallax(0.012);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic entrance timeline — slow, deliberate, premium
      const tl = gsap.timeline({ delay: 0.6 });

      // Badge — soft fade-in with scale
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 25, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'expo.out' }
      );

      // Heading — each word staggers in with deep translateY
      const wordEls = wordRefs.current.filter(Boolean);
      if (wordEls.length > 0) {
        tl.fromTo(
          wordEls,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.12,        // generous stagger for premium feel
            ease: 'expo.out',
          },
          '-=0.8'
        );
      }

      // Subtitle — slow reveal
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out' },
        '-=0.9'
      );

      // Buttons — stagger with slight overlap
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.18, ease: 'expo.out' },
          '-=0.8'
        );
      }

      // Entire hero content drifts up slightly on scroll (camera pull-back)
      gsap.to(sectionRef.current.querySelector('.hero-content'), {
        y: -40,
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative overflow-hidden"
    >
      <div ref={mouseParallaxRef} className="hero-content max-w-5xl w-full text-center space-y-8">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/15 text-on-surface-variant font-label text-sm mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
          Available for new opportunities
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-[1.1] text-on-surface"
        >
          {HEADING_WORDS.map((word, i) => (
            <span key={i}>
              <span
                ref={(el) => (wordRefs.current[i] = el)}
                className={`inline-block opacity-0 ${word.gradient ? 'gradient-text-glow' : ''}`}
                style={{ transform: 'translateY(60px)' }}
              >
                {word.text}
              </span>
              {i < HEADING_WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-headline text-xl md:text-3xl font-medium text-on-surface-variant max-w-3xl mx-auto leading-relaxed"
        >
          Full-Stack Developer &amp; AI System Builder crafting precision digital
          experiences with high-tech vitality.
        </p>

        {/* CTAs */}
        <div ref={buttonsRef} className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
          <a
            className="btn-primary-glow relative px-10 py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold text-lg"
            href="#projects"
          >
            <span className="relative z-10">View Projects</span>
          </a>
          <a
            className="btn-secondary-glass px-10 py-4 rounded-full bg-surface-container-lowest border border-outline-variant/15 text-primary font-bold text-lg"
            href="#contact"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}
