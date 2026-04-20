import { Github, Linkedin, Twitter, Dribbble, Mail } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'AI', href: '#ai' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ismailsajid0617/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Ismail-2001', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/flow_comm', label: 'X (Twitter)' },
  { icon: Mail, href: 'mailto:ismailsajid0617@gmail.com', label: 'Email' },
];

export function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="py-16 md:py-24 border-t border-white/5">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="font-serif text-4xl text-warm-white hover:text-indigo transition-colors block mb-4"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              data-cursor-hover
            >
              Ismail Sajid
            </a>
            <p className="text-text-muted text-sm leading-relaxed max-w-md mb-6">
              Building the web&apos;s most effective digital experiences. Premium web
              design, full-stack development, and agentic AI systems for
              high-growth businesses.
            </p>
            <p className="font-mono text-xs text-text-muted mb-2">
              Based in Pakistan, working worldwide.
            </p>
            <a 
              href="mailto:ismailsajid0617@gmail.com"
              className="font-mono text-xs text-indigo hover:text-indigo-light transition-colors"
              data-cursor-hover
            >
              ismailsajid0617@gmail.com
            </a>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6 block">
              Navigation
            </span>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-warm-white/70 hover:text-indigo transition-colors text-sm"
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6 block">
              Connect
            </span>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-text-muted hover:text-indigo hover:border-indigo transition-all"
                    aria-label={social.label}
                    data-cursor-hover
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Ismail Sajid. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-text-muted">
              Built with React + Three.js
            </span>
            <span className="w-1 h-1 bg-text-muted rounded-full" />
            <span className="font-mono text-xs text-text-muted">
              Designed by IS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
