import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck, FileCheck, Cpu, Terminal } from 'lucide-react';
import { INITIAL_TEST_SEQUENCE } from '../data/modulesData';

interface TestReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestReportModal: React.FC<TestReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative">
        {/* Modal Top Actions */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-sm sm:text-base">
              Automated Hardware Validation Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Clean High-End Industrial Look) */}
        <div className="p-6 sm:p-10 bg-[#090d16] text-slate-200 font-sans space-y-8">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-2xl tracking-tight text-white">SIDKAN</span>
                <span className="text-xs uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold">
                  AUTOMATION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Hardware Validation Systems & Automated Test Suites
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-slate-400 space-y-1">
              <div>
                CERT NO: <strong className="text-white">SID-VAL-2026-9942-PASS</strong>
              </div>
              <div>DATE: <strong className="text-white">2026-10-04 18:24:19 UTC</strong></div>
              <div>
                SYSTEM: <strong className="text-cyan-400">Sidkan ValBox Pro (cDAQ-9189 TSN)</strong>
              </div>
            </div>
          </div>

          {/* Verdict Banner */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  FINAL VERDICT: 100% PASS (ALL 6 TESTS CONFORMANT)
                </div>
                <div className="text-xs text-emerald-300">
                  DUT Unit meets all voltage linearity, inrush threshold, and bus latency requirements.
                </div>
              </div>
            </div>

            <div className="hidden sm:block text-right font-mono text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-bold">
                ISO 9001:2015 AUDITED
              </span>
            </div>
          </div>

          {/* Test Configuration Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-500 block">DUT SERIAL:</span>
              <span className="text-white font-bold">DUT-BMS-PROTOTYPE-04</span>
            </div>
            <div>
              <span className="text-slate-500 block">ENGINEERING OPERATOR:</span>
              <span className="text-white font-bold">Automated CI/CD Host</span>
            </div>
            <div>
              <span className="text-slate-500 block">CHASSIS CLOCK:</span>
              <span className="text-cyan-400 font-bold">IEEE 802.1AS TSN &lt; 25ns</span>
            </div>
            <div>
              <span className="text-slate-500 block">CALIBRATION STATUS:</span>
              <span className="text-emerald-400 font-bold">Valid (NIST Traceable)</span>
            </div>
          </div>

          {/* Test Steps Detailed Table */}
          <div>
            <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3 tracking-wider">
              Verification Test Results Matrix
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 font-mono text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Test Routine</th>
                    <th className="py-2.5 px-3">Module Used</th>
                    <th className="py-2.5 px-3">Specification Target</th>
                    <th className="py-2.5 px-3">Measured Value</th>
                    <th className="py-2.5 px-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {INITIAL_TEST_SEQUENCE.map((test) => (
                    <tr key={test.id} className="hover:bg-slate-900/50">
                      <td className="py-2.5 px-3 text-slate-500">{test.id}</td>
                      <td className="py-2.5 px-3 font-semibold text-white font-sans">{test.name}</td>
                      <td className="py-2.5 px-3 text-cyan-400">{test.module}</td>
                      <td className="py-2.5 px-3 text-slate-400">{test.target}</td>
                      <td className="py-2.5 px-3 text-slate-200 font-bold">{test.measured}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {test.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Document Footer Signatures */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-500 gap-4">
            <div>
              Generated automatically by Sidkan TestSuite v3.2.4 with NI-DAQmx hardware acceleration.
            </div>
            <div className="flex items-center gap-3">
              <span>DIGITAL SIGNATURE: 0x9B4E...FA12</span>
              <span className="text-emerald-400">TAMPER-PROOF</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
