import React from 'react';
import { Cpu, Mail, MapPin, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenConfigurator: () => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConfigurator, onOpenQuoteModal }) => {
  return (
    <footer className="bg-[#05080f] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                <Cpu className="w-5 h-5 text-slate-950" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">SIDKAN</span>
                <span className="text-xs uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold">
                  AUTOMATION
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sidkan Automation engineers productized hardware validation boxes powered by 
              National Instruments CompactDAQ and CompactRIO architecture with ruggedized 
              quick-connect port interfaces and automated validation test software.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NIST-Traceable Calibration & ISO 9001 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>contact@sidkanautomation.com</span>
              </div>
            </div>
          </div>

          {/* Product Lines */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Hardware Boxes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hardware" className="hover:text-cyan-400 transition-colors">
                  ValBox Pro 4-Slot (cDAQ)
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-cyan-400 transition-colors">
                  ValBox Pro 8-Slot (cDAQ)
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-cyan-400 transition-colors">
                  ValRack Ultra 3U (cRIO)
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-cyan-400 transition-colors">
                  ValPelican Field Rugged
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenConfigurator}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <span>Interactive Configurator</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Port Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Quick Connect
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#quick-connect" className="hover:text-cyan-400 transition-colors">
                  Amphenol MIL-DTL Circular
                </a>
              </li>
              <li>
                <a href="#quick-connect" className="hover:text-cyan-400 transition-colors">
                  Phoenix Contact Push-In
                </a>
              </li>
              <li>
                <a href="#quick-connect" className="hover:text-cyan-400 transition-colors">
                  Industrial Heavy D-Sub
                </a>
              </li>
              <li>
                <a href="#quick-connect" className="hover:text-cyan-400 transition-colors">
                  LEMO & BNC Coaxial Array
                </a>
              </li>
              <li>
                <a href="#quick-connect" className="hover:text-cyan-400 transition-colors">
                  Custom DUT Mating Harnesses
                </a>
              </li>
            </ul>
          </div>

          {/* Software & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Software Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#software" className="hover:text-cyan-400 transition-colors">
                  Sidkan TestSuite Pro
                </a>
              </li>
              <li>
                <a href="#software" className="hover:text-cyan-400 transition-colors">
                  Live Oscilloscope Simulator
                </a>
              </li>
              <li>
                <a href="#software" className="hover:text-cyan-400 transition-colors">
                  Python SDK (`import sidkan`)
                </a>
              </li>
              <li>
                <a href="#software" className="hover:text-cyan-400 transition-colors">
                  LabVIEW & TestStand VIs
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQuoteModal}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Request Custom Quote</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Trademark Notice */}
        <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            © 2026 Sidkan Automation Inc. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-600 max-w-xl text-center md:text-right">
            National Instruments, NI, CompactDAQ, and CompactRIO are registered trademarks of National Instruments Corp. 
            Sidkan Automation is an independent designer and manufacturer of productized turnkey test enclosures.
          </div>
        </div>
      </div>
    </footer>
  );
};
