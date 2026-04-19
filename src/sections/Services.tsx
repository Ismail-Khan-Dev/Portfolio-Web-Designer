import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code, Brain, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Palette,
    title: 'Premium Website Design',
    description:
      'Framer & Webflow builds that look like a $50k agency made them. Custom animations, pixel-perfect layouts, conversion-optimized.',
    tags: ['Framer', 'Webflow', 'UI/UX', 'Animation'],
    price: 'Starting at $2,500',
    color: '#5C4EFF',
  },
  {
    icon: Code,
    title: 'Full-Stack Web Development',
    description:
      'From CMS integration to custom interactions and third-party APIs. Sites that don\'t just look good — they perform.',
    tags: ['Webflow CMS', 'Framer CMS', 'Integrations', 'SEO'],
    price: 'Starting at $3,500',
    color: '#C9A84C',
  },
  {
    icon: Brain,
    title: 'Agentic AI Systems',
    description:
      'I build autonomous AI agents and automation pipelines that replace manual workflows, generate leads, and scale your business.',
    tags: ['LangChain', 'Claude API', 'n8n', 'OpenAI', 'Automation'],
    price: 'Custom pricing',
    color: '#5C4EFF',
    badge: 'NEW',
  },
];

function ServiceCard({
  service,
}: {
  service: (typeof services)[0];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: -rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
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

  const Icon = service.icon;

  return (
    <div
      ref={cardRef}
      className="tilt-card group relative bg-surface border border-white/5 p-8 md:p-10 hover:border-indigo/30 transition-colors duration-500"
      style={{
        transformStyle: 'preserve-3d',
        borderLeft: `3px solid ${service.color}`,
      }}
      data-cursor-hover
    >
      {/* Badge */}
      {service.badge && (
        <span className="absolute top-4 right-4 px-3 py-1 bg-indigo text-white text-[10px] font-mono tracking-wider uppercase">
          {service.badge} →
        </span>
      )}

      {/* Icon */}
      <div
        className="w-14 h-14 flex items-center justify-center mb-6"
        style={{ backgroundColor: `${service.color}15` }}
      >
        <Icon className="w-6 h-6" style={{ color: service.color }} />
      </div>

      {/* Content */}
      <h3 className="font-serif text-2xl md:text-3xl text-warm-white mb-4">
        {service.title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/5 text-text-muted text-[10px] font-mono tracking-wider uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Price & CTA */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <span className="font-mono text-sm text-gold">{service.price}</span>
        <a
          href="#contact"
          className="flex items-center gap-2 text-indigo font-mono text-xs tracking-wider uppercase group-hover:gap-3 transition-all"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Hover Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${service.color}10, transparent 70%)`,
        }}
      />
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.tilt-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="container-custom">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <span className="font-mono text-xs tracking-[0.3em] text-indigo uppercase mb-4 block">
            Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white max-w-2xl">
            What I Build For You
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
