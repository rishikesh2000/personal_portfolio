import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SceneSectionProps {
  id: string;
  chapter: string;
  length: number; // Multiplier of viewport height (e.g. 2.5 = 250vh)
  tone?: 'dark' | 'light';
  className?: string;
  onProgress?: (progress: number) => void;
  children: React.ReactNode | ((progress: number) => React.ReactNode);
}

export const SceneSection: React.FC<SceneSectionProps> = ({
  id,
  chapter,
  length,
  tone = 'dark',
  className = '',
  onProgress,
  children
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateLayers = (progress: number) => {
      setCurrentProgress(progress);
      if (onProgress) {
        onProgress(progress);
      }

      const layerItems = section.querySelectorAll<HTMLElement>('[data-in]');
      layerItems.forEach((item) => {
        const inVal = parseFloat(item.dataset.in || '0');
        const outVal = item.dataset.out ? parseFloat(item.dataset.out) : Infinity;
        const isIn = progress >= inVal && progress < outVal;
        const isPast = progress >= outVal;

        item.classList.toggle('is-in', isIn);
        item.classList.toggle('is-past', isPast);
      });
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => updateLayers(self.progress),
      onRefresh: (self) => updateLayers(self.progress)
    });

    updateLayers(st.progress);

    return () => {
      st.kill();
    };
  }, [onProgress]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-chapter={chapter}
      className={`scene relative w-full ${className}`}
      style={{ height: `${Math.max(1, length) * 100}svh` }}
    >
      <div className={`scene__frame chapter--${tone} sticky top-0 h-screen w-full overflow-hidden select-none`}>
        {typeof children === 'function' ? children(currentProgress) : children}
      </div>
    </section>
  );
};
