import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 0 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5V10.13H5.07V18.5h2.79Z"/>
  </svg>
);

interface SiteHeaderProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenContact: () => void;
  onNavigate: (target: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  isMuted,
  onToggleSound,
  onOpenContact,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work' },
    { label: 'PROCESS', href: '#process' },
    { label: 'STACK', href: '#studio' },
    { label: 'CONTACT', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#07080a]/90 backdrop-blur-md border-b border-white/[0.08]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, '#')}
            className="flex items-center space-x-3 group cursor-pointer"
            data-interactive="true"
            data-cursor-label="HOME"
          >
            {/* Geometric RK mark with crimson theme */}
            <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center font-bold tracking-tighter text-xs transition-transform duration-200 group-hover:scale-105 group-hover:bg-red-500 shadow-md shadow-red-600/30 font-mono-tech">
              RK
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-sm text-white font-mono-tech">
                RISHIKESH KALME
              </span>
              <span className="text-[9px] text-neutral-400 font-mono-tech tracking-wider hidden sm:block">
                FULL-STACK DEVELOPER &middot; INDORE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-mono-tech tracking-wider text-neutral-400">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="relative py-1 transition-colors duration-200 hover:text-white group"
                data-interactive="true"
                data-cursor-label="GO"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-500 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right utility buttons: Sound + LinkedIn + Contact CTA */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Sound toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 text-neutral-400 hover:text-white transition-colors duration-200 flex items-center space-x-1.5 cursor-pointer"
              title={isMuted ? 'Unmute spatial audio' : 'Mute audio'}
              data-interactive="true"
              data-cursor-label="AUDIO"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-neutral-500" />
              ) : (
                <div className="flex items-center space-x-1 text-red-400">
                  <Volume2 className="w-4 h-4" />
                  <span className="flex space-x-0.5 items-end h-3">
                    <span className="w-0.5 h-1.5 bg-red-400 animate-pulse" />
                    <span className="w-0.5 h-3 bg-red-400 animate-pulse delay-75" />
                    <span className="w-0.5 h-2 bg-red-400 animate-pulse delay-150" />
                  </span>
                </div>
              )}
            </button>

            {/* LinkedIn direct button */}
            <a
              href="https://www.linkedin.com/in/rishikesh-kalme-356043193/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono-tech px-3 py-1.5 border border-red-500/30 rounded text-red-300 bg-red-950/30 hover:bg-red-900/50 hover:text-white transition-all"
              title="View LinkedIn Profile"
              data-interactive="true"
              data-cursor-label="LINKEDIN"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>

            {/* Contact CTA */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center space-x-2 text-xs font-mono-tech px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.35)] cursor-pointer hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              data-interactive="true"
              data-cursor-label="CONTACT"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#07080a]/98 backdrop-blur-xl md:hidden pt-24 px-8 flex flex-col justify-between pb-12 animate-fadeIn">
          <nav className="flex flex-col space-y-6 text-xl font-mono-tech">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-neutral-300 hover:text-red-400 transition-colors flex items-center justify-between border-b border-white/[0.08] pb-4"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-5 h-5 text-neutral-600" />
              </a>
            ))}
          </nav>

          <div className="space-y-4 pt-6 border-t border-white/[0.08]">
            <a
              href="https://www.linkedin.com/in/rishikesh-kalme-356043193/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-red-950/40 border border-red-500/30 text-red-300 font-mono-tech text-sm flex items-center justify-center space-x-2"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN PROFILE</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 bg-red-600 text-white font-mono-tech text-sm font-semibold flex items-center justify-center space-x-2"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
