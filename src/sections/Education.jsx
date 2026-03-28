import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION_DATA = [
  {
    title: 'Elementary School',
    school: 'SDN Paberasan 1',
    period: '2013 – 2019',
    description: 'Foundational education and early academic growth.',
  },
  {
    title: 'Junior High School',
    school: 'SMP Negeri 01 Kalianget',
    period: 'Jul 2019 – Jun 2022',
    description: 'Developed an early interest in computing, logic, and structured problem-solving.',
  },
  {
    title: 'High School',
    school: 'SMKN 1 Sumenep',
    period: 'Jul 2022 – Jun 2025',
    description: 'Focused on software engineering, technical skills, and computer network administration fundamentals.',
  },
  {
    title: 'University',
    school: 'Universitas Bahaudin Mudhary (UNIBA) Madura',
    period: '2025 – Present',
    description: 'Pursuing higher education with a focus on advanced computer science and intelligent systems engineering.',
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — cinematic
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // The Central Line animation — draws down while scrolling
      const line = timelineRef.current.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 60%',
              end: 'bottom 70%',
              scrub: 1.5,
            },
          }
        );
      }

      // Cards & Dots stagger
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const xOffset = window.innerWidth > 768 ? (isLeft ? -60 : 60) : 40;

        // Card slide-in
        gsap.fromTo(
          item.querySelector('.content-card'),
          { opacity: 0, x: xOffset, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Dot pop-in
        const dot = item.querySelector('.timeline-dot');
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="py-24 px-6 max-w-7xl mx-auto space-y-20 relative z-10">
      <div ref={headerRef} className="text-center space-y-4">
        <h2 className="font-headline text-5xl font-bold tracking-tighter">
          Educational <span className="text-secondary">Path</span>
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto uppercase tracking-widest text-sm font-label">
          Academic Timeline
        </p>
      </div>

      <div ref={timelineRef} className="relative max-w-5xl mx-auto pt-8">
        {/* The Central Line */}
        <div className="timeline-line absolute left-[32px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 rounded-full z-0" />

        <div className="space-y-12 md:space-y-12 relative z-10">
          {EDUCATION_DATA.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`timeline-item relative flex items-center w-full min-h-[140px] ${
                  isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* 1. Anchored Dot (Strictly on the line) */}
                <div className="timeline-dot absolute left-[32px] md:left-1/2 w-6 h-6 bg-surface-container-lowest border-[5px] border-secondary rounded-full -translate-x-1/2 z-20 shadow-[0_0_20px_rgba(38,254,220,0.6)]" />

                {/* 2. Layout Wrapper (Strict Separation) */}
                {/* Mobile: Adds padding-left so card is pushed right of the line */}
                {/* Desktop: No padding, flex pushes card to the correct side */}
                <div className={`w-full flex pl-[70px] md:pl-0 ${
                  isLeft ? 'md:justify-end' : 'md:justify-start'
                }`}>
                  
                  {/* 3. The Content Card (w/ margins pushing it away from center line) */}
                  <div className={`w-full md:w-[calc(50%-4rem)] ${
                    isLeft ? 'md:mr-[4rem]' : 'md:ml-[4rem]'
                  }`}>
                    <div
                      className={`content-card glass-panel p-8 rounded-[2rem] border border-outline-variant/15 shadow-xl transition-all duration-700 hover:shadow-[0_15px_50px_rgba(0,104,89,0.15)] hover:-translate-y-2 group relative overflow-hidden bg-surface/40 backdrop-blur-xl ${
                        isLeft ? 'text-left md:text-right' : 'text-left'
                      }`}
                    >
                      {/* Background glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-transparent to-primary/0 group-hover:from-secondary/10 group-hover:to-primary/10 transition-colors duration-700 pointer-events-none" />
                      
                      <span className="relative z-10 text-secondary font-bold font-headline text-xs md:text-sm uppercase tracking-widest inline-block mb-4 px-4 py-1.5 bg-secondary-container/30 rounded-full border border-secondary/30">
                        {item.period}
                      </span>
                      <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-on-surface mb-2 font-headline group-hover:text-secondary transition-colors duration-500">
                        {item.title}
                      </h3>
                      <h4 className="relative z-10 text-xl font-semibold text-primary mb-4">
                        {item.school}
                      </h4>
                      <p className="relative z-10 text-on-surface-variant text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
