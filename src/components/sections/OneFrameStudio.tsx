import React, { useState, useEffect } from 'react';
import { Layers, Clock, MapPin } from 'lucide-react';
import { capabilitiesData } from '../../data/capabilitiesData';

export interface StudioLayerItem {
  level: string;
  name: string;
  role: string;
  tags: string[];
}

export const studioLayers: StudioLayerItem[] = [
  {
    level: '03',
    name: 'Frontend Tier',
    role: 'React.js & Client Architecture',
    tags: ['React.js', 'JavaScript', 'HTML5 / CSS3 / Bootstrap']
  },
  {
    level: '02',
    name: 'Backend Tier',
    role: 'Node.js & Server-Side APIs',
    tags: ['Node.js', 'Express.js', 'JavaScript']
  },
  {
    level: '01',
    name: 'Data & Storage Tier',
    role: 'PostgreSQL & MongoDB',
    tags: ['SQL', 'PostgreSQL', 'MongoDB']
  }
];

export const OneFrameStudio: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [indoreTime, setIndoreTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setIndoreTime(now.toLocaleTimeString('en-GB', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-6 sm:px-12 py-10 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5 z-20 w-full">
        <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400">
          <span className="text-red-500 font-bold">04</span>
          <span className="text-neutral-600">/</span>
          <span className="uppercase tracking-widest font-semibold text-neutral-200">
            Technical Stack &middot; Systems Architecture
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono-tech text-neutral-400">
          <div className="flex items-center space-x-1.5 text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>INDORE, INDIA</span>
          </div>
          <div className="flex items-center space-x-1.5 text-neutral-300">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            <span>IST: {indoreTime || '18:15:00'} (UTC+5:30)</span>
          </div>
        </div>
      </div>

      {/* Layer 1: Title (data-in 0 to 0.28) */}
      <div
        data-in="0"
        data-out="0.28"
        className="scene__layer flex flex-col justify-center items-center px-4 text-center"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono-tech mb-6 font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>FULL-STACK DEVELOPMENT MATRIX</span>
        </div>

        <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] max-w-4xl">
          Complete stack.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
            End to end.
          </span>
        </h3>

        <p className="text-lg sm:text-2xl text-neutral-300 font-light max-w-2xl leading-relaxed">
          From responsive React.js interfaces down to high-performance Node.js APIs and optimized database schemas.
        </p>
      </div>

      {/* Layer 2: 3D Isometric Stack & Capabilities (data-in 0.28 to 1.0) */}
      <div
        data-in="0.28"
        data-out="1.0"
        className="scene__layer flex flex-col justify-center items-center w-full px-4"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl">
          {/* Left: 3D Isometric Perspective Stack with Reddish Accent */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="text-xs font-mono-tech text-red-400 uppercase tracking-wider mb-6">
              Interactive 3-Tier Full-Stack Architecture
            </div>

            <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 perspective-[1000px] flex items-center justify-center">
              {studioLayers.map((layer: StudioLayerItem, idx: number) => {
                const isSelected = activeLayer === idx;
                const offset = (studioLayers.length - 1 - idx) * 44;

                return (
                  <div
                    key={layer.level}
                    onClick={() => setActiveLayer(idx)}
                    style={{
                      transform: `rotateX(60deg) rotateZ(-40deg) translateZ(${offset}px)`,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className={`absolute w-48 h-48 sm:w-56 sm:h-56 border p-4 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-red-400 bg-red-950/80 shadow-2xl shadow-red-500/30'
                        : 'border-white/[0.15] bg-[#12080b]/60 hover:border-red-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 mb-2">
                      <span className="text-red-400 font-bold">{layer.level}</span>
                      <span className="uppercase">{layer.name}</span>
                    </div>

                    <div className="text-sm font-bold text-white mb-2">
                      {layer.role}
                    </div>

                    <div className="space-y-1">
                      {layer.tags.slice(0, 2).map((t: string) => (
                        <div key={t} className="text-[10px] font-mono-tech text-neutral-400">
                          &bull; {t}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] font-mono-tech text-neutral-400 text-center mt-2">
              CLICK A TIER TO INSPECT SYSTEM LAYER
            </div>
          </div>

          {/* Right: 6 Capabilities Rows */}
          <div className="lg:col-span-7 bg-[#0e090b]/90 border border-white/[0.1] p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
              <span className="text-xs font-mono-tech text-red-400 font-bold">CORE DOMAINS</span>
              <span className="text-xs font-mono-tech text-neutral-400">RISHIKESH KALME</span>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {capabilitiesData.map((cap) => (
                <div key={cap.id} className="py-3 flex items-start space-x-3.5">
                  <span className="text-xs font-mono-tech text-red-400 font-bold mt-0.5">
                    &bull;
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white mb-1">
                      {cap.title}
                    </h5>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-500 border-t border-white/[0.08] pt-4 z-20 w-full">
        <div>PRODUCTION WEB APPLICATIONS // HARDWORK &amp; HONESTY</div>
        <div>CONNECT WITH RISHIKESH</div>
      </div>
    </div>
  );
};
