import React from 'react';
import { SELECTED_WORK_CARDS, ALSO_DESK_CARDS } from '../data/portfolioData';
import { WorkCardItem } from '../types/portfolio';

interface SelectedWorkSectionProps {
  onSelectCase: (card: WorkCardItem) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectCase }) => {
  const handlePrev = () => {
    window.scrollBy({ top: -350, behavior: 'smooth' });
  };

  const handleNext = () => {
    window.scrollBy({ top: 350, behavior: 'smooth' });
  };

  return (
    <section id="work" className="relative">
      <div id="work-scroll-driver" className="relative h-[390vh]">
        <div className="sticky-section-pad sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col pt-24 sm:pt-24 pb-6 sm:pb-8">
          {/* Wavy Dotted Wind Trajectory Line + Flying Paper Plane Behind Cards */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[25rem] sm:h-[26.875rem] pointer-events-none z-0 overflow-hidden">
            <svg
              id="work-wave-svg"
              viewBox="0 0 1600 420"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                id="work-wave-bg"
                d="M -40,330 C 180,40 340,40 520,230 C 700,410 860,410 1040,210 C 1220,20 1380,40 1640,290"
                fill="none"
                stroke="rgba(30, 126, 58, 0.2)"
                strokeWidth="2"
                strokeDasharray="4 8"
              />
              <path
                id="work-wave-active"
                d="M -40,330 C 180,40 340,40 520,230 C 700,410 860,410 1040,210 C 1220,20 1380,40 1640,290"
                fill="none"
                stroke="#1E7E3A"
                strokeWidth="2.8"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
              <g id="work-wave-plane" transform="translate(120, 140) rotate(-25)">
                <polygon
                  points="20,0 -13,-11 -7,0 -13,11"
                  fill="#FEF08A"
                  stroke="#122418"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <line x1="20" y1="0" x2="-7" y2="0" stroke="#122418" strokeWidth="1.3" />
              </g>
            </svg>
          </div>

          <div className="section-shell relative z-10 my-auto">
            {/* Header Row with Proportional Bottom Margin */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 sm:mb-7">
              <div>
                <div className="text-[11px] sm:text-[0.6875rem] font-mono-code uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                  Production Engineering &amp; AI Systems
                </div>
                <h2
                  className="font-display-serif text-3xl sm:text-5xl font-extrabold tracking-tight"
                  style={{ color: 'var(--text-dark)' }}
                >
                  Selected work
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  Seven flagship systems, newest first · Scroll to glide
                </span>
                <div className="sr-only" aria-hidden="true">
                  <button id="btn-work-prev" type="button" onClick={handlePrev}>
                    ←
                  </button>
                  <button id="btn-work-next" type="button" onClick={handleNext}>
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Scroll-Driven Horizontal Cards Track with Proportional Gap */}
            <div className="overflow-visible py-1.5">
              <div id="selected-work-track" className="flex gap-6 sm:gap-7 lg:gap-8 gpu-layer">
                {SELECTED_WORK_CARDS.map((c, idx) => (
                  <article
                    key={c.title}
                    className="work-card work-card-pad w-[84vw] max-w-[355px] sm:w-[23.5rem] lg:w-[24.5rem] sm:max-w-none p-5 sm:p-5.5 flex flex-col justify-between shrink-0 cursor-pointer group gpu-layer"
                    data-open-case={idx}
                    data-work-card={idx}
                    onClick={() => onSelectCase(c)}
                  >
                    <div>
                      <div className="work-card-thumb relative h-52 sm:h-[13rem] rounded-2xl overflow-hidden bg-emerald-950 mb-4 border border-emerald-900/10">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
                        <span className="absolute top-3.5 right-3.5 px-3 py-0.5 rounded-full bg-white/95 text-[#1E7E3A] text-[11px] sm:text-[0.6875rem] font-bold shadow-xs rotate-[6deg]">
                          {c.yearTag}
                        </span>
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 text-[#122418] text-[11px] sm:text-[0.6875rem] font-semibold shadow-xs">
                          {c.org}
                        </span>
                      </div>

                      <div className="px-1 space-y-2">
                        <h3
                          className="font-display-serif text-xl sm:text-2xl font-extrabold leading-snug"
                          style={{ color: 'var(--text-dark)' }}
                        >
                          {c.title}
                        </h3>
                        <p className="text-xs sm:text-[0.84rem] leading-relaxed" style={{ color: 'var(--text-body)' }}>
                          {c.desc}
                        </p>
                      </div>
                    </div>

                    <div className="px-1 pt-4 mt-4 border-t border-emerald-900/10 space-y-2.5">
                      <div className="flex items-center gap-3.5">
                        <span
                          className="font-display-serif text-3xl sm:text-4xl font-extrabold shrink-0"
                          style={{ color: 'var(--accent-rust)' }}
                        >
                          {c.bigStat}
                        </span>
                        <span className="text-xs leading-snug" style={{ color: 'var(--text-body)' }}>
                          {c.statTop}
                        </span>
                      </div>
                      <div className="text-xs font-mono-code" style={{ color: 'var(--text-muted)' }}>
                        {c.statBot}
                      </div>
                      <div className="pt-0.5 flex items-center justify-between">
                        <span className="text-xs font-bold flex items-center gap-2" style={{ color: 'var(--text-dark)' }}>
                          <span>Inspect architecture &amp; case</span>
                          <span className="w-6 h-6 rounded-full bg-[#1E7E3A] text-white inline-flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}

                {/* More from the desk card */}
                <article
                  className="w-[80vw] max-w-[325px] sm:w-[21.5rem] sm:max-w-none rounded-[1.75rem] p-7 sm:p-8 flex flex-col justify-center items-center text-center space-y-4 shrink-0 border-2 border-dashed border-emerald-900/20 bg-[#E6F4E2]/60 gpu-layer"
                  data-work-card={SELECTED_WORK_CARDS.length}
                >
                  <span className="text-2xl">🌿</span>
                  <h3 className="font-display-serif text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text-dark)' }}>
                    More from the desk
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    10+ additional open-source tools, autonomous Python AI agents, Svelte/Astro web apps, and public-sector IT operations.
                  </p>
                  <a
                    href="#also-on-desk"
                    className="mt-2 px-5 py-2.5 rounded-full bg-[#122418] text-white text-xs font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <span>See all 10 below</span>
                    <span>→</span>
                  </a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ALSO ON THE DESK */}
      <div id="also-on-desk" className="py-24 sm:py-32 section-shell">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 reveal-up">
          <div>
            <div className="text-[11px] sm:text-[0.6875rem] font-mono-code uppercase tracking-wider text-emerald-800 font-semibold mb-1.5">
              Open-Source Repositories &amp; Public Sector IT
            </div>
            <h3
              className="font-display-serif text-3xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-dark)' }}
            >
              Also on the desk
            </h3>
          </div>
          <p className="text-xs sm:text-sm max-w-md sm:text-right leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Autonomous Python AI agents, Svelte 5 &amp; Astro web apps, network monitoring daemons, browser extensions, and legislative IT ops.
          </p>
        </div>

        <div id="also-desk-row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-7">
          {ALSO_DESK_CARDS.map((c, i) => (
            <article
              key={c.title}
              className="work-card p-5 sm:p-6 flex flex-col justify-between space-y-4 reveal-up"
              style={{ transitionDelay: `${(i % 5) * 60}ms` }}
            >
              <div>
                <div className="h-36 sm:h-40 rounded-2xl overflow-hidden bg-emerald-950/90 mb-4 border border-emerald-900/10">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    decoding="async"
                  />
                </div>
                <div className="text-[10.5px] sm:text-[0.65rem] font-mono-code font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {c.org}
                </div>
                <h4 className="font-display-serif text-lg sm:text-xl font-extrabold mt-1" style={{ color: 'var(--text-dark)' }}>
                  {c.title}
                </h4>
                <p className="text-xs sm:text-[0.8125rem] leading-relaxed mt-2" style={{ color: 'var(--text-body)' }}>
                  {c.desc}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-900/10">
                <a
                  href={c.link}
                  target={c.link.startsWith('http') ? '_blank' : undefined}
                  rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-xs font-bold inline-flex items-center gap-1 hover:underline"
                  style={{ color: 'var(--accent-rust)' }}
                >
                  <span>{c.link.startsWith('http') ? 'GitHub Repo →' : 'Read story →'}</span>
                </a>
                {c.liveUrl && (
                  <a
                    href={c.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-0.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-[#1E7E3A] text-[10.5px] sm:text-[0.65rem] font-bold transition-colors"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
