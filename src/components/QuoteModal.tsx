import React, { useState } from 'react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendQuoteRequest } from '../services/emailService';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync prefilled summary whenever it changes or modal opens
  React.useEffect(() => {
    if (prefilledSummary) {
      setNotes(prefilledSummary);
    }
  }, [prefilledSummary, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendQuoteRequest({
        name,
        email,
        company,
        timeline,
        configurationDetails: notes || 'No custom notes provided'
      });
    } catch (err) {
      console.error('Failed to dispatch quote request:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
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
      <div className="bg-[#121214] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#86868b] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-semibold text-white tracking-tight">
              Quote Request Sent
            </h3>

            <p className="text-sm text-[#a1a1a6] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{name || 'there'}</strong>. 
              Your hardware validation specification has been delivered to our systems engineering team 
              at <strong className="text-white">raoprasan123@gmail.com</strong>. We will review your build 
              and follow up with pricing and pinout drawings.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 text-xs text-[#86868b] max-w-md mx-auto text-left space-y-1">
              <div>REFERENCE ID: <strong className="text-white font-mono">SID-RFQ-2026-8941</strong></div>
              <div>COMPANY: <span className="text-white">{company || 'Independent Lab'}</span></div>
              <div>TIMELINE: <span className="text-white">{timeline}</span></div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-[#e5e5e7] text-xs font-medium transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#0071e3] font-semibold block mb-1">
                Formal Proposal Request
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                Request Quotation &amp; Spec Sheet
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#86868b]">
                Receive pricing, lead times, 3D STEP CAD models, and customized harness pinout drawings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Henderson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lucid Motors, Northrop Grumman"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">Target Project Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-white focus:outline-none text-xs text-white cursor-pointer"
                  >
                    <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="3-6 Months">3-6 Months</option>
                    <option value="Budgeting / Research">Budgeting / Research</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1.5">
                  Validation Requirements &amp; Config Details
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your DUT, required voltage/current ranges, connector preferences, or quantity..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full font-medium text-xs text-black bg-white hover:bg-[#e5e5e7] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Sending to Engineering Team...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-black" />
                      <span>Submit Specification for Official Quote</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-[#86868b]">
                Inquiries are dispatched directly to systems engineering at <strong className="text-white font-normal">raoprasan123@gmail.com</strong>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
