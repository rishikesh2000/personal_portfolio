import React, { useState, useEffect } from 'react';
import { Award, Clock, MapPin, ChevronDown, ChevronUp, Globe } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: 'Can we bring you in at the planning stage?',
    a: 'Yes. We hear the theme, the space, and the audience, and propose the flow of the experience first. The same team then carries on through design, development, and testing on the devices it will run on.'
  },
  {
    q: 'Can you follow our strict brand guidelines?',
    a: 'Yes. We design every interface directly from your campaign material and brand design systems, mapped precisely to the proportions of the target hardware—from portrait kiosks to multi-screen spatial LED walls.'
  },
  {
    q: 'Which AI models do you utilize?',
    a: 'Whichever model best fits the purpose and latency targets. We select among high-resolution face swapping, diffusion image & video generation, computer vision landmark trackers, and LLMs, running them on isolated cloud GPU clusters or on-premise RTX hardware.'
  },
  {
    q: 'Do you stay with the project through installation and the run?',
    a: 'Yes, through installation, dry-runs, and live operational days. Before arrival at the venue, testing is completed in our studio on the exact hardware models and printers that will run on site.'
  },
  {
    q: 'How long does an AI result take for a visitor?',
    a: 'Turnaround latency depends on the model architecture. For KT AI Station, a full personalized cinematic deepfake is generated in ~28 seconds. What visitors experience while waiting is intentionally choreographed as part of the narrative.'
  }
];

export const StudioSection: React.FC = () => {
  const [seoulTime, setSeoulTime] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setSeoulTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="studio" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Category Header */}
      <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400 mb-8">
        <span className="text-blue-500 font-bold">07</span>
        <span className="text-neutral-600">/</span>
        <span className="uppercase tracking-widest">Studio &amp; Recognition</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Studio Introduction & Recognition */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            One team. Every layer in the same hands.
          </h2>

          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
            PUTURE is an interactive technology studio that builds memorable experiences with AI.
            We design and engineer them for premier global brands, pop-up stores, exhibition pavilions,
            and technological showcases.
          </p>

          {/* Honors & Global Awards Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-5 bg-[#0e121a] border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-start space-x-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono-tech text-blue-400 font-bold uppercase mb-1">
                  CHAMPION
                </div>
                <div className="text-base font-bold text-white">WSIS Prize 2026</div>
                <div className="text-xs text-neutral-400 mt-1 font-light">
                  Recognized by the UN &amp; ITU for the KT AI Station ethics pavilion.
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#0e121a] border border-white/[0.08] flex items-start space-x-4">
              <div className="p-3 bg-white/[0.04] border border-white/[0.08] text-neutral-300">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono-tech text-neutral-400 font-bold uppercase mb-1">
                  NOMINEE
                </div>
                <div className="text-base font-bold text-white">Awwwards &middot; Site of the Day</div>
                <div className="text-xs text-neutral-400 mt-1 font-light">
                  Honored for spatial web aesthetics and real-time WebGL performance.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Studio Telemetry & Timezone */}
        <div className="lg:col-span-5 bg-[#090c12]/90 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-xs font-mono-tech text-neutral-400">
            <span>HEADQUARTERS</span>
            <span className="text-blue-400 font-bold">SEOUL, KR</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-neutral-300 text-sm">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Gwanghwamun &amp; Gangnam, Seoul, South Korea</span>
            </div>

            <div className="flex items-center space-x-3 text-neutral-300 text-sm">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="flex items-center space-x-2 font-mono-tech">
                <span className="text-white font-bold">{seoulTime || '16:30:00'} KST</span>
                <span className="text-xs text-neutral-500">(UTC+9)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/[0.06] text-xs font-mono-tech text-neutral-400 space-y-2">
            <div className="flex justify-between">
              <span>TEAM SPECIALIZATION:</span>
              <span className="text-white">AI / GRAPHICS / HARDWARE</span>
            </div>
            <div className="flex justify-between">
              <span>ACTIVE CAPACITY:</span>
              <span className="text-emerald-400">ACCEPTING 2026/2027 BRIEFS</span>
            </div>
            <div className="flex justify-between">
              <span>DIRECT INQUIRIES:</span>
              <span className="text-blue-400 underline">contact@puture.co.kr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion FAQ: Common Client Inquiries */}
      <div className="mt-16 border-t border-white/[0.08] pt-12">
        <h3 className="text-2xl font-bold text-white mb-8">
          Frequently Answered Inquiries
        </h3>

        <div className="divide-y divide-white/[0.06]">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                  data-interactive="true"
                  data-cursor-label="TOGGLE"
                >
                  <span className="text-base sm:text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                    {faq.q}
                  </span>
                  <span className="p-2 text-neutral-400 group-hover:text-white transition-colors">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-2 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-4xl">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

