import { useEffect, useRef, useState } from 'react';

export interface PointerState {
  x: number; // -1 to 1
  y: number; // -1 to 1
  clientX: number;
  clientY: number;
  energy: number;
  isOverInteractive: boolean;
  interactiveLabel: string;
  fine: boolean;
}

export function usePointerPhysics(): PointerState {
  const [state, setState] = useState<PointerState>({
    x: 0,
    y: 0,
    clientX: typeof window !== 'undefined' ? window.innerWidth / 2 : 720,
    clientY: typeof window !== 'undefined' ? window.innerHeight / 2 : 450,
    energy: 0,
    isOverInteractive: false,
    interactiveLabel: '',
    fine: true
  });

  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const interactiveSelectors = 'a, button, input, textarea, [data-interactive], .interactive-target, .work-card, .capability-card';

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      // Throttle state update to at most ~30fps to prevent React re-render flooding
      if (now - lastUpdateRef.current < 25) return;
      lastUpdateRef.current = now;

      const isTouch = e.pointerType === 'touch';
      const width = window.innerWidth;
      const height = window.innerHeight;

      const normX = (e.clientX / width) * 2 - 1;
      const normY = -(e.clientY / height) * 2 + 1;

      const delta = Math.hypot(normX - lastX, normY - lastY) * 3;
      lastX = normX;
      lastY = normY;

      const target = e.target as HTMLElement | null;
      let isOver = false;
      let label = '';

      if (target) {
        const interactiveEl = target.closest(interactiveSelectors);
        if (interactiveEl) {
          isOver = true;
          label = interactiveEl.getAttribute('data-cursor-label') || 'VIEW';
        }
      }

      setState({
        x: normX,
        y: normY,
        clientX: e.clientX,
        clientY: e.clientY,
        energy: Math.min(1.5, delta),
        isOverInteractive: isOver,
        interactiveLabel: label,
        fine: !isTouch
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return state;
}
