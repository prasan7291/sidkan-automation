import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  Activity, 
  Sliders, 
  ChevronRight,
  TrendingUp,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';

export const SoftwareAnalyticsUI: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeChannel, setActiveChannel] = useState<'ai' | 'pwm' | 'thermal'>('ai');
  const [sampleRate, setSampleRate] = useState<number>(250);
  const [testRunStatus, setTestRunStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);

  // Automated test sequence items
  const testSteps = [
    { id: 1, name: 'DUT 3.3V Rail Inrush Current', target: '< 4.0A', measured: '3.12A', status: 'PASS' },
    { id: 2, name: 'Analog In Integral Non-Linearity', target: '< ±0.05%', measured: '+0.014%', status: 'PASS' },
    { id: 3, name: 'CAN-FD Cyclic Bus Latency', target: '< 2.5 ms', measured: '1.20 ms', status: 'PASS' },
    { id: 4, name: 'Thermal Soak Stability (100% Load)', target: '< 55°C', measured: '41.8°C', status: 'PASS' }
  ];

  // High-resolution canvas oscilloscope on crisp white background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 260);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 260;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (isPlaying) {
        offsetRef.current += 0.05 * (sampleRate / 100);
      }

      // Clean white background as specified
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Subtle light gray grid lines (Apple-style minimalism)
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#f1f5f9';
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

      // Center reference baseline
      ctx.strokeStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      const centerY = height / 2;

      // Primary Waveform (Clean electric blue #0071e3 - Apple signature blue)
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#0071e3';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      for (let x = 0; x < width; x++) {
        const t = x * 0.02 + offsetRef.current;
        let y = centerY;

        if (activeChannel === 'ai') {
          // Clean analog voltage waveform with micro-harmonics
          y = centerY - Math.sin(t) * 60 - Math.sin(t * 3) * 8 + (Math.random() - 0.5) * 2;
        } else if (activeChannel === 'pwm') {
          // Clean digital pulse / PWM
          const raw = Math.sin(t * 1.5);
          y = centerY + (raw > 0 ? 55 : -55) + (Math.random() - 0.5) * 1.5;
        } else if (activeChannel === 'thermal') {
          // Slow thermal soak drift curve
          y = centerY - 25 - Math.sin(t * 0.25) * 20;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary reference trace (Subtle graphite #94a3b8)
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#cbd5e1';
      for (let x = 0; x < width; x++) {
        const t = x * 0.02 + offsetRef.current * 0.7;
        const y = centerY + Math.cos(t * 0.8) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Technical label in footer of canvas
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(`TIMEBASE: 2.0 ms/div  •  SCALE: 500 mV/div  •  NI-DAQmx TSN SYNC: LOCKED`, 14, height - 12);

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying, activeChannel, sampleRate]);

  // Run simulated test routine
  const handleRunTestSweep = () => {
    if (testRunStatus === 'running') return;
    setTestRunStatus('running');
    setActiveStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      if (step < testSteps.length) {
        setActiveStepIndex(step);
        step++;
      } else {
        clearInterval(interval);
        setTestRunStatus('completed');
        setActiveStepIndex(-1);
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Title & Concept */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#0071e3]">
          Companion Software Suite
        </span>
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
          Real-Time Signal Telemetry & Automated Analytics
        </h2>
        <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
          Sidkan validation boxes connect seamlessly to our companion desktop studio. 
          View multi-channel analog waveforms, profile bus signals, and run automated verification sequences.
        </p>
      </div>

      {/* The Software Window (Apple-Style White Background Interface) */}
      <div className="apple-card-light rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">
        {/* macOS Style Window Chrome Header */}
        <div className="bg-[#f8fafc] px-4 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
            </div>
            <span className="font-semibold text-slate-800 tracking-tight text-xs ml-1">
              Sidkan TestSuite Studio — [Live DAQ Session: cDAQ-9178]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-[11px] border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Connected (0 Jitter)
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">•</span>
            <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">
              NI-DAQmx 24.5
            </span>
          </div>
        </div>

        {/* Software Body Content (White Background) */}
        <div className="p-6 bg-white space-y-6">
          {/* Top Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">RMS Voltage</div>
              <div className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">3.304 V</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">± 0.002V Stability</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Peak-to-Peak</div>
              <div className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">3.328 V</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">24 mV Ripple</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Sample Clock</div>
              <div className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">{sampleRate} kS/s</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Hardware Timed</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Validation Status</div>
              <div className="text-xl font-bold text-emerald-600 tracking-tight mt-0.5">100% PASS</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">4 of 4 Verified</div>
            </div>
          </div>

          {/* Interactive Graph & Signal Inspector */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {/* Graph Toolbar */}
            <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors ${
                    isPlaying
                      ? 'bg-slate-200/80 hover:bg-slate-300 text-slate-800'
                      : 'bg-[#0071e3] text-white hover:bg-[#0077ed]'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Resume'}</span>
                </button>

                {/* Channel Selector Pills */}
                <div className="flex items-center bg-slate-200/60 p-0.5 rounded-lg text-xs">
                  <button
                    onClick={() => setActiveChannel('ai')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      activeChannel === 'ai'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    CH0: 3.3V Analog (NI 9205)
                  </button>
                  <button
                    onClick={() => setActiveChannel('pwm')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      activeChannel === 'pwm'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    CH1: PWM Gate (NI 9401)
                  </button>
                  <button
                    onClick={() => setActiveChannel('thermal')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      activeChannel === 'thermal'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    CH2: Thermal Soak (NI 9213)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <span>Sample Rate:</span>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="50"
                  value={sampleRate}
                  onChange={(e) => setSampleRate(Number(e.target.value))}
                  className="w-24 accent-[#0071e3]"
                />
                <span className="font-mono font-medium text-slate-700">{sampleRate} kS/s</span>
              </div>
            </div>

            {/* White Canvas Waveform */}
            <div className="relative bg-white">
              <canvas ref={canvasRef} className="w-full block" />
            </div>
          </div>

          {/* Automated Validation Routine Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-slate-50/70 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-slate-900">
                  Automated Hardware Verification Sequence
                </h4>
                <p className="text-[11px] text-slate-500">
                  Runs pass/fail threshold evaluation across power rails, bus timing, and temperatures
                </p>
              </div>

              <button
                onClick={handleRunTestSweep}
                disabled={testRunStatus === 'running'}
                className="px-3.5 py-1.5 rounded-lg font-semibold text-xs text-white bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-50 transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{testRunStatus === 'running' ? 'Evaluating...' : 'Run Test Sweep'}</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {testSteps.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div
                    key={step.id}
                    className={`px-4 py-3 flex items-center justify-between transition-colors ${
                      isActive ? 'bg-blue-50/60' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                        {step.id}
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">{step.name}</span>
                        <span className="text-slate-400 text-[11px] block sm:inline sm:ml-2">
                          Target: {step.target}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-slate-700 font-medium">{step.measured}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {step.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
