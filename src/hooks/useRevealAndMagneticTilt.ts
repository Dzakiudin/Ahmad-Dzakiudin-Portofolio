import { useEffect } from 'react';

export function useRevealAndMagneticTilt() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealEls = document.querySelectorAll('.reveal-up');
    revealEls.forEach((el) => io.observe(el));

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('#also-desk-row .work-card, #about .work-card')
    );

    const moveHandlers = new Map<HTMLElement, (e: PointerEvent) => void>();
    const leaveHandlers = new Map<HTMLElement, () => void>();

    cards.forEach((card) => {
      const onPointerMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(850px) translate3d(0, -6px, 0) rotateX(${(-ny * 6.5).toFixed(2)}deg) rotateY(${(nx * 6.5).toFixed(2)}deg)`;
      };
      const onPointerLeave = () => {
        card.style.transform = '';
      };

      moveHandlers.set(card, onPointerMove);
      leaveHandlers.set(card, onPointerLeave);
      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerleave', onPointerLeave);
    });

    return () => {
      io.disconnect();
      cards.forEach((card) => {
        const move = moveHandlers.get(card);
        const leave = leaveHandlers.get(card);
        if (move) card.removeEventListener('pointermove', move);
        if (leave) card.removeEventListener('pointerleave', leave);
      });
    };
  }, []);
}
