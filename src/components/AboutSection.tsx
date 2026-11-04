import React, { useState } from 'react';
import {
  KUDOS_DATA,
  LIFT_NAMES,
  LIFT_WEIGHTS,
  TRAIT_MESSAGES,
  CAPABILITY_PILLS,
} from '../data/portfolioData';
import { TraitKey } from '../types/portfolio';
import { playChime } from '../utils/sound';

interface AboutSectionProps {
  onShowToast: (msg: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onShowToast }) => {
  const [kudosIdx, setKudosIdx] = useState(0);
  const [liftStep, setLiftStep] = useState(0);
  const [bounceKey, setBounceKey] = useState(0);

  const handleCatchKudos = () => {
    const nextIdx = (kudosIdx + 1) % KUDOS_DATA.length;
    playChime(523.25 + nextIdx * 45);
    setKudosIdx(nextIdx);
  };

  const handleTraitClick = (trait: TraitKey) => {
    playChime(659.25);
    onShowToast(TRAIT_MESSAGES[trait]);
  };

  const handleSelectLiftStep = (step: number) => {
    playChime(392.0 + step * 50);
    setLiftStep(step);
    setBounceKey((prev) => prev + 1);
  };

  const handleCycleBarbell = () => {
    const next = (liftStep + 1) % 5;
    handleSelectLiftStep(next);
  };

  return (
    <section id="about" className="py-24 sm:py-32 lg:py-36 section-shell">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* Left 5 Cols: Kudos Catcher + Unobstructed Illustrated Arch Portrait + Spacious 2x2 Floating Trait Pills */}
        <div className="lg:col-span-5 relative flex flex-col items-center reveal-up">
          {/* "Catch a kudos •••••" Interactive Pill at Top */}
          <div className="mb-5">
            <button
              id="btn-catch-kudos"
              type="button"
              onClick={handleCatchKudos}
              className="floating-badge px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
            >
              <span>Catch a kudos</span>
              <span id="kudos-dots-group" className="flex items-center gap-1.5">
                {KUDOS_DATA.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i <= kudosIdx ? 'bg-[#1E7E3A]' : 'bg-emerald-950/20'
                    }`}
                  ></span>
                ))}
              </span>
              <span className="sr-only">✦</span>
              <span
                id="kudos-count-badge"
                className="font-mono-code text-[10.5px] sm:text-[0.65rem] px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1E7E3A] font-semibold"
              >
                {kudosIdx + 1}/5
              </span>
            </button>
          </div>

          {/* Popover Kudos Quote Card with Comfortable Padding */}
          <div
            id="kudos-popover"
            className="w-full max-w-[400px] sm:max-w-[25rem] mb-7 p-5 sm:p-6 rounded-3xl bg-white/95 border border-emerald-900/10 shadow-sm text-xs sm:text-[0.8125rem] leading-relaxed transition-all duration-300"
            style={{ color: 'var(--text-body)' }}
          >
            <p id="kudos-quote-text" className="italic font-medium text-[#122418]">
              {KUDOS_DATA[kudosIdx].q}
            </p>
            <div
              id="kudos-quote-author"
              className="font-mono-code text-[10.5px] sm:text-[0.65rem] mt-2.5"
              style={{ color: 'var(--text-muted)' }}
            >
              {KUDOS_DATA[kudosIdx].a}
            </div>
          </div>

          {/* Illustrated Ghibli Meadow Arch Portrait (100% Clean & Unobstructed!) */}
          <div className="relative w-full max-w-[330px] sm:max-w-[21.875rem] mx-auto my-2">
            {/* Decorative Floating Leaf / Quote Bubble at Top Arch Rim */}
            <div
              className="floating-badge absolute -top-3 right-8 px-3 py-1.5 rounded-2xl bg-[#DCFCE7] text-[#1E7E3A] text-xs font-bold shadow-md select-none z-20"
              style={{ animationDelay: '0.3s' }}
            >
              🍃 &ldquo; &rdquo;
            </div>

            {/* Arch Frame */}
            <div className="rounded-t-[180px] sm:rounded-t-[11.25rem] rounded-b-3xl overflow-hidden border-[5px] border-white shadow-2xl bg-[#DFEFE0]">
              <img
                src="assets/me.png"
                alt="Ahmad Dzakiudin Studio Ghibli Meadow Portrait"
                className="w-full aspect-[3/4] block object-cover object-top hover:scale-105 transition-transform duration-700"
                decoding="async"
              />
            </div>
          </div>

          {/* 4 Interactive Trait Pills in a Spacious 2x2 Floating Grid Below the Portrait */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7 w-full max-w-[420px] sm:max-w-[26.25rem]">
            <button
              type="button"
              data-trait="detail"
              onClick={() => handleTraitClick('detail')}
              className="trait-pill floating-badge px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-3 cursor-pointer hover:scale-[1.03] transition-transform text-left"
            >
              <span className="w-6 h-6 rounded-full bg-[#1E7E3A] text-white flex items-center justify-center text-[11px] sm:text-[0.6875rem] font-bold shrink-0">
                D
              </span>
              <span className="leading-snug">Keen eye for detail</span>
            </button>

            <button
              type="button"
              data-trait="systems"
              onClick={() => handleTraitClick('systems')}
              className="trait-pill floating-badge px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-3 cursor-pointer hover:scale-[1.03] transition-transform text-left"
              style={{ animationDelay: '0.7s' }}
            >
              <span className="w-6 h-6 rounded-full bg-[#1B76B5] text-white flex items-center justify-center text-[11px] sm:text-[0.6875rem] font-bold shrink-0">
                A
              </span>
              <span className="leading-snug">Systems builder by training</span>
            </button>

            <button
              type="button"
              data-trait="code"
              onClick={() => handleTraitClick('code')}
              className="trait-pill floating-badge px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-3 cursor-pointer hover:scale-[1.03] transition-transform text-left"
              style={{ animationDelay: '1.3s' }}
            >
              <span className="w-6 h-6 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[11px] sm:text-[0.6875rem] font-bold shrink-0">
                B
              </span>
              <span className="leading-snug">Prototypes in code</span>
            </button>

            <button
              type="button"
              data-trait="hardware"
              onClick={() => handleTraitClick('hardware')}
              className="trait-pill floating-badge px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-3 cursor-pointer hover:scale-[1.03] transition-transform text-left"
              style={{ animationDelay: '1.9s' }}
            >
              <span className="w-6 h-6 rounded-full bg-[#1E7E3A] text-white flex items-center justify-center text-[11px] sm:text-[0.6875rem] font-bold shrink-0">
                C
              </span>
              <span className="leading-snug">Hardware troubleshooter</span>
            </button>
          </div>
        </div>

        {/* Right 7 Cols: Bold Headline + Narrative Paragraphs + 3 Stat Cards + Skill Pills + Barbell Widget */}
        <div className="lg:col-span-7 space-y-7 sm:space-y-8 reveal-up">
          <div className="space-y-3">
            <div className="text-[11px] sm:text-[0.6875rem] font-mono-code uppercase tracking-wider text-emerald-800 font-semibold">
              Engineering Philosophy &amp; Craft
            </div>
            <h2
              className="font-display-serif text-2xl sm:text-3xl lg:text-[2.45rem] font-extrabold leading-[1.18] tracking-tight"
              style={{ color: 'var(--text-dark)' }}
            >
              I started in hardware &amp; networks, so I design in systems, and I prototype in code because the real thing teaches more than a mockup.
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-[0.96875rem] leading-relaxed" style={{ color: 'var(--text-body)' }}>
            <p>
              My work lives where businesses and users need deterministic control: AI that calculates multi-tier production costs with you, retail POS checkouts that never drop a ledger entry, and digital document libraries that work offline. I like messy operational problems, talking to users early, and shipping real repositories.
            </p>
            <p>
              I start from &ldquo;this can be automated&rdquo; and work out the how on the way. Like wind across a green valley, I find a path and keep moving: a cross-platform Gemini Pro cost calculator, a PostgreSQL stock mutation ledger, or 20+ open-source repositories built from Sumenep, East Java.
            </p>
          </div>

          {/* 3 Big Botanical Stat Cards with Generous Padding & Gap */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-1">
            <div className="work-card p-5 sm:p-6">
              <div className="font-display-serif text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--accent-rust)' }}>
                7+
              </div>
              <div className="text-xs sm:text-[0.8125rem] mt-2.5 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                years troubleshooting hardware &amp; shipping software
              </div>
            </div>
            <div
              className="work-card p-5 sm:p-6 relative"
              style={{
                background: 'linear-gradient(180deg, #E6F7EB 0%, #D8F2E0 100%)',
                borderColor: 'rgba(30, 126, 58, 0.28)',
              }}
            >
              <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#1E7E3A] text-white flex items-center justify-center text-xs font-bold">
                ★
              </span>
              <div
                className="font-display-serif text-2xl sm:text-[1.6rem] font-extrabold leading-tight pr-7"
                style={{ color: 'var(--accent-rust)' }}
              >
                Gemini AI engine
              </div>
              <div className="text-xs sm:text-[0.8125rem] mt-2.5 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                Automated COGS / HPP derivative calculator across Android, iOS &amp; Web.
              </div>
            </div>
            <div className="work-card p-5 sm:p-6 relative">
              <span className="absolute top-4 right-4 text-xs font-bold" style={{ color: 'var(--accent-rust)' }}>
                →
              </span>
              <div className="font-display-serif text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--accent-rust)' }}>
                50k+
              </div>
              <div className="text-xs sm:text-[0.8125rem] mt-2.5 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                daily transactions supported on PostgreSQL + Prisma ledgers
              </div>
            </div>
          </div>

          {/* 2 Rows of Outlined Capability Pills with Comfortable Gap */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
            {CAPABILITY_PILLS.map((pill) => (
              <span
                key={pill}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-emerald-900/10 shadow-2xs"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* "Off screen, I tune systems & lift" Interactive Barbell Card */}
          <div
            className="work-card p-6 sm:p-7 grid sm:grid-cols-12 gap-6 sm:gap-7 items-center"
            style={{ background: '#F4FAF0' }}
          >
            {/* Left 5 Cols: Barbell SVG on Squat Rack */}
            <div
              id="barbell-rack-click"
              onClick={handleCycleBarbell}
              className="sm:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#E3F1DF] cursor-pointer select-none hover:scale-[1.02] transition-transform border border-emerald-800/10"
              title="Tap to load another plate on the bar"
            >
              <svg id="barbell-svg-root" viewBox="0 0 220 90" className="w-full h-22">
                <circle
                  cx="38"
                  cy="40"
                  r="25"
                  fill="none"
                  stroke="rgba(30,126,58,0.32)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx="182"
                  cy="40"
                  r="25"
                  fill="none"
                  stroke="rgba(30,126,58,0.32)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                {/* Squat Rack Uprights */}
                <line x1="66" y1="14" x2="66" y2="82" stroke="#5C7864" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="54" y1="82" x2="78" y2="82" stroke="#5C7864" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="154" y1="14" x2="154" y2="82" stroke="#5C7864" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="142" y1="82" x2="166" y2="82" stroke="#5C7864" strokeWidth="3.5" strokeLinecap="round" />
                {/* Barbell Shaft + Inner Collars */}
                <g key={bounceKey} id="barbell-assembly-group" className="bar-loaded-bounce">
                  <rect x="8" y="38" width="204" height="4.5" rx="2.25" fill="#122418" />
                  <rect x="57" y="34" width="3.5" height="12.5" rx="1" fill="#324B3A" />
                  <rect x="159.5" y="34" width="3.5" height="12.5" rx="1" fill="#324B3A" />
                  {/* Dynamic Plates (Biggest plate on inside against collar, smallest plate at outer tip) */}
                  <g id="barbell-plates-svg">
                    {Array.from({ length: liftStep + 1 }).map((_, i) => {
                      const off = i * 8.2;
                      const h = 46 - i * 6.5;
                      const y = 40.25 - h / 2;
                      const fill = i % 2 === 0 ? '#1E7E3A' : '#D97706';
                      const leftX = (50 - off).toFixed(1);
                      const rightX = (164.5 + off).toFixed(1);
                      const isNewest = i === liftStep;
                      return (
                        <React.Fragment key={i}>
                          <rect
                            className={isNewest ? 'plate-anim-left' : ''}
                            x={leftX}
                            y={y.toFixed(1)}
                            width="5.8"
                            height={h.toFixed(1)}
                            rx="2.2"
                            fill={fill}
                          />
                          <rect
                            className={isNewest ? 'plate-anim-right' : ''}
                            x={rightX}
                            y={y.toFixed(1)}
                            width="5.8"
                            height={h.toFixed(1)}
                            rx="2.2"
                            fill={fill}
                          />
                        </React.Fragment>
                      );
                    })}
                  </g>
                </g>
              </svg>
              <span id="barbell-weight-label" className="font-mono-code text-[10.5px] sm:text-[0.65rem] text-[#1E7E3A] font-semibold mt-2">
                {LIFT_NAMES[liftStep]} · {LIFT_WEIGHTS[liftStep]} ({liftStep + 1}/5 loaded)
              </span>
            </div>

            {/* Right 7 Cols: Title + Copy + Listen / Sketch / Prototype / Test / Lift */}
            <div className="sm:col-span-7 space-y-3">
              <h3 className="font-display-serif text-lg sm:text-xl font-extrabold" style={{ color: 'var(--text-dark)' }}>
                Off screen, I tune systems &amp; lift
              </h3>
              <p className="text-xs sm:text-[0.8125rem] leading-relaxed" style={{ color: 'var(--text-body)' }}>
                Trained in hardware troubleshooting since 2019. It runs on the same rule as software architecture: heavy core plates on the inside, precision increments on the outside. <strong>Tap to load it.</strong>
              </p>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {LIFT_NAMES.map((name, idx) => {
                  const isSel = idx === liftStep;
                  return (
                    <button
                      key={name}
                      type="button"
                      data-lift-step={idx}
                      onClick={() => handleSelectLiftStep(idx)}
                      className={
                        isSel
                          ? 'lift-step-btn px-3.5 py-1.5 rounded-full text-[11px] sm:text-[0.6875rem] font-semibold border bg-[#122418] text-white cursor-pointer transition-colors'
                          : 'lift-step-btn px-3.5 py-1.5 rounded-full text-[11px] sm:text-[0.6875rem] font-semibold border bg-white text-[#324B3A] cursor-pointer transition-colors'
                      }
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
