import React from 'react';
import { processBeats } from '../../data/capabilitiesData';
import { GitCommit, CheckSquare } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Category Header */}
      <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400 mb-8">
        <span className="text-blue-500 font-bold">06</span>
        <span className="text-neutral-600">/</span>
        <span className="uppercase tracking-widest">Execution Methodology</span>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          How a project runs, in three beats.
        </h2>
        <p className="text-base sm:text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">
          No redundant handoffs between disconnected design agencies and offshore developers.
          From day one, the vision and code evolve together.
        </p>
      </div>

      {/* Stepped Process Timeline */}
      <div className="space-y-8 relative">
        {processBeats.map((beat, idx) => (
          <div
            key={beat.beatNumber}
            className="p-8 sm:p-12 bg-[#090c12]/90 border border-white/[0.08] backdrop-blur-md relative overflow-hidden"
          >
            {/* Top numbering and kicker */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold font-mono-tech text-blue-500">
                  BEAT {beat.beatNumber}
                </span>
                <span className="text-neutral-600">/</span>
                <span className="text-xs font-mono-tech tracking-widest uppercase text-neutral-400">
                  {beat.kicker}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono-tech text-neutral-500">
                <GitCommit className="w-4 h-4 text-blue-400" />
                <span>MILESTONE 0{idx + 1}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Description & Quote */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {beat.title}
                </h3>

                <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                  {beat.description}
                </p>

                <div className="p-4 bg-white/[0.02] border-l-2 border-blue-500 text-sm text-neutral-400 italic">
                  {beat.quote}
                </div>
              </div>

              {/* Right Column: Deliverables Checklist */}
              <div className="lg:col-span-5 bg-[#06080c] p-6 border border-white/[0.06]">
                <div className="text-xs font-mono-tech uppercase text-neutral-400 tracking-wider mb-4 flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-blue-400" />
                  <span>Phase Deliverables:</span>
                </div>

                <div className="space-y-2.5">
                  {beat.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-300 py-1.5 border-b border-white/[0.04] last:border-0"
                    >
                      <span className="text-blue-500 font-bold">&gt;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

