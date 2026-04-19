import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Founder & CEO',
    company: 'Nebula Analytics',
    businessType: 'SaaS Founder · San Francisco',
    quote:
      "Alex didn't just build us a website — he created a digital experience that perfectly captures our brand. The attention to detail is unmatched. Our conversion rate increased by 40% within the first month.",
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Creative Director',
    company: 'Quantum Studio',
    businessType: 'Design Agency · New York',
    quote:
      "Working with Alex was a game-changer. His understanding of both design and development is rare. He delivered beyond our expectations.",
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    title: 'Restaurant Owner',
    company: 'Ember & Salt',
    businessType: 'Restaurant · Dubai',
    quote:
      "Our new website has completely transformed how customers find and book with us. Online reservations are up 48% since launch.",
    rating: 5,
    featured: false,
  },
  {
    id: 4,
    name: 'David Park',
    title: 'Tech Lead',
    company: 'Synapse AI',
    businessType: 'AI Startup · Seoul',
    quote:
      "The AI integration Alex built for us has automated 70% of our customer support. Incredible ROI and the system keeps getting smarter.",
    rating: 5,
    featured: false,
  },
];

function TestimonialCard({
  testimonial,
  isFeatured = false,
}: {
  testimonial: (typeof testimonials)[0];
  isFeatured?: boolean;
}) {
  return (
    <div
      className={`relative p-8 ${
        isFeatured
          ? 'bg-surface border border-indigo/20'
          : 'bg-surface/50 border border-white/5'
      }`}
      data-cursor-hover
    >
      {/* Quote Icon */}
      <Quote
        className={`absolute top-6 right-6 w-10 h-10 ${
          isFeatured ? 'text-indigo/30' : 'text-white/5'
        }`}
      />

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>

      {/* Quote */}
      <p
        className={`${
          isFeatured ? 'text-lg md:text-xl' : 'text-sm'
        } text-warm-white/90 leading-relaxed mb-8`}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo to-gold flex items-center justify-center">
          <span className="font-serif text-lg text-white">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <span className="font-medium text-warm-white block">
            {testimonial.name}
          </span>
          <span className="font-mono text-xs text-text-muted">
            {testimonial.businessType}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Featured testimonial
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid testimonials
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredTestimonial = testimonials.find((t) => t.featured);
  const otherTestimonials = testimonials.filter((t) => !t.featured);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="container-custom">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-indigo uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white">
            What Clients Say
          </h2>
        </div>

        {/* Featured Testimonial */}
        {featuredTestimonial && (
          <div ref={featuredRef} className="mb-8">
            <TestimonialCard testimonial={featuredTestimonial} isFeatured />
          </div>
        )}

        {/* Other Testimonials Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
