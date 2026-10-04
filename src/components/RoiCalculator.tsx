import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenQuoteModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenQuoteModal }) => {
  const [engineersCount, setEngineersCount] = useState<number>(6);
  const [testBenchesPerYear, setTestBenchesPerYear] = useState<number>(12);
  const [hourlyRate, setHourlyRate] = useState<number>(95);

  // Calculations
  // Traditional ad-hoc setup: ~75 hours wiring, crimping, debugging flying leads, grounding noise per bench
  // Sidkan turnkey box: ~4 hours with standardized quick-connect harnesses
  const hoursSavedPerBench = 71;
  const totalHoursSaved = testBenchesPerYear * hoursSavedPerBench;
  const directLaborSavings = totalHoursSaved * hourlyRate;

  // Estimated prototype protection savings (avg $6,000 per blown prototype board, ~1.5 prevented per year)
  const prototypeScrapPrevented = Math.min(testBenchesPerYear * 0.25, 4) * 6500;

  const totalAnnualSavings = directLaborSavings + prototypeScrapPrevented;

  return (
    <section id="calculator" className="py-24 relative bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>BUSINESS CASE & ROI CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your Lab’s Turnaround Acceleration
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            See how much your engineering organization saves by replacing one-off ad-hoc 
            wire crimping with productized Sidkan validation boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-2">
                <span>Validation Engineers on Team</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{engineersCount} Engineers</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={engineersCount}
                onChange={(e) => setEngineersCount(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <span className="text-[11px] text-slate-500 font-mono">1 to 30 hardware/test engineers</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-2">
                <span>New Test Benches / Fixtures Built per Year</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{testBenchesPerYear} Test Rigs</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                value={testBenchesPerYear}
                onChange={(e) => setTestBenchesPerYear(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <span className="text-[11px] text-slate-500 font-mono">Prototypes, bring-up benches & thermal test fixtures</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-2">
                <span>Blended Engineering Hourly Rate</span>
                <span className="text-cyan-400 font-mono font-bold text-base">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <span className="text-[11px] text-slate-500 font-mono">$50/hr to $200/hr (Fully loaded labor cost)</span>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span>Ad-Hoc Custom Wire Build:</span>
                <span className="text-rose-400 font-semibold">~75 Hours per bench</span>
              </div>
              <div className="flex justify-between">
                <span>Sidkan Plug & Test Box:</span>
                <span className="text-emerald-400 font-semibold">&lt; 4 Hours per bench</span>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-gradient-to-b from-cyan-950/40 via-slate-900 to-[#0c1424] border border-cyan-500/40 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                ESTIMATED ANNUAL IMPACT
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ${totalAnnualSavings.toLocaleString()}
              </div>
              <p className="text-xs text-slate-300">
                Combined annual labor recovery and prototype scrap risk mitigation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>HOURS SAVED</span>
                </div>
                <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                  {totalHoursSaved.toLocaleString()} hrs
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Freeing engineers to focus on firmware & design</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SCRAP PREVENTED</span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-300 font-mono">
                  ${Math.round(prototypeScrapPrevented).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Zero blown DUTs from wrong terminal pins</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 hover:from-cyan-300 hover:to-amber-300 shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Request Custom ROI Proposal & Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
