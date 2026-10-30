import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CapabilitiesSection } from '../sections/CapabilitiesSection';

interface LabsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabsModal: React.FC<LabsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#090b10] border border-white/10 p-6 sm:p-10 my-auto shadow-2xl text-white">
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Creative Engineering Labs &middot; Interactive Testbenches
            </h2>
            <p className="text-xs font-mono-tech text-blue-400 mt-1">
              Live simulation testbenches &middot; Real-time AI, sensory inputs &amp; kiosk runtimes
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            data-interactive="true"
            data-cursor-label="CLOSE"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embed Capabilities Section inside modal */}
        <div className="max-h-[75vh] overflow-y-auto pr-2">
          <CapabilitiesSection />
        </div>
      </div>
    </div>
  );
};

