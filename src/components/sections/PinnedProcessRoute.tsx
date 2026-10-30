import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckSquare, GitCommit } from 'lucide-react';
import { processBeats } from '../../data/capabilitiesData';

gsap.registerPlugin(ScrollTrigger);

export const PinnedProcessRoute: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState<number>(0);
  const [routeProgress, setRouteProgress] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=1800',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setRouteProgress(self.progress);
          const beatIdx = Math.min(
            processBeats.length - 1,
            Math.floor(self.progress * processBeats.length)
          );
          setActiveBeat(beatIdx);
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const currentBeat = processBeats[activeBeat];

  return (
    <div
      ref={containerRef}
      id="process"
      className="relative w-full bg-[#f4f5f8] text-[#0f172a] overflow-hidden border-t border-neutral-300"
    >
      <div className="h-screen w-full flex flex-col justify-between px-6 sm:px-12 py-10 max-w-7xl mx-auto select-none">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300 pb-5">
          <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-600">
            <span className="text-blue-600 font-bold">06</span>
            <span className="text-neutral-400">/</span>
            <span className="uppercase tracking-widest font-semibold">
              Execution Methodology &middot; The Three Beats
            </span>
          </div>

          <div className="flex items-center space-x-2 font-mono-tech text-xs">
            {processBeats.map((b, idx) => (
              <div
                key={b.beatNumber}
                className={`px-3 py-1 border transition-all ${
                  activeBeat === idx
                    ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                    : 'border-neutral-300 bg-white text-neutral-500'
                }`}
              >
                BEAT {b.beatNumber}
              </div>
            ))}
          </div>
        </div>

        {/* Center Process Stage */}
        <div className="my-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Vertical Timeline SVG Track */}
            <div className="lg:col-span-4 flex items-center space-x-6">
              {/* Dynamic SVG vertical line */}
              <div className="relative w-8 h-80 flex flex-col items-center justify-between">
                {/* Background track line */}
                <div className="absolute top-4 bottom-4 w-0.5 bg-neutral-300" />
                {/* Active animated fill line */}
                <div
                  className="absolute top-4 w-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] transition-all duration-75"
                  style={{ height: `${Math.min(100, Math.max(5, routeProgress * 100))}%` }}
                />

                {/* 3 Step Nodes */}
                {processBeats.map((b, i) => {
                  const isReached = routeProgress >= i / (processBeats.length - 1) * 0.8;
                  const isCurrent = activeBeat === i;
                  return (
                    <div
                      key={b.beatNumber}
                      className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono-tech text-xs font-bold transition-all duration-300 ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-600 text-white scale-125 shadow-md'
                          : isReached
                          ? 'border-blue-600 bg-white text-blue-600'
                          : 'border-neutral-300 bg-white text-neutral-400'
                      }`}
                    >
                      {b.beatNumber}
                    </div>
                  );
                })}
              </div>

              {/* Waypoint Meta */}
              <div className="space-y-6">
                {processBeats.map((b, i) => (
                  <div
                    key={b.beatNumber}
                    className={`transition-all duration-300 ${
                      activeBeat === i ? 'opacity-100 translate-x-2' : 'opacity-40'
                    }`}
                  >
                    <div className="text-[11px] font-mono-tech text-neutral-500 uppercase">
                      PHASE 0{i + 1}
                    </div>
                    <div className="text-base font-bold text-[#0f172a]">
                      {b.kicker}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Active Beat Detail Card */}
            <div className="lg:col-span-8 bg-white border border-neutral-300 shadow-xl p-8 sm:p-12 relative">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-6">
                <span className="text-sm font-mono-tech text-blue-600 font-bold">
                  MILESTONE 0{activeBeat + 1} // {currentBeat.kicker}
                </span>
                <div className="flex items-center space-x-1.5 text-xs font-mono-tech text-neutral-500">
                  <GitCommit className="w-4 h-4 text-blue-600" />
                  <span>STEP VERIFIED</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold text-[#0f172a] mb-4">
                {currentBeat.title}
              </h3>

              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-6">
                {currentBeat.description}
              </p>

              <div className="p-4 bg-neutral-50 border-l-4 border-blue-600 text-sm text-neutral-700 italic mb-8">
                {currentBeat.quote}
              </div>

              <div className="bg-neutral-50 p-6 border border-neutral-200">
                <div className="text-xs font-mono-tech uppercase text-neutral-600 tracking-wider mb-3 flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">Engineered Deliverables:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentBeat.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2.5 text-xs font-mono-tech text-neutral-700"
                    >
                      <span className="text-blue-600 font-bold">&gt;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pinned Footer */}
        <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-500 border-t border-neutral-300 pt-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>PINNED TIMELINE: SCROLL SCRUBS THROUGH THE THREE BEATS</span>
          </div>
          <div>SCROLL DOWN TO ADVANCE TIMELINE</div>
        </div>
      </div>
    </div>
  );
};
