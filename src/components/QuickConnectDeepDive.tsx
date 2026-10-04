import React, { useState } from 'react';
import { CONNECTOR_OPTIONS } from '../data/modulesData';
import { 
  Cable, 
  ShieldCheck, 
  Repeat, 
  Lock, 
  Zap, 
  SlidersHorizontal, 
  Cpu, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const QuickConnectDeepDive: React.FC = () => {
  const [selectedConnectorId, setSelectedConnectorId] = useState<string>('amphenol-circular');

  const selectedConnector = CONNECTOR_OPTIONS.find(c => c.id === selectedConnectorId) || CONNECTOR_OPTIONS[0];

  return (
    <section id="quick-connect" className="py-24 relative bg-slate-950/80 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-mono mb-3">
            <Cable className="w-3.5 h-3.5" />
            <span>PROPRIETARY PORT ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Sidkan Quick-Connect Ecosystem
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Say goodbye to stripping individual wires into fragile screw terminals. 
            Sidkan validation boxes bring all NI C-Series I/O to standardized, keyed, 
            rapid-disconnect front-panel bulkheads.
          </p>
        </div>

        {/* 4 Connector Archetypes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CONNECTOR_OPTIONS.map((connector) => {
            const isSelected = connector.id === selectedConnectorId;
            return (
              <div
                key={connector.id}
                onClick={() => setSelectedConnectorId(connector.id)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-400 shadow-xl shadow-cyan-950/60 ring-1 ring-cyan-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                      {connector.ipRating}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {connector.matingCycles}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {connector.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {connector.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Recommended Application:</div>
                  <div className="text-xs text-slate-300 font-medium line-clamp-2">
                    {connector.idealFor}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Engineering Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1627] to-slate-900 border border-cyan-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Feature 1 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Physically Keyed Mating</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connectors feature precision clocking indices. It is physically impossible for a lab technician 
                to mate an analog harness upside down or plug a high-voltage rail into a sensitive low-voltage sensor port.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Hardware Safety Interlock</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every quick-connect harness contains an integrated continuity loop. If a harness is unlatched during 
                a live test, the internal solid-state relay instantaneously isolates high-current DUT power within 1.2 microseconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Repeat className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Modular Mating Harnesses</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Sidkan fabricates custom mating breakout cables labeled with wire markers, braided nylon EMI shielding, 
                and your choice of DUT-side terminations (Molex, Deutsch, Amphenol, or open fly leads).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
