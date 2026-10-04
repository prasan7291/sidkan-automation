import React, { useState } from 'react';
import { ENCLOSURES_CATALOG } from '../data/modulesData';
import { EnclosureOption } from '../types';
import { 
  Box, 
  Server, 
  Briefcase, 
  Check, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  Cpu, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface ProductsShowcaseProps {
  onSelectForConfigurator: (enclosureId: string) => void;
  onOpenQuoteModal: (enclosureName: string) => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onSelectForConfigurator,
  onOpenQuoteModal,
}) => {
  const [activeEnclosureId, setActiveEnclosureId] = useState<string>('valbox-4');

  const activeEnclosure = ENCLOSURES_CATALOG.find(e => e.id === activeEnclosureId) || ENCLOSURES_CATALOG[0];

  const getFormFactorIcon = (formFactor: string) => {
    switch (formFactor) {
      case '19" Rackmount':
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 'Rugged Field Unit':
        return <Briefcase className="w-5 h-5 text-amber-400" />;
      default:
        return <Box className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="hardware" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>HARDWARE PRODUCT SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Productized Enclosures for Every Validation Environment
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-2xl">
              From desktop R&D bring-up to automated 19” production test racks and in-vehicle flight lines, 
              Sidkan enclosures encase genuine NI C-Series hardware inside purpose-built chassis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">CHASSIS CORE:</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">
              NI cDAQ & cRIO
            </span>
          </div>
        </div>

        {/* Tab Navigation for Enclosures */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {ENCLOSURES_CATALOG.map((item) => {
            const isActive = item.id === activeEnclosureId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveEnclosureId(item.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  {getFormFactorIcon(item.formFactor)}
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.slots} SLOTS
                  </span>
                </div>
                <div className="font-bold text-sm text-white truncate">{item.name}</div>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">{item.chassisType} Core</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Enclosure Card Display */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-[#080d19] border border-cyan-500/30 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Specs & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                  {activeEnclosure.badge || activeEnclosure.formFactor}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  CHASSIS ARCHITECTURE: {activeEnclosure.chassisType}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeEnclosure.name}
                </h3>
                <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeEnclosure.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Key Engineering Specifications:
                </div>
                {activeEnclosure.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Physical dimensions & Power */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-500 block">DIMENSIONS & FORM:</span>
                  <span className="text-slate-200 font-semibold">{activeEnclosure.dimensions}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-500 block">POWER & VOLTAGE:</span>
                  <span className="text-slate-200 font-semibold">{activeEnclosure.powerInput}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectForConfigurator(activeEnclosure.id)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Configure Modules for this Box</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenQuoteModal(activeEnclosure.name)}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-all"
                >
                  Request Technical Drawing & Quote
                </button>
              </div>
            </div>

            {/* Right: Realistic 3D/Chassis Schematic Visualization */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#0e1628] border border-cyan-500/30 p-6 shadow-2xl">
                {/* Visual Chassis Front-Panel Mockup */}
                <div className="border-2 border-slate-700/80 rounded-xl bg-gradient-to-b from-[#141d30] to-[#0c121e] p-5 shadow-inner">
                  {/* Chassis Top Bar */}
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50"></div>
                      <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300">
                        SIDKAN // {activeEnclosure.id.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                      {activeEnclosure.slots}-BAY INDUSTRIAL
                    </span>
                  </div>

                  {/* Slot Bays Visualization */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {Array.from({ length: activeEnclosure.slots }).map((_, slotIdx) => (
                      <div
                        key={slotIdx}
                        className="h-28 rounded-lg border border-slate-700 bg-slate-950/80 flex flex-col justify-between p-2 hover:border-cyan-400/60 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-slate-500">SLOT {slotIdx + 1}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 led-blink-green"></span>
                        </div>
                        <div className="text-center my-auto">
                          <div className="w-6 h-6 mx-auto rounded-full border border-dashed border-cyan-500/50 flex items-center justify-center text-[9px] font-mono text-cyan-300">
                            C
                          </div>
                          <span className="text-[8px] font-mono text-slate-400 block mt-1">C-SERIES</span>
                        </div>
                        <div className="h-1 w-full bg-cyan-900/60 rounded"></div>
                      </div>
                    ))}
                  </div>

                  {/* Quick-Connect Panel Row */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-300">MIL-DTL / PHOENIX I/O</span>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>INTERLOCK ARMED</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                  <span>CNC Milled Aluminum Faceplate</span>
                  <span className="text-cyan-400">TSN Ethernet Synchronized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
