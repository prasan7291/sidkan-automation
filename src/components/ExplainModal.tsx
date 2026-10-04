import React from 'react';
import { X, Box, Cable, Laptop, ArrowRight } from 'lucide-react';

interface ExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSurvey: () => void;
}

export const ExplainModal: React.FC<ExplainModalProps> = ({ isOpen, onClose, onStartSurvey }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#121214] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#86868b] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8 pr-8">
          <span className="text-xs uppercase tracking-widest text-[#0071e3] font-semibold block mb-1.5">
            Product Overview
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            How Sidkan Automation Works
          </h3>
          <p className="mt-1 text-sm text-[#86868b]">
            A plain-English explanation of our turnkey hardware validation boxes.
          </p>
        </div>

        {/* 3 Clean Pillars */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">1. Productized Hardware (NI Inside)</h4>
              <p className="mt-1 text-xs text-[#a1a1a6] leading-relaxed">
                National Instruments (NI) makes industry-standard measurement modules (cDAQ & cRIO), 
                but using them in labs usually means an ad-hoc mess of loose modules and power supplies. 
                We package them into a professional, rugged benchtop enclosure with built-in power and cooling.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Cable className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">2. Industrial Quick-Connect Ports</h4>
              <p className="mt-1 text-xs text-[#a1a1a6] leading-relaxed">
                Instead of stripping individual tiny wires into fragile screw terminals, all module channels 
                lead to keyed quick-connect bulkheads. You connect your device under test in one click with zero 
                risk of miswiring or accidentally frying a prototype.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">3. Accompanying Validation Software</h4>
              <p className="mt-1 text-xs text-[#a1a1a6] leading-relaxed">
                Every box includes desktop test software with a clean white analytics interface. It auto-detects the hardware, 
                lets you monitor signals in real time, runs automated test routines, and generates pass/fail compliance reports 
                without writing scripts from scratch.
              </p>
            </div>
          </div>
        </div>

        {/* Real-world Contrast */}
        <div className="mt-6 p-4 rounded-2xl bg-neutral-950 border border-white/10 text-xs">
          <div className="text-[#86868b] font-medium mb-1 uppercase tracking-wider text-[11px]">
            The Bottom Line
          </div>
          <div className="text-[#d1d5db] leading-relaxed">
            Replace <strong>2–3 weeks</strong> of custom breadboarding and wire crimping with a 
            <strong> 5-minute plug-and-test</strong> standard that your entire engineering team can rely on.
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-medium text-[#86868b] hover:text-white transition-colors"
          >
            Got it, close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartSurvey();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-medium text-black bg-white hover:bg-[#e5e5e7] transition-all flex items-center justify-center gap-1.5"
          >
            <span>Take the Pain Point Survey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
