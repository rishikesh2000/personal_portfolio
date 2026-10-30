import React from 'react';
import type { Project } from '../../types';
import { HorizontalProjectReel } from './HorizontalProjectReel';
import { PinnedProcessRoute } from './PinnedProcessRoute';

interface WhiteEditorialChapterProps {
  onSelectProject: (p: Project) => void;
}

export const WhiteEditorialChapter: React.FC<WhiteEditorialChapterProps> = ({
  onSelectProject
}) => {
  return (
    <div className="w-full bg-[#f4f5f8] text-[#0f172a] relative z-10 border-y border-neutral-300">
      {/* 1. Pinned Horizontal Exhibition Showcase */}
      <HorizontalProjectReel onSelectProject={onSelectProject} />

      {/* 2. Pinned 3-Beat Process Timeline Route */}
      <PinnedProcessRoute />
    </div>
  );
};
