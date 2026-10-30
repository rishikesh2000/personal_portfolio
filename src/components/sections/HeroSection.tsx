import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Sparkles, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenContact: () => void;
  onExploreWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onExploreWorks
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    const ctx = gsap.context(() => {
      // Smooth parallax & depth scale on scroll
      gsap.to(content, {
        opacity: 0,
        y: -60,
        scale: 0.96,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true
        }
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top telemetry HUD strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-neutral-400 border-b border-white/[0.08] pb-4">
        <div className="flex items-center space-x-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-white font-medium">STUDIO STATUS: OPERATIONAL</span>
          <span className="text-neutral-600">/</span>
          <span className="hidden sm:inline text-neutral-400">SEOUL HQ (UTC+9)</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-blue-400 bg-blue-500/10 px-2.5 py-1 border border-blue-500/20">
            <Award className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">WSIS PRIZE 2026 CHAMPION</span>
          </div>
          <div className="hidden lg:block text-neutral-500">
            FRAME RATE: 60.0 FPS
          </div>
        </div>
      </div>

      {/* Main architectural typography with ScrollTrigger Parallax */}
      <div ref={contentRef} className="my-auto py-12 max-w-5xl will-change-transform">
        <div className="inline-flex items-center space-x-2 text-xs font-mono-tech text-blue-400 uppercase tracking-widest mb-6 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Interactive Creative Engineering</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.04] mb-8">
          Interactive AI <br className="hidden sm:block" />
          experiences for brands,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
            pop-ups &amp; exhibitions.
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed mb-10">
          PUTURE plans, designs, and engineers them. UX architecture, spatial hardware,
          real-time graphics, and production AI pipelines—all crafted within one cohesive loop.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreWorks}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-mono-tech text-xs tracking-wider font-semibold transition-all duration-200 flex items-center space-x-2 shadow-[0_0_25px_rgba(37,99,235,0.4)] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
            data-interactive="true"
            data-cursor-label="EXPLORE"
          >
            <span>SELECTED WORK (REEL)</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 font-mono-tech text-xs tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer"
            data-interactive="true"
            data-cursor-label="CONTACT"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Bottom info footer & scroll down indicator */}
      <div className="flex flex-wrap items-end justify-between gap-6 pt-6 border-t border-white/[0.08] text-xs font-mono-tech text-neutral-400">
        <div className="space-y-1">
          <div className="text-neutral-500 uppercase">Core Methodology</div>
          <div className="text-neutral-300">ONE TEAM &middot; PROTOTYPES ON DAY ONE &middot; ZERO-FAIL HARDWARE</div>
        </div>

        <div
          onClick={onExploreWorks}
          className="flex items-center space-x-2 text-neutral-400 hover:text-white cursor-pointer transition-colors"
          data-interactive="true"
          data-cursor-label="SCROLL"
        >
          <span>SCROLL TO DISCOVER</span>
          <div className="w-4 h-7 border border-neutral-600 rounded-full flex justify-center p-1">
            <div className="w-1 h-1.5 bg-blue-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
