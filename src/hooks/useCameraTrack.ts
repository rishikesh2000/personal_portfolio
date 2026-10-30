import { useState, useEffect, useRef, useCallback } from 'react';

export interface ChapterWaypoint {
  id: string;
  number: string;
  name: string;
  progress: number; // 0.0 to 1.0
  zPos: number;     // camera Z position
}

export const CHAPTER_WAYPOINTS: ChapterWaypoint[] = [
  { id: 'hero', number: '01', name: 'HERO', progress: 0.0, zPos: 5.5 },
  { id: 'about', number: '02', name: 'ABOUT', progress: 0.16, zPos: -10.0 },
  { id: 'works', number: '03', name: 'PROJECTS', progress: 0.36, zPos: -28.0 },
  { id: 'stack', number: '04', name: 'STACK', progress: 0.58, zPos: -48.0 },
  { id: 'labs', number: '05', name: 'LABS', progress: 0.74, zPos: -62.0 },
  { id: 'process', number: '06', name: 'PROCESS', progress: 0.88, zPos: -74.0 },
  { id: 'contact', number: '07', name: 'CONTACT', progress: 1.0, zPos: -86.0 }
];

export function useCameraTrack() {
  const [progress, setProgress] = useState<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  // Wheel and trackpad handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sensitivity = 0.00065;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + e.deltaY * sensitivity));
    };

    // Touch swipe handler
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const sensitivity = 0.0022;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + deltaY * sensitivity));
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.min(1, targetProgressRef.current + 0.08);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.max(0, targetProgressRef.current - 0.08);
      } else if (e.key === 'Home') {
        targetProgressRef.current = 0;
      } else if (e.key === 'End') {
        targetProgressRef.current = 1;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Damping animation loop
    let rafId: number;
    const tick = () => {
      // Smooth lerp damping
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.09;
      setProgress(currentProgressRef.current);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const flyTo = useCallback((targetP: number) => {
    targetProgressRef.current = Math.max(0, Math.min(1, targetP));
  }, []);

  const flyToChapter = useCallback((chapterId: string) => {
    const ch = CHAPTER_WAYPOINTS.find((c) => c.id === chapterId);
    if (ch) {
      targetProgressRef.current = ch.progress;
    }
  }, []);

  // Compute active chapter based on current progress
  const activeChapter = CHAPTER_WAYPOINTS.reduce((prev, curr) => {
    return Math.abs(curr.progress - progress) < Math.abs(prev.progress - progress) ? curr : prev;
  });

  return {
    progress,
    targetProgress: targetProgressRef.current,
    activeChapter,
    flyTo,
    flyToChapter,
    isDraggingRef
  };
}

