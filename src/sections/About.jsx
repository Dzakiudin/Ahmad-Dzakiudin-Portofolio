import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // Heading — slide from left, cinematic
      tl.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'expo.out', force3D: true }
      );

      // Text — fade up
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', force3D: true },
        '-=0.8'
      );

      // Cards — stagger with scale (animasi di wrapper div tanpa CSS transition)
      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out', force3D: true },
          '-=0.8'
        );
      }

      // Image — slide from right with camera-like scale
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 30, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'expo.out', force3D: true },
        '-=0.8'
      );

      // Image subtle parallax — smooth trailing di wrapper imageRef
      gsap.to(imageRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.0, // Reduced from 3.5 to 1.0 to eliminate extreme rubber-banding lag
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2
            ref={headingRef}
            className="font-headline text-4xl font-bold tracking-tight text-primary"
          >
            Focused on Precision
          </h2>
          <p ref={textRef} className="text-lg text-on-surface-variant leading-relaxed">
            I am a highly motivated developer dedicated to engineering complex systems,
            advanced AI implementations, and robust automation workflows. My approach
            combines the rigor of technical support with the creativity of full-stack
            architecture.
          </p>
          <div ref={cardsRef} className="grid grid-cols-2 gap-4">
            {/* GSAP wrapper - Memisahkan animasi scroll dari transisi hover css */}
            <div>
              <div className="p-6 glass-panel rounded-2xl border border-outline-variant/10 skill-pill h-full">
                <span className="material-symbols-outlined text-primary text-3xl mb-2 icon-float">
                  memory
                </span>
                <h4 className="font-headline font-bold text-on-surface">AI Focus</h4>
                <p className="text-sm text-on-surface-variant">
                  Building intelligent systems that automate complex tasks.
                </p>
              </div>
            </div>
            {/* GSAP wrapper */}
            <div>
              <div className="p-6 glass-panel rounded-2xl border border-outline-variant/10 skill-pill h-full">
                <span className="material-symbols-outlined text-primary text-3xl mb-2 icon-float">
                  database
                </span>
                <h4 className="font-headline font-bold text-on-surface">Scalability</h4>
                <p className="text-sm text-on-surface-variant">
                  Architecting databases for 50k+ daily transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Changed transition-all duration-700 to transition-shadow duration-700 so GSAP transform doesn't fight CSS */}
        <div ref={imageRef} className="relative group p-4 rounded-[2.5rem] transition-shadow duration-700 hover:shadow-[0_0_50px_rgba(0,203,254,0.15)]">
          {/* Glass Frame Outer Shell */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/30 bg-white/5 backdrop-blur-lg pointer-events-none" />
          
          {/* Subtle Gradient Glow inside Frame */}
          <div className="absolute inset-[1px] rounded-[2.5rem] bg-gradient-to-br from-primary/0 via-transparent to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors duration-700 pointer-events-none" />

          {/* Internal Image Container */}
          <div className="relative rounded-[1.8rem] overflow-hidden aspect-square border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <img
              className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-1000 ease-out"
              alt="Ahmad Dzakiudin - Profile"
              src="/profile.png"
            />
            {/* Glossy Overlay Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
