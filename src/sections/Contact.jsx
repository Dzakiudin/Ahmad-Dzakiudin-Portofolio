import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      });

      // Panel — cinematic scale-up reveal
      tl.fromTo(
        panelRef.current,
        { opacity: 0, y: 70, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'expo.out' }
      );

      // Inner elements — slow cascade
      const inner = panelRef.current.querySelectorAll('.contact-inner > *');
      tl.fromTo(
        inner,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.18, ease: 'expo.out' },
        '-=1.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-32 px-4 md:px-6">
      <div
        ref={panelRef}
        className="max-w-4xl mx-auto glass-panel p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] border border-outline-variant/10 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
        <div className="contact-inner relative z-10 space-y-8 md:space-y-12">
          <div className="space-y-3 md:space-y-4">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight md:tracking-tighter">
              Let's <span className="text-primary">Collaborate</span>
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg px-2">
              Ready to build the future of AI-driven engineering?
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
            <a
              className="contact-card w-full sm:w-auto flex items-center gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-surface-container-lowest border border-outline-variant/10"
              href="mailto:dzakiudin07@gmail.com"
            >
              <div className="contact-icon shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg md:text-xl">mail</span>
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[10px] font-label uppercase font-bold text-on-surface-variant">
                  Email Me
                </p>
                <p className="font-bold text-on-surface text-sm md:text-base truncate">dzakiudin07@gmail.com</p>
              </div>
            </a>
            <a
              className="contact-card w-full sm:w-auto flex items-center gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-surface-container-lowest border border-outline-variant/10"
              href="https://wa.me/6285707091624"
            >
              <div className="contact-icon shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-lg md:text-xl">chat</span>
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[10px] font-label uppercase font-bold text-on-surface-variant">
                  WhatsApp
                </p>
                <p className="font-bold text-on-surface text-sm md:text-base truncate">+62 857-0709-1624</p>
              </div>
            </a>
          </div>
          <div className="pt-4 md:pt-8">
            <p className="font-label text-[10px] md:text-xs text-on-surface-variant uppercase tracking-[0.2em] px-2">
              Sumenep, East Java, Indonesia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
