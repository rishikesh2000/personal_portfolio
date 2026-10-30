import { useState, useCallback } from 'react';
import { SpaceStage } from './components/3d/SpaceStage';
import { SiteHeader } from './components/navigation/SiteHeader';
import { ChapterDots } from './components/navigation/ChapterDots';
import { ScrollTelemetryHUD } from './components/ui/ScrollTelemetryHUD';
import { CustomCursor } from './components/ui/CustomCursor';
import { TopLaserLoader } from './components/ui/TopLaserLoader';
import { ProjectModal } from './components/ui/ProjectModal';
import { ContactDialog } from './components/ui/ContactDialog';
import { AwwwardsRibbon } from './components/ui/AwwwardsRibbon';

import { SceneSection } from './components/layout/SceneSection';
import { OneFrameHero } from './components/sections/OneFrameHero';
import { OneFrameAbout } from './components/sections/OneFrameAbout';
import { OneFrameWork } from './components/sections/OneFrameWork';
import { OneFrameProcess } from './components/sections/OneFrameProcess';
import { OneFrameStudio } from './components/sections/OneFrameStudio';
import { OneFrameContact } from './components/sections/OneFrameContact';

import { usePointerPhysics } from './hooks/usePointerPhysics';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useSoundEffects } from './hooks/useSoundEffects';
import type { Project } from './types';

const PointerEffects = () => {
  const pointer = usePointerPhysics();

  return (
    <>
      <CustomCursor pointer={pointer} />
      <SpaceStage pointerX={pointer.x} pointerY={pointer.y} />
    </>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const { scrollTo } = useSmoothScroll();
  const { isMuted, toggleSound, playClick } = useSoundEffects();

  const handleNavigate = useCallback((target: string) => {
    playClick();
    if (target === '#' || target === '#welcome') {
      scrollTo('#welcome');
      return;
    }
    const element = document.querySelector(target) as HTMLElement | null;
    if (element) {
      scrollTo(element);
    }
  }, [playClick, scrollTo]);

  const handleSelectProject = useCallback((project: Project) => {
    playClick();
    setSelectedProject(project);
  }, [playClick]);

  const handleOpenContact = useCallback(() => {
    playClick();
    setContactOpen(true);
  }, [playClick]);

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white selection:bg-blue-600 selection:text-white antialiased">
      {/* 1. Fast 1ms Top Laser Loader (Non-blocking) */}
      <TopLaserLoader />

      {/* Pointer-driven effects are isolated so pointer movement does not re-render the page. */}
      <PointerEffects />

      {/* 4. Floating Chapter Navigation Dots & Dynamic Scroll Telemetry HUD */}
      <ChapterDots onNavigate={handleNavigate} />
      <ScrollTelemetryHUD />

      {/* 5. Awwwards Recognition Ribbon */}
      <AwwwardsRibbon />

      {/* 6. Fixed Header Navigation */}
      <SiteHeader
        isMuted={isMuted}
        onToggleSound={toggleSound}
        onOpenContact={handleOpenContact}
        onNavigate={handleNavigate}
      />

      {/* 7. Authentic One-Frame Sticky Frame Flow */}
      <main className="relative z-10 w-full">
        {/* Chapter 00: Welcome / Hero Scene */}
        <SceneSection id="welcome" chapter="welcome" length={2.2} tone="dark">
          <OneFrameHero
            onOpenContact={handleOpenContact}
            onExploreWorks={() => handleNavigate('#work')}
          />
        </SceneSection>

        {/* Chapter 01: About / Manifesto Scene (3 Stepped Layers) */}
        <SceneSection id="about" chapter="about" length={3.4} tone="dark">
          <OneFrameAbout />
        </SceneSection>

        {/* Chapter 02: Selected Work (Editorial White Background & Pinned Horizontal Exhibition) */}
        <SceneSection id="work" chapter="work" length={4.5} tone="light">
          {(progress) => (
            <OneFrameWork
              progress={progress}
              onSelectProject={handleSelectProject}
            />
          )}
        </SceneSection>

        {/* Chapter 03: Methodology / The Three Beats Route */}
        <SceneSection id="process" chapter="process" length={3.8} tone="dark">
          {(progress) => <OneFrameProcess progress={progress} />}
        </SceneSection>

        {/* Chapter 04: Studio & 3D Systems Architecture */}
        <SceneSection id="studio" chapter="studio" length={3.4} tone="dark">
          <OneFrameStudio />
        </SceneSection>

        {/* Chapter 05: Contact & Initiation Wordmark */}
        <SceneSection id="contact" chapter="contact" length={1.5} tone="dark">
          <OneFrameContact onOpenContact={handleOpenContact} />
        </SceneSection>
      </main>

      {/* Interactive Case Study Drawer Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Slide-over Conversational Contact Intake Drawer */}
      <ContactDialog
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
export { App };
