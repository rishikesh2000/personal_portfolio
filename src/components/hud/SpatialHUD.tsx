import React, { useRef } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Compass, FlaskConical, Award } from 'lucide-react';
import { CHAPTER_WAYPOINTS } from '../../hooks/useCameraTrack';
import type { ChapterWaypoint } from '../../hooks/useCameraTrack';

interface SpatialHUDProps {
  progress: number;
  activeChapter: ChapterWaypoint;
  isMuted: boolean;
  onToggleSound: () => void;
  onFlyToChapter: (chapterId: string) => void;
  onFlyToProgress: (p: number) => void;
  onOpenContact: () => void;
  onOpenLabs: () => void;
}

export const SpatialHUD: React.FC<SpatialHUDProps> = ({
  progress,
  activeChapter,
  isMuted,
  onToggleSound,
  onFlyToChapter,
  onFlyToProgress,
  onOpenContact,
  onOpenLabs
}) => {
  const scrubBarRef = useRef<HTMLDivElement>(null);

  const handleScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubBarRef.current) return;
    const rect = scrubBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    onFlyToProgress(newProgress);
  };

  const camZ = 5.5 + progress * (-91.5);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="flex items-center justify-between border-b border-white/10 pb-4 backdrop-blur-xs">
        {/* Brand Logo & Telemetry */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          <button
            onClick={() => onFlyToChapter('hero')}
            className="flex items-center space-x-3 group cursor-pointer"
            data-interactive="true"
            data-cursor-label="HERO"
          >
            <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center font-mono-tech text-sm transition-transform group-hover:scale-105 group-hover:bg-blue-500 group-hover:text-white">
              R
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold tracking-widest text-sm text-white font-mono-tech">
                RISHI
              </span>
              <span className="text-[9px] font-mono-tech text-blue-400 tracking-wider">
                CREATIVE TECH &amp; 3D AI
              </span>
            </div>
          </button>

          {/* Telemetry Pill */}
          <div className="hidden xl:flex items-center space-x-2 text-[11px] font-mono-tech text-neutral-400 px-2.5 py-1 bg-white/[0.03] border border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>3D CAMERA RIG: Z {camZ.toFixed(1)}m</span>
            <span className="text-neutral-600">/</span>
            <span className="text-white">60 FPS</span>
          </div>
        </div>

        {/* Center Chapter Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-5 text-xs font-mono-tech pointer-events-auto">
          {CHAPTER_WAYPOINTS.map((ch) => {
            const isActive = activeChapter.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onFlyToChapter(ch.id)}
                className={`py-1 transition-all cursor-pointer flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-blue-400 font-bold border-b border-blue-400'
                    : 'text-neutral-400 hover:text-white'
                }`}
                data-interactive="true"
                data-cursor-label="FLY"
              >
                <span className="text-[10px] text-neutral-600">{ch.number}</span>
                <span>{ch.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utilities: Audio + Labs + Contact CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4 pointer-events-auto">
          {/* Labs Launcher */}
          <button
            onClick={onOpenLabs}
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono-tech px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/10 transition-colors cursor-pointer"
            data-interactive="true"
            data-cursor-label="LABS"
          >
            <FlaskConical className="w-3.5 h-3.5 text-blue-400" />
            <span>LABS</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute spatial audio' : 'Mute audio'}
            data-interactive="true"
            data-cursor-label="AUDIO"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-500" />
            ) : (
              <div className="flex items-center space-x-1 text-blue-400">
                <Volume2 className="w-4 h-4" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              </div>
            )}
          </button>

          {/* Contact CTA */}
          <button
            onClick={onOpenContact}
            className="text-xs font-mono-tech px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center space-x-1.5 cursor-pointer"
            data-interactive="true"
            data-cursor-label="CONTACT"
          >
            <span>TRANSMIT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. MIDDLE VIEWPORT HUD: Left Telemetry & Right Chapter Dots */}
      <div className="my-auto flex justify-between items-center w-full">
        {/* Left Telemetry Column */}
        <div className="hidden md:flex flex-col space-y-3 pointer-events-auto">
          <div className="p-3 bg-[#0a0d14]/80 border border-white/[0.08] backdrop-blur-md text-xs font-mono-tech space-y-1 max-w-[210px]">
            <div className="text-[10px] text-neutral-500 flex items-center justify-between">
              <span>TRACK TELEMETRY</span>
              <Compass className="w-3 h-3 text-blue-400" />
            </div>
            <div className="text-white font-bold flex justify-between">
              <span className="text-neutral-400">CAMERA_Z:</span>
              <span className="text-blue-400">{camZ.toFixed(1)}m</span>
            </div>
            <div className="text-neutral-300 flex justify-between">
              <span className="text-neutral-500">TRAVEL:</span>
              <span>{(progress * 100).toFixed(0)}%</span>
            </div>
            <div className="text-neutral-300 flex justify-between">
              <span className="text-neutral-500">SECTION:</span>
              <span className="text-emerald-400 font-bold">{activeChapter.name}</span>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 text-[10px] font-mono-tech text-neutral-400 p-2 bg-[#0a0d14]/80 border border-white/[0.08]">
            <Award className="w-3 h-3 text-blue-400" />
            <span>WSIS PRIZE CHAMPION 2026</span>
          </div>
        </div>

        {/* Right Chapter Waypoints List */}
        <div className="hidden sm:flex flex-col space-y-2 pointer-events-auto">
          {CHAPTER_WAYPOINTS.map((ch) => {
            const isActive = activeChapter.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onFlyToChapter(ch.id)}
                className="group flex items-center justify-end space-x-2.5 py-1 text-right cursor-pointer"
                data-interactive="true"
                data-cursor-label="FLY"
              >
                <span
                  className={`text-[10px] font-mono-tech tracking-wider transition-all ${
                    isActive
                      ? 'text-blue-400 font-bold opacity-100'
                      : 'text-neutral-500 opacity-60 group-hover:opacity-100'
                  }`}
                >
                  {ch.number} {ch.name}
                </span>
                <span
                  className={`w-1.5 transition-all rounded-full ${
                    isActive
                      ? 'h-5 bg-blue-500 shadow-[0_0_8px_#3b82f6]'
                      : 'h-1.5 bg-neutral-700 group-hover:bg-neutral-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. BOTTOM SCRUB BAR & INTERACTION INSTRUCTION */}
      <footer className="space-y-3 pointer-events-auto">
        {/* Navigation Instruction Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono-tech text-neutral-400">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            <span className="text-white font-medium">ONE-FRAME 3D TRACK:</span>
            <span className="text-neutral-400 hidden sm:inline">
              SCROLL WHEEL &middot; TOUCH DRAG &middot; ARROW KEYS TO TRAVEL
            </span>
          </div>

          <div className="text-neutral-500 flex items-center space-x-3">
            <span>RISHI PORTFOLIO v2.6</span>
            <span className="text-neutral-600">/</span>
            <span className="text-blue-400">SEOUL &amp; GLOBAL</span>
          </div>
        </div>

        {/* Interactive Scrub Line */}
        <div
          ref={scrubBarRef}
          onClick={handleScrubClick}
          className="relative h-2 bg-neutral-900 border border-white/10 cursor-pointer overflow-hidden group"
          title="Click or drag to scrub 3D camera"
          data-interactive="true"
          data-cursor-label="SCRUB"
        >
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 shadow-[0_0_12px_#3b82f6] transition-all duration-75 ease-out"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Chapter markers on scrub bar */}
          {CHAPTER_WAYPOINTS.map((ch) => (
            <div
              key={ch.id}
              className="absolute top-0 bottom-0 w-[1px] bg-white/20 group-hover:bg-white/40"
              style={{ left: `${ch.progress * 100}%` }}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};
