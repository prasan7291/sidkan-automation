import React from 'react';
import { Car, Plane, HeartPulse, Laptop, CheckCircle2 } from 'lucide-react';

export const IndustryUseCases: React.FC = () => {
  const industries = [
    {
      icon: <Car className="w-6 h-6 text-cyan-400" />,
      title: 'Automotive & EV Powertrain',
      highlight: 'BMS & Inverter Hardware Validation',
      description: 'Synchronized cell-voltage logging, CAN-FD bus traffic decoding, high-voltage contactor cycling, and motor inverter PWM timing verification.',
      modules: 'NI 9205 AI, NI 9862 CAN-FD, NI 9485 SSR',
      standards: 'ISO 26262 ASIL-D, ISO 16750'
    },
    {
      icon: <Plane className="w-6 h-6 text-amber-400" />,
      title: 'Aerospace & Defense',
      highlight: 'Flight Line & Environmental Chambers',
      description: 'Shock and vibration strain measurement, thermal vacuum chamber telemetry, avionics ARINC/MIL-STD bus taps, and rugged flight-line testing.',
      modules: 'NI 9237 Bridge, NI 9213 Thermocouple, NI 9220 AI',
      standards: 'DO-160G, MIL-STD-810H'
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-rose-400" />,
      title: 'Medical Device Hardware',
      highlight: 'Regulated Life-Support Verification',
      description: 'Continuous physiological sensor calibration, pump actuator current profiling, automated endurance stress runs, and tamper-proof test records.',
      modules: 'NI 9205 AI, NI 9263 AO, NI 9401 DIO',
      standards: 'IEC 60601-1, FDA 21 CFR Part 11'
    },
    {
      icon: <Laptop className="w-6 h-6 text-emerald-400" />,
      title: 'Consumer & Industrial Electronics',
      highlight: 'Rapid Prototype Bring-Up & EOL',
      description: 'Board bring-up test fixtures, multi-rail DC-DC power supply transient load stepping, sleep current profiling, and fast production functional test.',
      modules: 'NI 9205 AI, NI 9401 DIO, NI 9263 AO',
      standards: 'IPC-A-610, CE / FCC Validation'
    }
  ];

  return (
    <section className="py-24 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-mono mb-3">
            <span>PROVEN SECTORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Mission-Critical Hardware Testing
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Sidkan validation boxes power testing for Tier 1 suppliers, defense contractors, 
            and cutting-edge tech startups worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 flex items-center justify-center mb-4 transition-colors">
                  {ind.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{ind.title}</h3>
                <div className="text-xs font-mono text-cyan-400 font-semibold mb-3">{ind.highlight}</div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {ind.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 block">TYPICAL MODULES:</span>
                  <span className="text-slate-300 font-medium">{ind.modules}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">COMPLIANCE FOCUS:</span>
                  <span className="text-emerald-400">{ind.standards}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
