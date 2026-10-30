import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Award, ExternalLink, Cpu, HardDrive } from 'lucide-react';
import type { Project } from '../../types';
import { projectsData } from '../../data/projectsData';
import { ProjectModal } from '../ui/ProjectModal';

export const ProjectReelSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeProject = projectsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section id="works" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Category Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-white/[0.08] pb-6">
        <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400">
          <span className="text-blue-500 font-bold">03</span>
          <span className="text-neutral-600">/</span>
          <span className="uppercase tracking-widest">Selected Work (Reel)</span>
        </div>

        {/* Navigation Ticks */}
        <div className="flex items-center space-x-2 font-mono-tech text-xs">
          {projectsData.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 border transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-blue-500 bg-blue-500/10 text-white font-bold'
                  : 'border-white/[0.08] text-neutral-500 hover:text-neutral-300 hover:border-white/20'
              }`}
              data-interactive="true"
              data-cursor-label="SELECT"
            >
              {(idx + 1).toString().padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Exhibition Card */}
      <div className="relative bg-[#0b0d13]/90 border border-white/[0.08] backdrop-blur-md overflow-hidden p-6 sm:p-12 lg:p-16">
        {/* Corner HUD handles */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial & Metadata */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono-tech px-2.5 py-1 bg-white/[0.04] text-neutral-400 border border-white/[0.08]">
                {activeProject.client} &middot; {activeProject.year}
              </span>
              {activeProject.honor && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono-tech font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>{activeProject.honor}</span>
                </span>
              )}
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {activeProject.title}
            </h3>

            <p className="text-sm font-mono-tech text-blue-400">
              {activeProject.category}
            </p>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {activeProject.headline}
            </p>

            {/* Micro stats banner */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/[0.08]">
              {activeProject.stats.slice(0, 2).map((s, i) => (
                <div key={i}>
                  <div className="text-[11px] font-mono-tech text-neutral-500 uppercase">{s.label}</div>
                  <div className="text-xl font-bold text-white font-mono-tech">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setSelectedProject(activeProject)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono-tech text-xs tracking-wider font-semibold transition-all duration-200 flex items-center space-x-2 shadow-[0_0_20px_rgba(37,99,235,0.35)] cursor-pointer"
                data-interactive="true"
                data-cursor-label="CASE"
              >
                <span>OPEN CASE STUDY</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 ml-auto">
                <button
                  onClick={handlePrev}
                  className="p-3 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Previous project"
                  data-interactive="true"
                  data-cursor-label="PREV"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Next project"
                  data-interactive="true"
                  data-cursor-label="NEXT"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Project summary */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-[#06080d] border border-white/10 p-5 flex flex-col justify-between overflow-hidden group shadow-2xl">
              <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-500 border-b border-white/[0.08] pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-neutral-300 uppercase">PROJECT SUMMARY // {activeProject.id}</span>
                </div>
              </div>

              <div className="my-auto py-6 space-y-3">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activeProject.headline}
                </p>
                {activeProject.details.map((detail) => (
                  <div key={detail.label} className="flex justify-between gap-4 p-3 bg-white/[0.02] border border-white/[0.06] text-xs font-mono-tech">
                    <span className="text-neutral-500 uppercase">{detail.label}</span>
                    <span className="text-neutral-200 text-right">{detail.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono-tech text-neutral-500">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-neutral-400 truncate max-w-[200px] sm:max-w-none">TECHNOLOGY STACK</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{activeProject.tags.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
