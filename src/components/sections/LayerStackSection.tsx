import React, { useState } from 'react';
import { Layers, Eye, Cpu, Monitor, Check } from 'lucide-react';

interface StackLayer {
  id: string;
  level: string;
  name: string;
  subtitle: string;
  accent: string;
  items: string[];
  specs: string;
  icon: React.ReactNode;
}

const stackLayers: StackLayer[] = [
  {
    id: 'layer-inputs',
    level: 'LAYER 01',
    name: 'Sensory Inputs & Physical Capture',
    subtitle: 'Beyond standard keyboard & mouse interaction',
    accent: '#38bdf8',
    items: [
      'RGB-D Depth & 4K Selfie Cameras',
      'Industrial 2D Barcode & QR Scanners',
      'Multi-touch 10-point capacitive surfaces',
      'USB Arcade Buttons & Piezo Drum Triggers',
      'Presence & Motion Proximity Sensors'
    ],
    specs: 'Input sampling: 60Hz - 1000Hz polling rate',
    icon: <Eye className="w-5 h-5 text-sky-400" />
  },
  {
    id: 'layer-ai',
    level: 'LAYER 02',
    name: 'AI Model Inference & Orchestration',
    subtitle: 'High-speed deterministic & generative pipelines',
    accent: '#3b82f6',
    items: [
      'GPU Latent Face-Swap Clusters (sub-30s)',
      'Ewha DCTI Psychometric Decision Engine',
      'Guardrailed Conversational LLM Agents',
      'Stable Diffusion Latent Inpainting',
      'Realtime 68-point Facial Mesh Tracking'
    ],
    specs: 'Target latency: < 28s for 4K video synthesis',
    icon: <Cpu className="w-5 h-5 text-blue-400" />
  },
  {
    id: 'layer-output',
    level: 'LAYER 03',
    name: 'Spatial Kiosks & Hardware Delivery',
    subtitle: 'Zero-downtime, fault-tolerant venue deployment',
    accent: '#6366f1',
    items: [
      'Standalone Windows / macOS Kiosk Packages',
      'Offline SQLite Datastores (Zero Wi-Fi reliance)',
      'ESC/POS Thermal Receipt Raster Printing',
      'Server-Sent Events (SSE) Live Staff Telemetry',
      'Self-healing GPU Watchdog Processes'
    ],
    specs: 'Availability: 99.98% unattended exhibition uptime',
    icon: <Monitor className="w-5 h-5 text-indigo-400" />
  }
];

export const LayerStackSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('layer-ai');

  return (
    <section id="stack" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Category Header */}
      <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400 mb-8">
        <span className="text-blue-500 font-bold">04</span>
        <span className="text-neutral-600">/</span>
        <span className="uppercase tracking-widest">Systems Architecture</span>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Layers &amp; Capabilities
          </h2>
          <p className="text-base sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            Data, models, and interface designed as one loop. When every layer of the product
            is built by the same hands, latency shrinks, decisions accelerate, and on-site failure modes vanish.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono-tech text-neutral-400 p-3 bg-white/[0.02] border border-white/[0.08]">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>3 INTEGRATED TIERS &middot; CLICK LAYER TO INSPECT</span>
        </div>
      </div>

      {/* Interactive 3D / Isometric Layer Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Layer Selector Stack (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {stackLayers.map((layer) => {
            const isSelected = activeLayer === layer.id;
            return (
              <div
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`p-6 sm:p-8 border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-[#0e121a]/95 shadow-[0_0_25px_rgba(59,130,246,0.2)]'
                    : 'border-white/[0.08] bg-[#090b10]/80 hover:border-white/20'
                }`}
                data-interactive="true"
                data-cursor-label="INSPECT"
              >
                {/* Active Indicator Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${
                    isSelected ? 'bg-blue-500' : 'bg-transparent'
                  }`}
                />

                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-white/[0.04] border border-white/[0.08]">
                      {layer.icon}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono-tech text-neutral-400 uppercase tracking-wider">
                        {layer.level}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {layer.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono-tech px-2.5 py-1 border transition-colors ${
                      isSelected
                        ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                        : 'border-white/[0.08] text-neutral-500'
                    }`}
                  >
                    {isSelected ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>

                <p className="text-sm text-neutral-400 font-light mb-4">
                  {layer.subtitle}
                </p>

                {/* Sub-item pills */}
                <div className="flex flex-wrap gap-2">
                  {layer.items.slice(0, 3).map((item, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono-tech px-2.5 py-1 bg-white/[0.02] border border-white/[0.06] text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                  {layer.items.length > 3 && (
                    <span className="text-xs font-mono-tech px-2 py-1 text-neutral-500">
                      +{layer.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Inspector Panel (Right 5 cols) */}
        <div className="lg:col-span-5 bg-[#0b0d13]/90 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md">
          {(() => {
            const current = stackLayers.find((l) => l.id === activeLayer) || stackLayers[0];
            return (
              <>
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 text-xs font-mono-tech text-neutral-500">
                    <span>SPECIFICATION INSPECTOR</span>
                    <span className="text-blue-400 font-bold">{current.level}</span>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-white/[0.04] border border-white/[0.08]">
                      {current.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{current.name}</h4>
                      <p className="text-xs font-mono-tech text-blue-400">{current.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-xs font-mono-tech text-blue-300 mb-6">
                    {current.specs}
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono-tech uppercase text-neutral-400 tracking-wider">
                      Engineered Capabilities:
                    </div>
                    {current.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2.5 text-sm text-neutral-300 p-2.5 bg-white/[0.02] border border-white/[0.04]"
                      >
                        <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.08] mt-8 text-xs font-mono-tech text-neutral-500 flex justify-between items-center">
                  <span>SUBSYSTEM LINK: VERIFIED</span>
                  <span className="text-emerald-400 font-semibold">100% PASS</span>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

