import React from 'react';
import { ArrowUp, ArrowUpRight, Award } from 'lucide-react';

interface FooterSectionProps {
  onOpenContact: () => void;
  onScrollToTop: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContact,
  onScrollToTop
}) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] text-white pt-20 pb-12 px-6 sm:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Call-to-Action Block */}
        <div className="p-8 sm:p-14 bg-gradient-to-br from-[#0c1017] to-[#07090e] border border-white/[0.08] flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono-tech text-blue-400 uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Next Generation Spatial Experiences</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
              Your next project, together.
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl font-light">
              Propose your theme, physical venue, or campaign goal. We build interactive software,
              custom AI pipelines, and sensory hardware within one dedicated team.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-mono-tech text-sm font-semibold tracking-wider transition-all duration-200 flex items-center space-x-3 shadow-[0_0_25px_rgba(37,99,235,0.4)] cursor-pointer hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] shrink-0"
            data-interactive="true"
            data-cursor-label="START"
          >
            <span>SHALL WE MAKE SOMETHING?</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Information Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-xs font-mono-tech">
          {/* Col 1: Wordmark & Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-bold text-xs">
                P
              </div>
              <span className="font-bold tracking-widest text-sm text-white">
                PUTURE
              </span>
            </div>
            <p className="text-neutral-400 font-light leading-relaxed max-w-sm">
              Interactive tech studio building experiences with AI. Plans, designs, and engineers
              exhibitions, pop-up stores, and permanent spatial hardware installations.
            </p>
            <div className="text-neutral-500 pt-2">
              WSIS Prize 2026 Champion &middot; Geneva, Switzerland
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-neutral-500 uppercase tracking-wider mb-2">SECTIONS</div>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#hero" className="hover:text-white transition-colors">01. Hero &amp; Introduction</a></li>
              <li><a href="#statement" className="hover:text-white transition-colors">02. Studio Manifesto</a></li>
              <li><a href="#works" className="hover:text-white transition-colors">03. Selected Work (Reel)</a></li>
              <li><a href="#stack" className="hover:text-white transition-colors">04. Systems Architecture</a></li>
              <li><a href="#labs" className="hover:text-white transition-colors">05. Creative Engineering Labs</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">06. Execution Process</a></li>
              <li><a href="#studio" className="hover:text-white transition-colors">07. Studio &amp; FAQ</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Coordinates & Contact */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-neutral-500 uppercase tracking-wider mb-2">COMMUNICATIONS</div>
            <div className="text-neutral-300">
              GENERAL INQUIRIES: <br />
              <a href="mailto:contact@puture.co.kr" className="text-blue-400 hover:underline">
                contact@puture.co.kr
              </a>
            </div>
            <div className="text-neutral-400 pt-2">
              LOCATION: <br />
              Seoul Special Metropolitan City, Republic of Korea
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500">
          <div>
            &copy; 2026 PUTURE. ALL RIGHTS RESERVED. PRODUCTION QUALITY RELEASE.
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            data-interactive="true"
            data-cursor-label="TOP"
          >
            <span>BACK TO TOP</span>
            <div className="p-1.5 border border-white/10 group-hover:border-white/30 rounded-full transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

