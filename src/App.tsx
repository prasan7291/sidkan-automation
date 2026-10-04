import React, { useState } from 'react';
import { MinimalNavbar } from './components/MinimalNavbar';
import { MinimalHero } from './components/MinimalHero';
import { ProductConfiguratorPage } from './components/ProductConfiguratorPage';
import { PainPointsSurvey } from './components/PainPointsSurvey';
import { ExplainModal } from './components/ExplainModal';
import { QuoteModal } from './components/QuoteModal';
import { MinimalFooter } from './components/MinimalFooter';
import { ChatbotWidget } from './components/ChatbotWidget';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'configurator'>('home');
  const [isExplainModalOpen, setIsExplainModalOpen] = useState<boolean>(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteSummary, setQuoteSummary] = useState<string>('');

  const scrollToSurvey = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('survey');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('survey');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuoteModal = (summary?: string) => {
    if (summary) {
      setQuoteSummary(summary);
    }
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Modern Clean Navbar */}
      <MinimalNavbar
        activeView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        onNavigateConfigurator={() => {
          setCurrentView('configurator');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenExplainModal={() => setIsExplainModalOpen(true)}
        onScrollToSurvey={scrollToSurvey}
      />

      {/* Main View Port */}
      <main className="flex-grow w-full">
        {currentView === 'home' ? (
          <div className="px-4 sm:px-6 py-6 space-y-20 max-w-5xl mx-auto">
            {/* Minimal Modern Hero with Visuals & Software Graphs */}
            <MinimalHero
              onOpenExplainModal={() => setIsExplainModalOpen(true)}
              onGoToConfigurator={() => {
                setCurrentView('configurator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onScrollToSurvey={scrollToSurvey}
            />

            {/* Interactive Pain Point Survey */}
            <section className="pt-4 pb-12">
              <PainPointsSurvey
                onOpenExplainModal={() => setIsExplainModalOpen(true)}
              />
            </section>
          </div>
        ) : (
          /* Dedicated Dropdown Custom Configurator Page */
          <ProductConfiguratorPage
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestQuote={(summary) => handleOpenQuoteModal(summary)}
          />
        )}
      </main>

      {/* Clean Footer */}
      <MinimalFooter />

      {/* "Unsure What This Does?" Plain-English Modal */}
      <ExplainModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        onStartSurvey={scrollToSurvey}
      />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        prefilledSummary={quoteSummary}
      />

      {/* Context-Aware Floating Chatbot Assistant */}
      <ChatbotWidget
        currentPage={currentView}
        onNavigateToConfigurator={() => {
          setCurrentView('configurator');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenExplainModal={() => setIsExplainModalOpen(true)}
        onOpenQuoteModal={handleOpenQuoteModal}
      />
    </div>
  );
}

export default App;
