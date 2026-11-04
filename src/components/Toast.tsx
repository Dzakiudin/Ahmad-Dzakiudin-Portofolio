import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      id="toast-pill"
      className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#122418] text-white text-xs font-medium shadow-xl border border-emerald-400/25"
    >
      <span id="toast-pill-text">{message}</span>
    </div>
  );
};
