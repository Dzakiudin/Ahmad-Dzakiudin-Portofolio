import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for fade-in reveal animations on scroll.
 * All timings tuned for premium Awwwards-grade motion.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 50,
      x = 0,
      duration = 1.6,
      delay = 0,
      ease = 'expo.out',
      start = 'top 82%',
      stagger = 0,
      scale = 1,
    } = options;

    const children = stagger > 0 ? el.children : [el];

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y,
        x,
        scale: scale !== 1 ? scale : undefined,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease,
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Hook for stagger word animations on headings.
 */
export function useStaggerText(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      duration = 1.2,
      stagger = 0.07,
      ease = 'expo.out',
      start = 'top 82%',
      y = 60,
    } = options;

    const text = el.textContent;
    const words = text.split(' ');
    el.innerHTML = '';

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'stagger-word';
      span.textContent = word;
      el.appendChild(span);
      if (i < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });

    const wordSpans = el.querySelectorAll('.stagger-word');

    gsap.fromTo(
      wordSpans,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Hook for parallax scroll effect.
 * Uses high scrub values for ultra-smooth, delay-free parallax.
 */
export function useParallax(speed = 0.3, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { start = 'top bottom', end = 'bottom top' } = options;

    gsap.to(el, {
      y: () => speed * 200,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: 2.5,    // higher = smoother trailing
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [speed]);

  return ref;
}

/**
 * Hook for mouse parallax effect.
 * Very slow lerp for cinematic, "floating camera" feel.
 */
export function useMouseParallax(intensity = 0.02) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX - innerWidth / 2) * intensity;
      mouseY = (e.clientY - innerHeight / 2) * intensity;
    };

    const animate = () => {
      // 0.035 lerp = very slow, cinematic trailing
      currentX += (mouseX - currentX) * 0.035;
      currentY += (mouseY - currentY) * 0.035;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [intensity]);

  return ref;
}

/**
 * Hook for tilt effect on cards.
 * Slower, smoother tilt with expo easing for premium feel.
 */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 1.2,
        ease: 'expo.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 1.6,
        ease: 'expo.out',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return ref;
}
