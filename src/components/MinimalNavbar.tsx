import React from 'react';
import { HelpCircle, Sliders } from 'lucide-react';

interface MinimalNavbarProps {
  activeView: 'home' | 'configurator';
  onNavigateHome: () => void;
  onNavigateConfigurator: () => void;
  onOpenExplainModal: () => void;
  onScrollToSurvey: () => void;
}

export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({
  activeView,
  onNavigateHome,
  onNavigateConfigurator,
  onOpenExplainModal,
  onScrollToSurvey,
}) => {
  return (
    <header className="border-b border-white/10 bg-black/75 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 group text-left"
        >
          <span className="font-semibold text-base tracking-tight text-white group-hover:text-white/80 transition-colors">
            Sidkan Automation
          </span>
        </button>

        {/* Center / Right Navigation */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
          <button
            onClick={onNavigateHome}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              activeView === 'home'
                ? 'text-white bg-white/10'
                : 'text-[#86868b] hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={onNavigateConfigurator}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
              activeView === 'configurator'
                ? 'text-black bg-white font-medium'
                : 'text-white bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Configurator</span>
          </button>

          <button
            onClick={onScrollToSurvey}
            className="text-[#86868b] hover:text-white transition-colors hidden md:inline px-2 py-1.5"
          >
            Survey
          </button>

          <button
            onClick={onOpenExplainModal}
            className="text-[#86868b] hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unsure what this does?</span>
            <span className="sm:hidden">Help</span>
          </button>
        </div>
      </div>
    </header>
  );
};
