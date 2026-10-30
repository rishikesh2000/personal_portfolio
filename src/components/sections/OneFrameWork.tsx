import React, { useRef, useMemo } from 'react';
import { Briefcase, Cpu, ArrowRight } from 'lucide-react';
import type { Project } from '../../types';
import { projectsData } from '../../data/projectsData';

interface OneFrameWorkProps {
  progress: number;
  onSelectProject: (p: Project) => void;
}

export const OneFrameWork: React.FC<OneFrameWorkProps> = ({
  progress,
  onSelectProject
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Compute sub-progress for the horizontal track between 0.22 and 1.0
  const reelProgress = useMemo(() => {
    if (progress < 0.22) return 0;
    return Math.min(1, (progress - 0.22) / 0.78);
  }, [progress]);

  const activeIdx = Math.min(
    projectsData.length - 1,
    Math.floor(reelProgress * projectsData.length)
  );

  // Approximate horizontal travel percentage
  const translateXPercent = reelProgress * (projectsData.length - 1) * 78;

  return (
    <div className="relative w-full h-full max-w-[1600px] mx-auto px-6 sm:px-12 py-10 flex flex-col justify-between select-none">
      {/* Top Fixed Exhibition Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300 pb-5 z-20 w-full">
        <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-600">
          <span className="text-red-600 font-bold">02</span>
          <span className="text-neutral-400">/</span>
          <span className="uppercase tracking-widest font-semibold text-neutral-900">
            Work Experience &middot; Featured Projects
          </span>
        </div>

        {/* Real-time Ticks & Fill Progress Bar */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 font-mono-tech text-xs">
            {projectsData.map((p, idx) => (
              <div
                key={p.id}
                className={`px-3 py-1 border transition-all duration-300 ${
                  activeIdx === idx
                    ? 'border-red-600 bg-red-600 text-white font-bold shadow-md scale-105'
                    : 'border-neutral-300 bg-white text-neutral-500 hover:border-neutral-400'
                }`}
              >
                {(idx + 1).toString().padStart(2, '0')}
              </div>
            ))}
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono-tech text-neutral-500">
            <span>PROGRESS</span>
            <div className="w-28 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-100 ease-out"
                style={{ width: `${Math.min(100, Math.max(5, reelProgress * 100))}%` }}
              />
            </div>
            <span className="w-8 text-right font-bold text-neutral-800">
              {(reelProgress * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Layer 1: Professional Track Record Introduction (data-in 0 to 0.22) */}
      <div
        data-in="0"
        data-out="0.22"
        className="scene__layer flex flex-col justify-center items-center px-4"
      >
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-mono-tech mb-6 font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>INSTACONNECTS &middot; OFFICIEL CRM &middot; JEC '23</span>
          </div>

          <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0f172a] mb-6 leading-tight">
            Building robust web platforms with{' '}
            <span className="text-red-600 underline decoration-2 underline-offset-8">
              React.js &amp; Node.js.
            </span>
          </h3>

          <p className="text-base sm:text-xl text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Experience building spiritual services and HR management applications, alongside React.js frontend work on a live CRM project.
            Working with React.js, Node.js, Express.js, SQL, MongoDB, and Zustand.
          </p>

          <div className="flex items-center justify-center space-x-8 text-xs font-mono-tech text-neutral-500 border-t border-neutral-200 pt-6">
            <div>CURRENT: <span className="font-semibold text-neutral-800">MERN Stack Developer · InstaConnects</span></div>
            <div>LOCATION: <span className="font-semibold text-neutral-800">Indore, MP, India</span></div>
            <div>EXPERTISE: <span className="font-semibold text-red-600">Full-Stack MERN</span></div>
          </div>
        </div>
      </div>

      {/* Layer 2: The Horizontal Reel of Real-World Projects (data-in 0.22 to 1.0) */}
      <div
        data-in="0.22"
        data-out="1.0"
        className="scene__layer flex flex-col justify-center items-center w-full overflow-hidden"
      >
        <div className="w-full overflow-visible py-4">
          <div
            ref={trackRef}
            className="flex flex-row items-center space-x-12 will-change-transform"
            style={{
              transform: `translateX(calc(12vw - ${translateXPercent}%))`
            }}
          >
            {projectsData.map((project, idx) => {
              const isCurrent = activeIdx === idx;
              return (
                <div
                  key={project.id}
                  className={`w-[85vw] sm:w-[680px] lg:w-[820px] shrink-0 bg-white border shadow-2xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-500 ease-out ${
                    isCurrent
                      ? 'border-red-500 scale-100 opacity-100 shadow-[0_25px_60px_-15px_rgba(220,38,38,0.22)]'
                      : 'border-neutral-300 scale-[0.96] opacity-80 hover:opacity-95'
                  }`}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-neutral-200 pb-4">
                      <div className="flex items-center space-x-2 text-xs font-mono-tech">
                        <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200">
                          {project.client} &middot; {project.year}
                        </span>
                        {project.honor && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 font-semibold">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{project.honor}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono-tech text-neutral-400">
                        PROJECT {(idx + 1).toString().padStart(2, '0')} / {projectsData.length.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0f172a] mb-2">
                      {project.title}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono-tech text-red-600 font-medium mb-4">
                      {project.category}
                    </div>

                    <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mb-6">
                      {project.headline}
                    </p>

                    {/* Project details from the supplied resume */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-4 border border-neutral-200 mb-6 font-mono-tech text-xs">
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-neutral-400 text-[10px] uppercase">{stat.label}</div>
                          <div className="font-semibold text-neutral-800">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono-tech bg-neutral-100 text-neutral-700 border border-neutral-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Modal Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <div className="flex items-center space-x-2 text-xs font-mono-tech text-neutral-500">
                      <Cpu className="w-3.5 h-3.5 text-red-600" />
                      <span>PRODUCTION GRADE // FULL-STACK ARCHITECTURE</span>
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#0f172a] hover:bg-red-600 text-white text-xs font-mono-tech font-semibold transition-colors cursor-pointer"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-500 border-t border-neutral-300 pt-4 z-20 w-full">
        <div>SWIPE / WHEEL TO EXPLORE RISHIKESH'S PRODUCTION WORK</div>
        <div>TOTAL 04 FEATURED PROJECTS</div>
      </div>
    </div>
  );
};
