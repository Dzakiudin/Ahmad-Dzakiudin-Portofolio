import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full border-t border-cyan-100/20 bg-slate-50/80 backdrop-blur-md"
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto font-body text-sm">
        <div className="space-y-2 mb-8 md:mb-0">
          <div className="font-headline font-bold text-cyan-800 text-lg">
            Ahmad Dzakiudin
          </div>
          <p className="text-slate-500">
            © 2026 Ahmad Dzakiudin. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8">
          <a className="footer-link text-slate-500 hover:text-cyan-500 transition-all" href="https://github.com/Dzakiudin">
            GitHub
          </a>
          <a className="footer-link text-slate-500 hover:text-cyan-500 transition-all" href="https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
