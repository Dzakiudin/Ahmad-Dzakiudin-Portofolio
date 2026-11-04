import React from 'react';
import { copyEmailText } from '../utils/sound';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const handleCopyEmail = () => {
    copyEmailText();
    onShowToast('Copied dzakiudin07@gmail.com to clipboard!');
  };

  return (
    <div
      id="cv-shortcut-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div className="bg-[#F6FBF3] text-[#122418] w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-emerald-900/15">
        <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
          <span className="text-xs font-mono-code text-[#5C7864]">× Portfolio shortcut &amp; CV</span>
          <button
            id="btn-close-cv-modal"
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#DFEFE0] text-xs flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="flex items-center gap-3.5">
          <img
            src="assets/me.png"
            alt="Ahmad Dzakiudin"
            className="w-14 h-14 rounded-2xl object-cover border border-emerald-800/20"
          />
          <div>
            <h3 className="font-display-serif text-2xl font-extrabold">Ahmad Dzakiudin</h3>
            <p className="text-xs text-[#324B3A]">Full-Stack Developer &amp; AI System Builder · UNIBA Madura</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-2xl bg-white border border-emerald-900/10">
            <div className="font-display-serif text-xl font-extrabold text-[#1E7E3A]">20+</div>
            <div className="text-[10px] text-[#324B3A] mt-0.5">Shipped Repos</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-emerald-900/10">
            <div className="font-display-serif text-xl font-extrabold text-[#1E7E3A]">50k+</div>
            <div className="text-[10px] text-[#324B3A] mt-0.5">Daily POS Tx</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-emerald-900/10">
            <div className="font-display-serif text-xl font-extrabold text-[#1E7E3A]">Gemini</div>
            <div className="text-[10px] text-[#324B3A] mt-0.5">AI HPP Engine</div>
          </div>
        </div>
        <div className="text-xs space-y-1.5 text-[#324B3A]">
          <div>
            <strong>Education:</strong> Computer Science, UNIBA Madura (2025–Now) · SMKN 1 Sumenep (2022–2025)
          </div>
          <div>
            <strong>Experience:</strong> Freelance Technician (2019–Now) · Sekretariat DPRD Sumenep · BPN
          </div>
          <div>
            <strong>Direct Line:</strong> +62 857-0709-1624 · dzakiudin07@gmail.com
          </div>
        </div>
        <div className="pt-2 border-t border-emerald-900/10 flex flex-wrap gap-2">
          <button
            id="btn-cv-copy-email"
            type="button"
            onClick={handleCopyEmail}
            className="px-4 py-2 rounded-full bg-[#1E7E3A] text-white text-xs font-semibold cursor-pointer"
          >
            Copy Email
          </button>
          <a
            href="https://github.com/Dzakiudin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white border border-emerald-900/15 text-xs font-semibold"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white border border-emerald-900/15 text-xs font-semibold"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://wa.me/6285707091624"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white border border-emerald-900/15 text-xs font-semibold"
          >
            WhatsApp ↗
          </a>
        </div>
      </div>
    </div>
  );
};
