import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Sliders, 
  Sparkles, 
  Play, 
  ShieldCheck,
  Cable,
  Gauge
} from 'lucide-react';

interface HeroProps {
  onOpenConfigurator: () => void;
  onExploreSoftware: () => void;
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConfigurator,
  onExploreSoftware,
  onOpenQuoteModal,
}) => {
  const [selectedPort, setSelectedPort] = useState<number>(0);
  const [liveVoltage, setLiveVoltage] = useState(3.302);
  const [liveCurrent, setLiveCurrent] = useState(1.42);
  const [canFrameCount, setCanFrameCount] = useState(14820);

  // Simulate real-time hardware telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVoltage(prev => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(3));
      setLiveCurrent(prev => +(Math.max(0.2, prev + (Math.random() * 0.08 - 0.04))).toFixed(2));
      setCanFrameCount(prev => prev + Math.floor(Math.random() * 12 + 4));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const portsData = [
    {
      id: 0,
      label: 'PORT J1: ANALOG BUS',
      module: 'NI 9205 AI',
      connector: 'MIL-DTL Quick-Bayonet 37-Pin',
      status: 'ACTIVE - 250 kS/s',
      signal: `${liveVoltage} VDC (Channel AI_0)`,
      color: 'border-cyan-400 text-cyan-300',
      description: '32-channel differential high-impedance voltage sampling with sub-millivolt accuracy.'
    },
    {
      id: 1,
      label: 'PORT J2: STIMULUS AO',
      module: 'NI 9263 AO',
      connector: 'Isolated Dual BNC Coaxial Array',
      status: 'TRANSMITTING',
      signal: '1.25 kHz Sine Sweep, 0-5Vpp',
      color: 'border-amber-400 text-amber-300',
      description: 'Low-noise 16-bit analog stimulus generator for sensor emulation and ECU command testing.'
    },
    {
      id: 2,
      label: 'PORT J3: DIGITAL / PWM',
      module: 'NI 9401 DIO',
      connector: 'Phoenix Push-In High-Density Header',
      status: 'LOCKED - 100 ns',
      signal: '20 kHz PWM @ 65% Duty Cycle',
      color: 'border-emerald-400 text-emerald-300',
      description: 'Sub-microsecond bidirectional digital lines with FPGA-timed trigger capture.'
    },
    {
      id: 3,
      label: 'PORT J4: CAN-FD BUS TAP',
      module: 'NI 9862 CAN-FD',
      connector: 'Amphenol DB9 with 120Ω Term',
      status: 'ONLINE - 5 Mbps',
      signal: `${canFrameCount} frames / 0 errors`,
      color: 'border-blue-400 text-blue-300',
      description: 'Automotive vehicle bus transceiver with hardware-timed cyclic transmit and DBC logging.'
    }
  ];

  return (
    <div className="relative pt-32 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
      {/* Background radial glow & engineering mesh */}
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-40"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 text-xs font-mono text-cyan-300 backdrop-blur-sm animate-pulse-glow">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold text-slate-100">PRODUCTIZED TEST BENCHES:</span>
            <span className="text-cyan-400">NI cDAQ & cRIO + QUICK-CONNECT + SUITE SOFTWARE</span>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Turnkey Hardware Validation Boxes{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
              Engineered for Zero Friction.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white font-semibold">Sidkan Automation</strong> turns National Instruments 
            cDAQ and cRIO hardware into rugged, productized validation boxes. Featuring military-grade quick-connect 
            port panels and turnkey automated validation software—eliminating laboratory rats’ nests forever.
          </p>

          {/* Quick Stats Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 pb-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400" />
              <span><strong className="text-white">5-Min</strong> Plug & Test Setup</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Cable className="w-4 h-4 text-cyan-400" />
              <span><strong className="text-white">Zero</strong> Flying Lead Errors</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-white">100%</strong> NI-DAQmx Driver Native</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenConfigurator}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 hover:from-cyan-300 hover:to-amber-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all flex items-center justify-center gap-2.5 group"
            >
              <Sliders className="w-4 h-4 text-slate-950" />
              <span>Build Custom ValBox</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreSoftware}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 shadow-lg shadow-black/40 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              <span>Try Live Software Simulator</span>
            </button>

            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-400 hover:text-white hover:bg-slate-900/50 border border-transparent hover:border-slate-800 transition-all"
            >
              Request Fast Quote
            </button>
          </div>
        </div>

        {/* HERO INTERACTIVE HARDWARE PREVIEW BOX */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-[#0b101c] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 p-4 sm:p-6 backdrop-blur-xl">
            {/* Box Enclosure Header Rim */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-4 mb-6 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 pl-2">
                  SIDKAN VALBOX PRO // CHASSIS: cDAQ-9189 TSN GIGABIT
                </span>
              </div>

              {/* Real-Time Live Status Pill */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  <span className="text-slate-500">DUT RAIL:</span>
                  <span className="text-emerald-400 font-bold">{liveVoltage}V @ {liveCurrent}A</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  <span className="text-slate-500">FPGA SYNC:</span>
                  <span className="text-cyan-400 font-bold">&lt; 25 ns TSN</span>
                </div>
              </div>
            </div>

            {/* Simulated Front-Panel Hardware Render */}
            <div className="bg-[#090e18] rounded-xl p-5 border border-slate-800 shadow-inner relative overflow-hidden">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>Front-Panel Quick-Connect Bay (Click any port to inspect pinout & telemetry)</span>
                <span className="text-cyan-400 font-semibold">Active Port: J{selectedPort + 1}</span>
              </div>

              {/* 4 Interactive Modular Bays */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {portsData.map((port, index) => {
                  const isSelected = selectedPort === index;
                  return (
                    <button
                      key={port.id}
                      onClick={() => setSelectedPort(index)}
                      className={`text-left rounded-xl p-4 transition-all relative border ${
                        isSelected
                          ? `bg-slate-900/90 ${port.color} shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40`
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-400 hover:bg-slate-900/40'
                      }`}
                    >
                      {/* Port LED & Module Name */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          SLOT {index + 1}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-cyan-400 led-blink-green' : 'bg-slate-600'
                            }`}
                          ></span>
                          <span className="text-[10px] font-mono font-semibold text-slate-300">
                            {port.module}
                          </span>
                        </div>
                      </div>

                      {/* Port Circular Connector Visual Graphic */}
                      <div className="my-3 flex items-center justify-center">
                        <div
                          className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-950/40 shadow-md shadow-cyan-400/20'
                              : 'border-slate-700 bg-slate-900/50'
                          }`}
                        >
                          {/* Inner pin circle */}
                          <div className="w-10 h-10 rounded-full border border-dashed border-slate-600 flex items-center justify-center">
                            <span className="text-[10px] font-mono font-extrabold text-white">
                              J{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Connector Type */}
                      <div className="mt-2 text-xs font-semibold text-slate-200 truncate">
                        {port.connector.split(' ')[0]} {port.connector.split(' ')[1]}
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400/90 truncate mt-0.5">
                        {port.signal}
                      </div>

                      {/* Click to inspect indicator */}
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-500">{port.status}</span>
                        <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-600'}>
                          {isSelected ? 'SELECTED' : 'SELECT'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Port Live Telemetry Drawer */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold">
                      {portsData[selectedPort].label}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      Module: {portsData[selectedPort].module}
                    </span>
                    <span className="text-xs text-slate-500 hidden sm:inline">|</span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      Connector: {portsData[selectedPort].connector}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {portsData[selectedPort].description}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase text-slate-500">Live Reading</div>
                    <div className="text-sm font-mono font-bold text-cyan-300">
                      {portsData[selectedPort].signal}
                    </div>
                  </div>
                  <button
                    onClick={onOpenConfigurator}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <span>Customize</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Enclosure Chassis Metadata */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono gap-2 px-1">
              <div className="flex items-center gap-4">
                <span>ENCLOSURE: ANODIZED 6061-T6 ALUMINUM</span>
                <span className="hidden sm:inline">COOLING: ACTIVE MAG-LEV DUAL FANS</span>
                <span className="hidden md:inline">ESD: MIL-STD-883H COMPLIANT</span>
              </div>
              <div className="text-cyan-400/80">
                TURNKEY HARNESSING AVAILABLE
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Ticker */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <ShieldCheck className="w-6 h-6 text-cyan-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Zero Miswiring</h4>
            <p className="text-xs text-slate-400 mt-1">Keyed circular & push-in ports prevent costly DUT short circuits.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Plug & Test in 5 Mins</h4>
            <p className="text-xs text-slate-400 mt-1">Drop onto the bench, attach your DUT harness, and initiate tests.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <Cpu className="w-6 h-6 text-blue-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Genuine NI Core</h4>
            <p className="text-xs text-slate-400 mt-1">100% compatible with NI-DAQmx, NI-XNET, LabVIEW & Python.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <Activity className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Sidkan TestSuite</h4>
            <p className="text-xs text-slate-400 mt-1">Accompanying test software with automated PASS/FAIL reporting.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
