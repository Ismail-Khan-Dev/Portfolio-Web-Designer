import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Nebula Dashboard',
    category: 'SaaS Platform',
    platform: 'Framer',
    image: '/proj_nebula.jpg',
    result: '40% increase in user engagement',
  },
  {
    id: 2,
    title: 'Quantum Boutique',
    category: 'E-Commerce',
    platform: 'Webflow',
    image: '/proj_quantum.jpg',
    result: '2.5x conversion rate improvement',
  },
  {
    id: 3,
    title: 'Aether Social',
    category: 'Mobile App',
    platform: 'Framer',
    image: '/proj_aether.jpg',
    result: '100K+ downloads in first month',
  },
  {
    id: 4,
    title: 'Synapse AI',
    category: 'AI Platform',
    platform: 'Webflow',
    image: '/proj_synapse.jpg',
    result: '60% faster data processing',
  },
  {
    id: 5,
    title: 'Vertex Properties',
    category: 'Real Estate',
    platform: 'Framer',
    image: '/proj_vertex.jpg',
    result: '35% more qualified leads',
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] group"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      data-cursor-hover
      data-cursor-text="View"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface mb-6">
        <img
          src={project.image}
          alt={project.title}
          className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-void/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 px-6 py-3 border border-warm-white text-warm-white font-mono text-sm tracking-wider uppercase">
            View Case Study
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Platform Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-void/80 backdrop-blur-sm">
          <span className="font-mono text-[10px] text-warm-white tracking-wider uppercase">
            {project.platform}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-start justify-between">
        <div>
          <span className="font-mono text-xs text-indigo tracking-wider uppercase mb-2 block">
            {project.category}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-warm-white mb-2 group-hover:text-indigo transition-colors">
            {project.title}
          </h3>
          <p className="text-text-muted text-sm">{project.result}</p>
        </div>
        <span className="font-serif text-5xl text-white/5 group-hover:text-indigo/20 transition-colors">
          0{index + 1}
        </span>
      </div>
    </div>
  );
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!track) return;

      // Calculate total scroll distance
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              gsap.to(progress, {
                width: `${self.progress * 100}%`,
                duration: 0.1,
              });
            }
          },
        },
      });

      // Heading animation
      gsap.fromTo(
        '.work-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative">
      {/* Heading */}
      <div className="work-heading container-custom pt-24 md:pt-32 pb-12">
        <span className="font-mono text-xs tracking-[0.3em] text-indigo uppercase mb-4 block">
          Portfolio
        </span>
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white">
            Selected Work
          </h2>
          <span className="hidden md:block font-mono text-sm text-text-muted">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={triggerRef} className="relative h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="horizontal-scroll-track absolute top-1/2 -translate-y-1/2 left-0 pl-6 md:pl-12 lg:pl-16 pr-[20vw]"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-16 right-6 md:right-12 lg:right-16 h-[2px] bg-white/10">
          <div
            ref={progressRef}
            className="h-full bg-indigo"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </section>
  );
}
