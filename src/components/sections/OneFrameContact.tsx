import React from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, Send } from 'lucide-react';

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 0 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5V10.13H5.07V18.5h2.79Z"/>
  </svg>
);

interface OneFrameContactProps {
  onOpenContact: () => void;
}

export const OneFrameContact: React.FC<OneFrameContactProps> = ({ onOpenContact }) => {
  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-6 sm:px-12 py-12 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 z-20 w-full text-xs font-mono-tech text-neutral-400">
        <div className="flex items-center space-x-3">
          <span className="text-red-500 font-bold">05</span>
          <span className="text-neutral-600">/</span>
          <span className="uppercase tracking-widest text-neutral-200 font-semibold">
            Contact &middot; Get In Touch
          </span>
        </div>
        <div className="flex items-center space-x-2 text-red-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>INDORE, MADHYA PRADESH 452001</span>
        </div>
      </div>

      {/* Main Call to Action */}
      <div className="my-auto max-w-4xl text-left">
        <div className="text-xs font-mono-tech text-neutral-400 uppercase tracking-widest mb-4">
          Collaboration &middot; Hiring &middot; Projects
        </div>

        <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Let&apos;s build something{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
            exceptional.
          </span>
        </h3>

        <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed mb-10 max-w-2xl">
          MERN Stack Developer at InstaConnects, working on spiritual services and HR management applications.
          Experienced with React.js, Node.js, Express.js, SQL, MongoDB, and Zustand.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://www.linkedin.com/in/rishikesh-kalme-356043193/"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-medium text-sm rounded-none border border-red-400/40 shadow-xl shadow-red-600/30 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={onOpenContact}
            className="px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-sm rounded-none border border-white/[0.15] backdrop-blur-md transition-all duration-300 flex items-center space-x-2.5 cursor-pointer"
          >
            <Send className="w-4 h-4 text-red-400" />
            <span>Send Direct Message</span>
          </button>

          <a
            href="mailto:rishikeshkalme@gmail.com"
            className="px-6 py-4 bg-white/[0.02] hover:bg-white/[0.06] text-neutral-300 font-medium text-sm rounded-none border border-white/[0.08] transition-all duration-300 flex items-center space-x-2"
          >
            <Mail className="w-4 h-4 text-neutral-400" />
            <span>Email</span>
          </a>

          <a
            href="tel:+919977600638"
            className="px-6 py-4 bg-white/[0.02] hover:bg-white/[0.06] text-neutral-300 font-medium text-sm rounded-none border border-white/[0.08] transition-all duration-300 flex items-center space-x-2"
          >
            <Phone className="w-4 h-4 text-neutral-400" />
            <span>+91 99776 00638</span>
          </a>

          <a
            href="https://github.com/rishikesh2000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 bg-white/[0.02] hover:bg-white/[0.06] text-neutral-300 font-medium text-sm rounded-none border border-white/[0.08] transition-all duration-300 flex items-center space-x-2"
          >
            <span className="w-4 h-4 text-neutral-400 font-mono-tech font-bold">GH</span>
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Big Editorial Wordmark & Footer */}
      <div className="w-full border-t border-white/[0.08] pt-6 z-20">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500 mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>INDORE, MADHYA PRADESH 452001 &middot; JEC '23</span>
          </div>
          <div>
            &copy; 2026 RISHIKESH KALME &middot; FULL-STACK DEVELOPER. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Big Stylized Wordmark: RISHIKESH KALME */}
        <div className="text-center font-bold tracking-tighter text-white/[0.06] text-4xl sm:text-7xl md:text-[110px] lg:text-[130px] leading-none select-none pointer-events-none uppercase whitespace-nowrap overflow-hidden">
          RISHIKESH KALME
        </div>
      </div>
    </div>
  );
};
