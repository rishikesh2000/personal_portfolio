import React, { useState, useEffect } from 'react';
import { Mic, Cpu, Activity, Touchpad, MessageSquare, Terminal, CheckCircle } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
  // Widget 1: Voice & Audio Frequency Visualizer
  const [waveType, setWaveType] = useState<'sine' | 'triangle' | 'pulse'>('sine');
  const [frequency, setFrequency] = useState<number>(440);
  const [isWaveActive, setIsWaveActive] = useState<boolean>(true);

  // Widget 2: GPU Face-Swap & Diffusion Latency Simulator
  const [resolution, setResolution] = useState<'1080p' | '4k'>('1080p');
  const [gpuCluster, setGpuCluster] = useState<number>(4);

  // Widget 3: Live SSE Telemetry Stream
  const [visitorCount, setVisitorCount] = useState<number>(4289);
  const [gpuTemp, setGpuTemp] = useState<number>(64);
  const [logs] = useState<string[]>([
    'SSE /stream: visitor #4288 booking registered',
    'GPU node #2: face swap frame rendered (24.1s)',
    'Thermal printer: receipt #1940 status OK'
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisitorCount((v) => v + Math.floor(Math.random() * 2));
      setGpuTemp(() => 63 + Math.floor(Math.sin(Date.now() / 3000) * 3));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Widget 4: Kiosk Barcode Scanner Simulator
  const [scannedCard, setScannedCard] = useState<string>('PASSPORT');
  const [matchedDestination, setMatchedDestination] = useState<string>('QUEENSTOWN, NZ');
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  const handleScan = (card: string, dest: string) => {
    setScannedCard(card);
    setMatchedDestination(dest);
    setIsPrinting(true);
    setTimeout(() => setIsPrinting(false), 1400);
  };

  // Widget 5: LLM Ethics Quiz
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Widget 6: Edge Worker Status
  const [workerOnline, setWorkerOnline] = useState<boolean>(true);

  return (
    <section id="labs" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Category Header */}
      <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400 mb-8">
        <span className="text-blue-500 font-bold">05</span>
        <span className="text-neutral-600">/</span>
        <span className="uppercase tracking-widest">Interactive Engineering Labs</span>
      </div>

      <div className="mb-14">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Creative Engineering in Action
        </h2>
        <p className="text-base sm:text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">
          Interact directly with the simulation testbenches below. These live widgets reflect
          the sensory algorithms, inference orchestrators, and offline kiosk runners we build.
        </p>
      </div>

      {/* 2x3 Interactive Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lab 1: Voice & Audio Frequency Visualizer */}
        <div className="bg-[#0b0e14]/90 border border-white/[0.08] p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Mic className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white font-medium">AUDIO FREQUENCY I/O</span>
              </div>
              <span className="text-blue-400 font-mono-tech">VOICE VISUALIZER</span>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              Microphone spatial input and waveform harmonics analyzer.
            </p>

            {/* Simulated Animated Waveform Bars */}
            <div className="h-24 bg-[#06080c] border border-white/[0.06] p-3 flex items-end justify-between gap-1 mb-4">
              {Array.from({ length: 24 }).map((_, i) => {
                const height = isWaveActive
                  ? Math.sin((i / 24) * Math.PI * 2 + Date.now() / 200) * 40 + 50
                  : 10;
                return (
                  <div
                    key={i}
                    className="w-full bg-blue-500/80 transition-all duration-75"
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400">
                <span>FREQ: {frequency}Hz</span>
                <input
                  type="range"
                  min="120"
                  max="1200"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-24 accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                {(['sine', 'triangle', 'pulse'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setWaveType(t)}
                    className={`flex-1 py-1.5 text-[11px] font-mono-tech uppercase border transition-all cursor-pointer ${
                      waveType === t
                        ? 'border-blue-500 bg-blue-500/20 text-white font-bold'
                        : 'border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-4 flex justify-between items-center text-[11px] font-mono-tech text-neutral-500">
            <span>INPUT SAMPLING</span>
            <button
              onClick={() => setIsWaveActive(!isWaveActive)}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              {isWaveActive ? 'PAUSE WAVE' : 'RESUME WAVE'}
            </button>
          </div>
        </div>

        {/* Lab 2: GPU Face-Swap & Diffusion Simulator */}
        <div className="bg-[#0b0e14]/90 border border-white/[0.08] p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white font-medium">GPU INFERENCE BENCH</span>
              </div>
              <span className="text-blue-400 font-mono-tech">FACE-SWAP CLUSTER</span>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              Real-time calculation of latent video face swap turnaround latency.
            </p>

            {/* Bench Output */}
            <div className="p-4 bg-[#06080c] border border-white/[0.06] font-mono-tech text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-500">ESTIMATED LATENCY:</span>
                <span className="text-blue-400 font-bold">
                  {resolution === '1080p' ? (112 / gpuCluster).toFixed(1) : (240 / gpuCluster).toFixed(1)}s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">GPU VRAM REQUIRED:</span>
                <span className="text-white">{resolution === '1080p' ? '14.2 GB' : '28.8 GB'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">ACTIVE WORKERS:</span>
                <span className="text-emerald-400">{gpuCluster}x NVIDIA T4</span>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono-tech text-neutral-400">
                <span>GPU CLUSTER SIZE:</span>
                <span className="text-white font-bold">{gpuCluster} NODES</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 4, 8].map((n) => (
                  <button
                    key={n}
                    onClick={() => setGpuCluster(n)}
                    className={`flex-1 py-1 text-xs font-mono-tech border transition-all cursor-pointer ${
                      gpuCluster === n
                        ? 'border-blue-500 bg-blue-500/20 text-white font-bold'
                        : 'border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    {n}x
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                {(['1080p', '4k'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setResolution(r)}
                    className={`flex-1 py-1.5 text-[11px] font-mono-tech uppercase border transition-all cursor-pointer ${
                      resolution === r
                        ? 'border-blue-500 bg-blue-500/20 text-white font-bold'
                        : 'border-white/10 text-neutral-400'
                    }`}
                  >
                    {r} RESOLUTION
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-4 flex justify-between items-center text-[11px] font-mono-tech text-neutral-500">
            <span>WSIS PRIZE ENGINE</span>
            <span className="text-emerald-400">SUB-30S QUALIFIED</span>
          </div>
        </div>

        {/* Lab 3: Live SSE Operations Telemetry Stream */}
        <div className="bg-[#0b0e14]/90 border border-white/[0.08] p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white font-medium">SSE TELEMETRY STREAM</span>
              </div>
              <span className="text-emerald-400 flex items-center space-x-1 font-mono-tech">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              Realtime server-sent events for exhibition floor dashboards.
            </p>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-3 bg-[#06080c] border border-white/[0.06]">
                <div className="text-[10px] font-mono-tech text-neutral-500">VISITORS LOGGED</div>
                <div className="text-xl font-bold font-mono-tech text-white">{visitorCount.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-[#06080c] border border-white/[0.06]">
                <div className="text-[10px] font-mono-tech text-neutral-500">GPU DIE TEMP</div>
                <div className="text-xl font-bold font-mono-tech text-blue-400">{gpuTemp}°C</div>
              </div>
            </div>

            {/* Console Log Feed */}
            <div className="p-3 bg-[#06080c] border border-white/[0.06] font-mono-tech text-[10px] text-neutral-400 space-y-1.5 h-20 overflow-hidden">
              {logs.map((log, i) => (
                <div key={i} className="truncate">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-4 flex justify-between items-center text-[11px] font-mono-tech text-neutral-500">
            <span>SOCKET / SSE PROTOCOL</span>
            <span className="text-neutral-400">UPTIME: 99.98%</span>
          </div>
        </div>

        {/* Lab 4: Touch Kiosk Barcode Scanner Simulator */}
        <div className="bg-[#0b0e14]/90 border border-white/[0.08] p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Touchpad className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white font-medium">POP-UP KIOSK RUNNER</span>
              </div>
              <span className="text-blue-400 font-mono-tech">ESC/POS PRINTER</span>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              Simulate scanning packing cards for the Jimssalabium pop-up kiosk.
            </p>

            <div className="p-4 bg-[#06080c] border border-white/[0.06] font-mono-tech text-xs mb-4 space-y-1.5">
              <div className="text-neutral-500">SCANNED CARD: <span className="text-white">{scannedCard}</span></div>
              <div className="text-neutral-500">DESTINATION: <span className="text-blue-400 font-bold">{matchedDestination}</span></div>
              <div className="text-neutral-500">PRINTER: {isPrinting ? (
                <span className="text-amber-400 animate-pulse font-bold">PRINTING THERMAL RECEIPT...</span>
              ) : (
                <span className="text-emerald-400">READY</span>
              )}</div>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono-tech text-neutral-400">CLICK ITEM CARD TO SCAN:</div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleScan('PASSPORT + CAMERA', 'QUEENSTOWN, NZ')}
                  className="p-2 border border-white/10 hover:border-blue-500 bg-white/[0.02] text-[10px] font-mono-tech text-white cursor-pointer"
                >
                  PASSPORT
                </button>
                <button
                  onClick={() => handleScan('BOOK + WINE', 'TUSCANY, ITALY')}
                  className="p-2 border border-white/10 hover:border-blue-500 bg-white/[0.02] text-[10px] font-mono-tech text-white cursor-pointer"
                >
                  WINE CARD
                </button>
                <button
                  onClick={() => handleScan('HIKING BOOTS', 'HALLASAN, JEJU')}
                  className="p-2 border border-white/10 hover:border-blue-500 bg-white/[0.02] text-[10px] font-mono-tech text-white cursor-pointer"
                >
                  HIKING
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-4 flex justify-between items-center text-[11px] font-mono-tech text-neutral-500">
            <span>OFFLINE STANDALONE</span>
            <span className="text-emerald-400">0% INTERNET REQUIRED</span>
          </div>
        </div>

        {/* Lab 5: LLM Ethics Quiz & Decision Agent */}
        <div className="bg-[#0b0e14]/90 border border-white/[0.08] p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white font-medium">ETHICS LLM AGENT</span>
              </div>
              <span className="text-blue-400 font-mono-tech">SYNTHETIC EVAL</span>
            </div>

            <p className="text-xs text-neutral-400 mb-3">
              KT AI Station fake news detection prompt simulator.
            </p>

            <div className="p-3 bg-[#06080c] border border-white/[0.06] text-xs font-light text-neutral-300 mb-3">
              &quot;Report A shows a broadcast anchor. Report B uses synthetic lip-sync. Can you spot the AI artifact?&quot;
            </div>

            <div className="space-y-2 mb-3">
              {['Report A is Synthetic', 'Report B is Synthetic', 'Both Reports are AI-Generated'].map((ans, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full p-2.5 text-left text-xs font-mono-tech border transition-all cursor-pointer flex items-center justify-between ${
                    selectedAnswer === idx
                      ? 'border-blue-500 bg-blue-500/20 text-white font-semibold'
                      : 'border-white/10 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <span>[{idx + 1}] {ans}</span>
                  {selectedAnswer === idx && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="text-[11px] font-mono-tech text-emerald-400 p-2 bg-emerald-500/10 border border-emerald-500/20">
                {selectedAnswer === 2 ? 'CORRECT: Both reports contain latent frequency anomalies.' : 'ANALYSIS: Report B exhibits micro-expression desync.'}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-4 flex justify-between items-center text-[11px] font-mono-tech text-neutral-500">
            <span>DCTI VALIDATION</span>
            <button onClick={() => setSelectedAnswer(null)} className="text-neutral-400 hover:text-white cursor-pointer">
              RESET QUIZ
            </button>
          </div>
        </div>

        {/* Lab 6: Zero-Internet Edge Failover Switch */}
        <div className="bg-[#0b0e14]/90 border border-white/[0.08] p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white font-medium">EDGE FAILOVER ENGINE</span>
              </div>
              <span className="text-blue-400 font-mono-tech">RESILIENCE</span>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              Simulate cloud network disconnection and immediate local SQLite failover.
            </p>

            <div className="p-4 bg-[#06080c] border border-white/[0.06] font-mono-tech text-xs space-y-2.5 mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-500">CLOUD LINK:</span>
                <span className={workerOnline ? 'text-emerald-400' : 'text-red-400'}>
                  {workerOnline ? 'CONNECTED (24ms)' : 'OFFLINE (SEVERED)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">ACTIVE STORAGE:</span>
                <span className="text-white">
                  {workerOnline ? 'POSTGRES CLOUD REPL' : 'ON-DEVICE SQLITE MIRROR'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">SYSTEM STATE:</span>
                <span className="text-blue-400 font-bold">100% OPERATIONAL</span>
              </div>
            </div>

            <button
              onClick={() => setWorkerOnline(!workerOnline)}
              className={`w-full py-2.5 text-xs font-mono-tech font-semibold transition-all border cursor-pointer ${
                workerOnline
                  ? 'border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20'
                  : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
              }`}
            >
              {workerOnline ? 'SIMULATE NETWORK COLLAPSE' : 'RESTORE NETWORK LINK'}
            </button>
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-4 flex justify-between items-center text-[11px] font-mono-tech text-neutral-500">
            <span>SELF-HEALING WATCHDOG</span>
            <span className="text-emerald-400">ZERO DATA LOSS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
