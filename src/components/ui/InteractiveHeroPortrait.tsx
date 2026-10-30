import React, { useRef, useState, useEffect } from 'react';
import { Activity, Flame } from 'lucide-react';

export const InteractiveHeroPortrait: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scanlineY, setScanlineY] = useState(0);

  // Scanline animation loop
  useEffect(() => {
    let frameId: number;
    let pos = 0;
    const animate = () => {
      pos = (pos + 0.8) % 100;
      setScanlineY(pos);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setCoords({ x, y });
  };

  const handlePointerLeave = () => {
    setCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // 3D parallax rotations
  const rotateX = -coords.y * 14;
  const rotateY = coords.x * 14;
  const translateZ = isHovered ? 25 : 0;
  const shineX = (coords.x + 1) * 50;
  const shineY = (coords.y + 1) * 50;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[270px] sm:max-w-[310px] md:max-w-[340px] lg:max-w-[370px] aspect-[4/5] max-h-[68vh] mx-auto select-none perspective-[1200px] cursor-crosshair group"
      data-interactive="true"
      data-cursor-label="INSPECT"
    >
      {/* Outer ambient reddish reactive glow */}
      <div
        className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-red-600/30 via-rose-500/20 to-amber-500/10 blur-2xl transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          opacity: isHovered ? 0.9 : 0.45,
          transform: `translate(${coords.x * 15}px, ${coords.y * 15}px)`
        }}
      />

      {/* 3D Holographic Card Shell */}
      <div
        className="relative w-full h-full rounded-none border border-red-500/40 bg-[#0d090b]/80 backdrop-blur-xl overflow-hidden transition-all duration-300 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.8)] will-change-transform"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Technical Corner Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red-500 z-30" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-500 z-30" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-500 z-30" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-500 z-30" />

        {/* Top HUD Status Bar */}
        <div className="absolute top-3 left-4 right-4 z-30 flex items-center justify-between text-[10px] font-mono-tech tracking-wider text-red-300/80 bg-[#0c080a]/80 backdrop-blur-md px-2.5 py-1 border border-red-500/30">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold text-white tracking-widest">FEED // RK_PORTRAIT.RAW</span>
          </div>
          <div className="flex items-center space-x-1.5 text-neutral-400">
            <Activity className="w-3 h-3 text-red-400" />
            <span>60 FPS</span>
          </div>
        </div>

        {/* The Portrait Image with Parallax & Cyber Aesthetic */}
        <div className="relative w-full h-full overflow-hidden bg-[#0a0709]">
          <img
            src="/images/rishikesh_portrait.jpg"
            alt="Rishikesh Kalme - Full-Stack Developer"
            className="w-full h-full object-cover object-[center_15%] transition-all duration-500 group-hover:scale-105"
            style={{
              transform: `translate(${coords.x * -8}px, ${coords.y * -8}px) scale(1.04)`
            }}
          />

          {/* Sleek Crimson Cyber Edge Vignette (Non-destructive to real photo colors) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d090b] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
          <div className="absolute inset-0 ring-1 ring-inset ring-red-500/20 pointer-events-none" />

          {/* Dynamic Laser Glare / Specular Shine on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.35 : 0.08,
              background: `radial-gradient(circle 260px at ${shineX}% ${shineY}%, rgba(239, 68, 68, 0.4), transparent 70%)`
            }}
          />

          {/* Sweeping Cyber Scanline */}
          <div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-400 to-transparent pointer-events-none shadow-[0_0_12px_#ef4444] z-20 opacity-80"
            style={{ top: `${scanlineY}%` }}
          />

          {/* Fine HUD Target Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-15"
            style={{
              backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.35) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        {/* Bottom Floating Technical Identification Pill */}
        <div className="absolute bottom-3 left-4 right-4 z-30 flex flex-col space-y-1.5 p-3 bg-[#0a0608]/90 border border-red-500/35 backdrop-blur-md">
          <div className="flex items-center justify-between text-[11px] font-mono-tech">
            <span className="text-white font-bold tracking-wider">RISHIKESH KALME</span>
            <span className="text-red-400 font-semibold px-1.5 py-0.2 bg-red-950/60 border border-red-500/40 text-[9px]">
              VERIFIED
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono-tech text-neutral-400">
            <span>FULL-STACK DEV &middot; INSTACONNECTS</span>
            <span className="text-red-400">JEC '23</span>
          </div>

          <div className="pt-1.5 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono-tech text-neutral-500">
            <div className="flex items-center space-x-1.5">
              <Flame className="w-3 h-3 text-red-500 animate-pulse" />
              <span className="text-neutral-300">CORE: REACT.JS · NODE.JS</span>
            </div>
            <span>INDORE (MP)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
