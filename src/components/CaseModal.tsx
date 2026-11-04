import React from 'react';
import { WorkCardItem } from '../types/portfolio';

interface CaseModalProps {
  card: WorkCardItem | null;
  onClose: () => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div
      id="case-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[#F6FBF3] text-[#122418] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/15 my-8">
        <div className="relative h-52 sm:h-64 bg-emerald-950">
          <img
            id="modal-img"
            src={card.realScreenshot || card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D231A]/80 via-transparent to-transparent"></div>
          <button
            id="btn-close-modal"
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white text-sm flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="p-6 sm:p-8 space-y-4 max-h-[72vh] overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 pb-3">
            <div>
              <div id="modal-org" className="text-xs font-mono-code text-[#1E7E3A] font-semibold">
                {card.org}
              </div>
              <h3 id="modal-title" className="font-display-serif text-2xl sm:text-3xl font-extrabold mt-0.5">
                {card.title}
              </h3>
            </div>
            <a
              id="modal-link"
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#122418] hover:bg-emerald-900 text-white text-xs font-semibold transition-colors"
            >
              View Repository on GitHub ↗
            </a>
          </div>
          <p id="modal-desc" className="text-xs sm:text-sm leading-relaxed text-[#324B3A]">
            {card.fullDesc}
          </p>
          <div className="p-4 rounded-2xl bg-[#E8F4E5] border border-emerald-800/15 space-y-1.5">
            <div className="text-[10px] font-mono-code uppercase tracking-wider text-emerald-900 font-bold">
              System Architecture &amp; Production Pipeline
            </div>
            <div id="modal-arch-pipeline" className="font-mono-code text-[11px] text-[#122418] leading-relaxed">
              {card.archPipeline}
            </div>
          </div>
          <ul id="modal-bullets" className="space-y-2.5 text-xs sm:text-sm text-[#122418] font-medium">
            {card.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="font-mono-code text-[10px] px-1.5 py-0.5 rounded bg-emerald-800 text-white font-bold shrink-0 mt-0.5">
                  0{i + 1}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
