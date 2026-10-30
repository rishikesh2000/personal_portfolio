import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, Cpu, ArrowRight } from 'lucide-react';
import type { Project } from '../../types';
import { projectsData } from '../../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalProjectReelProps {
  onSelectProject: (p: Project) => void;
}

export const HorizontalProjectReel: React.FC<HorizontalProjectReelProps> = ({
  onSelectProject
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel distance
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=2800',
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const idx = Math.min(
              projectsData.length - 1,
              Math.floor(self.progress * projectsData.length)
            );
            setActiveProjectIdx(idx);
          }
        }
      });

      return () => {
        tween.kill();
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="works"
      className="relative w-full bg-[#f4f5f8] text-[#0f172a] overflow-hidden"
    >
      <div className="h-screen w-full flex flex-col justify-between px-6 sm:px-12 py-10 max-w-[1600px] mx-auto select-none">
        {/* Top Sticky Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300 pb-5">
          <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-600">
            <span className="text-blue-600 font-bold">03</span>
            <span className="text-neutral-400">/</span>
            <span className="uppercase tracking-widest font-semibold">
              Selected Work &middot; Pinned Horizontal Exhibition
            </span>
          </div>

          {/* Real-time Ticks & Fill Progress Bar */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 font-mono-tech text-xs">
              {projectsData.map((p, idx) => (
                <div
                  key={p.id}
                  className={`px-3 py-1 border transition-all ${
                    activeProjectIdx === idx
                      ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                      : 'border-neutral-300 bg-white text-neutral-500'
                  }`}
                >
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
              ))}
            </div>

            {/* Horizontal Progress Track */}
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono-tech text-neutral-500">
              <span>PROGRESS</span>
              <div className="w-28 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-75"
                  style={{ width: `${Math.min(100, Math.max(5, scrollProgress * 100))}%` }}
                />
              </div>
              <span className="w-8 text-right font-bold text-neutral-800">
                {(scrollProgress * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Cards Track */}
        <div className="my-auto py-4 overflow-visible">
          <div
            ref={trackRef}
            className="flex flex-row items-center space-x-12 will-change-transform"
          >
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                className="w-[85vw] sm:w-[680px] lg:w-[820px] shrink-0 bg-white border border-neutral-300 shadow-xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-blue-500"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-neutral-200 pb-4">
                    <div className="flex items-center space-x-2 text-xs font-mono-tech">
                      <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200">
                        {project.client} &middot; {project.year}
                      </span>
                      {project.honor && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                          <Award className="w-3.5 h-3.5" />
                          <span>{project.honor}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono-tech text-neutral-400">
                      EXHIBIT {(idx + 1).toString().padStart(2, '0')} / {projectsData.length.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0f172a] mb-2">
                    {project.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono-tech text-blue-600 font-medium mb-4">
                    {project.category}
                  </div>

                  <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mb-6">
                    {project.headline}
                  </p>

                  {/* Project details */}
                  <div className="bg-[#090d14] text-white border border-neutral-800 p-4 font-mono-tech text-xs mb-6 space-y-2 shadow-inner">
                    <div className="flex justify-between items-center text-[10px] text-neutral-400 border-b border-neutral-800 pb-2">
                      <span className="text-neutral-300 uppercase">PROJECT DETAILS // {project.id}</span>
                    </div>

                    <div className="pt-1 text-neutral-300 space-y-1.5">
                      {project.details.slice(0, 2).map((detail) => (
                        <div key={detail.label} className="flex items-center space-x-2">
                        <Cpu className="w-3.5 h-3.5 text-blue-400" />
                          <span>{detail.label.toUpperCase()}: {detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-200 mb-6">
                    {project.stats.slice(0, 2).map((s, i) => (
                      <div key={i}>
                        <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">{s.label}</div>
                        <div className="text-lg sm:text-xl font-bold text-[#0f172a] font-mono-tech">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono-tech text-xs tracking-wider font-semibold transition-all flex items-center space-x-2 shadow-md cursor-pointer"
                    data-interactive="true"
                    data-cursor-label="CASE"
                  >
                    <span>OPEN CASE STUDY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-1.5 text-xs font-mono-tech text-neutral-400">
                    <span>SCROLL HORIZONTALLY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pinned Footer Instruction */}
        <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-500 border-t border-neutral-300 pt-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>PINNED REEL: VERTICAL SCROLL CONTROLS HORIZONTAL TRACK</span>
          </div>
          <div>SWIPE OR SCROLL TO NAVIGATE EXHIBITS</div>
        </div>
      </div>
    </div>
  );
};
