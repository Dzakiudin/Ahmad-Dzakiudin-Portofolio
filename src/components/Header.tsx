import React, { useEffect, useState } from 'react';
import {
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

  useEffect(() => {
    return subscribeBgmState(setBgmActive);
  }, []);

  const handleToggleMusic = () => {
    const nowPlaying = toggleAmbientBgm();
    if (nowPlaying) {
      playGhibliMeadowArpeggio();
      onShowToast('🍃 Studio Ghibli meadow ambient BGM: ON');
    } else {
      onShowToast('🔇 Ambient BGM muted');
    }
  };

  return (
    <header id="main-header" className="fixed top-4 sm:top-5 inset-x-0 z-50 pointer-events-none gpu-fade">
      <div className="section-shell flex items-center justify-between gap-3">
        {/* Left Floating Pill: Avatar + Name + Subtitle */}
        <a
          href="#hero-stage"
          className="floating-pill pointer-events-auto pl-2 pr-4 sm:pl-2.5 sm:pr-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2.5 sm:gap-3 hover:scale-[1.02] transition-transform shrink-0"
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

        {/* Right Floating Pill: Work · Path · About · Contact · Ambient BGM · CV */}
        <nav
          className="floating-pill pointer-events-auto px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 text-xs font-medium overflow-x-auto no-scrollbar"
          style={{ color: 'var(--text-body)' }}
        >
          <a href="#work" className="px-2.5 sm:px-3.5 py-1 rounded-full hover:bg-emerald-950/5 transition-colors whitespace-nowrap">
            Work
          </a>
          <a href="#path" className="px-2.5 sm:px-3.5 py-1 rounded-full hover:bg-emerald-950/5 transition-colors whitespace-nowrap">
            Path
          </a>
          <a href="#about" className="px-2.5 sm:px-3.5 py-1 rounded-full hover:bg-emerald-950/5 transition-colors whitespace-nowrap">
            About
          </a>
          <a href="#contact" className="px-2.5 sm:px-3.5 py-1 rounded-full hover:bg-emerald-950/5 transition-colors whitespace-nowrap">
            Contact
          </a>
          <button
            id="btn-meadow-sound"
            type="button"
            title={bgmActive ? 'Mute Studio Ghibli ambient BGM' : 'Play Studio Ghibli ambient BGM'}
            onClick={handleToggleMusic}
            className={`px-2.5 sm:px-3 py-1 rounded-full transition-colors cursor-pointer font-semibold flex items-center gap-1.5 border shrink-0 ${
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
            className="px-3 sm:px-3.5 py-1 rounded-full bg-[#122418] text-white hover:bg-emerald-900 transition-colors cursor-pointer font-semibold shrink-0"
          >
            CV
          </button>
        </nav>
      </div>
    </header>
  );
};
