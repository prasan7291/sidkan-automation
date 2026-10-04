import React, { useState } from 'react';
import { ENCLOSURES_CATALOG, NI_MODULES_CATALOG, CONNECTOR_OPTIONS } from '../data/modulesData';
import { NIModule, EnclosureOption } from '../types';
import { 
  Sliders, 
  Cpu, 
  Layers, 
  Plus, 
  Trash2, 
  Check, 
  Zap, 
  Cable, 
  Code2, 
  FileCheck, 
  Send,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';

interface BoxConfiguratorProps {
  selectedEnclosureId: string;
  onEnclosureChange: (id: string) => void;
  onRequestQuote: (configSummary: string) => void;
}

export const BoxConfigurator: React.FC<BoxConfiguratorProps> = ({
  selectedEnclosureId,
  onEnclosureChange,
  onRequestQuote,
}) => {
  const currentEnclosure = ENCLOSURES_CATALOG.find(e => e.id === selectedEnclosureId) || ENCLOSURES_CATALOG[0];

  // Selected modules array initialized with default suggestions
  const [selectedModules, setSelectedModules] = useState<(NIModule | null)[]>([
    NI_MODULES_CATALOG[0], // NI 9205 AI
    NI_MODULES_CATALOG[2], // NI 9263 AO
    NI_MODULES_CATALOG[3], // NI 9401 DIO
    NI_MODULES_CATALOG[6], // NI 9862 CAN-FD
    null,
    null,
    null,
    null
  ]);

  const [activeSlotModal, setActiveSlotModal] = useState<number | null>(null);
  const [selectedConnector, setSelectedConnector] = useState<string>('amphenol-circular');
  const [includeSoftwareSuite, setIncludeSoftwareSuite] = useState<boolean>(true);
  const [includePythonSdk, setIncludePythonSdk] = useState<boolean>(true);
  const [includeCustomHarness, setIncludeCustomHarness] = useState<boolean>(true);

  // Helper to assign module to slot
  const handleAssignModule = (slotIndex: number, module: NIModule | null) => {
    setSelectedModules(prev => {
      const next = [...prev];
      next[slotIndex] = module;
      return next;
    });
    setActiveSlotModal(null);
  };

  // Helper to calculate total stats
  const activeSlots = selectedModules.slice(0, currentEnclosure.slots);
  const populatedCount = activeSlots.filter(Boolean).length;

  const totalChannelsSummary = () => {
    let ai = 0;
    let ao = 0;
    let dio = 0;
    let tc = 0;
    let can = 0;

    activeSlots.forEach(m => {
      if (!m) return;
      if (m.id === 'ni-9205') ai += 32;
      if (m.id === 'ni-9220') ai += 16;
      if (m.id === 'ni-9263') ao += 4;
      if (m.id === 'ni-9401') dio += 8;
      if (m.id === 'ni-9213') tc += 16;
      if (m.id === 'ni-9862') can += 1;
    });

    const parts = [];
    if (ai > 0) parts.push(`${ai}x Analog In`);
    if (ao > 0) parts.push(`${ao}x Analog Out`);
    if (dio > 0) parts.push(`${dio}x High-Speed DIO`);
    if (tc > 0) parts.push(`${tc}x Thermocouples`);
    if (can > 0) parts.push(`${can}x CAN-FD Bus`);
    return parts.length > 0 ? parts.join(', ') : 'No modules assigned yet';
  };

  const handleGenerateQuoteRequest = () => {
    const modulesList = activeSlots
      .map((m, idx) => `Slot ${idx + 1}: ${m ? `${m.model} (${m.name})` : 'Empty'}`)
      .join('; ');
    const summary = `Enclosure: ${currentEnclosure.name} (${currentEnclosure.chassisType}) | Configured Modules: [${modulesList}] | Connector Style: ${selectedConnector} | Sidkan TestSuite: ${includeSoftwareSuite ? 'Yes' : 'No'} | Python SDK: ${includePythonSdk ? 'Yes' : 'No'} | Custom Mating Harness: ${includeCustomHarness ? 'Yes' : 'No'}`;
    onRequestQuote(summary);
  };

  return (
    <section id="configurator" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE TEST BENCH BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Build Your Custom Validation Box
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Configure your chassis, select NI C-Series modules, choose rapid-disconnect bulkheads, 
            and bundle our automated validation software. Instant BOM and specification sheet generation.
          </p>
        </div>

        {/* Step 1: Select Enclosure Chassis */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 font-semibold mb-3 uppercase tracking-wider">
            <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-xs">1</span>
            <span>Select Hardware Chassis & Form Factor</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENCLOSURES_CATALOG.map((enc) => {
              const isSelected = enc.id === selectedEnclosureId;
              return (
                <button
                  key={enc.id}
                  onClick={() => onEnclosureChange(enc.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-cyan-400 font-bold">{enc.chassisType}</span>
                    <span className="text-slate-400">{enc.slots} Slots</span>
                  </div>
                  <div className="font-bold text-sm text-white">{enc.name}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">{enc.formFactor}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Slot Bay Configuration */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-xs">2</span>
              <span>Assign NI C-Series Modules ({populatedCount}/{currentEnclosure.slots} Assigned)</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click any slot to load or replace NI modules
            </span>
          </div>

          {/* Visual Enclosure Chassis Bay */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#080d19] border border-cyan-500/30 shadow-2xl">
            {/* Top Bar of the box */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></div>
                <span className="text-white font-bold">{currentEnclosure.name}</span>
                <span className="text-slate-500">| FRONT-PANEL BAY</span>
              </div>
              <div className="text-slate-400">
                ACTIVE BUS: <span className="text-emerald-400 font-semibold">TSN GIGABIT</span>
              </div>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: currentEnclosure.slots }).map((_, slotIdx) => {
                const assignedModule = selectedModules[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`rounded-xl p-4 border transition-all relative flex flex-col justify-between ${
                      assignedModule
                        ? 'bg-slate-900/90 border-cyan-500/50 shadow-md shadow-cyan-950/30'
                        : 'bg-slate-950/40 border-dashed border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      {/* Slot Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                          SLOT {slotIdx + 1}
                        </span>
                        {assignedModule && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignModule(slotIdx, null);
                            }}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/50 transition-colors"
                            title="Remove module"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Module Info or Empty State */}
                      {assignedModule ? (
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            <span>{assignedModule.model}</span>
                          </div>
                          <div className="text-xs text-cyan-300 font-medium line-clamp-1">
                            {assignedModule.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 mt-2">
                            I/O: {assignedModule.channels}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">
                            {assignedModule.sampleRate}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <span className="text-xs text-slate-500 font-mono block">EMPTY SLOT</span>
                          <span className="text-[10px] text-slate-600">No module assigned</span>
                        </div>
                      )}
                    </div>

                    {/* Change / Add Button */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => setActiveSlotModal(slotIdx)}
                        className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          assignedModule
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}
                      >
                        {assignedModule ? (
                          <>
                            <span>Change Module</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Select Module</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Connector Style & Add-ons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Connector Selector */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 font-semibold mb-4 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-xs">3</span>
              <span>Front-Panel Quick-Connect Bulkhead Style</span>
            </div>

            <div className="space-y-3">
              {CONNECTOR_OPTIONS.map((conn) => {
                const isSelected = selectedConnector === conn.id;
                return (
                  <label
                    key={conn.id}
                    onClick={() => setSelectedConnector(conn.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="connector-style"
                      checked={isSelected}
                      onChange={() => setSelectedConnector(conn.id)}
                      className="mt-1 text-cyan-500 focus:ring-cyan-500"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{conn.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {conn.ipRating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{conn.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Software & Harness Add-ons */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 font-semibold mb-4 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-xs">4</span>
                <span>Software Suite & Accessories Bundling</span>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSoftwareSuite}
                    onChange={(e) => setIncludeSoftwareSuite(e.target.checked)}
                    className="mt-1 rounded text-cyan-500 focus:ring-cyan-500"
                  />
                  <div>
                    <span className="text-sm font-bold text-white block">
                      Sidkan TestSuite Pro Validation Software
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Turnkey automated test sequencing, live signal oscilloscope, threshold checking, and 1-click PDF reports.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePythonSdk}
                    onChange={(e) => setIncludePythonSdk(e.target.checked)}
                    className="mt-1 rounded text-cyan-500 focus:ring-cyan-500"
                  />
                  <div>
                    <span className="text-sm font-bold text-white block">
                      Python SDK & LabVIEW VI Integration Pack
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Async streaming Python package (`import sidkan`), NumPy bindings, and TestStand ready VIs.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCustomHarness}
                    onChange={(e) => setIncludeCustomHarness(e.target.checked)}
                    className="mt-1 rounded text-cyan-500 focus:ring-cyan-500"
                  />
                  <div>
                    <span className="text-sm font-bold text-white block">
                      Custom Mating DUT Cable Harness
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Braided nylon shielded harness labeled with heat-shrink wire tags and custom DUT connector of your choice.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>WARRANTY: 3-YEAR ADVANCED REPLACEMENT</span>
              <span className="text-emerald-400">FACTORY CALIBRATED</span>
            </div>
          </div>
        </div>

        {/* Dynamic Bill of Materials (BOM) & Quotation Generator Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                CONFIGURATION SUMMARY
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentEnclosure.name}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {totalChannelsSummary()}
            </div>
            <p className="text-xs text-slate-400">
              Bulkhead: {CONNECTOR_OPTIONS.find(c => c.id === selectedConnector)?.name} | Software: {includeSoftwareSuite ? 'TestSuite Pro' : 'Base'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleGenerateQuoteRequest}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 hover:from-cyan-300 hover:to-amber-300 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              <span>Request Formal Quote & Spec Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Module Selector Drawer */}
      {activeSlotModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Select NI C-Series Module for Slot {activeSlotModal + 1}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  All modules integrate seamlessly with Sidkan quick-connect backplanes
                </p>
              </div>
              <button
                onClick={() => setActiveSlotModal(null)}
                className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NI_MODULES_CATALOG.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => handleAssignModule(activeSlotModal, mod)}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-400 hover:bg-slate-900/60 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm text-white font-mono">{mod.model}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">
                        {mod.category.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-semibold mb-2">{mod.name}</div>
                    <p className="text-xs text-slate-400 line-clamp-2">{mod.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                    <span>{mod.channels}</span>
                    <span className="text-slate-400">{mod.sampleRate}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between">
              <button
                onClick={() => handleAssignModule(activeSlotModal, null)}
                className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded bg-rose-950/40 border border-rose-800"
              >
                Leave Slot Empty
              </button>
              <button
                onClick={() => setActiveSlotModal(null)}
                className="text-xs text-slate-300 hover:text-white px-4 py-1.5 rounded bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
