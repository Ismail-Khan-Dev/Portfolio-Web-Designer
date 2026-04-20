import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Calendar, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div ref={contentRef}>
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-indigo uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white mb-6">
              Ready to Build Something Premium?
            </h2>
            <p className="text-text-muted text-base max-w-xl mx-auto">
              Most clients recoup their investment within 60 days. Let&apos;s discuss
              how we can transform your digital presence.
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Project Option */}
            <div
              className="p-8 md:p-10 bg-surface border border-white/5 hover:border-indigo/30 transition-all duration-300"
              data-cursor-hover
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-indigo" />
                </div>
                <div>
                  <span className="font-serif text-2xl text-warm-white block">
                    Start a Project
                  </span>
                  <span className="font-mono text-sm text-gold">
                    Starting at $2,500
                  </span>
                </div>
              </div>
              <p className="text-text-muted text-sm mb-6">
                One-time investment for a complete website build. Ideal for new
                businesses, rebrands, and product launches.
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 text-indigo font-mono text-sm tracking-wider uppercase hover:gap-3 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Strategy Call Option */}
            <div
              className="p-8 md:p-10 bg-surface border border-white/5 hover:border-indigo/30 transition-all duration-300"
              data-cursor-hover
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <span className="font-serif text-2xl text-warm-white block">
                    Free Strategy Call
                  </span>
                  <span className="font-mono text-sm text-text-muted">
                    30 minutes, no pitch
                  </span>
                </div>
              </div>
              <p className="text-text-muted text-sm mb-6">
                I&apos;ll tell you exactly what your site needs. No commitment required.
                Just honest advice from an expert.
              </p>
              <button
                onClick={() => setIsCalendlyOpen(true)}
                className="inline-flex items-center gap-2 text-gold font-mono text-sm tracking-wider uppercase hover:gap-3 transition-all"
              >
                Book Free Call
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo/10 border border-indigo/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-indigo tracking-wider">
                Currently accepting 2 new projects for April. Spots fill fast.
              </span>
            </span>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="max-w-xl mx-auto">
            <div className="flex flex-col items-center gap-4 mb-12">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo" />
                <span className="font-mono text-sm text-text-muted uppercase tracking-wider">
                  Contact directly
                </span>
              </div>
              <a 
                href="mailto:ismailsajid0617@gmail.com" 
                className="font-serif text-2xl md:text-3xl text-warm-white hover:text-indigo transition-all duration-300"
                data-cursor-hover
              >
                ismailsajid0617@gmail.com
              </a>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-green-500/10 border border-green-500/20 text-center">
                <span className="font-serif text-2xl text-green-400 block mb-2">
                  Message Sent!
                </span>
                <span className="text-text-muted text-sm">
                  I&apos;ll get back to you within 24 hours.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 text-warm-white placeholder:text-text-muted focus:border-indigo focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 text-warm-white placeholder:text-text-muted focus:border-indigo focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-warm-white placeholder:text-text-muted focus:border-indigo focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo text-white font-mono text-sm tracking-wider uppercase hover:bg-indigo-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-cursor-hover
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Calendly Dialog */}
      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent className="max-w-4xl h-[80vh] bg-surface border-white/10 p-0">
          <DialogHeader className="p-6 border-b border-white/5">
            <DialogTitle className="font-serif text-2xl text-warm-white">
              Book Your Free Strategy Call
            </DialogTitle>
          </DialogHeader>
          <div className="h-full">
            <iframe
              src="https://calendly.com/your-calendly-link/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a call"
              className="bg-void"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
