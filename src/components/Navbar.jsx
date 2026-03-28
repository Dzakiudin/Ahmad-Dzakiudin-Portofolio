import { useState, useEffect, useRef } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { href: '#hero', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const activeSection = useActiveSection(
    ['hero', 'education', 'experience', 'projects', 'skills', 'contact'],
    300
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate navbar on mount
  useEffect(() => {
    if (navRef.current) {
      // Menggunakan Y dan Opacity saja, letakkan centering layout di flexbox wrapper
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.6, delay: 0.4, ease: 'expo.out' }
      );
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none md:pt-4">
        <header
          ref={navRef}
          className={`pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            w-full rounded-none border-x-0 border-t-0 border-b
            md:w-[90%] max-w-7xl md:rounded-full md:border 
            ${scrolled
              ? 'navbar-scrolled border-b-white/30 md:border-white/30'
              : 'border-b-white/20 md:border-white/20 bg-cyan-50/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,100,126,0.1)]'
            }`}
        >
          <nav className="flex justify-between items-center px-4 md:px-8 py-3 w-full font-headline tracking-tight">
            <div className="text-lg md:text-xl font-bold tracking-tighter text-primary">
              Ahmad Dzakiudin
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-8 items-center">
              {NAV_LINKS.map(({ href, label }) => {
                const sectionId = href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={href}
                    href={href}
                    className={`nav-link text-sm ${isActive
                        ? 'active text-primary font-bold'
                        : 'text-on-surface-variant hover:text-primary'
                      }`}
                  >
                    {label}
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <a
              className="hidden md:inline-flex btn-primary-glow bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2 rounded-full font-bold scale-95 active:scale-90 text-sm cursor-pointer"
              href="mailto:dzakiudin07@gmail.com"
            >
              Hire Me
            </a>

            {/* Mobile Hamburger Icon */}
            <button
              className="md:hidden p-2 text-primary focus:outline-none"
              onClick={() => setIsOpen(true)}
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </nav>
        </header>
      </div>

      {/* Mobile Menu ModalOverlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        {/* Backdrop Darkening Layer */}
        <div
          className="absolute inset-0 bg-primary/10 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Modal Card Box */}
        <div
          className={`absolute top-4 left-4 right-4 bg-surface-container-low/95 backdrop-blur-2xl border border-outline-variant/20 rounded-[2rem] p-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0 scale-100' : '-translate-y-12 scale-95'}`}
        >
          <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
            <span className="font-headline font-bold text-lg text-primary uppercase">
              Ahmad Dzakiudin
            </span>
            <button onClick={() => setIsOpen(false)} className="text-on-surface p-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-6 px-2">
            {NAV_LINKS.map(({ href, label }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`font-headline text-lg transition-colors ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary font-medium'}`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          <div className="mt-10">
            <a
              href="mailto:dzakiudin07@gmail.com"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-primary text-white py-4 rounded-full font-bold shadow-lg hover:shadow-primary/30 active:scale-95 transition-all text-lg"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
