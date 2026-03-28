import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    period: '2019 – Present',
    company: 'Freelance Technician',
    role: 'Computer Technician',
    description:
      'Providing comprehensive hardware troubleshooting, OS optimization (Windows/Linux), and technical support for desktops, laptops, and mobile devices. Expert in system maintenance and software issue resolution.',
    tags: ['Hardware Repair', 'Windows/Linux', 'System Optimization', 'Troubleshooting'],
  },
  {
    period: 'July 2024 – Sept 2024',
    company: 'Sekretariat DPRD Sumenep',
    role: 'Technical Support (Intern)',
    description:
      'Managed IT infrastructure and provided technical solutions for legislative operations at the Regional House of Representatives Secretariat. Focused on hardware reliability and operation support.',
    tags: ['Network Admin', 'Hardware Maintenance', 'IT Support'],
  },
  {
    period: 'Dec 2023 – March 2024',
    company: 'National Land Agency (BPN)',
    role: 'Technical Support (Intern)',
    description:
      'Assisted in data management and provided technical support for land certification processes. Developed internal efficiency for document processing and digital archiving.',
    tags: ['Data Management', 'Digital Archive', 'BPN Support'],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — cinematic reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      headerTl.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out' }
      );

      // Cards — stagger with slow, premium entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60, x: -30 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.6,
            stagger: 0.25,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-6 bg-surface-container-low/30">
      <div className="max-w-7xl mx-auto space-y-12">
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end gap-4">
          <h2 className="font-headline text-5xl font-bold tracking-tighter">
            Professional <span className="text-primary">Journey</span>
          </h2>
          <p className="font-label text-on-surface-variant uppercase tracking-widest text-sm">
            Experience Timeline
          </p>
        </div>
        <div ref={cardsRef} className="grid gap-8">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="exp-card glass-panel p-8 rounded-3xl border border-outline-variant/10 flex flex-col md:flex-row gap-8"
            >
              <div className="md:w-1/4">
                <span className="text-secondary font-bold font-headline text-lg">
                  {exp.period}
                </span>
                <h3 className="text-2xl font-bold text-on-surface">{exp.company}</h3>
                <p className="text-primary font-medium">{exp.role}</p>
              </div>
              <div className="md:w-3/4 space-y-4">
                <p className="text-on-surface-variant text-lg">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs font-label"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
