import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Workflow,
  MessageSquare,
  FileText,
  Phone,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const aiServices = [
  {
    icon: Bot,
    title: 'Lead Qualification Bots',
    description: 'AI agents that engage, qualify, and nurture leads 24/7.',
  },
  {
    icon: Workflow,
    title: 'Automation Workflows',
    description: 'n8n and Make.com integrations that eliminate manual tasks.',
  },
  {
    icon: MessageSquare,
    title: 'Custom AI Assistants',
    description: 'GPT and Claude-powered assistants trained on your business.',
  },
  {
    icon: FileText,
    title: 'Content Pipelines',
    description: 'Automated content generation and distribution systems.',
  },
  {
    icon: Phone,
    title: 'Voice AI Agents',
    description: 'Intelligent voice systems for customer support and sales.',
  },
];

// Animated Terminal Component
function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = terminalRef.current?.querySelectorAll('.terminal-line');
    if (!lines) return;

    gsap.fromTo(
      lines,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.5,
        repeat: -1,
        repeatDelay: 3,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-white/10 font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-4 text-text-muted text-xs">agent.ts</span>
      </div>

      {/* Terminal Content */}
      <div ref={terminalRef} className="p-4 space-y-2">
        <div className="terminal-line text-green-400">
          <span className="text-text-muted">$</span> npm run agent:deploy
        </div>
        <div className="terminal-line text-text-muted opacity-0">
          {'>'} Initializing AI agent architecture...
        </div>
        <div className="terminal-line text-indigo opacity-0">
          {'>'} ✓ LangChain pipeline connected
        </div>
        <div className="terminal-line text-indigo opacity-0">
          {'>'} ✓ Claude API integration active
        </div>
        <div className="terminal-line text-indigo opacity-0">
          {'>'} ✓ n8n workflows deployed
        </div>
        <div className="terminal-line text-green-400 opacity-0">
          {'>'} ✓ Agent ready for autonomous operation
        </div>
        <div className="terminal-line text-text-muted opacity-0">
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}

export function AgenticAI() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Service cards stagger
      gsap.fromTo(
        '.ai-service-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.ai-services-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0a0a1a 50%, #050505 100%)',
      }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-indigo uppercase mb-4 block">
              The Future Layer
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white mb-6">
              Agentic AI
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-6">
              Most agencies are still using yesterday&apos;s tools. I build the systems
              they&apos;ll be copying in 2 years.
            </p>
            <p className="text-text-muted text-base leading-relaxed mb-8">
              Agentic AI refers to autonomous systems that can perceive their environment,
              make decisions, and take actions to achieve specific goals — all without
              constant human intervention.
            </p>

            {/* Terminal */}
            <div className="mb-8">
              <Terminal />
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-indigo text-white font-mono text-sm tracking-wider uppercase hover:bg-indigo-dark transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-cursor-hover
            >
              Explore AI Solutions
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Services Grid */}
          <div className="ai-services-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="ai-service-card group p-6 bg-surface/50 border border-white/5 hover:border-indigo/30 transition-all duration-300"
                  data-cursor-hover
                >
                  <Icon className="w-8 h-8 text-indigo mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-serif text-lg text-warm-white mb-2">
                    {service.title}
                  </h4>
                  <p className="text-text-muted text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
