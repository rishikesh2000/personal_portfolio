import React from 'react';

export const PreloaderShell: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  React.useEffect(() => {
    if (onComplete) onComplete();
  }, [onComplete]);
  return null;
};
