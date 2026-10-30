import React, { useMemo } from 'react';
import { CheckSquare, GitCommit, Activity } from 'lucide-react';
import { processBeats } from '../../data/capabilitiesData';

interface OneFrameProcessProps {
  progress: number;
}

export const OneFrameProcess: React.FC<OneFrameProcessProps> = ({ progress }) => {
  const activeBeatIdx = useMemo(() => {
    if (progress < 0.25) return -1;
    if (progress < 0.50) return 0;
    if (progress < 0.75) return 1;
    return 2;
  }, [progress]);

  const currentBeat = activeBeatIdx >= 0 ? processBeats[activeBeatIdx] : processBeats[0];

  // Route path progress (0 to 1) for the three beats
  const routeProgress = useMemo(() => {
    if (progress < 0.25) return 0;
    return Math.min(1, (progress - 0.25) / 0.75);
  }, [progress]);

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-6 sm:px-12 py-10 flex flex-col justify-between select-none">
      {/* Top Fixed Methodology Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5 z-20 w-full">
        <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400">
          <span className="text-red-500 font-bold">03</span>
          <span className="text-neutral-600">/</span>
          <span className="uppercase tracking-widest font-semibold text-neutral-200">
            Execution Methodology &middot; The Three Beats
          </span>
        </div>

        {/* Progress Step Indicators */}
        <div className="flex items-center space-x-2 font-mono-tech text-xs">
          {processBeats.map((b, idx) => (
            <div
              key={b.beatNumber}
              className={`px-3 py-1 border transition-all ${
                activeBeatIdx === idx
                  ? 'border-red-500 bg-red-600 text-white font-bold shadow-xs'
                  : 'border-white/[0.1] bg-white/[0.03] text-neutral-400'
              }`}
            >
              {b.beatNumber}
            </div>
          ))}
        </div>
      </div>

      {/* Layer 1: Title and Overview (data-in 0 to 0.25) */}
      <div
        data-in="0"
        data-out="0.25"
        className="scene__layer flex flex-col justify-center items-center px-4 text-center"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-mono-tech mb-6 font-semibold">
          <Activity className="w-3.5 h-3.5" />
          <span>PRODUCTION WORKFLOW</span>
        </div>

        <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] max-w-4xl">
          From idea to something that{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
            works.
          </span>
        </h3>

        <p className="text-lg sm:text-2xl text-neutral-300 font-light max-w-2xl leading-relaxed">
          We check every step for ourselves, and finish one experience at a time.
        </p>
      </div>

      {/* Layer 2: The Three Beats Stepped Cards + Visual Route (data-in 0.25 to 1.0) */}
      <div
        data-in="0.25"
        data-out="1.0"
        className="scene__layer flex flex-col justify-center items-center w-full px-4"
      >
        <div className="w-full max-w-4xl relative">
          {/* Animated SVG Route Signal Track with Reddish Accent */}
          <div className="w-full h-12 mb-4 px-6 relative flex items-center justify-between">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 60">
              {/* Background faint path */}
              <path
                d="M 50 30 C 250 10 350 50 450 30 C 550 10 650 50 750 30"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Active animated stroke path in red */}
              <path
                d="M 50 30 C 250 10 350 50 450 30 C 550 10 650 50 750 30"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="720"
                strokeDashoffset={720 - (720 * routeProgress)}
              />
              {/* Phase nodes */}
              <circle cx="50" cy="30" r="5" fill={routeProgress >= 0 ? '#ef4444' : '#334155'} />
              <circle cx="450" cy="30" r="5" fill={routeProgress >= 0.45 ? '#ef4444' : '#334155'} />
              <circle cx="750" cy="30" r="5" fill={routeProgress >= 0.9 ? '#ef4444' : '#334155'} />
            </svg>
          </div>

          <div className="relative p-8 sm:p-12 md:p-14 bg-[#0e090b]/90 border border-white/[0.12] backdrop-blur-xl shadow-2xl transition-all duration-300">
            {/* Corner Crosshairs */}
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            {/* Beat Meta Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 text-xs font-mono-tech text-neutral-400">
              <div className="flex items-center space-x-2">
                <GitCommit className="w-4 h-4 text-red-400" />
                <span className="text-white font-semibold">{currentBeat.kicker}</span>
              </div>
              <span className="text-red-400 font-bold">
                PHASE {activeBeatIdx >= 0 ? activeBeatIdx + 1 : 1} OF 3
              </span>
            </div>

            {/* Beat Title */}
            <h4 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {currentBeat.title}
            </h4>

            {/* Beat Body */}
            <p className="text-sm sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
              {currentBeat.description}
            </p>

            {/* Deliverables Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 pt-4 border-t border-white/[0.08]">
              {currentBeat.deliverables.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2.5 text-xs font-mono-tech text-neutral-300">
                  <CheckSquare className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Quote log */}
            <div className="p-3.5 bg-black/60 border border-white/[0.08] font-mono-tech text-xs text-neutral-400">
              <div className="text-red-400 font-semibold mb-1">&gt; ETHOS &amp; PRINCIPLE</div>
              <div className="text-neutral-300 italic">
                {currentBeat.quote}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-500 border-t border-white/[0.08] pt-4 z-20 w-full">
        <div>THE DETAILS MAKE THE EXPERIENCE</div>
        <div>CONTINUE SCROLLING FOR SYSTEMS ARCHITECTURE</div>
      </div>
    </div>
  );
};
