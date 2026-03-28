import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTilt } from '../hooks/useAnimations';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Automatic HPP Calculator',
    icon: 'calculate',
    description:
      'Intelligent Cost of Goods Sold (HPP) calculator engineered with Google Gemini Pro AI. Automates complex ingredient derivative calculations directly mapped to financial metrics, packaged as a cross-platform mobile app via Capacitor.',
    tags: ['Next.js', 'Gemini AI', 'Capacitor'],
    image:
      'https://play-lh.googleusercontent.com/Oz_p1mpc_N_Y7UJX9bgMWp8sAx4n6_hsW-9UjxE-kP3Ft_zt4T-B5ed829kFzFaoXjiCBktAeOn9IbxHI75jOA=w526-h296-rw',
    imageAlt:
      'Advanced financial and accounting dashboard with glowing analytics and futuristic layout',
  },
  {
    title: 'IdentiMap OSINT',
    icon: 'travel_explore',
    description:
      'Advanced digital footprint correlation engine featuring a multi-engine architecture, telecom analytics, holehe breach cross-referencing, and interactive node graph visualizations.',
    tags: ['Python', 'FastAPI', 'Next.js'],
    image:
      'https://framerusercontent.com/images/zTPYT8N804AzmADO4D9VoYM0DA.webp',
    imageAlt:
      'Node graph visualization showing interconnected digital footprints and identity parameters in a dark cyberpunk theme',
  },
  {
    title: 'Agent Jackie',
    icon: 'psychology',
    description:
      'Experimental self-improving AI Agent built from scratch featuring a cognitive lifecycle (Plan, Act, Observe, Reflect) and self-healing memory architecture. Note: This is an MVP/Demo project created strictly for educational purposes.',
    tags: ['Python', 'Agentic AI', 'LLMs'],
    image:
      'https://www.computerworld.com/wp-content/uploads/2025/11/3846150-0-19220000-1762336686-shutterstock_2577839733.jpg?quality=50&strip=all',
    imageAlt:
      'Futuristic artificial intelligence interface showing cognitive processing and neural network activity',
  },
];

function ProjectCard({ project }) {
  const tiltRef = useTilt(5);

  return (
    <div
      ref={tiltRef}
      className="project-card tilt-card bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10"
    >
      <div className="h-48 overflow-hidden">
        <img
          className="project-card-image w-full h-full object-cover"
          alt={project.imageAlt}
          src={project.image}
        />
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-headline font-bold text-on-surface">
            {project.title}
          </h3>
          <span className="material-symbols-outlined text-primary icon-float">
            {project.icon}
          </span>
        </div>
        <p className="text-on-surface-variant text-sm line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-label font-bold uppercase tracking-wider text-secondary px-2 py-1 bg-secondary-container/20 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

  export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const buttonRef = useRef(null); // Added ref for the button

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

      // Cards — slow stagger with scale for camera-like depth
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 70, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.6,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Button reveal
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div ref={headerRef} className="text-center space-y-4 mb-16">
        <h2 className="font-headline text-5xl font-bold tracking-tighter">
          Engineering <span className="text-primary">Impact</span>
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          A selection of 20+ real-world applications and AI-driven platforms built for
          performance and scale.
        </p>
      </div>
      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      
      {/* GitHub Button */}
      <div ref={buttonRef} className="flex justify-center mt-10">
        <a
          href="https://github.com/Dzakiudin"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary-glass flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-surface-container-lowest border border-outline-variant/15 text-primary hover:text-cyan-400 font-medium text-sm group"
        >
          <span>Explore More on GitHub</span>
          <svg className="w-5 h-5 fill-current transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
