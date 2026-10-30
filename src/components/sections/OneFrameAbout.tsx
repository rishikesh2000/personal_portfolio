import React, { useState } from 'react';
import { Terminal, Monitor, Sparkles, Cpu, GraduationCap, Briefcase } from 'lucide-react';

export const OneFrameAbout: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: 'Languages', detail: 'C, JavaScript' },
    { name: 'Web Technologies', detail: 'HTML5, CSS3, Bootstrap' },
    { name: 'Frameworks', detail: 'React.js, Node.js, Express.js' },
    { name: 'Databases', detail: 'PostgreSQL, MongoDB' },
    { name: 'Developer Tools', detail: 'Git, GitHub, VS Code' },
    { name: 'Education', detail: 'B.I.T., Jabalpur Engineering College · CGPA 7.1/10' }
  ];

  const milestones = [
    {
      role: 'MERN Stack Developer',
      company: 'InstaConnects',
      period: 'Feb 2025 — Present',
      location: 'Indore, MP',
      icon: Briefcase,
      summary: 'Worked on Prabhu Pooja and an HR & Attendance Management System using React, Node, Express, SQL, MongoDB, and Zustand.',
      skills: ['React.js', 'Node.js', 'Express.js', 'SQL', 'MongoDB', 'Zustand']
    },
    {
      role: 'Junior Software Engineer',
      company: 'Officiel CRM',
      period: 'Jul 2024 — Oct 2024',
      location: 'Remote',
      icon: Monitor,
      summary: 'Contributed to Colabrary, a live Officiel CRM project, as a frontend developer working mainly with React.js.',
      skills: ['React.js', 'Frontend Development']
    },
    {
      role: 'Bachelor of Information Technology',
      company: 'Jabalpur Engineering College',
      period: 'Aug 2019 — May 2023',
      location: 'Jabalpur, MP, India',
      icon: GraduationCap,
      summary: 'CGPA: 7.1/10. Higher Secondary: Garment’s Public School, Indore · 77.66% (May 2018 — Mar 2019).',
      skills: ['B.I.T.', 'CGPA 7.1/10', 'Higher Secondary 77.66%']
    }
  ];

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center items-center select-none">
      {/* Layer 1: Title & Personal Philosophy (data-in 0 to 0.32) */}
      <div
        data-in="0"
        data-out="0.32"
        className="scene__layer text-center flex flex-col justify-center items-center px-4"
      >
        <div className="inline-flex items-center space-x-2 text-xs font-mono-tech text-red-400 mb-6 px-3 py-1 bg-red-950/40 border border-red-500/30">
          <span className="font-bold">01</span>
          <span>/</span>
          <span className="uppercase tracking-widest font-semibold">About Rishikesh Kalme</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.12] max-w-4xl">
          Driven by{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
            Hardwork &amp; Honesty.
          </span>
        </h2>

        <p className="text-lg sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
          &ldquo;I am a person who believes in Hardwork and Honesty. If I do something, I give my 100% efforts to achieve it.&rdquo;
        </p>
      </div>

      {/* Layer 2: Experience & Education Timeline HUD Box (data-in 0.32 to 0.66) */}
      <div
        data-in="0.32"
        data-out="0.66"
        className="scene__layer flex flex-col justify-center items-center w-full px-4"
      >
        <div className="w-full max-w-4xl relative p-8 sm:p-12 bg-[#0e090b]/90 border border-white/[0.1] backdrop-blur-xl shadow-2xl">
          {/* Corner Crosshairs */}
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500 pb-4 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-red-400" />
              <span className="text-neutral-300 font-medium">PROFESSIONAL TRACK RECORD // INDORE, INDIA</span>
            </div>
            <div className="text-red-400 font-semibold">
              JEC ’23 ALUMNUS &middot; FULL-STACK DEVELOPER
            </div>
          </div>

          {/* Career Milestones List */}
          <div className="space-y-4 mb-6">
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-white/[0.02] border border-white/[0.06] hover:border-red-500/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 rounded-xs bg-red-600/10 border border-red-500/20 text-red-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-base">{item.role}</span>
                        <span className="text-red-400 font-mono-tech text-xs">@{item.company}</span>
                      </div>
                      <p className="text-xs text-neutral-400 font-light mt-1">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono-tech text-xs text-neutral-500 shrink-0">
                    <div className="text-neutral-300">{item.period}</div>
                    <div className="text-[11px] text-neutral-500">{item.location}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resume skill categories */}
          <div className="pt-4 border-t border-white/[0.08]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {skills.map((s) => (
                <div
                  key={s.name}
                  onMouseEnter={() => setHoveredSkill(s.detail)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="p-2.5 bg-white/[0.03] hover:bg-red-600/20 border border-white/[0.08] hover:border-red-500/50 transition-all cursor-pointer text-center"
                >
                  <div className="text-xs font-mono-tech text-neutral-200 font-medium">
                    {s.name}
                  </div>
                </div>
              ))}
            </div>
            {hoveredSkill && (
              <div className="mt-3 text-xs font-mono-tech text-red-300 text-center animate-fadeIn">
                &gt; {hoveredSkill}
              </div>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-mono-tech text-neutral-500">
              <span className="text-red-400 font-semibold">ACHIEVEMENTS</span>
              <span>WEB DEVELOPMENT HEAD · E-CELL JEC (2022)</span>
              <span>NCC B CERTIFICATE · BETA GRADE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: The Three Engineering Pillars (data-in 0.66 to 1.0) */}
      <div
        data-in="0.66"
        data-out="1.0"
        className="scene__layer flex flex-col justify-center items-center w-full px-4"
      >
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <span className="text-xs font-mono-tech text-neutral-400 uppercase tracking-widest">
              Core Skills &middot; Project Experience
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 bg-[#0e090b]/90 border border-white/[0.1] hover:border-red-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono-tech text-red-400 font-bold">01</span>
                  <div className="p-2.5 rounded-sm bg-red-600/10 border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                    <Monitor className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                  Frontend Engineering
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  React.js component hierarchies, dynamic client-side routing, modular design tokens, and smooth user interactions.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                {['React.js', 'JavaScript', 'Bootstrap', 'State Management'].map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[11px] font-mono-tech bg-white/[0.05] border border-white/[0.08] text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#0e090b]/90 border border-white/[0.1] hover:border-red-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono-tech text-red-400 font-bold">02</span>
                  <div className="p-2.5 rounded-sm bg-red-600/10 border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                  Backend &amp; Server-Side
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  Node.js, Express.js, and JavaScript for full-stack application development.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                {['Node.js', 'Express.js', 'REST APIs', 'Server-Side'].map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[11px] font-mono-tech bg-white/[0.05] border border-white/[0.08] text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#0e090b]/90 border border-white/[0.1] hover:border-red-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono-tech text-red-400 font-bold">03</span>
                  <div className="p-2.5 rounded-sm bg-red-600/10 border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                  Databases &amp; Applications
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  Hands-on project work using SQL, PostgreSQL, and MongoDB across spiritual services and HR management applications.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                {['SQL', 'PostgreSQL', 'MongoDB', 'HR Systems'].map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[11px] font-mono-tech bg-white/[0.05] border border-white/[0.08] text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
