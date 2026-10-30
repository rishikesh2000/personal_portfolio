import React from 'react';
import { Code2 } from 'lucide-react';

export const AwwwardsRibbon: React.FC = () => {
  return (
    <div className="fixed left-0 top-1/3 -translate-y-1/2 z-30 hidden lg:block select-none pointer-events-auto">
      <div className="bg-[#0e090b]/90 border-y border-r border-red-500/20 p-2.5 backdrop-blur-md shadow-xl flex items-center space-x-2 text-[10px] font-mono-tech tracking-wider text-neutral-400 -rotate-90 origin-bottom-left translate-y-20">
        <Code2 className="w-3.5 h-3.5 text-red-400 rotate-90" />
        <span className="text-white font-bold">RISHIKESH KALME</span>
        <span className="text-neutral-500">/</span>
        <span className="text-red-400">REACT.JS &middot; NODE.JS &middot; JEC ’23</span>
      </div>
    </div>
  );
};
