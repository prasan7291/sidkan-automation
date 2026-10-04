import React from 'react';
import { ArrowRight, Sliders, HelpCircle, Activity, ChevronDown } from 'lucide-react';
import { SoftwareAnalyticsUI } from './SoftwareAnalyticsUI';

interface MinimalHeroProps {
  onOpenExplainModal: () => void;
  onGoToConfigurator: () => void;
  onScrollToSurvey: () => void;
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({
  onOpenExplainModal,
  onGoToConfigurator,
  onScrollToSurvey,
}) => {
  return (
    <div className="space-y-24">
      {/* Hero Section (Tesla / Apple Style) */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 text-center max-w-4xl mx-auto space-y-8">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#86868b] tracking-wide font-normal">
          <span>National Instruments cDAQ & cRIO Architecture</span>
          <span className="text-white/20">•</span>
          <span className="text-white">Turnkey Systems</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
            Sidkan Automation
          </h1>

          <p className="text-xl sm:text-2xl font-normal text-[#86868b] tracking-tight max-w-2xl mx-auto">
            Productized Hardware Validation Boxes &amp; Analytics Software
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#a1a1a6] leading-relaxed max-w-2xl mx-auto font-normal">
            We package modular National Instruments hardware into turnkey, 
            rugged validation units equipped with quick-connect ports. Paired with our 
            white-glove companion software, engineering teams eliminate messy lab wiring 
            and begin validating hardware in minutes.
          </p>
        </div>

        {/* Apple / Tesla Style Pill Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onGoToConfigurator}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-medium text-sm text-black bg-white hover:bg-[#e5e5e7] transition-all flex items-center justify-center gap-2 group"
          >
            <Sliders className="w-4 h-4 text-black" />
            <span>Configure a Validation Box</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenExplainModal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-medium text-sm text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-[#86868b]" />
            <span>Unsure what this does?</span>
          </button>

          <button
            onClick={onScrollToSurvey}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-sm text-[#86868b] hover:text-white transition-colors"
          >
            Pain Point Survey ↓
          </button>
        </div>
      </section>

      {/* Primary Visual Showcase: What the product does in terms of graphs & analytics UI */}
      <section className="relative px-2 sm:px-4">
        <SoftwareAnalyticsUI />
      </section>

      {/* Clean Stock Visual Banner: Modern Lab & Validation Environment */}
      <section className="max-w-5xl mx-auto px-2 sm:px-4">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 group">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80"
            alt="Modern engineering test laboratory"
            className="w-full h-72 sm:h-96 object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 sm:p-12">
            <span className="text-xs uppercase tracking-widest text-[#0071e3] font-semibold mb-2">
              The Engineering Objective
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight max-w-xl">
              Zero Loose Wires. Zero Damaged Prototypes. 100% Repeatable.
            </h3>
            <p className="mt-2 text-sm text-[#86868b] max-w-lg leading-relaxed">
              Standardize hardware validation across every test bench. Standardized pinouts, 
              isolated DUT power protection, and immediate software synchronization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
