import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { PathSection } from './components/PathSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CaseModal } from './components/CaseModal';
import { CvModal } from './components/CvModal';
import { Toast } from './components/Toast';
import { useScrollAndParallaxEngine } from './hooks/useScrollAndParallaxEngine';
import { useRevealAndMagneticTilt } from './hooks/useRevealAndMagneticTilt';
import { WorkCardItem } from './types/portfolio';
import { isAmbientBgmPlaying, playChime, startAmbientBgm } from './utils/sound';

export const App: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<WorkCardItem | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useScrollAndParallaxEngine();
  useRevealAndMagneticTilt();

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  const handleOpenCase = useCallback((card: WorkCardItem) => {
    playChime(587.33);
    setSelectedCase(card);
  }, []);

  const handleOpenCv = useCallback(() => {
    playChime(659.25);
    setIsCvOpen(true);
  }, []);

  // Automatically start Studio Ghibli Ambient BGM on visit (with instant gesture-unlock fallback)
  useEffect(() => {
    let unlocked = false;
    const unlockEvents = [
      'pointerdown',
      'pointermove',
      'wheel',
      'scroll',
      'touchstart',
      'keydown',
      'click',
    ] as const;

    const cleanupUnlockListeners = () => {
      unlockEvents.forEach((evt) =>
        window.removeEventListener(evt, handleFirstInteraction)
      );
    };

    const handleFirstInteraction = async (e?: Event) => {
      if (unlocked) return;
      // Do not re-enable if user clicked the mute/unmute button directly
      const target = e?.target as HTMLElement | null;
      if (target && target.closest('#btn-meadow-sound')) {
        unlocked = true;
        cleanupUnlockListeners();
        return;
      }
      const running = await startAmbientBgm();
      if (running || isAmbientBgmPlaying()) {
        unlocked = true;
        cleanupUnlockListeners();
      }
    };

    // Attempt immediate autoplay on page load
    startAmbientBgm().then((running) => {
      if (running) {
        unlocked = true;
        cleanupUnlockListeners();
      }
    });

    unlockEvents.forEach((evt) =>
      window.addEventListener(evt, handleFirstInteraction, { passive: true })
    );

    return () => {
      cleanupUnlockListeners();
    };
  }, []);

  useEffect(() => {
    let keyBuf = '';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCvOpen(false);
        setSelectedCase(null);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key.length === 1) {
        keyBuf = (keyBuf + e.key.toLowerCase()).slice(-4);
        if (keyBuf === 'hire') {
          playChime(659.25);
          setIsCvOpen(true);
          showToast('🍃 Unlocked Portfolio Shortcut!');
          keyBuf = '';
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showToast]);

  return (
    <div className="ghibli-paper-grain min-h-screen flex flex-col selection:bg-emerald-700 selection:text-white">
      <Header onOpenCv={handleOpenCv} onShowToast={showToast} />
      <main className="flex-grow">
        <HeroSection />
        <SelectedWorkSection onSelectCase={handleOpenCase} />
        <PathSection />
        <AboutSection onShowToast={showToast} />
        <ContactSection onOpenCv={handleOpenCv} onShowToast={showToast} />
      </main>
      <CaseModal card={selectedCase} onClose={() => setSelectedCase(null)} />
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
