import React, { useEffect, useState } from 'react';

export const TopLaserLoader: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(15);

  useEffect(() => {
    // Quick sweep across 0 -> 100% in ~200ms
    const t1 = setTimeout(() => setWidth(70), 50);
    const t2 = setTimeout(() => setWidth(100), 150);
    const t3 = setTimeout(() => setVisible(false), 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] pointer-events-none overflow-hidden bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-red-600 via-rose-400 to-amber-500 shadow-[0_0_12px_#ef4444] transition-all duration-150 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
