import React, { useState } from 'react';
import { X, Send, CheckCircle2, Cpu, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledSummary?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefilledSummary = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [timeline, setTimeline] = useState('1-3 Months');
  const [notes, setNotes] = useState(prefilledSummary);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-extrabold text-white">
              Quote Request Dispatched!
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <strong className="text-white">{name || 'there'}</strong>. 
              A Sidkan Automation systems engineer has received your hardware validation specification. 
              We will email you a formal proposal and pinout drawing within 24 business hours.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 max-w-md mx-auto text-left">
              <div>REFERENCE ID: <strong className="text-cyan-400">SID-RFQ-2026-8941</strong></div>
              <div>COMPANY: <span className="text-white">{company || 'Independent Lab'}</span></div>
              <div>TIMELINE: <span className="text-white">{timeline}</span></div>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-xl text-white">Request Quotation & Spec Sheet</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
                  TURNKEY HARDWARE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Receive pricing, lead times, 3D STEP CAD models, and customized harness pinout drawings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Henderson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lucid Motors, Northrop Grumman"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Target Project Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:outline-none text-sm text-white"
                  >
                    <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="3-6 Months">3-6 Months</option>
                    <option value="Budgeting / Research">Budgeting / Research</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Validation Requirements & Config Details
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your DUT, required voltage/current ranges, connector preferences, or quantity..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:outline-none text-xs font-mono text-slate-200"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 hover:from-cyan-300 hover:to-amber-300 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Submit Specification for Official Quote</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-500 font-mono">
                🔒 NDA Protected. We never share customer validation test schematics.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
