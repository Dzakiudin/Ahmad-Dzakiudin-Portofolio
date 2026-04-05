import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function ProjectDetailModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);

  // Lock body scroll & stop Lenis & animate in
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Stop Lenis smooth scroll so it doesn't hijack wheel events
    if (window.__lenis) window.__lenis.stop();

    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 60, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out' },
      '-=0.2'
    );

    // Stagger sections
    const sections = contentRef.current?.querySelectorAll('.detail-section');
    if (sections?.length) {
      tl.fromTo(
        sections,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'expo.out' },
        '-=0.3'
      );
    }

    return () => {
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (window.__lenis) window.__lenis.start();
        onClose();
      },
    });
    tl.to(contentRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.35,
      ease: 'power2.in',
    });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.15');
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  // ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const screenshots = project.screenshots || [project.image];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      data-lenis-prevent
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto"
      style={{
        background: 'rgba(10, 20, 28, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overscrollBehavior: 'contain',
      }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl mx-4 my-8 md:my-12 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(239,248,254,0.97) 0%, rgba(232,242,249,0.98) 100%)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,100,126,0.08)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}
        >
          <span className="material-symbols-outlined text-on-surface text-xl">close</span>
        </button>

        {/* Hero Image Gallery */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-black/5">
          <img
            src={screenshots[activeImage]}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700"
          />
          {/* Seamless fog blend into content */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 55%, rgba(239,248,254,0.97) 100%)',
            }}
          />
          {/* Image Thumbnails */}
          {screenshots.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[1]">
              {screenshots.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    idx === activeImage
                      ? 'border-primary scale-110 shadow-lg'
                      : 'border-white/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content — overlap into gradient zone for seamless blend */}
        <div className="px-6 md:px-12 lg:px-16 pb-12 -mt-6 relative z-10">
          {/* Title Row */}
          <div className="detail-section flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4 flex-1">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))',
                  boxShadow: '0 8px 24px rgba(0,100,126,0.25)',
                }}
              >
                <span className="material-symbols-outlined text-white text-2xl">
                  {project.icon}
                </span>
              </div>
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="text-on-surface-variant text-sm mt-1">{project.subtitle}</p>
                )}
              </div>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 hover:scale-105 shrink-0"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dim))',
                color: 'var(--color-on-primary)',
                boxShadow: '0 6px 20px rgba(0,100,126,0.3)',
              }}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Overview */}
          <div className="detail-section mb-10">
            <SectionTitle icon="info" title="Overview" />
            <p className="text-on-surface-variant leading-relaxed text-[15px]">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Two Column: Architecture + Features */}
          <div className="detail-section grid md:grid-cols-2 gap-8 mb-10">
            {/* Architecture */}
            {project.architecture && (
              <div>
                <SectionTitle icon="account_tree" title="Architecture" />
                <div
                  className="rounded-2xl p-5 space-y-3"
                  style={{
                    background: 'rgba(0,100,126,0.04)',
                    border: '1px solid rgba(0,100,126,0.08)',
                  }}
                >
                  {project.architecture.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, ${
                            ['#00647e', '#006859', '#4e6300', '#b31b25'][idx % 4]
                          }22, ${['#00647e', '#006859', '#4e6300', '#b31b25'][idx % 4]}11)`,
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{
                            color: ['#00647e', '#006859', '#4e6300', '#b31b25'][idx % 4],
                          }}
                        >
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-on-surface text-sm">
                          {item.layer}
                        </h4>
                        <p className="text-on-surface-variant text-xs leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {project.features && (
              <div>
                <SectionTitle icon="featured_play_list" title="Key Features" />
                <ul className="space-y-2.5">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary mt-0.5"
                        style={{ fontSize: '18px' }}
                      >
                        check_circle
                      </span>
                      <span className="text-on-surface-variant text-sm leading-relaxed">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div className="detail-section mb-10">
            <SectionTitle icon="code" title="Tech Stack" />
            <div className="flex flex-wrap gap-3">
              {(project.techStack || project.tags).map((tech, idx) => {
                const techInfo = typeof tech === 'string' ? { name: tech } : tech;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(0,100,126,0.05)',
                      border: '1px solid rgba(0,100,126,0.1)',
                    }}
                  >
                    {techInfo.icon && (
                      <img
                        src={techInfo.icon}
                        alt={techInfo.name}
                        className="w-5 h-5 object-contain"
                      />
                    )}
                    <span className="text-on-surface font-medium text-sm">{techInfo.name}</span>
                    {techInfo.role && (
                      <span className="text-on-surface-variant text-[10px] uppercase tracking-wider font-label opacity-60">
                        {techInfo.role}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills Used */}
          {project.skills && (
            <div className="detail-section mb-10">
              <SectionTitle icon="psychology" title="Skills Applied" />
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-label font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${
                        [
                          'rgba(0,100,126,0.1)',
                          'rgba(0,104,89,0.1)',
                          'rgba(78,99,0,0.1)',
                          'rgba(0,203,254,0.1)',
                        ][idx % 4]
                      }, ${
                        [
                          'rgba(0,100,126,0.05)',
                          'rgba(0,104,89,0.05)',
                          'rgba(78,99,0,0.05)',
                          'rgba(0,203,254,0.05)',
                        ][idx % 4]
                      })`,
                      color: ['#00647e', '#006859', '#4e6300', '#00485b'][idx % 4],
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots Gallery */}
          {screenshots.length > 1 && (
            <div className="detail-section">
              <SectionTitle icon="photo_library" title="Screenshots" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {screenshots.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImage(idx);
                      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-[1.03] ${
                      idx === activeImage
                        ? 'border-primary shadow-lg ring-2 ring-primary/20'
                        : 'border-transparent hover:border-primary/30'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-28 md:h-36 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>
        {icon}
      </span>
      <h3 className="font-headline font-bold text-on-surface text-lg tracking-tight">{title}</h3>
    </div>
  );
}
