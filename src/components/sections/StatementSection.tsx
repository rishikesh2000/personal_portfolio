import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

export const StatementSection: React.FC = () => {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const keywords = [
    { word: 'AI Pipelines', detail: 'Cloud GPU clusters + local RTX on-premise execution' },
    { word: 'Spatial Interfaces', detail: 'Touch kiosks, large scale projection, sensory cameras' },
    { word: 'Hardware I/O', detail: 'Thermal receipt printers, barcode optics, arcade triggers' },
    { word: 'One Loop', detail: 'Design, UX, backend, and hardware tested in the studio before site arrival' }
  ];

  return (
    <section id="statement" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Editorial Category Header */}
      <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400 mb-8">
        <span className="text-blue-500 font-bold">02</span>
        <span className="text-neutral-600">/</span>
        <span className="uppercase tracking-widest">Studio Manifesto</span>
      </div>

      {/* Technical HUD Framed Box with 4 corner crosshairs */}
      <div className="relative p-8 sm:p-14 md:p-20 bg-[#0d0f14]/80 border border-white/[0.08] backdrop-blur-md">
        {/* Corner HUD handles */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        {/* Readout telemetry header inside frame */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500 pb-6 mb-8 border-b border-white/[0.06]">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-neutral-300">CORE ETHOS // SPECIFICATION v2.6</span>
          </div>
          <div>
            COORDINATES: 37°34&apos;08.2&quot;N 126°58&apos;36.4&quot;E
          </div>
        </div>

        {/* Manifesto headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.12]">
          From idea to something that{' '}
          <span className="underline decoration-blue-500 decoration-2 underline-offset-8">
            actually runs.
          </span>
        </h2>

        {/* Core body text */}
        <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light leading-relaxed mb-12 max-w-4xl">
          Not with words or keynote slides, but with functional code. We hear the theme, the space,
          and the audience, and propose the flow of the experience first.
          The same multidisciplinary team then carries it through design, GPU model orchestration,
          and hardware stress-testing.
        </p>

        {/* Interactive Keywords Bar */}
        <div className="pt-8 border-t border-white/[0.06]">
          <div className="text-xs font-mono-tech text-neutral-500 uppercase tracking-wider mb-4">
            Interactive Capabilities &middot; Hover to inspect:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keywords.map((k) => (
              <div
                key={k.word}
                onMouseEnter={() => setHoveredWord(k.word)}
                onMouseLeave={() => setHoveredWord(null)}
                className={`p-4 border transition-all duration-200 cursor-pointer ${
                  hoveredWord === k.word
                    ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20'
                }`}
                data-interactive="true"
                data-cursor-label="INFO"
              >
                <div className="font-mono-tech text-sm font-semibold text-white mb-1.5 flex items-center justify-between">
                  <span>{k.word}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${hoveredWord === k.word ? 'bg-blue-400 animate-ping' : 'bg-neutral-600'}`} />
                </div>
                <div className="text-xs text-neutral-400 font-light leading-relaxed">
                  {k.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

