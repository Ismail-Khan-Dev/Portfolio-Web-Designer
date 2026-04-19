import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: '2024',
    title: 'Agentic AI Pioneer',
    description:
      'Leading the charge in autonomous AI systems. Building intelligent agents that transform how businesses operate, from lead generation to customer support automation.',
  },
  {
    year: '2022',
    title: 'Freelance Excellence',
    description:
      'Served 50+ clients across 6 industries. Developed a signature style combining editorial aesthetics with cutting-edge web technologies.',
  },
  {
    year: '2020',
    title: 'Design Studio Founded',
    description:
      'Launched my own creative studio focusing on premium web experiences. Partnered with startups and established brands alike.',
  },
  {
    year: '2018',
    title: 'The Journey Began',
    description:
      'Started my career as a frontend developer. Fell in love with the intersection of design and code.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        timelineRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate timeline line
      const line = timelineRef.current?.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNodeClick = (index: number) => {
    setActiveIndex(index);
    
    // Animate content change
    const content = timelineRef.current?.querySelector('.timeline-content');
    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="font-mono text-xs tracking-[0.3em] text-indigo uppercase mb-4 block">
              About Me
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8">
              My Journey
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-6">
              With over 6 years of experience in web development and design, I&apos;ve
              honed my craft to deliver exceptional digital experiences. My approach
              combines technical precision with artistic vision, resulting in websites
              that not only look stunning but perform flawlessly.
            </p>
            <p className="text-text-muted text-base leading-relaxed mb-8">
              Today, I&apos;m pushing the boundaries of what&apos;s possible by integrating
              agentic AI into my workflow — creating intelligent systems that give
              my clients an unfair competitive advantage.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
              <div>
                <span className="font-serif text-3xl md:text-4xl text-indigo block mb-1">
                  50+
                </span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  Projects
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-indigo block mb-1">
                  6+
                </span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  Years
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-indigo block mb-1">
                  10+
                </span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  Industries
                </span>
              </div>
            </div>
          </div>

          {/* Right Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/10">
              <div
                className="timeline-line absolute top-0 left-0 w-full bg-indigo origin-top"
                style={{
                  height: `${((activeIndex + 1) / timelineData.length) * 100}%`,
                }}
              />
            </div>

            {/* Timeline Nodes */}
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div
                  key={item.year}
                  className="relative pl-14 cursor-pointer group"
                  onClick={() => handleNodeClick(index)}
                  data-cursor-hover
                >
                  {/* Node */}
                  <div
                    className={`absolute left-0 top-1 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      index === activeIndex
                        ? 'border-indigo bg-indigo/20 scale-110'
                        : 'border-white/20 bg-void group-hover:border-indigo/50'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs transition-colors ${
                        index === activeIndex ? 'text-indigo' : 'text-text-muted'
                      }`}
                    >
                      {item.year.slice(2)}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`transition-opacity duration-300 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <h4
                      className={`font-serif text-xl mb-2 transition-colors ${
                        index === activeIndex ? 'text-warm-white' : 'text-text-muted'
                      }`}
                    >
                      {item.title}
                    </h4>
                    {index === activeIndex && (
                      <p className="timeline-content text-text-muted text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
