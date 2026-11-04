import React from 'react';
import { PATH_MILESTONES } from '../data/portfolioData';
import { playChime } from '../utils/sound';

export const PathSection: React.FC = () => {
  const handleScrubberClick = (targetIdx: number) => {
    playChime(523.25 + targetIdx * 55);
    const driver = document.getElementById('path-scroll-driver');
    if (!driver) return;
    const driverTop = driver.getBoundingClientRect().top + window.scrollY;
    const scrollable = driver.offsetHeight - window.innerHeight;
    const targetScroll = driverTop + (targetIdx / (PATH_MILESTONES.length - 1)) * scrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section id="path" className="relative">
      <div id="path-scroll-driver" className="relative h-[380vh]">
        <div className="sticky-section-pad sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-24 sm:pt-24 pb-6 sm:pb-9">
          {/* Section Header */}
          <div className="section-shell relative z-20">
            <div className="text-[11px] sm:text-[0.6875rem] font-mono-code uppercase tracking-wider text-emerald-800 font-semibold mb-1">
              Chronology · 2019 — 2026
            </div>
            <h2
              className="font-display-serif text-3xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-dark)' }}
            >
              The path so far
            </h2>
            <p className="text-xs sm:text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Newest first. Seven years of building &amp; troubleshooting systems, from SMKN 1 Sumenep to UNIBA Madura.
            </p>
          </div>

          {/* Horizontal Panorama Track with Proportional Gaps */}
          <div className="relative flex-grow flex items-center w-full my-auto overflow-visible">
            <div id="path-stage-container" className="relative w-full overflow-visible">
              <div
                id="path-horizontal-track"
                className="flex items-center gap-16 sm:gap-24 lg:gap-32 px-6 sm:px-[9vw] gpu-layer relative"
              >
                <svg
                  id="path-wave-svg"
                  viewBox="0 0 3200 360"
                  preserveAspectRatio="none"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[200rem] h-[20rem] pointer-events-none z-0"
                >
                  <path
                    id="path-wave-bg"
                    d="M 40,260 C 260,60 440,60 660,220 C 880,360 1080,340 1300,170 C 1520,20 1720,40 1940,220 C 2160,360 2360,340 2580,160 C 2780,30 2960,80 3140,230"
                    fill="none"
                    stroke="rgba(30, 126, 58, 0.2)"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                  />
                  <path
                    id="path-wave-active"
                    d="M 40,260 C 260,60 440,60 660,220 C 880,360 1080,340 1300,170 C 1520,20 1720,40 1940,220 C 2160,360 2360,340 2580,160 C 2780,30 2960,80 3140,230"
                    fill="none"
                    stroke="#1E7E3A"
                    strokeWidth="2.8"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                  />
                  <g id="path-wave-plane" transform="translate(120, 180) rotate(-18)">
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

                {PATH_MILESTONES.map((m, idx) => (
                  <div
                    key={m.year}
                    className="relative w-[84vw] sm:w-[36rem] lg:w-[40rem] shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-9 z-10 select-none gpu-layer"
                    data-milestone-card={idx}
                  >
                    <div
                      className="watermark-year absolute -left-3 sm:-left-8 -bottom-10 sm:-bottom-12 z-0"
                      data-watermark-year={idx}
                    >
                      {m.year}
                    </div>

                    <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-emerald-100 shrink-0 rotate-[-4deg] hover:rotate-0 transition-transform duration-500">
                      <img src={m.image} alt={m.title} className="w-full h-full object-cover" decoding="async" />
                    </div>

                    <div className="relative z-10 space-y-2.5 max-w-md">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full border-2 border-[#1E7E3A] bg-[#EEF6E8]"></span>
                        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-[#1E7E3A] text-white shadow-xs">
                          {m.badge}
                        </span>
                      </div>
                      <h3
                        className="font-display-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight"
                        style={{ color: 'var(--text-dark)' }}
                      >
                        {m.title}
                      </h3>
                      <div className="text-xs sm:text-sm font-bold" style={{ color: 'var(--accent-rust)' }}>
                        {m.org}
                      </div>
                      <p className="text-xs sm:text-[0.875rem] leading-relaxed" style={{ color: 'var(--text-body)' }}>
                        {m.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {m.pills.map((p) => (
                          <span
                            key={p}
                            className="px-3.5 py-1 rounded-full text-[11px] sm:text-[0.6875rem] bg-white border border-emerald-900/10 font-semibold shadow-2xs"
                            style={{ color: 'var(--text-body)' }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Interactive Year Scrubber Pill */}
          <div className="section-shell relative z-20 flex justify-center pt-1">
            <div className="floating-pill px-6 sm:px-11 py-3 sm:py-3.5 rounded-full inline-flex items-center relative max-w-full">
              <div className="absolute left-8 right-8 top-[1.125rem] sm:top-[1.25rem] border-t-2 border-dotted border-emerald-800/25 z-0"></div>
              <div
                id="path-scrubber-progress"
                className="absolute left-8 top-[1.125rem] sm:top-[1.25rem] h-[2px] bg-[#1E7E3A] z-0"
                style={{ width: '0px' }}
              ></div>
              <div id="path-scrubber-nodes" className="relative z-10 flex items-center gap-7 sm:gap-16 md:gap-20">
                {PATH_MILESTONES.map((item, i) => (
                  <button
                    key={item.year}
                    type="button"
                    data-path-idx={i}
                    onClick={() => handleScrubberClick(i)}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <span
                      id={`path-dot-${i}`}
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-transform ${
                        i === 0
                          ? 'bg-[#1E7E3A] border-[#1E7E3A] scale-125'
                          : 'bg-white border-emerald-800/30 group-hover:border-[#1E7E3A]'
                      }`}
                    ></span>
                    <span
                      id={`path-label-${i}`}
                      className={`font-mono-code text-[10.5px] sm:text-[0.6875rem] transition-colors ${
                        i === 0 ? 'font-bold text-[#122418]' : 'text-[#5C7864]'
                      }`}
                    >
                      {item.year}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
