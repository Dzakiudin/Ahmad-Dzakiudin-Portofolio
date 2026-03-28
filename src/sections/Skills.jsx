import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: 'Programming',
    color: 'bg-primary',
    skills: ['JavaScript', 'TypeScript', 'Python', 'PHP'],
  },
  {
    title: 'Frameworks & Libraries',
    color: 'bg-secondary',
    skills: ['React', 'Next.js', 'Express', 'Vite', 'FastAPI'],
  },
  {
    title: 'Web & AI Technology',
    color: 'bg-tertiary',
    skills: ['HTML/CSS', 'Tailwind CSS', 'PostgreSQL', 'SQLite', 'AI / ML', 'Data Processing'],
  },
  {
    title: 'Tools & Productivity',
    color: 'bg-cyan-500',
    skills: ['Git', 'Vercel', 'Canva', 'CapCut'],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading — cinematic
      gsap.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Categories — slow cascade
      if (categoriesRef.current) {
        const categories = categoriesRef.current.querySelectorAll('.skill-category');
        categories.forEach((cat, i) => {
          gsap.fromTo(
            cat,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.4,
              delay: i * 0.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: categoriesRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Skill pills — slow, premium stagger
          const pills = cat.querySelectorAll('.skill-pill');
          gsap.fromTo(
            pills,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.0,
              stagger: 0.1,
              delay: 0.4 + i * 0.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: categoriesRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 bg-gradient-to-b from-transparent to-surface-container-low/50"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div ref={headingRef} className="space-y-6">
          <h2 className="font-headline text-5xl font-bold tracking-tighter">
            Technical <span className="text-primary">Stack</span>
          </h2>
          <p className="text-on-surface-variant">
            The tools and frameworks I use to engineer high-performance systems and
            AI-driven solutions.
          </p>
        </div>
        <div ref={categoriesRef} className="md:col-span-2 grid sm:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="skill-category space-y-4">
              <h4 className="font-label text-sm uppercase tracking-widest text-secondary font-bold">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="skill-pill px-4 py-2 glass-panel rounded-xl border border-outline-variant/10 text-on-surface font-medium flex items-center gap-2"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${category.color}`} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
