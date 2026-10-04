import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Shield, Zap, Menu, X, ArrowRight, Activity, FileSpreadsheet } from 'lucide-react';

interface NavbarProps {
  onOpenConfigurator: () => void;
  onOpenQuoteModal: () => void;
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConfigurator,
  onOpenQuoteModal,
  onOpenReportModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-amber-500 p-[1.5px] shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 led-blink-green"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  SIDKAN
                </span>
                <span className="text-xs uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800 font-mono font-semibold">
                  AUTOMATION
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">
                NI cDAQ/cRIO Hardware Validation Systems
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#hardware" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>Hardware Boxes</span>
            </a>
            <a href="#quick-connect" className="hover:text-cyan-400 transition-colors">
              Quick-Connect Ports
            </a>
            <a href="#software" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>Software Suite</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded px-1.5 py-0.2">v3.2</span>
            </a>
            <a href="#configurator" className="hover:text-cyan-400 transition-colors text-amber-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Box Configurator
            </a>
            <a href="#calculator" className="hover:text-cyan-400 transition-colors">
              ROI Calculator
            </a>
            <button
              onClick={onOpenReportModal}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800"
              title="Preview Automated Test Report"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
              Sample Report
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 led-blink-green"></span>
              <span>NI-DAQmx 24.5 TSN</span>
            </div>

            <button
              onClick={onOpenConfigurator}
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-lg transition-all"
            >
              Configure Box
            </button>

            <button
              onClick={onOpenQuoteModal}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 hover:from-cyan-300 hover:to-amber-300 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all flex items-center gap-1.5 group"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#hardware"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-200 hover:text-cyan-400"
          >
            Hardware Boxes
          </a>
          <a
            href="#quick-connect"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-200 hover:text-cyan-400"
          >
            Quick-Connect Ports
          </a>
          <a
            href="#software"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-200 hover:text-cyan-400"
          >
            Software Suite
          </a>
          <a
            href="#configurator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-amber-400 font-semibold"
          >
            ⚡ Box Configurator
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-200 hover:text-cyan-400"
          >
            ROI Calculator
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-lg bg-slate-900 border border-slate-700 text-slate-200"
            >
              Configure Custom Box
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-2.5 text-center text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950"
            >
              Request Quote & Specs
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
