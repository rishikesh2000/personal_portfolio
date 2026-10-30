import React, { useEffect, useState } from 'react';

interface Chapter {
  id: string;
  number: string;
  name: string;
}

const chapters: Chapter[] = [
  { id: 'welcome', number: '00', name: 'INTRO' },
  { id: 'about', number: '01', name: 'ABOUT' },
  { id: 'work', number: '02', name: 'WORK' },
  { id: 'process', number: '03', name: 'PROCESS' },
  { id: 'studio', number: '04', name: 'STACK' },
  { id: 'contact', number: '05', name: 'CONTACT' }
];

interface ChapterDotsProps {
  onNavigate: (target: string) => void;
}

export const ChapterDots: React.FC<ChapterDotsProps> = ({ onNavigate }) => {
  const [activeChapter, setActiveChapter] = useState('welcome');
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const curY = window.scrollY;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = totalH > 0 ? Math.min(1, Math.max(0, curY / totalH)) : 0;
      setScrollRatio(ratio);

      const scrollPos = curY + window.innerHeight * 0.45;
      for (const ch of chapters) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapter(ch.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end select-none pointer-events-auto">
      {/* Background Connecting Guide Line */}
      <div className="relative flex flex-col items-end space-y-5 pr-2">
        {/* Continuous vertical guide rail */}
        <div className="absolute right-[6px] top-2 bottom-2 w-[1px] bg-white/[0.1] -z-10">
          {/* Active progress head with Red gradient */}
          <div
            className="w-[2px] -ml-[0.5px] bg-gradient-to-b from-red-500 to-rose-400 shadow-[0_0_8px_#ef4444] transition-all duration-100"
            style={{
              height: `${Math.max(5, scrollRatio * 100)}%`
            }}
          />
        </div>

        {chapters.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => onNavigate(`#${ch.id}`)}
              className="group flex items-center justify-end space-x-3 cursor-pointer py-1 relative"
              data-interactive="true"
              data-cursor-label="GO"
            >
              {/* Chapter Name Popover on hover or when active */}
              <span
                className={`text-[10px] font-mono-tech tracking-wider transition-all duration-200 px-2 py-0.5 rounded-xs ${
                  isActive
                    ? 'text-white bg-red-600/30 border border-red-500/40 opacity-100 translate-x-0 shadow-sm'
                    : 'text-neutral-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 bg-black/60 border border-white/[0.08]'
                }`}
              >
                {ch.number} {ch.name}
              </span>

              {/* Glowing Tick Bead with Red Glow */}
              <div
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-3 h-3 bg-red-500 shadow-[0_0_12px_#ef4444] border border-white/50 scale-110'
                    : 'w-2 h-2 bg-neutral-700 group-hover:bg-neutral-300 group-hover:scale-125'
                }`}
              >
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
