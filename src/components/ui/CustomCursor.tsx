import React, { useEffect, useRef } from 'react';
import type { PointerState } from '../../hooks/usePointerPhysics';

interface CustomCursorProps {
  pointer: PointerState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ pointer }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef(pointer);
  pointerRef.current = pointer;

  useEffect(() => {
    let raf: number;
    let x = pointerRef.current.clientX;
    let y = pointerRef.current.clientY;

    const follow = () => {
      const currentPointer = pointerRef.current;
      x += (currentPointer.clientX - x) * 0.22;
      y += (currentPointer.clientY - y) * 0.22;
      cursorRef.current?.style.setProperty(
        'transform',
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      );
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Don't render custom cursor on touch devices
  if (!pointer.fine) return null;

  const isExpanded = pointer.isOverInteractive;

  return (
    <div
      ref={cursorRef}
      className="fixed left-0 top-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: `translate3d(${pointer.clientX}px, ${pointer.clientY}px, 0) translate(-50%, -50%)`
      }}
    >
      {/* Outer focus ring with reddish cyber styling */}
      <div
        className={`flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${isExpanded
          ? 'w-16 h-16 bg-red-600/20 border-red-400 backdrop-blur-xs scale-100 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
          : 'w-6 h-6 bg-transparent border-white/40 scale-100'
          }`}
      >
        {/* Center dot or label */}
        {isExpanded ? (
          <span className="text-[10px] font-mono-tech tracking-wider text-red-300 font-bold uppercase select-none animate-pulse">
            {pointer.interactiveLabel || 'OPEN'}
          </span>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 transition-transform duration-200" />
        )}
      </div>
    </div>
  );
};
