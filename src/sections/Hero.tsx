import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe } from '../components/Globe';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Label fade in
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Heading character animation
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { opacity: 0, y: 50, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      }

      // Subtext fade in
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Scroll hint bounce
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      gsap.to(scrollHintRef.current, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split heading into characters
  const headingText = 'ISMAIL SAJID';
  const chars = headingText.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Globe Background */}
      <div className="absolute inset-0 z-0">
        <Globe />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <span
          ref={labelRef}
          className="font-mono text-xs md:text-sm tracking-[0.3em] text-indigo uppercase mb-6 block opacity-0"
        >
          Creative Developer & Designer
        </span>

        <h1
          ref={headingRef}
          className="font-serif text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] text-warm-white mb-8 tracking-tight"
          style={{ perspective: '1000px' }}
        >
          {chars}
        </h1>

        <p
          ref={subtextRef}
          className="text-text-muted text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          I build immersive digital experiences that merge art with technology.
          Specializing in premium web design, full-stack development, and
          agentic AI systems.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
          <a
            href="#work"
            data-cursor-hover
            data-cursor-text="View"
            className="magnetic-btn px-8 py-4 border border-indigo text-indigo font-mono text-sm tracking-wider uppercase hover:text-white transition-colors duration-300"
          >
            <span>View My Work</span>
          </a>
          <a
            href="#contact"
            data-cursor-hover
            data-cursor-text="Book"
            className="px-8 py-4 bg-indigo text-white font-mono text-sm tracking-wider uppercase hover:bg-indigo-dark transition-colors duration-300"
          >
            Book a Call
          </a>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0"
      >
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </div>
    </section>
  );
}
