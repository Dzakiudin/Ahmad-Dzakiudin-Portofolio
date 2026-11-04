import React, { useEffect, useRef, useState } from 'react';
import {
  playChime,
  playGhibliMeadowArpeggio,
  subscribeBgmState,
  toggleAmbientBgm,
} from '../utils/sound';

interface HeaderProps {
  onOpenCv: () => void;
  onShowToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCv, onShowToast }) => {
  const [bgmActive, setBgmActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return subscribeBgmState(setBgmActive);
  }, []);

  // Close mobile menu when clicking outside or resizing to desktop
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        headerContainerRef.current &&
        !headerContainerRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleToggleMusic = () => {
    const nowPlaying = toggleAmbientBgm();
    if (nowPlaying) {
      playGhibliMeadowArpeggio();
      onShowToast('🍃 Studio Ghibli meadow ambient BGM: ON');
    } else {
      onShowToast('🔇 Ambient BGM muted');
    }
  };

  const handleToggleMobileMenu = () => {
    playChime(mobileMenuOpen ? 440 : 587.33, 0.22);
    setMobileMenuOpen((prev) => !prev);
  };

  const handleMobileNavClick = () => {
    playChime(523.25, 0.2);
    setMobileMenuOpen(false);
  };

  const handleMobileCvClick = () => {
    setMobileMenuOpen(false);
    onOpenCv();
  };

  return (
    <header id="main-header" className="fixed top-4 sm:top-5 inset-x-0 z-50 pointer-events-none gpu-fade">
      <div ref={headerContainerRef} className="section-shell relative">
        <div className="flex items-center justify-between gap-2.5 sm:gap-3">
          {/* Left Floating Pill: Avatar + Name + Subtitle */}
          <a
            href="#hero-stage"
            onClick={() => setMobileMenuOpen(false)}
            className="floating-pill pointer-events-auto pl-2 pr-3.5 sm:pl-2.5 sm:pr-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2.5 sm:gap-3 hover:scale-[1.02] transition-transform shrink-0"
          >
            <img
              src="assets/me.png"
              alt="Ahmad Dzakiudin"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-emerald-800/25"
            />
            <div className="leading-tight">
              <div
                className="text-xs sm:text-[0.84rem] font-bold tracking-tight"
                style={{ color: 'var(--text-dark)' }}
              >
                Ahmad Dzakiudin
              </div>
              <div
                className="text-[10px] sm:text-[0.6875rem] hidden sm:flex items-center gap-1.5 mt-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                <span>Full-stack &amp; AI engineer</span>
              </div>
            </div>
          </a>

          {/* Desktop Right Floating Pill (sm and up): Work · Path · About · Contact · Ambient BGM · CV */}
          <nav
            className="floating-pill pointer-events-auto hidden sm:flex items-center gap-1.5 lg:gap-2 px-3.5 py-2 rounded-full text-xs font-medium no-scrollbar"
            style={{ color: 'var(--text-body)' }}
          >
            <a href="#work" className="px-3.5 py-1 rounded-full hover:bg-emerald-950/5 transition-colors whitespace-nowrap">
              Work
            </a>
            <a href="#path" className="px-3.5 py-1 rounded-full hover:bg-emerald-950/5 transition-colors whitespace-nowrap">
              Path
            </a>
            <a href="#about" className="px-3.5 py-1 rounded-full hover:bg-emerald-950/5 transition-colors whitespace-nowrap">
              About
            </a>
            <a href="#contact" className="px-3.5 py-1 rounded-full hover:bg-emerald-950/5 transition-colors whitespace-nowrap">
              Contact
            </a>
            <button
              id="btn-meadow-sound"
              type="button"
              title={bgmActive ? 'Mute Studio Ghibli ambient BGM' : 'Play Studio Ghibli ambient BGM'}
              onClick={handleToggleMusic}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer font-semibold flex items-center gap-1.5 border shrink-0 ${
                bgmActive
                  ? 'bg-emerald-100/90 hover:bg-emerald-200/80 text-emerald-900 border-emerald-700/25'
                  : 'bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800/75 border-emerald-700/15'
              }`}
            >
              <span id="meadow-sound-icon">{bgmActive ? '🍃' : '🔇'}</span>
              <span className="hidden md:inline text-[0.6875rem]">
                {bgmActive ? 'BGM On' : 'BGM Off'}
              </span>
              {bgmActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
              )}
            </button>
            <button
              id="btn-header-cv"
              type="button"
              onClick={onOpenCv}
              className="px-3.5 py-1 rounded-full bg-[#1E7E3A] text-white hover:bg-[#16652d] transition-colors cursor-pointer font-semibold shrink-0"
            >
              CV
            </button>
          </nav>

          {/* Mobile Right Hamburger Button (< 640px) — Matches floating-pill botanical theme */}
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={handleToggleMobileMenu}
            className={`floating-pill pointer-events-auto flex sm:hidden w-11 h-11 rounded-full items-center justify-center active:scale-95 transition-all cursor-pointer ${
              mobileMenuOpen
                ? 'bg-[#DFEFE0]/95 text-[#1E7E3A]'
                : 'text-[#1E7E3A] hover:bg-emerald-50/90'
            }`}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-90' : ''
              }`}
              viewBox="0 0 20 20"
              fill="none"
            >
              {mobileMenuOpen ? (
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3.5 6H16.5M3.5 10H16.5M3.5 14H16.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Expand/Collapse Dropdown Panel (< 640px) */}
        <div
          className={`sm:hidden pointer-events-auto overflow-hidden transition-all duration-300 ease-out origin-top ${
            mobileMenuOpen
              ? 'max-h-80 opacity-100 translate-y-0 mt-2.5'
              : 'max-h-0 opacity-0 -translate-y-2 mt-0 pointer-events-none'
          }`}
        >
          <div className="floating-pill rounded-3xl p-3.5 space-y-3 shadow-2xl border border-emerald-900/10">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold" style={{ color: 'var(--text-dark)' }}>
              <a
                href="#work"
                onClick={handleMobileNavClick}
                className="px-3.5 py-2.5 rounded-2xl bg-white/85 hover:bg-emerald-50 border border-emerald-900/10 flex items-center justify-between transition-colors"
              >
                <span>Work</span>
                <span className="text-[#1E7E3A] text-[11px]">→</span>
              </a>
              <a
                href="#path"
                onClick={handleMobileNavClick}
                className="px-3.5 py-2.5 rounded-2xl bg-white/85 hover:bg-emerald-50 border border-emerald-900/10 flex items-center justify-between transition-colors"
              >
                <span>Path</span>
                <span className="text-[#1E7E3A] text-[11px]">→</span>
              </a>
              <a
                href="#about"
                onClick={handleMobileNavClick}
                className="px-3.5 py-2.5 rounded-2xl bg-white/85 hover:bg-emerald-50 border border-emerald-900/10 flex items-center justify-between transition-colors"
              >
                <span>About</span>
                <span className="text-[#1E7E3A] text-[11px]">→</span>
              </a>
              <a
                href="#contact"
                onClick={handleMobileNavClick}
                className="px-3.5 py-2.5 rounded-2xl bg-white/85 hover:bg-emerald-50 border border-emerald-900/10 flex items-center justify-between transition-colors"
              >
                <span>Contact</span>
                <span className="text-[#1E7E3A] text-[11px]">→</span>
              </a>
            </div>

            <div className="pt-2 border-t border-emerald-900/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleToggleMusic}
                className={`flex-1 px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition-colors ${
                  bgmActive
                    ? 'bg-emerald-100/90 text-emerald-900 border-emerald-700/25'
                    : 'bg-white/85 text-emerald-900/75 border-emerald-900/10'
                }`}
              >
                <span>{bgmActive ? '🍃' : '🔇'}</span>
                <span>{bgmActive ? 'Ambient BGM: On' : 'Ambient BGM: Off'}</span>
                {bgmActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                )}
              </button>

              <button
                type="button"
                onClick={handleMobileCvClick}
                className="px-4 py-2 rounded-2xl bg-[#1E7E3A] hover:bg-[#16652d] text-white text-xs font-bold shrink-0 transition-colors"
              >
                Open CV ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
