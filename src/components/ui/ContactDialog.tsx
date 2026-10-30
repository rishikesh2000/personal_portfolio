import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [projectType, setProjectType] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setStep(1);
    setProjectType('');
    setTimeline('');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
    onClose();
  };

  const projectTypes = [
    'Spiritual Services Platform (Prabhu Pooja)',
    'HR & Attendance Management System',
    'React.js Frontend Development (Colabrary)',
    'Full-Stack Web Development (React.js + Node.js)',
    'Full-Time / Contract Engineering Opportunity'
  ];

  const timelines = [
    'Immediate (Next 1-2 Months)',
    'Upcoming (3-6 Months)',
    'Planning Stage (Exploring Brief)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      {/* Background backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Container */}
      <div
        data-lenis-prevent-wheel
        className="relative w-full max-w-2xl bg-[#07080a] border-l border-white/10 h-full overflow-y-auto overscroll-y-contain p-6 sm:p-12 text-white z-10 flex flex-col justify-between shadow-2xl"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400">
              <span className="text-red-500 font-bold">CONTACT CHAT</span>
              <span>/</span>
              <span className="uppercase text-neutral-300">PROJECT INTAKE</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 hover:border-red-500/60 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close contact form"
              data-interactive="true"
              data-cursor-label="CLOSE"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSubmitted ? (
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                Connect with Rishikesh.
              </h2>
              <p className="text-sm font-mono-tech text-neutral-400 mb-8">
                Full-Stack Developer &middot; React.js &middot; Node.js &middot; Indore, India
              </p>

              {/* Step indicator */}
              <div className="flex items-center space-x-2 mb-8 font-mono-tech text-xs">
                <span className={`px-2 py-1 border ${step >= 1 ? 'border-red-500 text-red-400 font-bold' : 'border-white/10 text-neutral-600'}`}>
                  01. TYPE
                </span>
                <span className="text-neutral-600">&gt;</span>
                <span className={`px-2 py-1 border ${step >= 2 ? 'border-red-500 text-red-400 font-bold' : 'border-white/10 text-neutral-600'}`}>
                  02. TIMELINE
                </span>
                <span className="text-neutral-600">&gt;</span>
                <span className={`px-2 py-1 border ${step >= 3 ? 'border-red-500 text-red-400 font-bold' : 'border-white/10 text-neutral-600'}`}>
                  03. CONTACT
                </span>
              </div>

              {/* Step 1: Project Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-sm font-mono-tech text-neutral-300 uppercase tracking-wider mb-2">
                    What are you working on?
                  </div>
                  <div className="space-y-2.5">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setProjectType(type);
                          setStep(2);
                        }}
                        className={`group w-full p-4 text-left font-mono-tech text-xs sm:text-sm border transition-all cursor-pointer flex items-center justify-between ${
                          projectType === type
                            ? 'border-red-500 bg-red-500/10 text-white font-semibold'
                            : 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-red-500/50'
                        }`}
                        data-interactive="true"
                        data-cursor-label="CHOOSE"
                      >
                        <span>{type}</span>
                        <ArrowRight className="w-4 h-4 text-neutral-500 transition-colors group-hover:text-red-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Timeline */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-mono-tech text-neutral-300 uppercase tracking-wider">
                      When would you like to get started?
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-mono-tech text-neutral-500 hover:text-white underline cursor-pointer"
                    >
                      BACK
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {timelines.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setTimeline(time);
                          setStep(3);
                        }}
                        className={`w-full p-4 text-left font-mono-tech text-xs sm:text-sm border transition-all cursor-pointer flex items-center justify-between ${
                          timeline === time
                            ? 'border-red-500 bg-red-500/10 text-white font-semibold'
                            : 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-red-500/50'
                        }`}
                        data-interactive="true"
                        data-cursor-label="CHOOSE"
                      >
                        <span>{time}</span>
                        <ArrowRight className="w-4 h-4 text-neutral-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details & Message */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-mono-tech text-neutral-300 uppercase tracking-wider">
                      Where should we write back?
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-mono-tech text-neutral-500 hover:text-white underline cursor-pointer"
                    >
                      BACK
                    </button>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/[0.06] text-xs font-mono-tech text-neutral-400 space-y-1 mb-4">
                    <div>SELECTED TYPE: <span className="text-white">{projectType}</span></div>
                    <div>SCHEDULE: <span className="text-white">{timeline}</span></div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono-tech text-neutral-400 mb-1">
                        YOUR NAME / COMPANY *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rishikesh Kalme"
                        className="w-full p-3 bg-white/[0.04] border border-white/10 text-white font-mono-tech text-sm transition-colors focus:border-red-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech text-neutral-400 mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@company.com"
                        className="w-full p-3 bg-white/[0.04] border border-white/10 text-white font-mono-tech text-sm transition-colors focus:border-red-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech text-neutral-400 mb-1">
                        PROJECT BRIEF / NOTES
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share a few details about your project or opportunity..."
                        className="w-full p-3 bg-white/[0.04] border border-white/10 text-white font-mono-tech text-sm transition-colors focus:border-red-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] font-mono-tech text-neutral-500 pt-1">
                    Your details will only be used to respond to your enquiry.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-mono-tech text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.25)] cursor-pointer mt-4"
                    data-interactive="true"
                    data-cursor-label="SEND"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING ENQUIRY...</span>
                    ) : (
                      <>
                        <span>SHALL WE SEND THIS?</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Confirmation Success State */
            <div className="py-16 text-center space-y-6">
              <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-white">
                Enquiry Transmitted.
              </h3>
              <p className="text-sm font-mono-tech text-neutral-300 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Your message is ready, and I&apos;ll get back to you soon.
              </p>
              <div className="pt-6">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono-tech text-xs tracking-wider transition-colors cursor-pointer"
                >
                  CLOSE INTAKE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-8 border-t border-white/10 mt-8 flex flex-wrap justify-between items-center gap-2 text-xs font-mono-tech text-neutral-500">
          <span>RISHIKESH KALME &middot; INDORE 452001</span>
          <span>EMAIL: rishikeshkalme@gmail.com &middot; TEL: +91 99776 00638</span>
        </div>
      </div>
    </div>
  );
};
