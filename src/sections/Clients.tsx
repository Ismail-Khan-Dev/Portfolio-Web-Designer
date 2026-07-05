import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Utensils,
  Scissors,
  Wrench,
  Zap,
  Users,
  ShoppingBag,
  Building2,
  HeartPulse,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'Restaurants', icon: Utensils },
  { name: 'Salons', icon: Scissors },
  { name: 'Plumbing', icon: Wrench },
  { name: 'Electrical', icon: Zap },
  { name: 'Coaching', icon: Users },
  { name: 'E-Commerce', icon: ShoppingBag },
  { name: 'Real Estate', icon: Building2 },
  { name: 'Healthcare', icon: HeartPulse },
];

const stats = [
  { value: '$5,000', label: 'Avg. Project Value' },
  { value: '10+', label: 'Industries Served' },
  { value: '50+', label: 'Happy Clients' },
  { value: '100%', label: 'Satisfaction Rate' },
];

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="relative py-8 border-y border-white/5 mb-16"
      >
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
          {[...clients, ...clients].map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={`${client.name}-${index}`}
                className="flex items-center gap-4 text-text-muted hover:text-warm-white transition-colors"
              >
                <Icon className="w-6 h-6" />
                <span className="font-mono text-lg tracking-wider uppercase">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center md:text-left">
              <span className="font-serif text-3xl md:text-4xl lg:text-5xl text-indigo block mb-2">
                {stat.value}
              </span>
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Badges */}
      <div className="container-custom mt-16">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
            Trusted platforms:
          </span>
          {['Framer', 'Webflow', 'OpenAI', 'Claude', 'n8n'].map((platform) => (
            <span
              key={platform}
              className="font-mono text-sm text-warm-white/60 hover:text-indigo transition-colors"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
