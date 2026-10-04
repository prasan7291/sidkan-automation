import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_TEST_SEQUENCE } from '../data/modulesData';
import { TestSequenceStep } from '../types';
import { 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Activity, 
  Sliders, 
  Layers, 
  Download, 
  Sparkles,
  Cpu,
  Eye
} from 'lucide-react';

interface SoftwareShowcaseProps {
  onOpenReportModal: () => void;
}

export const SoftwareShowcase: React.FC<SoftwareShowcaseProps> = ({ onOpenReportModal }) => {
  const [isRunningStream, setIsRunningStream] = useState<boolean>(true);
  const [selectedSignal, setSelectedSignal] = useState<'sine' | 'square' | 'thermal' | 'can'>('sine');
  const [sampleRate, setSampleRate] = useState<number>(250); // kS/s
  const [testSequence, setTestSequence] = useState<TestSequenceStep[]>(INITIAL_TEST_SEQUENCE);
  const [isSequenceRunning, setIsSequenceRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [activeChannelAi0, setActiveChannelAi0] = useState<boolean>(true);
  const [activeChannelAi1, setActiveChannelAi1] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const timeOffset = useRef<number>(0);

  // Canvas waveform rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (isRunningStream) {
        timeOffset.current += 0.04 * (sampleRate / 100);
      }

      // Dark background
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      // Engineering Oscilloscope Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      const gridSpacing = 40;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center baseline
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      const centerY = height / 2;

      // Channel 1: Primary Waveform (Cyan)
      if (activeChannelAi0) {
        ctx.beginPath();
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = '#00F0FF';
        ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
        ctx.shadowBlur = 8;

        for (let x = 0; x < width; x++) {
          const t = x * 0.02 + timeOffset.current;
          let y = centerY;

          if (selectedSignal === 'sine') {
            y = centerY + Math.sin(t) * 60 + Math.sin(t * 3.5) * 8 + (Math.random() - 0.5) * 3;
          } else if (selectedSignal === 'square') {
            const raw = Math.sin(t);
            y = centerY + (raw > 0 ? 55 : -55) + (Math.random() - 0.5) * 4;
          } else if (selectedSignal === 'thermal') {
            y = centerY - 30 + Math.sin(t * 0.2) * 25 + Math.cos(t * 0.05) * 15;
          } else if (selectedSignal === 'can') {
            const step = Math.floor(t * 1.5) % 2 === 0 ? 45 : -45;
            y = centerY + step + (Math.sin(t * 8) > 0.5 ? 20 : 0);
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Channel 2: Secondary Waveform (Amber)
      if (activeChannelAi1) {
        ctx.beginPath();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = '#F59E0B';
        ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
        ctx.shadowBlur = 6;

        for (let x = 0; x < width; x++) {
          const t = x * 0.02 + timeOffset.current * 0.8;
          let y = centerY + Math.cos(t * 1.2) * 40 + Math.sin(t * 0.5) * 15 + (Math.random() - 0.5) * 2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Telemetry trigger watermark
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(`TRIGGER: EDGE RISING (3.0V) | TIMEBASE: 2 ms/div | NI-DAQmx SYNC: 0 JITTER`, 12, height - 12);

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isRunningStream, selectedSignal, sampleRate, activeChannelAi0, activeChannelAi1]);

  // Automated Sequence Runner Simulation
  const runAutomatedSequence = () => {
    if (isSequenceRunning) return;
    setIsSequenceRunning(true);
    setActiveStepIndex(0);

    // Reset sequence to pending
    setTestSequence(prev => prev.map(s => ({ ...s, status: 'PENDING' })));

    let currentIndex = 0;

    const stepInterval = setInterval(() => {
      if (currentIndex < INITIAL_TEST_SEQUENCE.length) {
        setActiveStepIndex(currentIndex);
        setTestSequence(prev => {
          const next = [...prev];
          next[currentIndex] = {
            ...next[currentIndex],
            status: 'RUNNING'
          };
          return next;
        });

        setTimeout(() => {
          setTestSequence(prev => {
            const next = [...prev];
            next[currentIndex] = {
              ...next[currentIndex],
              status: 'PASS'
            };
            return next;
          });
        }, 350);

        currentIndex++;
      } else {
        clearInterval(stepInterval);
        setIsSequenceRunning(false);
        setActiveStepIndex(-1);
      }
    }, 600);
  };

  const resetSequence = () => {
    setTestSequence(INITIAL_TEST_SEQUENCE);
    setActiveStepIndex(-1);
    setIsSequenceRunning(false);
  };

  return (
    <section id="software" className="py-24 relative bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-mono mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>ACCOMPANYING SOFTWARE PLATFORM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Sidkan TestSuite Pro
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-2xl">
              Turnkey validation software engineered specifically for your Sidkan hardware box. 
              Zero setup time—launch the app, auto-discover C-Series modules, run automated test routines, 
              and generate audit-ready compliance certificates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Preview Test Report PDF</span>
            </button>
            <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 led-blink-green"></span>
              <span>DAEMON: NI-DAQmx CONNECTED</span>
            </span>
          </div>
        </div>

        {/* Live Interactive Software Window */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-[#070b14] border border-cyan-500/40 shadow-2xl overflow-hidden">
          {/* Software Window Titlebar */}
          <div className="bg-[#0b101c] px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-slate-300 font-bold ml-2">
                SIDKAN TESTSUITE PRO v3.2.4 — [SESSION: CHASSIS_cDAQ9189_DUT01]
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span>BUFFERS: 0 DROP</span>
              <span className="text-cyan-400">TSN LATENCY: 12 µs</span>
              <span className="text-emerald-400">STATUS: READY</span>
            </div>
          </div>

          {/* Software Main Viewport */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Oscilloscope & Signal Controls */}
            <div className="lg:col-span-7 space-y-4">
              {/* Scope Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRunningStream(!isRunningStream)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                      isRunningStream
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {isRunningStream ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isRunningStream ? 'PAUSE SCOPE' : 'RESUME SCOPE'}</span>
                  </button>

                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                    <button
                      onClick={() => setSelectedSignal('sine')}
                      className={`px-2 py-0.5 rounded ${selectedSignal === 'sine' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    >
                      SINE
                    </button>
                    <button
                      onClick={() => setSelectedSignal('square')}
                      className={`px-2 py-0.5 rounded ${selectedSignal === 'square' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    >
                      PWM
                    </button>
                    <button
                      onClick={() => setSelectedSignal('thermal')}
                      className={`px-2 py-0.5 rounded ${selectedSignal === 'thermal' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    >
                      THERMAL
                    </button>
                    <button
                      onClick={() => setSelectedSignal('can')}
                      className={`px-2 py-0.5 rounded ${selectedSignal === 'can' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    >
                      CAN-FD
                    </button>
                  </div>
                </div>

                {/* Channel Active Toggles */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeChannelAi0}
                      onChange={(e) => setActiveChannelAi0(e.target.checked)}
                      className="rounded text-cyan-400"
                    />
                    <span className="text-cyan-300 font-bold">CH0 (AI)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeChannelAi1}
                      onChange={(e) => setActiveChannelAi1(e.target.checked)}
                      className="rounded text-amber-400"
                    />
                    <span className="text-amber-300 font-bold">CH1 (STIM)</span>
                  </label>
                </div>
              </div>

              {/* Live Canvas Scope Screen */}
              <div className="relative rounded-xl border border-cyan-500/30 overflow-hidden bg-[#060a12] shadow-inner">
                <canvas ref={canvasRef} className="w-full block" />
                <div className="absolute top-3 right-3 flex items-center gap-2 text-[10px] font-mono bg-slate-900/80 px-2 py-1 rounded border border-slate-700 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 led-blink-green"></span>
                  <span className="text-slate-200">250 kS/s REAL-TIME</span>
                </div>
              </div>

              {/* Sample Rate Slider & Telemetry Readouts */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">SAMPLE RATE:</span>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={sampleRate}
                    onChange={(e) => setSampleRate(Number(e.target.value))}
                    className="w-28 sm:w-40 accent-cyan-400"
                  />
                  <span className="text-cyan-400 font-bold">{sampleRate} kS/s</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <span>RMS: <strong className="text-white">2.33 V</strong></span>
                  <span>Vpp: <strong className="text-white">6.60 V</strong></span>
                  <span>THD: <strong className="text-white">0.018%</strong></span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Automated Validation Sequence Runner */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>Automated Validation Sequence</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={runAutomatedSequence}
                      disabled={isSequenceRunning}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all ${
                        isSequenceRunning
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isSequenceRunning ? 'TESTING...' : 'RUN SEQUENCE'}</span>
                    </button>

                    <button
                      onClick={resetSequence}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                      title="Reset Steps"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
                  {testSequence.map((step, idx) => {
                    const isStepActive = activeStepIndex === idx;
                    return (
                      <div
                        key={step.id}
                        className={`p-2.5 rounded-lg border text-xs transition-all ${
                          isStepActive
                            ? 'bg-slate-900 border-cyan-400 shadow-md ring-1 ring-cyan-500/30'
                            : step.status === 'PASS'
                            ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-950/40 border-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-200 truncate font-sans">
                            {step.name}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                              step.status === 'PASS'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : step.status === 'RUNNING'
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {step.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="text-slate-500">{step.module}</span>
                          <span className="text-cyan-300/90">{step.measured}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Test Summary Card */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">
                    Validation Verdict
                  </div>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>6/6 TESTS PASSED (100%)</span>
                  </div>
                </div>

                <button
                  onClick={onOpenReportModal}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
