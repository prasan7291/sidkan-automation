import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, ShieldCheck, Flame, Clock, Sparkles } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative bg-slate-950/60 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE LAB BOTTLENECK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop Burning Weeks on Ad-Hoc Wiring Rats’ Nests
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Hardware engineers shouldn’t spend 40 hours crimping loose header leads and debugging 
            accidental ground loops. Sidkan productizes validation into robust, repeatable hardware boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* The Old Reality */}
          <div className="rounded-2xl bg-gradient-to-b from-rose-950/20 via-slate-900/60 to-slate-950 p-6 sm:p-8 border border-rose-500/20 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-rose-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">The Ad-Hoc Lab Bench</h3>
                    <p className="text-xs font-mono text-rose-400">STATUS QUO: SLOW, FRAGILE & EXPENSIVE</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
                  2-3 WEEKS TO BUILD
                </span>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-200">Fragile flying leads & screw terminals:</strong> A single table bump 
                    or accidental tug disconnects your thermocouple during a 24-hour thermal soak.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-200">Blown prototype boards ($5k–$20k cost):</strong> One misplaced 24V lead 
                    into an unbuffered 3.3V GPIO line instantly destroys a rare prototype DUT.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-200">Non-reproducible test setups:</strong> Test scripts written for Bench 1 
                    fail on Bench 2 due to varying cable impedances and ground-loop noise.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-200">Disjointed custom scripts:</strong> Messy folder of one-off Python scripts, 
                    broken LabVIEW VIs, and manual spreadsheet test data collation.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-rose-400/80">
              <span>Avg. Time-to-First-Test: 14–21 Days</span>
              <span>Failure Risk: HIGH</span>
            </div>
          </div>

          {/* The Sidkan Solution */}
          <div className="rounded-2xl bg-gradient-to-b from-cyan-950/30 via-slate-900/70 to-[#0c1424] p-6 sm:p-8 border border-cyan-500/40 shadow-xl shadow-cyan-950/30 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">The Sidkan ValBox Standard</h3>
                    <p className="text-xs font-mono text-cyan-400">PRODUCTIZED TURNKEY HARDWARE</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700">
                  PLUG & TEST IN 5 MIN
                </span>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cyan-200">Mil-spec keyed quick-connect ports:</strong> Amphenol circular bayonet 
                    and tool-less push-in bulkheads make miswiring physically impossible.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cyan-200">Integrated power isolation & fused rails:</strong> Dedicated 24V / 5V / 3.3V 
                    isolated power distribution with programmable overcurrent protection.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cyan-200">100% standardized repeatability:</strong> Identical pinouts across every 
                    engineer bench, environmental chamber, and factory production floor.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cyan-200">Sidkan TestSuite software included:</strong> Automated test execution, 
                    live waveform visualizers, Python SDK, and 1-click compliance PDF reports.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs font-mono text-cyan-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Time-to-First-Test: &lt; 5 Minutes</span>
              </span>
              <span className="text-emerald-400 font-bold">85% LABOR SAVINGS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
