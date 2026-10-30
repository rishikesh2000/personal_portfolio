import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollTelemetryHUDProps {
  onNavigateNext?: () => void;
}

export const ScrollTelemetryHUD: React.FC<ScrollTelemetryHUDProps> = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeChapterName, setActiveChapterName] = useState('00 INTRO');

  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const chapters = [
      { id: 'welcome', label: '00 INTRO' },
      { id: 'about', label: '01 ABOUT' },
      { id: 'work', label: '02 WORK' },
      { id: 'process', label: '03 PROCESS' },
      { id: 'studio', label: '04 STACK' },
      { id: 'contact', label: '05 CONTACT' }
    ];

    const handleScroll = () => {
      const now = performance.now();
      const curY = window.scrollY;
      const dt = Math.max(1, now - lastTime.current);
      const dy = curY - lastScrollY.current;

      lastScrollY.current = curY;
      lastTime.current = now;

      // Compute velocity in px/s
      const vel = Math.round((Math.abs(dy) / dt) * 1000);
      setVelocity(vel);
      setIsScrolling(true);

      // Global scroll progress
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalH > 0 ? Math.min(100, Math.max(0, Math.round((curY / totalH) * 100))) : 0;
      setScrollProgress(pct);

      // Identify active chapter
      const viewMiddle = curY + window.innerHeight * 0.45;
      for (const ch of chapters) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.offsetTop;
          const h = el.offsetHeight;
          if (viewMiddle >= top && viewMiddle < top + h) {
            setActiveChapterName(ch.label);
            break;
          }
        }
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        setVelocity(0);
      }, 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <aside 
      aria-label="Scroll Telemetry and Navigation Status"
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center space-x-3 select-none pointer-events-auto"
    >
      {/* Telemetry Capsule with Red Accent */}
      <div
        className={`flex items-center space-x-3.5 px-4 py-2.5 bg-[#0e090b]/90 border transition-all duration-300 backdrop-blur-md shadow-2xl ${
          isScrolling
            ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)] translate-y-0 scale-102'
            : 'border-white/[0.1] hover:border-red-500/40 scale-100'
        }`}
      >
        {/* Dynamic Circular Dial */}
        <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2.5"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeDasharray={88}
              strokeDashoffset={88 - (88 * scrollProgress) / 100}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
          </svg>
          <span className="absolute text-[8px] font-mono-tech text-white font-bold">
            {scrollProgress}
          </span>
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left font-mono-tech leading-tight">
          <div className="flex items-center space-x-2 text-[10px]">
            <span className="text-neutral-400">LOC:</span>
            <span className="text-white font-semibold">{activeChapterName}</span>
          </div>
          <div className="flex items-center space-x-2 text-[9px] text-neutral-400 mt-0.5">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isScrolling ? 'bg-red-400 animate-ping' : 'bg-neutral-600'
              }`}
            />
            <span>{isScrolling ? `VEL: ${velocity} PX/S` : 'IDLE / SCROLLING'}</span>
          </div>
        </div>

        {/* Visual Mouse Wheel Glyphs */}
        <div
          className={`flex items-center justify-center w-6 h-6 rounded-xs border transition-all ${
            isScrolling
              ? 'bg-red-600/20 border-red-400 text-red-400 animate-pulse'
              : 'bg-white/[0.04] border-white/[0.08] text-neutral-500'
          }`}
        >
          <ArrowDown className={`w-3.5 h-3.5 transition-transform ${isScrolling ? 'translate-y-0.5' : ''}`} />
        </div>
      </div>
    </aside>
  );
};
