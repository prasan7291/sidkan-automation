import React from 'react';
import { Mail } from 'lucide-react';

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="mt-28 border-t border-white/10 py-12 text-xs text-[#86868b]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Sidkan Automation</span>
            <span>—</span>
            <span>Turnkey NI cDAQ &amp; cRIO Hardware Validation Units</span>
          </div>

          <a
            href="mailto:contact@sidkanautomation.com"
            className="text-[#86868b] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>contact@sidkanautomation.com</span>
          </a>
        </div>

        <div className="text-[11px] text-[#6e6e73] leading-relaxed pt-2 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Sidkan Automation. All rights reserved.</span>
          <span>National Instruments, NI, CompactDAQ, and CompactRIO are trademarks of National Instruments Corp.</span>
        </div>
      </div>
    </footer>
  );
};
