import React, { useEffect } from 'react';
import { X, Award, CheckCircle2, Cpu, HardDrive } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      {/* Background backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-3xl bg-[#090b10] border-l border-white/10 h-full overflow-y-auto p-6 sm:p-10 text-white z-10 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400">
              <span className="text-blue-500 font-bold">{project.year}</span>
              <span>/</span>
              <span className="uppercase text-neutral-300">{project.client}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              data-interactive="true"
              data-cursor-label="CLOSE"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Title & Badge */}
          <div className="mb-6">
            {project.honor && (
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono-tech font-semibold mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>{project.honor}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              {project.title}
            </h2>
            <p className="text-lg text-blue-400 font-mono-tech text-sm">
              {project.category}
            </p>
          </div>

          {/* Headline & Description */}
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-8">
            {project.headline}
          </p>

          <div className="p-4 bg-white/[0.02] border border-white/[0.06] mb-8 text-neutral-300 text-sm leading-relaxed">
            {project.description}
          </div>

          {/* Project summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {project.stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-[#10131a] border border-white/[0.08]">
                <div className="text-xs font-mono-tech text-neutral-500 mb-1">{s.label}</div>
                <div className="text-lg font-bold text-white font-mono-tech">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Project details */}
          <div className="mb-8">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 mb-4 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Project Details</span>
            </h3>

            <div className="space-y-2 text-xs font-mono-tech">
              {project.details.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row sm:justify-between py-2.5 px-3 bg-white/[0.02] border border-white/[0.04]"
                >
                  <span className="text-neutral-500 uppercase">{label}</span>
                  <span className="text-neutral-200 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Engineered Features */}
          <div className="mb-8">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 mb-4 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Engineered Deliverables</span>
            </h3>
            <ul className="space-y-3">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-neutral-300">
                  <span className="text-blue-500 font-mono-tech text-xs mt-0.5">[{i + 1}]</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-mono-tech bg-white/[0.04] text-neutral-400 border border-white/[0.08]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions inside modal */}
        <div className="pt-8 border-t border-white/10 mt-8 flex justify-between items-center text-xs font-mono-tech text-neutral-500">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-3.5 h-3.5 text-neutral-400" />
            <span>ARCHIVE RECORD ID: {project.id}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            RETURN TO REEL
          </button>
        </div>
      </div>
    </div>
  );
};
