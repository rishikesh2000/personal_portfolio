import React from 'react';
import { ArrowDown, ArrowUpRight, Briefcase } from 'lucide-react';
import { InteractiveHeroPortrait } from '../ui/InteractiveHeroPortrait';

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 0 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5V10.13H5.07V18.5h2.79Z"/>
  </svg>
);

interface OneFrameHeroProps {
  onOpenContact: () => void;
  onExploreWorks: () => void;
}

export const OneFrameHero: React.FC<OneFrameHeroProps> = ({
  onOpenContact,
  onExploreWorks
}) => {
  return (
    <div className="scene__layer hero flex flex-col justify-between pt-24 sm:pt-28 pb-4 sm:pb-6 px-6 sm:px-10 md:px-14 max-w-7xl mx-auto w-full h-full select-none">
      {/* Main Dual-Column Hero Grid: Left Content + Right Interactive Portrait */}
      <div className="my-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Typography, Credentials & Action CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Status & Availability Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-[10px] sm:text-xs font-mono-tech text-red-300 backdrop-blur-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-white font-medium">MERN STACK DEVELOPER</span>
              <span className="text-neutral-500">/</span>
              <span>INDORE 452001 (UTC+5:30)</span>
            </div>

            <div className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-[10px] sm:text-[11px] font-mono-tech">
              <Briefcase className="w-3 h-3 text-red-400" />
              <span>INSTACONNECTS &middot; JEC '23</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-2 sm:mb-3">
            Rishikesh{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
              Kalme.
            </span>
          </h1>

          <div className="text-xs sm:text-base md:text-lg font-mono-tech text-red-400 mb-2 sm:mb-3 font-medium">
            React.js &middot; Node.js &middot; Express.js &middot; JavaScript
          </div>

          <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mb-5 sm:mb-6">
            Full-Stack Developer at <span className="text-white font-medium">InstaConnects</span> (ex-<span className="text-white font-medium">Officiel CRM</span>).
            A <span className="text-white font-medium">Jabalpur Engineering College (JEC ’23)</span> graduate who builds full-stack applications using React.js, Node.js, Express.js, and databases.
          </p>

          {/* Dual Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={onExploreWorks}
              className="group px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-500 text-white font-medium text-xs sm:text-sm rounded-none border border-red-400/40 shadow-lg shadow-red-600/25 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <span>View Experience &amp; Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="https://www.linkedin.com/in/rishikesh-kalme-356043193/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-2.5 sm:py-3 bg-red-950/40 hover:bg-red-900/60 text-red-300 font-medium text-xs sm:text-sm rounded-none border border-red-500/30 transition-all duration-300 flex items-center space-x-2"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-red-400" />
              <span>LinkedIn Profile</span>
            </a>

            <button
              onClick={onOpenContact}
              className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs sm:text-sm rounded-none border border-white/[0.15] backdrop-blur-md transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Moving Interactive Portrait Card */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <InteractiveHeroPortrait />
        </div>
      </div>

      {/* Bottom Telemetry & Scroll Hint */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono-tech text-neutral-500 border-t border-white/[0.06] pt-2 sm:pt-3 w-full shrink-0">
        <div className="flex items-center space-x-2">
          <span className="text-red-500 font-bold">00</span>
          <span>/</span>
          <span className="uppercase tracking-widest text-neutral-400">Rishikesh Kalme &middot; Full-Stack Portfolio</span>
        </div>
        <div className="flex items-center space-x-2 text-red-400 animate-bounce">
          <span>SCROLL TO ADVANCE</span>
          <ArrowDown className="w-3.5 h-3.5 text-red-500" />
        </div>
      </div>
    </div>
  );
};
