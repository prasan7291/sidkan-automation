import React, { useState } from 'react';
import { POPULAR_CHASSIS, POPULAR_MODULES } from '../data/modulesData';
import { NIChassis, NIModule } from '../types';
import { 
  Box, 
  Layers, 
  Check, 
  Send, 
  ArrowLeft,
  ChevronRight,
  Info,
  Sliders,
  Cable
} from 'lucide-react';

interface ProductConfiguratorPageProps {
  onBackToHome: () => void;
  onRequestQuote: (summary: string) => void;
}

export const ProductConfiguratorPage: React.FC<ProductConfiguratorPageProps> = ({
  onBackToHome,
  onRequestQuote,
}) => {
  // Default to NI 9178 (as highlighted by the user)
  const [selectedChassisId, setSelectedChassisId] = useState<string>('cdaq-9178');

  // Currently selected chassis
  const currentChassis = POPULAR_CHASSIS.find(c => c.id === selectedChassisId) || POPULAR_CHASSIS[0];

  // Default Slot 1 to NI 9205 (as highlighted by the user)
  const [slotAssignments, setSlotAssignments] = useState<{ [slotIndex: number]: string }>({
    0: 'ni-9205', // Slot 1: NI 9205 (Voltage Input)
    1: 'ni-9263', // Slot 2: NI 9263 (Analog Output)
    2: 'ni-9401', // Slot 3: NI 9401 (High-Speed DIO)
    3: 'ni-9862', // Slot 4: NI 9862 (CAN-FD)
    4: '',
    5: '',
    6: '',
    7: '',
  });

  const [inspectedSlotIndex, setInspectedSlotIndex] = useState<number>(0);

  const handleChassisChange = (chassisId: string) => {
    setSelectedChassisId(chassisId);
    if (inspectedSlotIndex >= (POPULAR_CHASSIS.find(c => c.id === chassisId)?.slots || 4)) {
      setInspectedSlotIndex(0);
    }
  };

  const handleSlotModuleChange = (slotIndex: number, moduleId: string) => {
    setSlotAssignments(prev => ({
      ...prev,
      [slotIndex]: moduleId
    }));
    setInspectedSlotIndex(slotIndex);
  };

  const getModuleForSlot = (slotIndex: number): NIModule | undefined => {
    const modId = slotAssignments[slotIndex];
    if (!modId) return undefined;
    return POPULAR_MODULES.find(m => m.id === modId);
  };

  const inspectedModule = getModuleForSlot(inspectedSlotIndex);

  // Total I/O summary
  const calculateTotalIO = () => {
    let aiChannels = 0;
    let aoChannels = 0;
    let dioChannels = 0;
    let tcChannels = 0;
    let canPorts = 0;
    let ssrChannels = 0;
    let bridgeChannels = 0;

    for (let i = 0; i < currentChassis.slots; i++) {
      const mod = getModuleForSlot(i);
      if (!mod) continue;
      if (mod.id === 'ni-9205') aiChannels += 32;
      if (mod.id === 'ni-9220') aiChannels += 16;
      if (mod.id === 'ni-9201') aiChannels += 8;
      if (mod.id === 'ni-9207') aiChannels += 16;
      if (mod.id === 'ni-9227') aiChannels += 4;
      if (mod.id === 'ni-9263') aoChannels += 4;
      if (mod.id === 'ni-9264') aoChannels += 16;
      if (mod.id === 'ni-9401') dioChannels += 8;
      if (mod.id === 'ni-9403') dioChannels += 32;
      if (mod.id === 'ni-9485') ssrChannels += 8;
      if (mod.id === 'ni-9481') ssrChannels += 4;
      if (mod.id === 'ni-9213' || mod.id === 'ni-9214') tcChannels += 16;
      if (mod.id === 'ni-9217') tcChannels += 4;
      if (mod.id === 'ni-9862') canPorts += 1;
      if (mod.id === 'ni-9237') bridgeChannels += 4;
      if (mod.id === 'ni-9234') aiChannels += 4;
    }

    const summaryParts: string[] = [];
    if (aiChannels > 0) summaryParts.push(`${aiChannels} Analog In`);
    if (aoChannels > 0) summaryParts.push(`${aoChannels} Analog Out`);
    if (dioChannels > 0) summaryParts.push(`${dioChannels} Digital I/O`);
    if (tcChannels > 0) summaryParts.push(`${tcChannels} Temperature`);
    if (canPorts > 0) summaryParts.push(`${canPorts} CAN-FD`);
    if (ssrChannels > 0) summaryParts.push(`${ssrChannels} Relays`);
    if (bridgeChannels > 0) summaryParts.push(`${bridgeChannels} Strain/Bridge`);

    return summaryParts.length > 0 ? summaryParts.join(' • ') : 'No cards assigned';
  };

  const handleQuoteClick = () => {
    const populated = Array.from({ length: currentChassis.slots })
      .map((_, idx) => {
        const mod = getModuleForSlot(idx);
        return `Slot ${idx + 1}: ${mod ? `${mod.model} (${mod.name})` : 'Empty'}`;
      })
      .join('; ');
    const summary = `Configured Chassis: ${currentChassis.model} (${currentChassis.name}) | Modules: [${populated}]`;
    onRequestQuote(summary);
  };

  const categories = Array.from(new Set(POPULAR_MODULES.map(m => m.category)));

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
      {/* Header (Apple / Tesla Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-8 gap-4">
        <div>
          <button
            onClick={onBackToHome}
            className="text-xs text-[#86868b] hover:text-white transition-colors flex items-center gap-1.5 mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Custom Product Configurator
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#86868b] max-w-2xl leading-relaxed">
            Select a National Instruments chassis and slot cards via the dropdowns below. 
            Inspect module capabilities and view how your physical control unit is wired.
          </p>
        </div>

        <button
          onClick={handleQuoteClick}
          className="px-6 py-3 rounded-full font-medium text-xs text-black bg-white hover:bg-[#e5e5e7] transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 shadow-lg"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Request Quote for This Build</span>
        </button>
      </div>

      {/* Grid: Dropdown Selectors on Left, Visual Preview & Description on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Dropdown Selections (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Chassis Selection Dropdown */}
          <div className="apple-card p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-2">
                <Box className="w-4 h-4 text-[#0071e3]" />
                <span>1. Select Chassis</span>
              </label>
              <span className="text-[11px] text-[#86868b]">
                {currentChassis.slots} Bays
              </span>
            </div>

            <select
              value={selectedChassisId}
              onChange={(e) => handleChassisChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white font-medium text-sm focus:border-white focus:outline-none transition-colors cursor-pointer"
            >
              {POPULAR_CHASSIS.map((chassis) => (
                <option key={chassis.id} value={chassis.id} className="bg-neutral-900 text-white">
                  {chassis.model} — {chassis.name}
                </option>
              ))}
            </select>

            <div className="text-[11px] text-[#86868b] flex items-center justify-between pt-1">
              <span>Bus: <strong className="text-white font-normal">{currentChassis.bus.split(' ')[0]}</strong></span>
              <span>Available Slots: <strong className="text-white font-normal">{currentChassis.slots}</strong></span>
            </div>
          </div>

          {/* 2. Slot Modules Dropdown Card */}
          <div className="apple-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0071e3]" />
                <span>2. Select C-Series Modules</span>
              </label>
              <span className="text-[11px] text-[#86868b]">
                Click any slot to inspect
              </span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {Array.from({ length: currentChassis.slots }).map((_, slotIdx) => {
                const assignedModuleId = slotAssignments[slotIdx] || '';
                const isInspected = inspectedSlotIndex === slotIdx;
                const activeMod = getModuleForSlot(slotIdx);

                return (
                  <div
                    key={slotIdx}
                    onClick={() => setInspectedSlotIndex(slotIdx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isInspected
                        ? 'bg-neutral-900/90 border-white/40 ring-1 ring-white/20'
                        : 'bg-neutral-950/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#86868b] font-semibold">
                        SLOT {slotIdx + 1}
                      </span>
                      {activeMod && (
                        <span className="text-[10px] text-white/80 px-2 py-0.5 rounded-full bg-white/10">
                          {activeMod.category}
                        </span>
                      )}
                    </div>

                    <select
                      value={assignedModuleId}
                      onChange={(e) => handleSlotModuleChange(slotIdx, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
                    >
                      <option value="">-- Empty Slot --</option>
                      {categories.map((cat) => (
                        <optgroup key={cat} label={`── ${cat} ──`} className="bg-neutral-900 text-[#86868b] font-semibold">
                          {POPULAR_MODULES.filter(m => m.category === cat).map((mod) => (
                            <option key={mod.id} value={mod.id} className="bg-neutral-900 text-white font-normal">
                              {mod.model}: {mod.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Box Preview & Description (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* VISUAL CONTROL BOX PREVIEW: "What the Control Box Would Look Like" */}
          <div className="apple-card p-6 sm:p-8 rounded-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#86868b] block font-medium">
                  Control Box Preview
                </span>
                <span className="text-sm font-semibold text-white">
                  Sidkan {currentChassis.model} Turnkey Unit
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-medium">
                {currentChassis.slots}-Slot Enclosure
              </span>
            </div>

            {/* Precision Schematic Representation (Clean Apple/Tesla Design) */}
            <div className="rounded-2xl border border-white/15 bg-neutral-950 p-6 space-y-5">
              {/* Box Top Lip */}
              <div className="flex items-center justify-between text-xs text-[#86868b] border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white tracking-wide">SIDKAN AUTOMATION</span>
                  <span>•</span>
                  <span>{currentChassis.name.split(' ')[0]} Chassis Core</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-white text-[11px] font-medium">Armed</span>
                </div>
              </div>

              {/* Slot Faceplates */}
              <div className={`grid gap-2.5 ${currentChassis.slots === 8 ? 'grid-cols-4 sm:grid-cols-8' : 'grid-cols-2 sm:grid-cols-4'}`}>
                {Array.from({ length: currentChassis.slots }).map((_, slotIdx) => {
                  const mod = getModuleForSlot(slotIdx);
                  const isInspected = inspectedSlotIndex === slotIdx;

                  return (
                    <div
                      key={slotIdx}
                      onClick={() => setInspectedSlotIndex(slotIdx)}
                      className={`h-36 rounded-xl border p-2 flex flex-col justify-between transition-all cursor-pointer ${
                        isInspected
                          ? 'bg-neutral-900 border-white ring-1 ring-white shadow-lg'
                          : mod
                          ? 'bg-neutral-900/60 border-white/15 hover:border-white/30'
                          : 'bg-neutral-950/40 border-dashed border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-[#86868b] font-semibold">
                          S{slotIdx + 1}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            mod ? 'bg-emerald-400' : 'bg-neutral-800'
                          }`}
                        ></span>
                      </div>

                      <div className="my-auto text-center space-y-1">
                        {mod ? (
                          <>
                            <div className="w-8 h-8 mx-auto rounded-full border border-white/30 bg-white/5 flex items-center justify-center">
                              <span className="text-[9px] font-mono font-bold text-white">
                                J{slotIdx + 1}
                              </span>
                            </div>
                            <span className="font-semibold text-[10px] text-white block">
                              {mod.model}
                            </span>
                          </>
                        ) : (
                          <span className="text-[9px] text-neutral-600 font-mono block">
                            Empty
                          </span>
                        )}
                      </div>

                      <div className="text-[8px] text-center truncate text-[#86868b] border-t border-white/5 pt-1 font-mono">
                        {mod ? mod.category.split(' ')[0] : '—'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick-Connect Bulkhead Bar */}
              <div className="p-3 rounded-xl bg-neutral-900 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#86868b]">
                  <Cable className="w-3.5 h-3.5 text-white" />
                  <span>Keyed Industrial Quick-Connect Bulkheads</span>
                </div>
                <div className="text-white text-[11px] font-medium">
                  {currentChassis.dimensions}
                </div>
              </div>
            </div>

            {/* Total System Capacity Bar */}
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-[#86868b] uppercase tracking-wider font-medium">Total System Capacity:</span>
              <span className="text-white font-medium">{calculateTotalIO()}</span>
            </div>
          </div>

          {/* DEDICATED DESCRIPTION BOX: "Describing What It Does" */}
          <div className="apple-card p-6 sm:p-8 rounded-2xl space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#0071e3] font-semibold block mb-1">
                Selected Module Specification
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                {inspectedModule ? `${inspectedModule.model} — ${inspectedModule.name}` : `Slot ${inspectedSlotIndex + 1} (Empty)`}
              </h3>
            </div>

            {inspectedModule ? (
              <div className="space-y-4">
                {/* What This Card Does */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-1">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider">
                    What This Card Does:
                  </div>
                  <p className="text-xs text-[#a1a1a6] leading-relaxed">
                    {inspectedModule.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/10">
                    <span className="text-[#86868b] block text-[10px] uppercase font-mono">Channels</span>
                    <span className="text-white font-semibold mt-0.5 block">{inspectedModule.channels}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/10">
                    <span className="text-[#86868b] block text-[10px] uppercase font-mono">Sample Rate</span>
                    <span className="text-white font-semibold mt-0.5 block">{inspectedModule.sampleRate}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/10">
                    <span className="text-[#86868b] block text-[10px] uppercase font-mono">Input Range</span>
                    <span className="text-white font-semibold mt-0.5 block">{inspectedModule.voltageRange}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/10">
                    <span className="text-[#86868b] block text-[10px] uppercase font-mono">Resolution</span>
                    <span className="text-[#0071e3] font-semibold mt-0.5 block">{inspectedModule.resolution}</span>
                  </div>
                </div>

                {/* What the Control Box Port Looks Like */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-1">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Cable className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Control Box Physical Interface:</span>
                  </div>
                  <p className="text-xs text-[#a1a1a6] leading-relaxed">
                    {inspectedModule.controlBoxLook}
                  </p>
                  <div className="text-[11px] text-[#86868b] pt-1">
                    Connector Type: <strong className="text-white font-normal">{inspectedModule.connectorType}</strong>
                  </div>
                </div>

                {/* Recommended Application */}
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs space-y-1">
                  <span className="text-[#0071e3] font-semibold block">
                    Recommended Validation Use Case:
                  </span>
                  <span className="text-[#d1d5db]">
                    {inspectedModule.typicalUse}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-neutral-900/30 border border-dashed border-white/10 text-center space-y-1">
                <span className="text-xs text-[#86868b] block">Slot {inspectedSlotIndex + 1} is unassigned</span>
                <p className="text-xs text-[#6e6e73]">
                  Select a module from the dropdown on the left (e.g. NI 9205 Voltage AI) to view its technical capabilities.
                </p>
              </div>
            )}

            {/* Chassis Specification */}
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-2 text-xs">
              <div className="text-xs font-semibold text-white uppercase tracking-wider">
                Chassis Architecture: {currentChassis.model}
              </div>
              <p className="text-xs text-[#a1a1a6] leading-relaxed">
                {currentChassis.description}
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] text-[#86868b] space-y-1">
                <div>Enclosure Design: <span className="text-white">{currentChassis.boxLookDescription}</span></div>
                <div>Timing Engines: <span className="text-white">{currentChassis.timingEngines}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
